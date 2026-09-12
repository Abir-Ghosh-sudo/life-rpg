import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getAchievementById,
  getUserAchievement,
} from "@/features/achievements/queries";

import type {
  UserAchievement,
} from "@/types/achievement";

import type {
  AchievementUnlockResult,
} from "@/features/achievements/types";

export async function unlockAchievement(
  achievementId: string,
): Promise<AchievementUnlockResult> {
  const userId = await requireUserId();

  const achievement =
    await getAchievementById(achievementId);

  if (!achievement) {
    return {
      success: false,
      message: "Achievement not found.",
    };
  }

  if (achievement.isActive === false) {
    return {
      success: false,
      message: "This achievement is inactive.",
    };
  }

  const existing =
    await getUserAchievement(achievementId);

  if (existing?.unlockedAt) {
    return {
      success: true,
      achievement,
      userAchievement: existing,
      message: "Achievement is already unlocked.",
    };
  }

  const supabase = await createClient();
  const now = new Date().toISOString();

  if (existing) {
    const { data, error } = await supabase
      .from("user_achievements")
      .update({
        unlocked_at: now,
        current_value: achievement.requirementValue ?? achievement.value ?? 1,
      })
      .eq("user_id", userId)
      .eq("achievement_id", achievementId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      achievement,
      userAchievement:
        data as UserAchievement,
      message: "Achievement unlocked!",
    };
  }

  const { data, error } = await supabase
    .from("user_achievements")
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      current_value: achievement.requirementValue ?? achievement.value ?? 1,
      unlocked_at: now,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    achievement,
    userAchievement:
      data as UserAchievement,
    message: "Achievement unlocked!",
  };
}

export async function updateAchievementProgress(
  achievementId: string,
  currentValue: number,
): Promise<UserAchievement> {
  const userId = await requireUserId();

  const achievement =
    await getAchievementById(achievementId);

  if (!achievement) {
    throw new Error("Achievement not found.");
  }

  const safeValue = Math.max(
    0,
    Math.floor(currentValue),
  );

  const targetValue = Math.max(
    1,
    Number(achievement.requirementValue ?? achievement.value ?? 1),
  );

  const unlocked =
    safeValue >= targetValue;

  const supabase = await createClient();

  const existing =
    await getUserAchievement(achievementId);

  const updateData = {
    current_value: safeValue,
    ...(unlocked && !existing?.unlockedAt
      ? {
          unlocked_at:
            new Date().toISOString(),
        }
      : {}),
  };

  if (existing) {
    const { data, error } = await supabase
      .from("user_achievements")
      .update(updateData)
      .eq("user_id", userId)
      .eq("achievement_id", achievementId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserAchievement;
  }

  const { data, error } = await supabase
    .from("user_achievements")
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      current_value: safeValue,
      ...(unlocked
        ? {
            unlocked_at:
              new Date().toISOString(),
          }
        : {}),
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserAchievement;
}