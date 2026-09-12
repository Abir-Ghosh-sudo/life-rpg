import type { RewardType } from "@/types/common";

export type ProgressionReward = {
  xp?: number;
  gold?: number;
  energy?: number;
  hp?: number;
  attributePoints?: number;
  rewardType?: RewardType;
};

export type NormalizedProgressionReward = {
  xp: number;
  gold: number;
  energy: number;
  hp: number;
  attributePoints: number;
  rewardType?: RewardType;
};

/**
 * Normalize a progression reward.
 *
 * Negative rewards are not allowed by default.
 */
export function normalizeReward(
  reward: ProgressionReward,
): NormalizedProgressionReward {
  return {
    xp: Math.max(0, Math.floor(reward.xp ?? 0)),
    gold: Math.max(0, Math.floor(reward.gold ?? 0)),
    energy: Math.max(0, Math.floor(reward.energy ?? 0)),
    hp: Math.max(0, Math.floor(reward.hp ?? 0)),
    attributePoints: Math.max(
      0,
      Math.floor(reward.attributePoints ?? 0),
    ),
    rewardType: reward.rewardType,
  };
}

/**
 * Combine multiple progression rewards.
 */
export function combineRewards(
  ...rewards: ProgressionReward[]
): NormalizedProgressionReward {
  return rewards.reduce<NormalizedProgressionReward>(
    (total, reward) => {
      const normalized = normalizeReward(reward);

      return {
        xp: total.xp + normalized.xp,
        gold: total.gold + normalized.gold,
        energy: total.energy + normalized.energy,
        hp: total.hp + normalized.hp,
        attributePoints:
          total.attributePoints +
          normalized.attributePoints,
        rewardType:
          normalized.rewardType ?? total.rewardType,
      };
    },
    {
      xp: 0,
      gold: 0,
      energy: 0,
      hp: 0,
      attributePoints: 0,
    },
  );
}

/**
 * Apply a multiplier to XP and gold rewards.
 */
export function multiplyReward(
  reward: ProgressionReward,
  multiplier: number,
): NormalizedProgressionReward {
  const normalized = normalizeReward(reward);
  const safeMultiplier = Number.isFinite(multiplier)
    ? Math.max(0, multiplier)
    : 1;

  return {
    ...normalized,
    xp: Math.floor(normalized.xp * safeMultiplier),
    gold: Math.floor(normalized.gold * safeMultiplier),
  };
}

/**
 * Add a bonus reward to an existing reward.
 */
export function addRewardBonus(
  reward: ProgressionReward,
  bonus: ProgressionReward,
): NormalizedProgressionReward {
  return combineRewards(reward, bonus);
}

/**
 * Check whether a reward contains anything useful.
 */
export function hasReward(
  reward: ProgressionReward,
): boolean {
  const normalized = normalizeReward(reward);

  return (
    normalized.xp > 0 ||
    normalized.gold > 0 ||
    normalized.energy > 0 ||
    normalized.hp > 0 ||
    normalized.attributePoints > 0
  );
}

/**
 * Get the total numeric value of a reward.
 *
 * Useful for UI summaries and analytics, not for economy balancing.
 */
export function getRewardTotal(
  reward: ProgressionReward,
): number {
  const normalized = normalizeReward(reward);

  return (
    normalized.xp +
    normalized.gold +
    normalized.energy +
    normalized.hp +
    normalized.attributePoints
  );
}