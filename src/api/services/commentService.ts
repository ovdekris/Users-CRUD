import {jsonApiInstance} from "../apiClient.ts";
import {API_ENDPOINTS} from "../../utils/constants.ts";
import type {Comment} from "../../types/comment.ts";
import { withCache } from './cacheService.ts';

//Get comment
export const commentService = {
    getByPostId: async (postId: number): Promise<Comment[]> => {
        return withCache(`comments_post_${postId}`, () => jsonApiInstance<Comment[]>(API_ENDPOINTS.COMMENTS_BY_POST(postId)));
    },
};