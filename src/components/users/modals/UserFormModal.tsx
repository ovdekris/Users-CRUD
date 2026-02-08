import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User, UserFormData } from "../../../types/user.ts";
import { defaultUserFormData } from "../../../types/user.ts";
import { userSchema } from "../../../schemas/userSchema.ts";

//Interface for user edit/add
interface UserFormModalProps {
    user?: User | null;
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
}

//Function for user edit/add
export const UserFormModal = ({ user, isOpen, isLoading = false, onClose, onSubmit }: UserFormModalProps) => {
    const isEditMode = !!user;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultUserFormData,
    });

    useEffect(() => {
        if (isOpen) {
            if (user) {
                reset({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    website: user.website,
                    address: user.address,
                    company: user.company,
                });
            } else {
                reset(defaultUserFormData);
            }
        }
    }, [isOpen, user, reset]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const onFormSubmit = (data: UserFormData) => {
        onSubmit(data);
    };

    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div role="dialog" aria-modal="true" className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-600 mb-6">
                        {isEditMode ? "Edit user" : "Add user"}
                    </h3>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium  text-gray-500 mb-1">Name</label>
                                <input {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium  text-gray-500 mb-1">Username</label>
                                <input {...register("username")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium  text-gray-500 mb-1">Email</label>
                                <input {...register("email")} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium  text-gray-500 mb-1">Telefon</label>
                                <input {...register("phone")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium  text-gray-500 mb-1">Website</label>
                                <input {...register("website")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-600 mb-3">Adres</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">String</label>
                                    <input {...register("address.street")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.address?.street && <p className="text-red-500 text-xs mt-1">{errors.address.street.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">Apartament</label>
                                    <input {...register("address.suite")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.address?.suite && <p className="text-red-500 text-xs mt-1">{errors.address.suite.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">City</label>
                                    <input {...register("address.city")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.address?.city && <p className="text-red-500 text-xs mt-1">{errors.address.city.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">Postal code</label>
                                    <input {...register("address.zipcode")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.address?.zipcode && <p className="text-red-500 text-xs mt-1">{errors.address.zipcode.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-600 mb-3">Firm</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">Name firm</label>
                                    <input {...register("company.name")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.company?.name && <p className="text-red-500 text-xs mt-1">{errors.company.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">Catch phrase</label>
                                    <input {...register("company.catchPhrase")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.company?.catchPhrase && <p className="text-red-500 text-xs mt-1">{errors.company.catchPhrase.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium  text-gray-500 mb-1">Description of activities</label>
                                    <input {...register("company.bs")} className="w-full px-3 py-2 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus: ransparent" />
                                    {errors.company?.bs && <p className="text-red-500 text-xs mt-1">{errors.company.bs.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4   mt-6">
                            <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-[8px] hover:bg-gray-200 transition duration-150 cursor-pointer disabled:opacity-50">
                                Cancel
                            </button>
                            <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-[#0e0eef] rounded-[8px] hover:opacity-90 transition duration-150 cursor-pointer disabled:opacity-50 flex items-center gap-2">
                                {isLoading && <span className="w-4 h-4 border-2 border-white/30  -white rounded-full animate-spin" />}
                                {isEditMode ? "Save" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
