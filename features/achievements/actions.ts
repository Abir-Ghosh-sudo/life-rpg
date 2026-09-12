"use server";

import {
  unlockAchievement,
  updateAchievementProgress,
} from "@/features/achievements/service";

export async function unlockAchievementAction(
  achievementId: string,
) {
  return unlockAchievement(achievementId);
}

export async function updateAchievementProgressAction(
  achievementId: string,
  currentValue: number,
) {
  return updateAchievementProgress(
    achievementId,
    currentValue,
  );
}