import type {
  QuestDifficulty,
  QuestRarity,
  QuestReward,
} from "@/types/quest";

import { DIFFICULTY_CONFIG } from "@/config/difficulties";
import { RARITY_CONFIG } from "@/config/rarities";
import { GAME_CONFIG } from "@/config/game";

export interface QuestRewardInput {
  difficulty: QuestDifficulty;
  rarity: QuestRarity;
  comboMultiplier?: number;
  streakMultiplier?: number;
}

export interface CalculatedQuestReward extends QuestReward {
  baseXp: number;
  baseGold: number;
  rarityMultiplier: number;
  comboMultiplier: number;
  streakMultiplier: number;
}

/**
 * Clamp a multiplier to a safe range.
 *
 * Reward multipliers must never be negative and should not exceed
 * the game's configured combo maximum when applicable.
 */
function normalizeMultiplier(value: number | undefined, fallback = 1): number {
  if (!Number.isFinite(value ?? NaN)) {
    return fallback;
  }

  return Math.max(0, value ?? fallback);
}

/**
 * Calculate the authoritative reward for completing a quest.
 *
 * The client should never calculate or submit the final reward.
 * This function is intended to run inside the server-side quest flow.
 */
export function calculateQuestReward(
  input: QuestRewardInput,
): CalculatedQuestReward {
  const difficulty = DIFFICULTY_CONFIG[input.difficulty];
  const rarity = RARITY_CONFIG[input.rarity];

  const baseXp = difficulty.xp;
  const baseGold = difficulty.gold;

  const rarityMultiplier = normalizeMultiplier(rarity.multiplier);

  const comboMultiplier = Math.min(
    normalizeMultiplier(input.comboMultiplier),
    GAME_CONFIG.progression.combo.maxMultiplier,
  );

  const streakMultiplier = normalizeMultiplier(input.streakMultiplier);

  const totalMultiplier =
    rarityMultiplier * comboMultiplier * streakMultiplier;

  const xp = Math.max(0, Math.round(baseXp * totalMultiplier));
  const gold = Math.max(0, Math.round(baseGold * totalMultiplier));

  return {
    xp,
    gold,
    baseXp,
    baseGold,
    rarityMultiplier,
    comboMultiplier,
    streakMultiplier,
  };
}

/**
 * Calculate reward using only the quest's configured difficulty and rarity.
 *
 * Useful when combo/streak information is not available.
 */
export function calculateBaseQuestReward(
  difficulty: QuestDifficulty,
  rarity: QuestRarity,
): QuestReward {
  return calculateQuestReward({
    difficulty,
    rarity,
  });
}

/**
 * Apply a generic reward multiplier.
 *
 * Useful for special events, bonuses or temporary game effects.
 */
export function applyRewardMultiplier(
  reward: QuestReward,
  multiplier: number,
): QuestReward {
  const safeMultiplier = normalizeMultiplier(multiplier);

  return {
    xp: Math.max(0, Math.round(reward.xp * safeMultiplier)),
    gold: Math.max(0, Math.round(reward.gold * safeMultiplier)),
  };
}

/**
 * Combine multiple rewards into a single reward.
 */
export function combineRewards(...rewards: QuestReward[]): QuestReward {
  return rewards.reduce(
    (total, reward) => ({
      xp: total.xp + Math.max(0, reward.xp),
      gold: total.gold + Math.max(0, reward.gold),
    }),
    {
      xp: 0,
      gold: 0,
    },
  );
}