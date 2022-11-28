import { SerializedError } from "@reduxjs/toolkit";
import { User } from "../shared/types";

export type Status = "idle" | "pending" | "succeeded" | "failed";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  userInfo: User;
  token: string;
};

export type EditProfileRequest = Partial<User>;

type ErrorResponse =
  | SerializedError
  | {
      message: "string";
    };

export type UserState = {
  userInfo: User | null;
  loading: Status;
  error: ErrorResponse | null;
  token: string | null;
};
