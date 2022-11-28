import { store, usersActions } from '../store';
import { apiService } from './apiService';
import { ExtendedHeaders, HTTP_METHOD, RequestOptions } from './types';

function request(method: HTTP_METHOD) {
    return (url: string, body?: unknown) => {
        const requestOptions: RequestOptions = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }

        // @ts-expect-error
        return apiService(url, requestOptions).then(handleResponse);
    };
}

// return auth header with jwt if user is logged in and request is to the api url
function authHeader(url: string): ExtendedHeaders {
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL as string);

    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken(): string | null {
    return store.getState().user.token;
}

function handleResponse(response: Response) {
    return response.text().then((text) => {
        const dataFromAPi = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                store.dispatch(usersActions.logout());
            }

            const error =
                (dataFromAPi && dataFromAPi.message) || response.statusText;
            return Promise.reject(error);
        }

        return dataFromAPi;
    });
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
};
