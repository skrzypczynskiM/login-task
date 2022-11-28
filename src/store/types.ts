import { User } from '../shared/types';

export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

export type ErrorResponse = {
    status: number;
    text: () => Promise<string>;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    userInfo: User;
    token: string;
};

export type EditProfileRequest = Partial<User>;

export type UserState = {
    userInfo: User | null;
    loading: Status;
    error: any;
    token: string | null;
};
