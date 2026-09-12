import type { User } from "@supabase/supabase-js";

import type { ID, ISODateString } from "@/types/common";

export interface AuthUser {
  id: ID;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface UpdatePasswordInput {
  password: string;
  confirmPassword: string;
}

export interface UpdateAuthProfileInput {
  name?: string;
  avatarUrl?: string | null;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: AuthUser;
}

export interface SessionResult {
  user: AuthUser | null;
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number | null;
  } | null;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
}

export interface OAuthInput {
  provider: "google";
  redirectTo?: string;
}

export interface AuthCallbackResult {
  success: boolean;
  user?: AuthUser;
  message?: string;
}

export interface AuthServiceUser {
  supabaseUser: User;
  profile?: AuthUser | null;
}

export type AuthProvider = "email" | "google";