import { LEVEL_CONFIG } from "@/config/levels";
import type { XpSource } from "@/types/progression";

/**
 * XP reward input.
 */
export type XpRewardInput = {
  baseXp: number;
  multiplier?: number;
  bonusXp?: number;
};

/**
 * Calculate final XP from a base reward.
 */
export function calculateXpReward(input: XpRewardInput): number {
  const baseXp = Math.max(0, input.baseXp);
  const multiplier = Math.max(0, input.multiplier ?? 1);
  const bonusXp = Math.max(0, input.bonusXp ?? 0);

  return Math.max(
    0,
    Math.round(baseXp * multiplier + bonusXp),
  );
}

/**
 * Add XP to the current XP total.
 */
export function addXp(
  currentXp: number,
  earnedXp: number,
): number {
  return Math.max(
    0,
    Math.floor(currentXp) + Math.max(0, Math.floor(earnedXp)),
  );
}

/**
 * Get the level for a given XP amount.
 */
export function getLevelFromXp(xp: number): number {
  return LEVEL_CONFIG.levelFromXp(Math.max(0, xp));
}

/**
 * Get XP required to reach a specific level.
 */
export function getXpRequiredForLevel(level: number): number {
  return LEVEL_CONFIG.xpForLevel(level);
}

/**
 * Get the XP required for the next level.
 */
export function getXpForNextLevel(currentLevel: number): number {
  return getXpRequiredForLevel(currentLevel + 1);
}

/**
 * Get XP progress within the current level.
 */
export function getCurrentLevelXp(
  xp: number,
  level: number,
): number {
  const currentLevelXp = getXpRequiredForLevel(level);

  return Math.max(0, xp - currentLevelXp);
}

/**
 * Get remaining XP before the next level.
 */
export function getXpRemaining(
  xp: number,
  level: number,
): number {
  const nextLevelXp = getXpForNextLevel(level);

  return Math.max(0, nextLevelXp - Math.max(0, xp));
}

/**
 * Get progress percentage toward the next level.
 */
export function getXpProgressPercentage(
  xp: number,
  level: number,
): number {
  const currentLevelXp = getXpRequiredForLevel(level);
  const nextLevelXp = getXpForNextLevel(level);
  const levelRange = nextLevelXp - currentLevelXp;

  if (levelRange <= 0) {
    return 100;
  }

  const progress = ((xp - currentLevelXp) / levelRange) * 100;

  return Math.min(100, Math.max(0, progress));
}

/**
 * Determine whether an XP gain causes a level-up.
 */
export function didLevelUp(
  previousXp: number,
  newXp: number,
): boolean {
  return getLevelFromXp(newXp) > getLevelFromXp(previousXp);
}

/**
 * Get the number of levels gained from an XP change.
 */
export function getLevelsGained(
  previousXp: number,
  newXp: number,
): number {
  return Math.max(
    0,
    getLevelFromXp(newXp) - getLevelFromXp(previousXp),
  );
}

/**
 * Calculate XP gained from a reward source.
 */
export function calculateSourceXp(
  source: XpSource,
  baseXp: number,
): number {
  if (baseXp <= 0) {
    return 0;
  }

  switch (source) {
    case "quest":
    case "daily_challenge":
    case "boss":
    case "focus":
    case "achievement":
    case "random_event":
    case "system":
      return Math.floor(baseXp);

    default:
      return 0;
  }
}