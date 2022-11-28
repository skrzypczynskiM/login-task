import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../api/fetch-wrapper";
import { API_URLS, localStorageKeys } from "../const";
import { LoginRequest, LoginResponse, UserState } from "./types";
import { history, lsDelete, lsRead, lsSave, showNotification } from "../utils";
import { User } from "../shared/types";

const name = "user";

function createInitialState(): UserState {
  const { userInfo, token } = lsRead<Pick<UserState, "userInfo" | "token">>(
    localStorageKeys.USER,
    {
      userInfo: null,
      token: null,
    }
  );

  // initialize state from local storage to enable user to stay logged in
  return {
    userInfo,
    token,
    loading: "idle",
    error: null,
  };
}

const editProfile = createAsyncThunk(
  `${name}/edit-profile`,
  async (user: User) =>
    await fetchWrapper.post(API_URLS.POST.EDIT_PROFILE, user)
);

const login = createAsyncThunk(
  `${name}/login`,
  async ({ email, password }: LoginRequest) =>
    await fetchWrapper.post(API_URLS.POST.LOGIN, {
      email,
      password,
    })
);

const userSlice = createSlice({
  name,
  initialState: createInitialState(),
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      lsDelete(localStorageKeys.USER);
      history.navigate?.("/login");
    },
  },
  extraReducers: (builder) => {
    // --- login ---
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const { token, userInfo } = action.payload;
        state.loading = "succeeded";
        state.error = null;
        state.token = token;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        lsSave(localStorageKeys.USER, action.payload);
        state.userInfo = userInfo;

        // get return url from location state or default to home page
        const { from } = history.location?.state || {
          from: { pathname: "/profile" },
        };
        history.navigate?.(from);
      }
    );

    builder.addCase(login.rejected, (state, action) => {
      showNotification("error", action?.error?.message as string);

      state.loading = "failed";
      state.error = action.error;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = "pending";
    });

    // --- edit profile ---
    builder.addCase(
      editProfile.fulfilled,
      (state, action: PayloadAction<User>) => {
        showNotification("success", "Data updated successfully!");

        state.userInfo = action.payload;
        state.loading = "succeeded";
        state.error = null;

        lsSave(localStorageKeys.USER, {
          userInfo: action.payload,
          token: state.token,
        });
        history.navigate?.("/profile");
      }
    );

    builder.addCase(editProfile.rejected, (state, action) => {
      showNotification("error", "Something went wrong");
      state.loading = "failed";
      state.error = action.error;
    });

    builder.addCase(editProfile.pending, (state) => {
      state.loading = "pending";
    });
  },
});

export const userReducer = userSlice.reducer;

export const userActions = {
  ...userSlice.actions,
  editProfile,
  login,
};
