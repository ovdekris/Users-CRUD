import { useEffect } from "react";
import type {User} from "../../../types/user.ts";
import {Loader} from "../../common/Loader.tsx";

//Interface for Delete user
interface DeleteUserModalProps {
    user: User | null;
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

//Function for Delete user
export const DeleteUserModal = ({
    user,
    isOpen,
    isLoading = false,
    onClose,
    onConfirm}: DeleteUserModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }

        if (isOpen) document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!user || !isOpen) return;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div role="dialog" aria-modal="true" aria-labelledby="delete-modal-title" className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
                <h3 id="delete-modal-title" className="text-lg font-semibold text-gray-800 mb-1">
                    Delete user
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                    Are you sure you want to delete{' '}
                    <span className="font-medium text-gray-700">{user.name}</span>? This action
                    cannot be undone.
                </p>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} disabled={isLoading} className="px-4 cursor-pointer py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                        Cancel
                    </button>
                    <button onClick={onConfirm} disabled={isLoading} className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        {isLoading && (
                            <Loader/>
                        )}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}