import { ACHIEVEMENT_CONFIG } from "@/config/achievements";
import { LEVEL_CONFIG } from "@/config/levels";

export type ProgressionMilestone = {
  type: "level" | "xp" | "streak" | "gold" | "combo";
  value: number;
  reached: boolean;
};

export const LEVEL_MILESTONES = [5, 10, 25, 50, 75, 100] as const;

export const XP_MILESTONES = [
  100,
  500,
  1_000,
  5_000,
  10_000,
  50_000,
] as const;

export const STREAK_MILESTONES = [
  3,
  7,
  14,
  30,
  60,
  100,
] as const;

export const GOLD_MILESTONES = [
  100,
  500,
  1_000,
  5_000,
  10_000,
] as const;

export const COMBO_MILESTONES = [
  2,
  5,
  10,
  20,
] as const;

/**
 * Check whether a value has reached a milestone.
 */
export function hasReachedMilestone(
  value: number,
  milestone: number,
): boolean {
  return (
    Number.isFinite(value) &&
    Number.isFinite(milestone) &&
    value >= milestone
  );
}

/**
 * Return all milestones reached by a value.
 */
export function getReachedMilestones(
  value: number,
  milestones: readonly number[],
): number[] {
  const safeValue = Math.max(0, value);

  return milestones.filter(
    (milestone) => safeValue >= milestone,
  );
}

/**
 * Return the next milestone that has not been reached.
 */
export function getNextMilestone(
  value: number,
  milestones: readonly number[],
): number | null {
  const safeValue = Math.max(0, value);

  return (
    milestones.find(
      (milestone) => milestone > safeValue,
    ) ?? null
  );
}

/**
 * Get the next level milestone.
 */
export function getNextLevelMilestone(
  level: number,
): number | null {
  return getNextMilestone(
    level,
    LEVEL_MILESTONES.filter(
      (milestone) =>
        milestone <= LEVEL_CONFIG.maxLevel,
    ),
  );
}

/**
 * Get progression milestones for a character.
 */
export function getProgressionMilestones(input: {
  level: number;
  xp: number;
  gold: number;
  streak: number;
  combo: number;
}): ProgressionMilestone[] {
  return [
    ...LEVEL_MILESTONES.map((value) => ({
      type: "level" as const,
      value,
      reached: hasReachedMilestone(
        input.level,
        value,
      ),
    })),
    ...XP_MILESTONES.map((value) => ({
      type: "xp" as const,
      value,
      reached: hasReachedMilestone(
        input.xp,
        value,
      ),
    })),
    ...GOLD_MILESTONES.map((value) => ({
      type: "gold" as const,
      value,
      reached: hasReachedMilestone(
        input.gold,
        value,
      ),
    })),
    ...STREAK_MILESTONES.map((value) => ({
      type: "streak" as const,
      value,
      reached: hasReachedMilestone(
        input.streak,
        value,
      ),
    })),
    ...COMBO_MILESTONES.map((value) => ({
      type: "combo" as const,
      value,
      reached: hasReachedMilestone(
        input.combo,
        value,
      ),
    })),
  ];
}

/**
 * Return milestones crossed between two values.
 */
export function getNewMilestones(
  previousValue: number,
  currentValue: number,
  milestones: readonly number[],
): number[] {
  const previous = Math.max(0, previousValue);
  const current = Math.max(0, currentValue);

  if (current <= previous) {
    return [];
  }

  return milestones.filter(
    (milestone) =>
      milestone > previous &&
      milestone <= current,
  );
}

/**
 * Get configured achievement milestones.
 *
 * This keeps achievement configuration available to
 * progression-level consumers without duplicating it.
 */
export function getAchievementMilestones() {
  return Object.values(ACHIEVEMENT_CONFIG);
}