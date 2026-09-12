import type { ID } from "@/types/common";

import { creditGold } from "@/features/economy/wallet";

export type EconomyRewardSource =
  | "quest"
  | "daily_challenge"
  | "boss"
  | "focus"
  | "achievement"
  | "random_event"
  | "system";

export interface EconomyRewardInput {
  amount: number;
  source: EconomyRewardSource;
  sourceId?: ID;
  metadata?: Record<string, unknown>;
}

export interface EconomyReward {
  gold: number;
  source: EconomyRewardSource;
  sourceId?: ID;
  metadata: Record<string, unknown>;
}

export interface EconomyRewardResult {
  success: boolean;
  gold: number;
  previousBalance: number;
  newBalance: number;
  source: EconomyRewardSource;
  message: string;
}

const MAX_REWARD = 100_000;

export function normalizeGoldReward(
  amount: number,
): number {
  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return 0;
  }

  return Math.min(
    MAX_REWARD,
    Math.floor(amount),
  );
}

export function createGoldReward(
  input: EconomyRewardInput,
): EconomyReward {
  return {
    gold: normalizeGoldReward(
      input.amount,
    ),
    source: input.source,
    sourceId: input.sourceId,
    metadata: input.metadata ?? {},
  };
}

export function combineGoldRewards(
  rewards: EconomyReward[],
): EconomyReward {
  if (rewards.length === 0) {
    return {
      gold: 0,
      source: "system",
      metadata: {},
    };
  }

  const totalGold = rewards.reduce(
    (total, reward) =>
      total + normalizeGoldReward(reward.gold),
    0,
  );

  return {
    gold: normalizeGoldReward(
      totalGold,
    ),
    source: rewards[0].source,
    sourceId: rewards[0].sourceId,
    metadata: {
      combined: true,
      rewardCount: rewards.length,
    },
  };
}

export function applyRewardMultiplier(
  reward: EconomyReward,
  multiplier: number,
): EconomyReward {
  const safeMultiplier =
    Number.isFinite(multiplier) &&
    multiplier > 0
      ? multiplier
      : 1;

  return {
    ...reward,
    gold: normalizeGoldReward(
      reward.gold * safeMultiplier,
    ),
    metadata: {
      ...reward.metadata,
      multiplier: safeMultiplier,
    },
  };
}

export function addBonusGold(
  reward: EconomyReward,
  bonusGold: number,
): EconomyReward {
  return {
    ...reward,
    gold: normalizeGoldReward(
      reward.gold +
        Math.max(0, bonusGold),
    ),
  };
}

export function isValidReward(
  reward: EconomyReward,
): boolean {
  return (
    reward.gold > 0 &&
    reward.gold <= MAX_REWARD &&
    Boolean(reward.source)
  );
}

export async function grantGoldReward(
  input: EconomyRewardInput,
): Promise<EconomyRewardResult> {
  const reward =
    createGoldReward(input);

  if (reward.gold <= 0) {
    return {
      success: false,
      gold: 0,
      previousBalance: 0,
      newBalance: 0,
      source: reward.source,
      message: "No gold reward to grant.",
    };
  }

  const result =
    await creditGold(reward.gold);

  return {
    success: result.success,
    gold: reward.gold,
    previousBalance:
      result.previousBalance,
    newBalance:
      result.newBalance,
    source: reward.source,
    message: result.message,
  };
}

export function calculateQuestGoldReward(
  baseGold: number,
  rarityMultiplier = 1,
  comboMultiplier = 1,
  streakMultiplier = 1,
): number {
  const totalMultiplier =
    Math.max(0, rarityMultiplier) *
    Math.max(0, comboMultiplier) *
    Math.max(0, streakMultiplier);

  return normalizeGoldReward(
    baseGold * totalMultiplier,
  );
}

export function calculateBossGoldReward(
  baseGold: number,
  damageBonus = 0,
): number {
  return normalizeGoldReward(
    baseGold +
      Math.max(0, damageBonus),
  );
}

export function calculateFocusGoldReward(
  minutes: number,
  goldPerMinute = 1,
): number {
  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return 0;
  }

  return normalizeGoldReward(
    minutes *
      Math.max(0, goldPerMinute),
  );
}