import type { Achievement } from "@/types/achievement";

export interface AchievementEvaluationContext {
  questsCompleted?: number;
  currentStreak?: number;
  level?: number;
  totalXp?: number;
  totalGold?: number;
  focusMinutes?: number;
  combo?: number;
  worldsCompleted?: number;
  bossesDefeated?: number;
}

export interface EvaluatedAchievement {
  achievement: Achievement;
  currentValue: number;
  targetValue: number;
  percentage: number;
  unlocked: boolean;
}

function getContextValue(
  requirementType: string,
  context: AchievementEvaluationContext,
): number {
  switch (requirementType) {
    case "quests_completed":
    case "quest_count":
      return context.questsCompleted ?? 0;

    case "streak":
    case "streak_days":
      return context.currentStreak ?? 0;

    case "level":
      return context.level ?? 1;

    case "xp":
    case "total_xp":
      return context.totalXp ?? 0;

    case "gold":
    case "total_gold":
      return context.totalGold ?? 0;

    case "focus_minutes":
    case "focus":
      return context.focusMinutes ?? 0;

    case "combo":
      return context.combo ?? 0;

    case "worlds_completed":
    case "world":
      return context.worldsCompleted ?? 0;

    case "bosses_defeated":
    case "boss":
      return context.bossesDefeated ?? 0;

    default:
      return 0;
  }
}

export function evaluateAchievement(
  achievement: Achievement,
  context: AchievementEvaluationContext,
): EvaluatedAchievement {
  const targetValue = Math.max(
    1,
    Number(achievement.value ?? 1),
  );

  const currentValue = Math.max(
    0,
    getContextValue(
      achievement.requirementType,
      context,
    ),
  );

  const percentage = Math.min(
    100,
    Math.round(
      (currentValue / targetValue) * 100,
    ),
  );

  return {
    achievement,
    currentValue,
    targetValue,
    percentage,
    unlocked: currentValue >= targetValue,
  };
}

export function evaluateAchievements(
  achievements: Achievement[],
  context: AchievementEvaluationContext,
): EvaluatedAchievement[] {
  return achievements
    .filter((achievement) => achievement.isActive)
    .map((achievement) =>
      evaluateAchievement(
        achievement,
        context,
      ),
    );
}

export function getCompletedAchievements(
  achievements: Achievement[],
  context: AchievementEvaluationContext,
): EvaluatedAchievement[] {
  return evaluateAchievements(
    achievements,
    context,
  ).filter(
    (result) => result.unlocked,
  );
}

export function getPendingAchievements(
  achievements: Achievement[],
  context: AchievementEvaluationContext,
): EvaluatedAchievement[] {
  return evaluateAchievements(
    achievements,
    context,
  ).filter(
    (result) => !result.unlocked,
  );
}