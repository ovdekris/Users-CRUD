const CACHE_PREFIX = 'app_cache_';

export const cacheService = {
    get: <T>(key: string): T | null => {
        try {
            const item = localStorage.getItem(CACHE_PREFIX + key);
            if (!item) return null;
            return JSON.parse(item) as T;
        } catch {
            return null;
        }
    },

    set: <T>(key: string, data: T): void => {
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
        } catch (error) {
            console.error('Error caching data:', error);
        }
    },

    remove: (key: string): void => {
        localStorage.removeItem(CACHE_PREFIX + key);
    },

    clear: (): void => {
        Object.keys(localStorage)
            .filter(key => key.startsWith(CACHE_PREFIX))
            .forEach(key => localStorage.removeItem(key));
    }
};

export const withCache = async <T>(
    key: string,
    fetcher: () => Promise<T>
): Promise<T> => {
    try {
        const data = await fetcher();
        cacheService.set(key, data);
        return data;
    } catch (error) {
        if (!navigator.onLine) {
            const cached = cacheService.get<T>(key);
            if (cached) {
                return cached;
            }
        }
        throw error;
    }
};
