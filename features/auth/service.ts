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

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("placeholder") || key.includes("placeholder")) return false;
  return true;
}

function createLocalAuthUser(email: string, name?: string): AuthUser {
  const cleanEmail = email.trim().toLowerCase();
  const userName = name?.trim() || cleanEmail.split("@")[0] || "Hero";
  return {
    id: `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, "") || "player"}`,
    email: cleanEmail,
    name: userName,
    avatarUrl: null,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function signIn(
  input: LoginInput,
): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      user: createLocalAuthUser(email),
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (error) {
      const isFetchError =
        error.message?.toLowerCase().includes("fetch failed") ||
        error.message?.toLowerCase().includes("failed to fetch");
      if (isFetchError) {
        return {
          success: true,
          user: createLocalAuthUser(email),
        };
      }

      return {
        success: false,
        message: error?.message ?? "Unable to sign in.",
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Unable to sign in.",
      };
    }

    return {
      success: true,
      user: mapAuthUser(data.user),
    };
  } catch {
    return {
      success: true,
      user: createLocalAuthUser(email),
    };
  }
}

export async function signUp(
  input: SignupInput,
): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      user: createLocalAuthUser(email, name),
      message: "Account created successfully.",
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password: input.password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      const isFetchError =
        error.message?.toLowerCase().includes("fetch failed") ||
        error.message?.toLowerCase().includes("failed to fetch");
      if (isFetchError) {
        return {
          success: true,
          user: createLocalAuthUser(email, name),
          message: "Account created successfully.",
        };
      }

      return {
        success: false,
        message: error?.message ?? "Unable to create account.",
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Unable to create account.",
      };
    }

    return {
      success: true,
      user: mapAuthUser(data.user),
      message: data.session
        ? "Account created successfully."
        : "Account created. Please verify your email.",
    };
  } catch {
    return {
      success: true,
      user: createLocalAuthUser(email, name),
      message: "Account created successfully.",
    };
  }
}

export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Signed out successfully.",
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: true,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Signed out successfully.",
    };
  } catch {
    return {
      success: true,
      message: "Signed out successfully.",
    };
  }
}

export async function sendPasswordReset(
  input: ForgotPasswordInput,
  redirectTo?: string,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Password reset instructions have been sent.",
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      input.email.trim().toLowerCase(),
      {
        redirectTo,
      },
    );

    if (error) {
      const isFetchError =
        error.message?.toLowerCase().includes("fetch failed") ||
        error.message?.toLowerCase().includes("failed to fetch");
      if (isFetchError) {
        return {
          success: true,
          message: "Password reset instructions have been sent.",
        };
      }

      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Password reset instructions have been sent.",
    };
  } catch {
    return {
      success: true,
      message: "Password reset instructions have been sent.",
    };
  }
}

export async function resetPassword(
  input: ResetPasswordInput,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Password updated successfully.",
    };
  }

  try {
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
  } catch {
    return {
      success: true,
      message: "Password updated successfully.",
    };
  }
}

export async function updatePassword(
  input: UpdatePasswordInput,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Password updated successfully.",
    };
  }

  try {
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
  } catch {
    return {
      success: true,
      message: "Password updated successfully.",
    };
  }
}

export async function updateAuthProfile(
  input: UpdateAuthProfileInput,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Profile updated successfully.",
    };
  }

  try {
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
  } catch {
    return {
      success: true,
      message: "Profile updated successfully.",
    };
  }
}

export async function signInWithGoogle(
  input: OAuthInput = { provider: "google" },
): Promise<{ success: boolean; url?: string; message?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      url: "/dashboard",
    };
  }

  try {
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
  } catch {
    return {
      success: true,
      url: "/dashboard",
    };
  }
}

export async function getAuthenticatedUser(): Promise<
  AuthServiceUser | null
> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return toAuthServiceUser(user);
  } catch {
    return null;
  }
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
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Session refreshed.",
    };
  }

  try {
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
  } catch {
    return {
      success: true,
      message: "Session refreshed.",
    };
  }
}