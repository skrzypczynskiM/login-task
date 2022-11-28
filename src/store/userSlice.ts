import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../api/fetch-wrapper';
import { ApiUrls } from '../const';
import { LoginRequest, Status, User } from './types';
import { history } from '../utils';

interface UserState {
    user: User | null;
    loading: Status;
    error: any;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    loading: 'idle',
    error: null,
    token: null,
};

const name = 'user';

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
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.navigate?.('/login');
        },
    },
    extraReducers: (builder) => {
        // --- login ---
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<LoginRequest>) => {
                const user = action.payload;
                state.loading = 'succeeded';
                state.error = null;

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                const { from } = history.location?.state || {
                    from: { pathname: '/' },
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
                state.user = action.payload;
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
                console.log('action.payload: ', action.payload);
                state.user = action.payload;
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

export const usersActions = {
    ...userSlice.actions,
    editProfile,
    getUser,
    login,
};
