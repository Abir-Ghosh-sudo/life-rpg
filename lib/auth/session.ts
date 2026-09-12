import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getSessionUser();

  return user?.id ?? null;
}

export async function requireSessionUser() {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function requireUserId(): Promise<string> {
  const user = await requireSessionUser();

  return user.id;
}