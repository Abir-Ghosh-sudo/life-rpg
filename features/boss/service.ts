"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getActiveBoss,
  getBossById,
  getBossProgress,
} from "@/features/boss/queries";

import {
  calculateBossReward,
  emptyBossReward,
} from "@/features/boss/rewards";

import type {
  BossAttackInput,
  BossAttackResult,
  BossProgressResult,
} from "@/features/boss/types";

/**
 * Get the active boss and the current user's progress.
 */
export async function getCurrentBoss(): Promise<BossProgressResult | null> {
  const boss = await getActiveBoss();

  if (!boss) {
    return null;
  }

  const progress = await getBossProgress(boss.id);

  return {
    boss,
    progress,
  };
}

/**
 * Attack a Daily Boss.
 *
 * The client cannot decide the reward or damage amount.
 * Damage is capped by the boss configuration.
 */
export async function attackBoss(
  input: BossAttackInput,
): Promise<BossAttackResult> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const boss = await getBossById(input.bossId);

  if (!boss) {
    throw new Error("BOSS_NOT_FOUND");
  }

  if (boss.status !== "active" && boss.isActive === false) {
    throw new Error("BOSS_NOT_ACTIVE");
  }

  const now = Date.now();

  if (boss.startsAt) {
    const startsAt = new Date(boss.startsAt).getTime();

    if (Number.isFinite(startsAt) && now < startsAt) {
      throw new Error("BOSS_NOT_STARTED");
    }
  }

  const expiry = boss.expiresAt ?? boss.endsAt;
  if (expiry) {
    const endsAt = new Date(expiry).getTime();

    if (Number.isFinite(endsAt) && now > endsAt) {
      throw new Error("BOSS_EXPIRED");
    }
  }

  const { data: existingProgress, error: progressError } =
    await supabase
      .from("boss_progress")
      .select("*")
      .eq("boss_id", boss.id)
      .eq("user_id", userId)
      .maybeSingle();

  if (progressError) {
    throw new Error(progressError.message);
  }

  if (existingProgress?.defeated) {
    throw new Error("BOSS_ALREADY_DEFEATED");
  }

  /*
   * Damage is calculated server-side.
   * The optional client value is treated only as a requested action,
   * then bounded by the configured maximum.
   */
  const baseDmg = boss.damagePerAction ?? boss.baseDamage ?? 10;
  const requestedDamage = Number.isFinite(input.damage)
    ? Math.floor(input.damage ?? 0)
    : baseDmg;

  const maxDamage = Math.max(
    1,
    Math.floor(baseDmg),
  );

  const damageDealt = Math.min(
    maxDamage,
    Math.max(1, requestedDamage),
  );

  const currentDamage = existingProgress?.damageDealt ?? 0;
  const newDamage = Math.min(
    boss.maxHp,
    currentDamage + damageDealt,
  );

  const defeated = newDamage >= boss.maxHp;

  if (existingProgress) {
    const { data: progress, error: updateError } =
      await supabase
        .from("boss_progress")
        .update({
          damage_dealt: newDamage,
          attacks_count:
            existingProgress.attacksCount + 1,
          defeated,
          defeated_at: defeated
            ? new Date().toISOString()
            : existingProgress.defeatedAt,
        })
        .eq("id", existingProgress.id)
        .eq("user_id", userId)
        .select("*")
        .single();

    if (updateError || !progress) {
      throw new Error(
        updateError?.message ??
          "Failed to update boss progress.",
      );
    }

    const reward = defeated
      ? calculateBossReward({
          baseXp: boss.xpReward,
          baseGold: boss.goldReward,
        })
      : emptyBossReward();

    return {
      boss,
      progress,
      damageDealt,
      defeated,
      rewardClaimed: false,
    };
  }

  const { data: progress, error: insertError } =
    await supabase
      .from("boss_progress")
      .insert({
        boss_id: boss.id,
        user_id: userId,
        damage_dealt: newDamage,
        attacks_count: 1,
        defeated,
        defeated_at: defeated
          ? new Date().toISOString()
          : null,
        reward_claimed: false,
      })
      .select("*")
      .single();

  if (insertError || !progress) {
    throw new Error(
      insertError?.message ??
        "Failed to create boss progress.",
    );
  }

  return {
    boss,
    progress,
    damageDealt,
    defeated,
    rewardClaimed: false,
  };
}

/**
 * Claim the reward after defeating a boss.
 *
 * The actual XP/Gold transaction will be connected to the
 * progression/economy services.
 */
export async function claimBossReward(
  bossId: string,
) {
  const userId = await requireUserId();
  const supabase = await createClient();

  const boss = await getBossById(bossId);

  if (!boss) {
    throw new Error("BOSS_NOT_FOUND");
  }

  const progress = await getBossProgress(bossId);

  if (!progress) {
    throw new Error("BOSS_PROGRESS_NOT_FOUND");
  }

  if (!progress.defeated) {
    throw new Error("BOSS_NOT_DEFEATED");
  }

  if (progress.rewardClaimed) {
    throw new Error("BOSS_REWARD_ALREADY_CLAIMED");
  }

  const reward = calculateBossReward({
    baseXp: boss.xpReward,
    baseGold: boss.goldReward,
  });

  const { data: updatedProgress, error } =
    await supabase
      .from("boss_progress")
      .update({
        reward_claimed: true,
        reward_claimed_at: new Date().toISOString(),
      })
      .eq("id", progress.id)
      .eq("user_id", userId)
      .eq("reward_claimed", false)
      .select("*")
      .single();

  if (error || !updatedProgress) {
    throw new Error(
      error?.message ??
        "Failed to claim boss reward.",
    );
  }

  return {
    boss,
    progress: updatedProgress,
    reward,
  };
}