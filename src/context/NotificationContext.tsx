import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

//Type notification
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

//Interface notification
export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

//Context type — defines what will be available globally
interface NotificationContextType {
    notifications: Notification[];
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
    removeNotification: (id: string) => void;
}

//Create context
const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    //Function adding a new notification
    const addNotification = useCallback((message: string, type: NotificationType) => {
        const id = Date.now().toString();
        const notification: Notification = { id, message, type };

        setNotifications((prev) => [...prev, notification]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    //Function remove a notification
    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const value: NotificationContextType = {
        notifications,
        success: (message: string) => addNotification(message, 'success'),
        error: (message: string) => addNotification(message, 'error'),
        info: (message: string) => addNotification(message, 'info'),
        warning: (message: string) => addNotification(message, 'warning'),
        removeNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

//Custom hook for convenient use of context
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext must be used within NotificationProvider');
    }
    return context;
};
