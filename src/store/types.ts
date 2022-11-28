export type User = {
    id?: string;
    fullname?: string;
    password?: string;
    email?: string;
    profession?: string;
    favouritePizza?: string;
    consent?: boolean;
    token?: string;
};

export type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

export type ErrorResponse = {
    status: number;
    text: () => Promise<string>;
};

// export type UserResponse {
//     user: User
//     token: string
//   }

export type LoginRequest = {
    email: string;
    password: string;
};
