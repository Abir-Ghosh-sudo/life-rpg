"use server";

import {
  attackBoss,
  claimBossReward,
  getCurrentBoss,
} from "@/features/boss/service";

import type { BossAttackInput } from "@/features/boss/types";

/**
 * Get the current active boss and user's progress.
 */
export async function getCurrentBossAction() {
  return getCurrentBoss();
}

/**
 * Attack the current boss.
 */
export async function attackBossAction(
  input: BossAttackInput,
) {
  return attackBoss(input);
}

/**
 * Claim a defeated boss reward.
 */
export async function claimBossRewardAction(
  bossId: string,
) {
  return claimBossReward(bossId);
}