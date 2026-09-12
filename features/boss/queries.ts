import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type { Boss, BossProgress } from "@/types/boss";

/**
 * Get the currently active Daily Boss.
 */
export async function getActiveBoss(): Promise<Boss | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bosses")
    .select("*")
    .eq("is_active", true)
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get a boss by ID.
 */
export async function getBossById(
  bossId: string,
): Promise<Boss | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bosses")
    .select("*")
    .eq("id", bossId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get the authenticated user's progress for a boss.
 */
export async function getBossProgress(
  bossId: string,
): Promise<BossProgress | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("boss_progress")
    .select("*")
    .eq("boss_id", bossId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get the active boss together with the current user's progress.
 */
export async function getActiveBossWithProgress(): Promise<{
  boss: Boss;
  progress: BossProgress | null;
} | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: boss, error: bossError } = await supabase
    .from("bosses")
    .select("*")
    .eq("is_active", true)
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (bossError) {
    throw new Error(bossError.message);
  }

  if (!boss) {
    return null;
  }

  const { data: progress, error: progressError } =
    await supabase
      .from("boss_progress")
      .select("*")
      .eq("boss_id", boss.id)
      .eq("user_id", userId)
      .maybeSingle();

  if (progressError) {
    throw new Error(progressError.message);
  }

  return {
    boss,
    progress,
  };
}

/**
 * Get the authenticated user's boss history.
 */
export async function getBossHistory(): Promise<BossProgress[]> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("boss_progress")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}