import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../api/fetch-wrapper';
import { API_URLS } from '../const';
import { LoginRequest, LoginResponse, Status } from './types';
import { history, lsDelete, lsRead, lsSave } from '../utils';
import { User } from '../shared/types';

type UserState = {
    userInfo: User | null;
    loading: Status;
    error: any;
    token: string | null;
};

const name = 'user';

function createInitialState(): UserState {
    const { userInfo, token } = lsRead<Pick<UserState, 'userInfo' | 'token'>>(
        'user',
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
    async () => await fetchWrapper.get(API_URLS.GET.USER_PROFILE)
);

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

            lsDelete('user');
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
                lsSave('user', action.payload);

                state.userInfo = userInfo;

                // get return url from location state or default to home page
                const { from } = history.location?.state || {
                    from: { pathname: '/profile' },
                };
                history.navigate?.(from);
            }
        );

        builder.addCase(login.rejected, (state, action) => {
            console.log('action: ', action);
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

                lsSave('user', {
                    userInfo: action.payload,
                    token: state.token,
                });
                history.navigate?.('/profile');
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
