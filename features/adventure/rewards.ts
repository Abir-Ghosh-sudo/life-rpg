import type { AdventureReward } from "@/types/adventure";

export interface AdventureRewardInput {
  baseXp: number;
  baseGold: number;
  progressPercent?: number;
  completionBonus?: number;
}

export interface CalculatedAdventureReward {
  xp: number;
  gold: number;
}

/**
 * Calculate rewards for completing an adventure objective.
 */
export function calculateAdventureReward(
  input: AdventureRewardInput,
): CalculatedAdventureReward {
  const baseXp = Math.max(0, Math.floor(input.baseXp));
  const baseGold = Math.max(0, Math.floor(input.baseGold));

  const progressBonus = Math.max(
    0,
    Math.min(100, input.progressPercent ?? 100),
  ) / 100;

  const completionBonus = Math.max(
    0,
    input.completionBonus ?? 0,
  );

  return {
    xp: Math.max(
      0,
      Math.floor(
        baseXp * progressBonus + completionBonus,
      ),
    ),
    gold: Math.max(
      0,
      Math.floor(
        baseGold * progressBonus,
      ),
    ),
  };
}

/**
 * Create a normalized reward object.
 */
export function createAdventureReward(
  xp: number,
  gold: number,
): AdventureReward {
  return {
    xp: Math.max(0, Math.floor(xp)),
    gold: Math.max(0, Math.floor(gold)),
  };
}

/**
 * Add two adventure rewards together.
 */
export function combineAdventureRewards(
  first: AdventureReward,
  second: AdventureReward,
): AdventureReward {
  return createAdventureReward(
    first.xp + second.xp,
    first.gold + second.gold,
  );
}

/**
 * Apply a multiplier to an adventure reward.
 */
export function multiplyAdventureReward(
  reward: AdventureReward,
  multiplier: number,
): AdventureReward {
  const safeMultiplier = Math.max(0, multiplier);

  return createAdventureReward(
    reward.xp * safeMultiplier,
    reward.gold * safeMultiplier,
  );
}

/**
 * Check whether a reward contains anything valuable.
 */
export function hasAdventureReward(
  reward: AdventureReward,
): boolean {
  return reward.xp > 0 || reward.gold > 0;
}