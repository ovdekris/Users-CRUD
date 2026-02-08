import { useNotificationContext } from "../../context/NotificationContext";

const typeStyles = {
    success: "bg-emerald-500",
    error: "bg-rose-600",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
};

//Notification ux
export const NotificationContainer = () => {
    const { notifications } = useNotificationContext();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
            {notifications.map((notification) => (
                <div key={notification.id} className={`${typeStyles[notification.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[250px] animate-slide-in`}>
                    <span className="flex-1">{notification.message}</span>
                </div>
            ))}
        </div>
    );
};
