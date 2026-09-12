import type { BossReward } from "@/features/boss/types";

export type BossRewardInput = {
  baseXp: number;
  baseGold: number;
  difficultyMultiplier?: number;
  damageContribution?: number;
  bonusXp?: number;
  bonusGold?: number;
};

/**
 * Normalize a numeric reward value.
 */
function normalizeReward(value: number | undefined): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

/**
 * Calculate the final reward for defeating a boss.
 *
 * The reward is calculated server-side and should be treated
 * as authoritative by the game service.
 */
export function calculateBossReward(
  input: BossRewardInput,
): BossReward {
  const multiplier = Number.isFinite(
    input.difficultyMultiplier,
  )
    ? Math.max(0, input.difficultyMultiplier ?? 1)
    : 1;

  const xp =
    normalizeReward(input.baseXp) * multiplier +
    normalizeReward(input.bonusXp);

  const gold =
    normalizeReward(input.baseGold) * multiplier +
    normalizeReward(input.bonusGold);

  return {
    xp: Math.floor(xp),
    gold: Math.floor(gold),
  };
}

/**
 * Calculate a contribution bonus based on damage dealt.
 *
 * This is intentionally capped so damage cannot create
 * unlimited economic rewards.
 */
export function calculateDamageBonus(
  damage: number,
  maxDamage: number,
): number {
  const safeDamage = normalizeReward(damage);
  const safeMaxDamage = Math.max(
    1,
    normalizeReward(maxDamage),
  );

  const contribution = Math.min(
    1,
    safeDamage / safeMaxDamage,
  );

  return Math.floor(contribution * 25);
}

/**
 * Add a reward bonus to an existing boss reward.
 */
export function addBossRewardBonus(
  reward: BossReward,
  bonus: Partial<BossReward>,
): BossReward {
  return {
    xp:
      normalizeReward(reward.xp) +
      normalizeReward(bonus.xp),
    gold:
      normalizeReward(reward.gold) +
      normalizeReward(bonus.gold),
  };
}

/**
 * Return an empty boss reward.
 */
export function emptyBossReward(): BossReward {
  return {
    xp: 0,
    gold: 0,
  };
}

/**
 * Check whether a boss reward contains a meaningful reward.
 */
export function hasBossReward(
  reward: BossReward,
): boolean {
  return (
    normalizeReward(reward.xp) > 0 ||
    normalizeReward(reward.gold) > 0
  );
}