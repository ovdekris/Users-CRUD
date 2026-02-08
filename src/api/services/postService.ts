import {jsonApiInstance} from "../apiClient.ts";
import {API_ENDPOINTS} from "../../utils/constants.ts";
import type {Post} from "../../types/post.ts";
import { withCache } from './cacheService.ts';

//Get Post
export const postService = {
    getByUserId: async (userId: number): Promise<Post[]> => {
        return withCache(`posts_user_${userId}`, () => jsonApiInstance<Post[]>(API_ENDPOINTS.POST_BY_USER(userId)));
    },
};