import { ApiUrls, users } from '../const';
import { User } from '../store/types';
import { RequestOptions } from './types';

type Res = Promise<{ ok: boolean; text: () => Promise<string> }>;

// Registered users
localStorage.setItem('db_users', JSON.stringify(users));

type Responsee = Promise<Response> & {
    status?: number;
    ok?: boolean;
    text: () => Promise<string>;
};

export function apiService(url: RequestInfo | URL, opts?: RequestOptions) {
    return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        setTimeout(handleRoute, 500);

        function handleRoute() {
            switch (url) {
                case ApiUrls.POST.LOGIN:
                    return authenticate();

                case ApiUrls.GET.USER_PROFILE:
                    return getUser();

                case ApiUrls.POST.EDIT_PROFILE:
                    return editProfile();

                default:
                    // pass through any requests not handled above
                    return fetch(url, opts)
                        .then((response) => resolve(response))
                        .catch((error) => reject(error));
            }
        }

        // route functions
        function authenticate() {
            const { email, password } = body();

            const dbUsers = getUsers();

            const user = dbUsers.find(
                (user) => user.email === email && user.password === password
            );

            if (!user) {
                return error(400, 'Username or password is incorrect');
            }

            return ok({
                id: user.id,
                fullname: user.fullname,
                password: user.password,
                profession: user.profession,
                favouritePizza: user.favouritePizza,
                consent: user.consent,
                token: 'fake-jwt-token',
            });
        }

        function editProfile() {
            if (!isAuthenticated()) {
                return resolve(error(401, 'Unauthorized'));
            }

            const { id, ...rest } = body();

            const dbUsers = getUsers();

            const updatedUsers = dbUsers.map((user) =>
                user.id === id ? { ...user, ...rest } : user
            );

            localStorage.setItem('db_users', JSON.stringify(updatedUsers));

            const updatedUser = updatedUsers.find((user) => user.id === id);

            return ok(updatedUser);
        }

        function getUser() {
            if (!isAuthenticated()) {
                return resolve(error(401, 'Unauthorized'));
            }

            try {
                const id = body();
                const users = getUsers();
                const user = users.find((user) => user.id === id);
                return ok(user);
            } catch (err) {
                return resolve(error(404, 'Not found'));
            }
        }

        // helper functions

        function ok<T>(body: T) {
            resolve({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(body)),
            });
        }

        function error(status: number, message: string) {
            return {
                status,
                text: () => Promise.resolve(JSON.stringify({ message })),
            };
        }

        function isAuthenticated(): boolean {
            return opts?.headers['Authorization'] === 'Bearer fake-jwt-token';
        }

        function body() {
            return opts?.body && JSON.parse(opts?.body as string);
        }

        function getUsers(): User[] {
            const dbUsers = localStorage.getItem('db_users');

            return dbUsers ? JSON.parse(dbUsers) : [];
        }
    });
}
