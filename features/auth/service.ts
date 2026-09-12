import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type {
  AuthResult,
  AuthServiceUser,
  AuthUser,
  ForgotPasswordInput,
  LoginInput,
  OAuthInput,
  ResetPasswordInput,
  SignupInput,
  UpdateAuthProfileInput,
  UpdatePasswordInput,
} from "@/features/auth/types";

function mapAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    name:
      typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : null,
    avatarUrl:
      typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null,
    emailVerified: Boolean(user.email_confirmed_at),
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? user.created_at,
  };
}

function toAuthServiceUser(user: User): AuthServiceUser {
  return {
    supabaseUser: user,
    profile: mapAuthUser(user),
  };
}

export async function signIn(
  input: LoginInput,
): Promise<AuthResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to sign in.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
  };
}

export async function signUp(
  input: SignupInput,
): Promise<AuthResult> {
  const supabase = await createClient();

  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to create account.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
    message: data.session
      ? "Account created successfully."
      : "Account created. Please verify your email.",
  };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Signed out successfully.",
  };
}

export async function sendPasswordReset(
  input: ForgotPasswordInput,
  redirectTo?: string,
): Promise<AuthResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    input.email.trim().toLowerCase(),
    {
      redirectTo,
    },
  );

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Password reset instructions have been sent.",
  };
}

export async function resetPassword(
  input: ResetPasswordInput,
): Promise<AuthResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: input.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to reset password.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
    message: "Password updated successfully.",
  };
}

export async function updatePassword(
  input: UpdatePasswordInput,
): Promise<AuthResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: input.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to update password.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
    message: "Password updated successfully.",
  };
}

export async function updateAuthProfile(
  input: UpdateAuthProfileInput,
): Promise<AuthResult> {
  const supabase = await createClient();

  const metadata: Record<string, unknown> = {};

  if (input.name !== undefined) {
    metadata.name = input.name.trim();
  }

  if (input.avatarUrl !== undefined) {
    metadata.avatar_url = input.avatarUrl;
  }

  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to update profile.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
    message: "Profile updated successfully.",
  };
}

export async function signInWithGoogle(
  input: OAuthInput = { provider: "google" },
): Promise<{ success: boolean; url?: string; message?: string }> {
  const supabase = await createClient();

  const redirectTo =
    input.redirectTo ??
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    return {
      success: false,
      message: error?.message ?? "Unable to start Google sign in.",
    };
  }

  return {
    success: true,
    url: data.url,
  };
}

export async function getAuthenticatedUser(): Promise<
  AuthServiceUser | null
> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return toAuthServiceUser(user);
}

export async function getAuthenticatedUserOrThrow(): Promise<
  AuthServiceUser
> {
  const result = await getAuthenticatedUser();

  if (!result) {
    throw new Error("UNAUTHORIZED");
  }

  return result;
}

export async function getCurrentAuthUser(): Promise<AuthUser | null> {
  const result = await getAuthenticatedUser();

  return result?.profile ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAuthenticatedUser()) !== null;
}

export async function refreshSession(): Promise<AuthResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.refreshSession();

  if (error || !data.user) {
    return {
      success: false,
      message: error?.message ?? "Unable to refresh session.",
    };
  }

  return {
    success: true,
    user: mapAuthUser(data.user),
  };
}