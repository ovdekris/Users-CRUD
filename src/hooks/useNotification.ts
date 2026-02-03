import { useNotificationContext } from "../context/NotificationContext.tsx";

export const useNotification = () => {
    return useNotificationContext();
}