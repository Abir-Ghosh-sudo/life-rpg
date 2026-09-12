import type { UUID, ISODateString } from "@/types/common";

export type AuthProvider = "email" | "google";

export type UserRole = "user" | "admin";

export type AuthUser = {
  id: UUID;
  email: string;
  role: UserRole;
  provider: AuthProvider;
  createdAt: ISODateString;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type GoogleAuthResult = {
  provider: "google";
  redirectUrl?: string;
};

export type AuthSession = {
  user: AuthUser;
  accessToken?: string;
  expiresAt?: number;
};

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_ALREADY_EXISTS"
  | "EMAIL_NOT_VERIFIED"
  | "SESSION_EXPIRED"
  | "UNAUTHORIZED"
  | "UNKNOWN_ERROR";

export type AuthError = {
  code: AuthErrorCode;
  message: string;
};

export type AuthActionResult =
  | {
      success: true;
      data?: AuthSession;
    }
  | {
      success: false;
      error: AuthError;
    };

export type PasswordResetInput = {
  email: string;
};

export type UpdatePasswordInput = {
  password: string;
  confirmPassword: string;
};