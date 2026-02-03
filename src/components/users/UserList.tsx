import {Header} from "../common/Header.tsx";
import {useNavigate} from "react-router-dom";
import {useCrud} from "../../hooks/useCrud.ts";
import {useEffect} from "react";
import {useModal} from "../../hooks/useModal.ts";
import type {User} from "../../types/user.ts";
import {UserService} from "../../api/services/userService.ts";
import {ROUTES} from "../../utils/constants.ts";
import {Loader} from "../common/Loader.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {UserActionsDropdown} from "./UserActionsDropdown.tsx";
import {DeleteUserModal} from "./modals/DeleteUserModal.tsx";
import {UserDetailsModal} from "./modals/UserDetailsModal.tsx";
import {UserFormModal} from "./modals/UserFormModal.tsx";
import type {UserFormData} from "../../types/user.ts";

export const UserList = () => {
    const navigate = useNavigate();
    const {data: users, loading, error, fetchAll, createItem, updateItem, deleteItem} = useCrud<User>({
        getAll: UserService.getAll,
        create: UserService.create,
        update: UserService.update,
        delete: UserService.delete,
    });

    const deleteModal = useModal();
    const formModal = useModal();
    const detailsModal = useModal();

    useEffect(() => {
        fetchAll();
    }, []);

    const handleViewPosts = (userId: number) => {
        navigate(ROUTES.USER_POSTS(userId));
    };

    const handleEditUser = (userId: number) => {
        formModal.open(userId);
    };

    const handleDeleteClick = (user: User) => {
        deleteModal.open(user);
    };

    const handleDetailsClick = (user: User) => {
        detailsModal.open(user);
    };

    const handleConfirmDelete = async () => {
        if (deleteModal.modalData) {
            await deleteItem(deleteModal.modalData.id);
            deleteModal.close();
        }
    };

    const handleAddUser = () => {
        formModal.open(null);
    };

    const handleFormSubmit = async (data: UserFormData) => {
        if (formModal.modalData) {
            await updateItem(formModal.modalData, data);
        } else {
            await createItem(data);
        }
        formModal.close();
    };

    const editingUser = formModal.modalData
        ? users.find(u => u.id === formModal.modalData)
        : null;

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <ErrorMessage message={error}/>
    }

    return <>
        <Header onAddUser={handleAddUser}/>
        <div id="container" className="bg-[#faf5f0] min-h-screen">
            <div id="content" className="max-w-[1440px] mx-auto">
                <div className="p-5">
                    <div id="users-header" className="hidden desktop:grid grid-cols-5">
                        <div className="p-3 font-semibold">Name</div>
                        <div className="p-3 font-semibold">Email</div>
                        <div className="p-3 font-semibold">City</div>
                        <div className="p-3 font-semibold">Firm</div>
                        <div className="p-3 font-semibold text-center">Action</div>
                    </div>
                    <div id="users" className="grid grid-cols-1 mobile:grid-cols-2 gap-2 desktop:block desktop:gap-0">
                        {users.map((user: User) => (
                            <div key={user.id}
                                 className="group relative flex flex-col desktop:grid desktop:grid-cols-5 drop-shadow-md p-4 desktop:py-2.5 desktop:p-0 bg-white rounded-xl mb-2.5 cursor-pointer hover:bg-[#0e0eef] hover:z-10 transition duration-300 ease">
                                <div className="desktop:p-3">
                                    <span className="text-xs text-gray-400 desktop:hidden">Name</span>
                                    <span
                                        className="text-l font-semibold text-black group-hover:text-white transition duration-300 block">{user.name}</span>
                                </div>
                                <div className="desktop:p-3">
                                    <span className="text-xs text-gray-400 desktop:hidden">Email</span>
                                    <p className="text-gray-500 group-hover:text-white transition duration-300 ease">{user.email}</p>
                                </div>
                                <div className="desktop:p-3">
                                    <span className="text-xs text-gray-400 desktop:hidden">City</span>
                                    <p className="text-gray-500 group-hover:text-white transition duration-300 ease">{user.address.city}</p>
                                </div>
                                <div className="desktop:p-3">
                                    <span className="text-xs text-gray-400 desktop:hidden">Firm</span>
                                    <p className="text-gray-500 group-hover:text-white transition duration-300 ease">{user.company.name}</p>
                                </div>

                                <div className="desktop:p-3 desktop:flex desktop:items-center desktop:justify-center max-[978px]:absolute max-[978px]:right-[20px] max-[978px]:top-[20px]">
                                    <UserActionsDropdown user={user} onEdit={() => handleEditUser(user.id)}
                                        onDelete={handleDeleteClick}
                                        onViewPosts={handleViewPosts}
                                        onDetails={handleDetailsClick}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DeleteUserModal user={deleteModal.modalData} isOpen={deleteModal.isOpen} onClose={deleteModal.close} onConfirm={handleConfirmDelete}/>
            <UserDetailsModal user={detailsModal.modalData} isOpen={detailsModal.isOpen} onClose={detailsModal.close}/>
            <UserFormModal user={editingUser} isOpen={formModal.isOpen} onClose={formModal.close} onSubmit={handleFormSubmit}/>
        </div>
    </>
}