export type User = {
    id: string;
    fullname: string;
    password: string;
    email: string;
    profession: string;
    favouritePizza: string;
    consent: boolean;
};

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
