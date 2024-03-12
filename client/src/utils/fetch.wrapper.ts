import { useAuthStore } from '@/store/auth.store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return async (url: any, body?: any) => {
        const requestOptions: { method: string, headers: { [key: string]: string }, body?: any } = {
            method,
            headers: { ...authHeader(url), Authorization: 'Bearer ' + useAuthStore().token?.serviceToken || '' }
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { token } = useAuthStore();
    const isLoggedIn = !!token?.serviceToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token.serviceToken}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const { token, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && token?.serviceToken) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}    