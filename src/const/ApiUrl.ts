export const API_URLS = Object.freeze({
  POST: {
    LOGIN: `${process.env.REACT_APP_API_URL}/api/users/authenticate`,
    EDIT_PROFILE: `${process.env.REACT_APP_API_URL}/api/users/edit-profile`,
  },
} as const);
