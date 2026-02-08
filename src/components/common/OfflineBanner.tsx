import { useOffline } from "../../context/OfflineContext.tsx";

//Offline mode
export const OfflineBanner = () => {
    const { isOnline } = useOffline();

    if (isOnline) return null;

    return (
        <div className="fixed top-[20px] right-[20px] bg-red-500 text-white text-center py-2 px-4 z-50 w-[300px] rounded-[12px]">
              <span className="text-sm font-medium">
                Offline mode
              </span>
        </div>

    );
};
