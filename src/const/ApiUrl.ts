export const ApiUrls = Object.freeze({
    POST: {
        LOGIN: `${process.env.REACT_APP_API_URL}/api/users/authenticate`,
        // LOGOUT: `${process.env.REACT_APP_API_URL}/api/users/logout`,
        EDIT_PROFILE: `${process.env.REACT_APP_API_URL}/api/users/edit-profile`,
    },

    GET: {
        USER_PROFILE: `${process.env.REACT_APP_API_URL}/users/user-profile`,
    },
} as const);
