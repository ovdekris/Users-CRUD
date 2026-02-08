import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

//Type of data stored in an offline context
interface OfflineContextType {
    isOnline: boolean;
    isOfflineMode: boolean;
}

//Offline context
const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider = ({ children }: { children: ReactNode }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    useEffect(() => {
        //Handler called when the Internet connection is restored
        const handleOnline = () => {
            setIsOnline(true);
            setIsOfflineMode(false);
        };

        //Handler called when the Internet connection is lost
        const handleOffline = () => {
            setIsOnline(false);
            setIsOfflineMode(true);
        };

        //Listening for changes in connection status
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <OfflineContext.Provider value={{ isOnline, isOfflineMode }}>
            {children}
        </OfflineContext.Provider>
    );
};

//Custom hook for easy context usage
export const useOffline = () => {
    const context = useContext(OfflineContext);
    if (context === undefined) {
        throw new Error('useOffline must be used within an OfflineProvider');
    }
    return context;
};
