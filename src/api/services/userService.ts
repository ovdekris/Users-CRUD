import { jsonApiInstance } from '../apiClient';
import {API_ENDPOINTS} from '../../utils/constants.ts';
import type { User, UserFormData, UserUpdateData } from '../../types/user';
import { withCache } from './cacheService.ts';

export const UserService = {
    //Get all users
    getAll: async (): Promise<User[]> => {
        return withCache('users', () => jsonApiInstance<User[]>(API_ENDPOINTS.USERS));
    },
    //Get user by id
    getById: async (id: number): Promise<User> => {
       return withCache(`user_${id}`, () => jsonApiInstance<User>(API_ENDPOINTS.USER_BY_ID(id)));
    },
    //Create user
    create: async (userData: UserFormData): Promise<User> => {
        return jsonApiInstance<User>(API_ENDPOINTS.USERS, {
            method: 'POST',
            json: userData
        });
    },
    //Update User
    update: async (id: number, userData: UserUpdateData): Promise<User> => {
        return jsonApiInstance<User>(API_ENDPOINTS.USER_BY_ID(id), {
            method: 'PUT',
            json: userData
        });
    },
    //Delete User
    delete: async (id: number): Promise<void> => {
        await jsonApiInstance<void>(API_ENDPOINTS.USER_BY_ID(id), {
            method: 'DELETE',
        });
    },
}