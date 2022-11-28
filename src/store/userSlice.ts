import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../api/fetch-wrapper';
import { ApiUrls } from '../const';
import { LoginRequest, LoginResponse, Status, User } from './types';
import { history, lsDelete, lsRead, lsSave } from '../utils';

type UserState = {
    userInfo: User | null;
    loading: Status;
    error: any;
    token: string | null;
};

const name = 'user';

function createInitialState(): UserState {
    const { userInfo, token } = lsRead<Pick<UserState, 'userInfo' | 'token'>>(
        'userInfo',
        {
            userInfo: null,
            token: null,
        }
    );

    return {
        // initialize state from local storage to enable user to stay logged in
        userInfo,
        token,
        loading: 'idle',
        error: null,
    };
}

const getUser = createAsyncThunk(
    `${name}/getUser`,
    async () => await fetchWrapper.get(ApiUrls.GET.USER_PROFILE)
);

const editProfile = createAsyncThunk(
    `${name}/edit-profile`,
    async (user: User) =>
        await fetchWrapper.post(ApiUrls.POST.EDIT_PROFILE, user)
);

const login = createAsyncThunk(
    `${name}/login`,
    async ({ email, password }: LoginRequest) =>
        await fetchWrapper.post(ApiUrls.POST.LOGIN, {
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

            lsDelete('userInfo');
            history.navigate?.('/login');
        },
    },
    extraReducers: (builder) => {
        // --- login ---
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<LoginResponse>) => {
                const { token, userInfo } = action.payload;
                state.loading = 'succeeded';
                state.error = null;
                state.token = token;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                lsSave('userInfo', action.payload);

                state.userInfo = userInfo;

                // get return url from location state or default to home page
                const { from } = history.location?.state || {
                    from: { pathname: '/profile' },
                };
                history.navigate?.(from);
            }
        );

        builder.addCase(login.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error;
        });

        builder.addCase(login.pending, (state) => {
            state.loading = 'pending';
        });

        // --- get user ---
        builder.addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.userInfo = action.payload;
                state.loading = 'succeeded';
                state.error = null;
            }
        );

        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error;
        });

        builder.addCase(getUser.pending, (state) => {
            state.loading = 'pending';
        });

        // --- edit profile ---
        builder.addCase(
            editProfile.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.userInfo = action.payload;
                state.loading = 'succeeded';
                state.error = null;
            }
        );

        builder.addCase(editProfile.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error;
        });

        builder.addCase(editProfile.pending, (state) => {
            state.loading = 'pending';
        });
    },
});

export const userReducer = userSlice.reducer;

export const userActions = {
    ...userSlice.actions,
    editProfile,
    getUser,
    login,
};
