import type { Achievement } from "@/types/achievement";
import { ACHIEVEMENT_CONFIG } from "@/config/achievements";

/**
 * Return all configured achievement definitions.
 */
export function getAchievementDefinitions(): Achievement[] {
  return ACHIEVEMENT_CONFIG.map((achievement) => ({
    ...achievement,
  })) as Achievement[];
}

/**
 * Get an achievement definition by ID.
 */
export function getAchievementDefinition(
  achievementId: string,
): Achievement | null {
  const achievement = ACHIEVEMENT_CONFIG.find(
    (item) => item.id === achievementId,
  );

  return achievement
    ? (achievement as Achievement)
    : null;
}

/**
 * Get an achievement definition by its unique code.
 */
export function getAchievementByCode(
  code: string,
): Achievement | null {
  const achievement = ACHIEVEMENT_CONFIG.find(
    (item) => item.code === code,
  );

  return achievement
    ? (achievement as Achievement)
    : null;
}

/**
 * Get only secret achievements.
 */
export function getSecretAchievements(): Achievement[] {
  return ACHIEVEMENT_CONFIG
    .filter((achievement) => achievement.isSecret)
    .map((achievement) => ({
      ...achievement,
    })) as Achievement[];
}

/**
 * Get only active achievements.
 */
export function getActiveAchievements(): Achievement[] {
  return ACHIEVEMENT_CONFIG
    .filter((achievement) => achievement.isActive)
    .map((achievement) => ({
      ...achievement,
    })) as Achievement[];
}

/**
 * Check whether an achievement exists.
 */
export function achievementExists(
  achievementId: string,
): boolean {
  return ACHIEVEMENT_CONFIG.some(
    (achievement) => achievement.id === achievementId,
  );
}