import { API_URLS, JWT_TOKEN, localStorageKeys } from "../const";
import { User } from "../shared/types";
import { lsSave, lsRead } from "../utils";
import { RequestOptions } from "./types";

export function apiService(url: RequestInfo | URL, opts?: RequestOptions) {
  return new Promise((resolve, reject) => {
    // wrap in timeout to simulate server api call
    setTimeout(handleRoute, 500);

    function handleRoute() {
      switch (url) {
        case API_URLS.POST.LOGIN:
          return authenticate();

        case API_URLS.POST.EDIT_PROFILE:
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
        return error(400, "Username or password is incorrect");
      }

      return ok({
        userInfo: { ...user },
        token: JWT_TOKEN,
      });
    }

    function editProfile() {
      if (!isAuthenticated()) {
        return resolve(error(401, "Unauthorized"));
      }

      const { id, ...rest } = body();
      const dbUsers = getUsers();

      const updatedUsers = dbUsers.map((user) =>
        user.id === id ? { ...user, ...rest } : user
      );

      lsSave(localStorageKeys.DB_USERS, updatedUsers);
      const updatedUser = updatedUsers.find((user) => user.id === id);

      return ok(updatedUser);
    }

    // helper functions
    function ok<T>(body: T) {
      resolve({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(body)),
      });
    }

    function error(status: number, message: string) {
      resolve({
        status,
        text: () => Promise.resolve(JSON.stringify({ message })),
      });
    }

    function isAuthenticated(): boolean {
      return opts?.headers["Authorization"] === `Bearer ${JWT_TOKEN}`;
    }

    function body() {
      return opts?.body && JSON.parse(opts?.body as string);
    }

    function getUsers(): User[] | [] {
      return lsRead(localStorageKeys.DB_USERS, []);
    }
  });
}
