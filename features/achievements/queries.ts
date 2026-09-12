import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";

import type {
  Achievement,
  UserAchievement,
} from "@/types/achievement";

import type {
  AchievementQueryOptions,
  AchievementWithProgress,
  AchievementSummary,
} from "@/features/achievements/types";

export async function getAchievements(
  options: AchievementQueryOptions = {},
): Promise<Achievement[]> {
  const supabase = await createClient();

  let query = supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: true });

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  if (!options.includeSecret) {
    query = query.eq("is_secret", false);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Achievement[];
}

export async function getAchievementById(
  achievementId: string,
): Promise<Achievement | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", achievementId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Achievement | null;
}

export async function getUserAchievements(): Promise<
  UserAchievement[]
> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as UserAchievement[];
}

export async function getUserAchievement(
  achievementId: string,
): Promise<UserAchievement | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select("*")
    .eq("user_id", userId)
    .eq("achievement_id", achievementId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserAchievement | null;
}

export async function getAchievementsWithProgress(
  options: AchievementQueryOptions = {},
): Promise<AchievementWithProgress[]> {
  const achievements = await getAchievements(options);
  const userAchievements =
    await getUserAchievements();

  return achievements.map((achievement) => {
    const progress =
      userAchievements.find(
        (item) =>
          item.achievementId === achievement.id,
      ) ?? null;

    return {
      achievement,
      progress,
      unlocked: progress?.unlockedAt != null,
    };
  });
}

export async function getAchievementSummary(): Promise<
  AchievementSummary
> {
  const achievements = await getAchievements({
    includeSecret: true,
  });

  const userAchievements =
    await getUserAchievements();

  const unlocked = userAchievements.filter(
    (item) => item.unlockedAt != null,
  ).length;

  const total = achievements.length;

  return {
    total,
    unlocked,
    locked: Math.max(0, total - unlocked),
    completionPercentage:
      total === 0
        ? 0
        : Math.round((unlocked / total) * 100),
  };
}

export async function getUnlockedAchievements(): Promise<
  UserAchievement[]
> {
  const achievements =
    await getUserAchievements();

  return achievements.filter(
    (achievement) =>
      achievement.unlockedAt != null,
  );
}