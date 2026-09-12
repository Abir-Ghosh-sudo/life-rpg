import type { Achievement } from "@/types/achievement";
import { ACHIEVEMENT_CONFIG } from "@/config/achievements";

const STATIC_TIMESTAMP = "2024-01-01T00:00:00.000Z";

function getAllConfigs(): Achievement[] {
  return Object.entries(ACHIEVEMENT_CONFIG).map(([key, item]) => ({
    id: key,
    code: key,
    ...item,
    isSecret: item.hidden,
    isActive: true,
    value: item.requirementValue,
    createdAt: STATIC_TIMESTAMP,
    updatedAt: STATIC_TIMESTAMP,
  })) as Achievement[];
}

/**
 * Return all configured achievement definitions.
 */
export function getAchievementDefinitions(): Achievement[] {
  return getAllConfigs();
}

/**
 * Get an achievement definition by ID.
 */
export function getAchievementDefinition(
  achievementId: string,
): Achievement | null {
  const achievements = getAllConfigs();
  const achievement = achievements.find(
    (item) => item.id === achievementId || item.code === achievementId,
  );

  return achievement ?? null;
}

/**
 * Get an achievement definition by its unique code.
 */
export function getAchievementByCode(
  code: string,
): Achievement | null {
  const achievements = getAllConfigs();
  const achievement = achievements.find(
    (item) => item.code === code || item.id === code,
  );

  return achievement ?? null;
}

/**
 * Get only secret achievements.
 */
export function getSecretAchievements(): Achievement[] {
  return getAllConfigs().filter((achievement) => achievement.isSecret || achievement.hidden);
}

/**
 * Get only active achievements.
 */
export function getActiveAchievements(): Achievement[] {
  return getAllConfigs().filter((achievement) => achievement.isActive !== false);
}

/**
 * Check whether an achievement exists.
 */
export function achievementExists(
  achievementId: string,
): boolean {
  return getAllConfigs().some(
    (achievement) => achievement.id === achievementId || achievement.code === achievementId,
  );
}