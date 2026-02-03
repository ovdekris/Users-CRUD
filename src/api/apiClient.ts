import { API_BASE_URL } from '../utils/constants';

class ApiError extends Error {
    constructor(public response: Response) {
        super("ApiError: " + response.status);
    }
}

export const jsonApiInstance = async <T>(
    url: string,
    init?: RequestInit & { json?: unknown }
) => {
    let headers: HeadersInit = init?.headers ?? {};

    if (init?.json) {
        headers = {
            ...headers,
            'Content-Type': 'application/json',
        };
        init.body = JSON.stringify(init.json);
    }

    const result = await fetch(`${API_BASE_URL}${url}`, {
        ...init,
        headers,
    });

    if (!result.ok) {
        throw new ApiError(result);
    }

    const data = (await result.json()) as T;

    return data;
};

export { ApiError };