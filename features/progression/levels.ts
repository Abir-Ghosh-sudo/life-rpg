import { LEVEL_CONFIG } from "@/config/levels";

export type LevelProgress = {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  xpRemaining: number;
  progressPercentage: number;
  isMaxLevel: boolean;
};

/**
 * Get the current level from total XP.
 */
export function calculateLevel(xp: number): number {
  return LEVEL_CONFIG.levelFromXp(Math.max(0, xp));
}

/**
 * Get the total XP required to reach a level.
 */
export function getLevelRequirement(level: number): number {
  return LEVEL_CONFIG.xpForLevel(level);
}

/**
 * Get complete progression information for a given XP amount.
 */
export function getLevelProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, Math.floor(xp));
  const level = calculateLevel(safeXp);

  const isMaxLevel = level >= LEVEL_CONFIG.maxLevel;
  const currentLevelXp = LEVEL_CONFIG.xpForLevel(level);

  if (isMaxLevel) {
    return {
      level,
      currentLevelXp,
      nextLevelXp: currentLevelXp,
      xpRemaining: 0,
      progressPercentage: 100,
      isMaxLevel: true,
    };
  }

  const nextLevelXp = LEVEL_CONFIG.xpForLevel(level + 1);
  const levelRange = nextLevelXp - currentLevelXp;
  const earnedInLevel = Math.max(0, safeXp - currentLevelXp);

  const progressPercentage =
    levelRange <= 0
      ? 100
      : Math.min(
          100,
          Math.max(0, (earnedInLevel / levelRange) * 100),
        );

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    xpRemaining: Math.max(0, nextLevelXp - safeXp),
    progressPercentage,
    isMaxLevel: false,
  };
}

/**
 * Check whether an XP change crosses a level boundary.
 */
export function hasReachedNewLevel(
  previousXp: number,
  newXp: number,
): boolean {
  return calculateLevel(newXp) > calculateLevel(previousXp);
}

/**
 * Get all levels crossed between two XP values.
 */
export function getLevelsCrossed(
  previousXp: number,
  newXp: number,
): number[] {
  const previousLevel = calculateLevel(previousXp);
  const newLevel = calculateLevel(newXp);

  if (newLevel <= previousLevel) {
    return [];
  }

  return Array.from(
    { length: newLevel - previousLevel },
    (_, index) => previousLevel + index + 1,
  );
}

/**
 * Check whether the player has reached the configured level cap.
 */
export function isMaxLevel(xp: number): boolean {
  return calculateLevel(xp) >= LEVEL_CONFIG.maxLevel;
}