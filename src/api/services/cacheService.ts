//Prefix for localstorage
const CACHE_PREFIX = 'app_cache_';
//Default cache lifetime
const DEFAULT_TTL_MS = 5 * 60 * 1000;

//Structure of a single cache entry
interface CacheItem<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

export const cacheService = {
    //Get data of cache
    get: <T>(key: string): T | null => {
        try {
            const item = localStorage.getItem(CACHE_PREFIX + key);
            if (!item) return null;

            const cached = JSON.parse(item) as CacheItem<T>;

            if (cacheService.isExpired(cached)) {
                cacheService.remove(key);
                return null;
            }

            return cached.data;
        } catch {
            return null;
        }
    },

    //Set data of cache
    set: <T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void => {
        try {
            const cacheItem: CacheItem<T> = {
                data,
                timestamp: Date.now(),
                ttl: ttlMs,
            };
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheItem));
        } catch (error) {
            console.error('Error caching data:', error);
        }
    },

    //Checks if a cache entry is expired
    isExpired: <T>(cached: CacheItem<T>): boolean => {
        return Date.now() - cached.timestamp > cached.ttl;
    },

    //Remove data of cache
    remove: (key: string): void => {
        localStorage.removeItem(CACHE_PREFIX + key);
    }
};

//Configuration options for withCache
interface WithCacheOptions {
    ttlMs?: number;
    forceRefresh?: boolean;
}

//Wrapper for fetcher with cache and offline support
export const withCache = async <T>(
    key: string,
    fetcher: () => Promise<T>,
    options: WithCacheOptions = {}
): Promise<T> => {
    const { ttlMs, forceRefresh = false } = options;

    if (!forceRefresh) {
        const cached = cacheService.get<T>(key);
        if (cached && navigator.onLine) {
            fetcher().then(data => cacheService.set(key, data, ttlMs)).catch(() => {});
            return cached;
        }
    }

    try {
        const data = await fetcher();
        cacheService.set(key, data, ttlMs);
        return data;
    } catch (error) {
        const cached = cacheService.get<T>(key);
        if (cached) {
            return cached;
        }
        throw error;
    }
};
