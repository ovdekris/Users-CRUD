//URL
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

//Endpointy
export const API_ENDPOINTS = {
    USERS: '/users',
    POST: '/posts',
    COMMENTS: '/comments',
    USER_BY_ID: (id: number) => `/users/${id}`,
    POST_BY_USER: (userId: number) => `/posts?userId=${userId}`,
    COMMENTS_BY_POST: (postId: number) => `/comments?postId=${postId}`
} as const;

//Routes
export const ROUTES = {
    HOME: '/',
    USER_POSTS: (userId: number) => `/users/${userId}/posts`,
    USER_POSTS_PATTERN: '/users/:id/posts',
} as const;

//Messages
export const MESSAGES = {
    SUCCESS: {
        USER_CREATED: 'Congratulations! The user has been added',
        USER_UPDATED: 'Congratulations! The user has been updated',
        USER_DELETED: 'Congratulations! The user has been deleted',
    },
    ERROR: {
        FETCH_FAILED: 'Failed to fetch data',
        CREATE_FAILED: 'Failed to add the user',
        UPDATE_FAILED: 'Failed to update the user',
        DELETE_FAILED: 'Failed to delete the user',
        SERVER_ERROR: 'Server connection error',
    },
    LOADING: {
        FETCHING: 'Loading...'
    }
} as const;

//Regex for validation
export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\d\s\-\(\)\.x]+$/,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 100
} as const;

//Cache
export const CACHE_CONFIG = {
    USERS_KEY: 'cached_users',
    POSTS_KEY: 'cached_posts',
    COMMENTS_KEY: 'cached_comments',
    EXPIRY_TIME: 1000 * 60 * 30,
} as const;