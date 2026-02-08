import { useEffect } from "react";
import type { User } from "../../../types/user.ts";

//Interface for user
interface UserDetailsModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

//Modal for user details
export const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!user || !isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div role="dialog" aria-labelledby="details-modal-title" className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
                <h3 id="details-modal-title" className="text-xl font-semibold text-gray-800 mb-4">
                    {user.name}
                </h3>

                <div className="space-y-3 text-sm">
                    <div>
                        <span className="text-gray-400">Username</span>
                        <p className="text-gray-700">{user.username}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Email</span>
                        <p className="text-gray-700">{user.email}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Phone</span>
                        <p className="text-gray-700">{user.phone}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Website</span>
                        <p className="text-gray-700">{user.website}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Address</span>
                        <p className="text-gray-700">
                            {user.address.street}, {user.address.suite}
                            <br />
                            {user.address.city} {user.address.zipcode}
                        </p>
                    </div>

                    <div>
                        <span className="text-gray-400">Company</span>
                        <p className="text-gray-700 font-medium">{user.company.name}</p>
                        <p className="text-gray-500">"{user.company.catchPhrase}"</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
