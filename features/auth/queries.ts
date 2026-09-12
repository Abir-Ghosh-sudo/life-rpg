import { createClient } from "@/lib/supabase/server";

import type { AuthUser } from "@/features/auth/types";

function mapAuthUser(user: {
  id: string;
  email?: string;
  email_confirmed_at?: string | null;
  created_at: string;
  updated_at?: string;
  user_metadata?: Record<string, unknown>;
}): AuthUser {
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

export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return mapAuthUser(user);
}

export async function getAuthSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}

export async function isUserAuthenticated(): Promise<boolean> {
  const user = await getAuthUser();
  return user !== null;
}

export async function getAuthUserId(): Promise<string | null> {
  const user = await getAuthUser();
  return user?.id ?? null;
}

export async function getCurrentUserId(): Promise<string | null> {
  return getAuthUserId();
}