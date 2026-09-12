import type { Boss, BossProgress } from "@/types/boss";

export type BossIdInput = {
  bossId: string;
};

export type BossQueryOptions = {
  activeOnly?: boolean;
  limit?: number;
};

export type BossAttackInput = {
  bossId: string;
  damage?: number;
};

export type BossAttackResult = {
  boss: Boss;
  progress: BossProgress;
  damageDealt: number;
  defeated: boolean;
  rewardClaimed: boolean;
};

export type BossProgressResult = {
  boss: Boss;
  progress: BossProgress | null;
};

export type BossSummary = {
  id: string;
  name: string;
  description: string;
  maxHp: number;
  difficulty: string;
  active: boolean;
  currentHp: number;
  userDamage: number;
  defeated: boolean;
};

export type BossReward = {
  xp: number;
  gold: number;
};

export type BossActionResult = {
  success: boolean;
  message: string;
  damageDealt: number;
  reward?: BossReward;
  levelUp?: boolean;
};