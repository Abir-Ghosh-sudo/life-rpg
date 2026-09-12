import type { UserAchievement } from "@/types/achievement";
import type { AchievementProgressUpdate } from "@/features/achievements/types";

export function calculateAchievementProgress(
  currentValue: number,
  targetValue: number,
): AchievementProgressUpdate["percentage"] {
  const safeCurrent = Math.max(0, currentValue);
  const safeTarget = Math.max(1, targetValue);

  return Math.min(
    100,
    Math.round((safeCurrent / safeTarget) * 100),
  );
}

export function buildAchievementProgress(
  achievementId: string,
  currentValue: number,
  targetValue: number,
): AchievementProgressUpdate {
  const safeCurrent = Math.max(0, currentValue);
  const safeTarget = Math.max(1, targetValue);

  return {
    achievementId,
    currentValue: safeCurrent,
    targetValue: safeTarget,
    percentage: calculateAchievementProgress(
      safeCurrent,
      safeTarget,
    ),
    unlocked: safeCurrent >= safeTarget,
  };
}

export function isAchievementUnlocked(
  achievement: UserAchievement | null,
): boolean {
  return achievement?.unlockedAt != null;
}

export function getAchievementCurrentValue(
  achievement: UserAchievement | null,
): number {
  return Math.max(
    0,
    achievement?.currentValue ?? 0,
  );
}

export function getAchievementPercentage(
  achievement: UserAchievement | null,
  targetValue: number,
): number {
  return calculateAchievementProgress(
    getAchievementCurrentValue(achievement),
    targetValue,
  );
}

export function hasAchievementProgress(
  achievement: UserAchievement | null,
): boolean {
  return getAchievementCurrentValue(achievement) > 0;
}

export function getRemainingAchievementValue(
  achievement: UserAchievement | null,
  targetValue: number,
): number {
  return Math.max(
    0,
    targetValue -
      getAchievementCurrentValue(achievement),
  );
}