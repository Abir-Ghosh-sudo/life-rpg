import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

export type BossStatus =
  | "upcoming"
  | "active"
  | "defeated"
  | "expired";

export type BossType =
  | "daily"
  | "weekly"
  | "special";

export type Boss = {
  id: UUID;

  name: string;
  description: string;

  type: BossType;
  rarity: Rarity;

  icon: string;

  maxHp: number;

  baseDamage: number;

  xpReward: number;
  goldReward: number;

  status: BossStatus;

  startsAt: ISODateString;
  expiresAt: ISODateString;

  endsAt?: string;
  damagePerAction?: number;
  isActive?: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BossProgress = {
  id: UUID;

  userId: UUID;
  bossId: UUID;

  damageDealt: number;

  contributionPercentage: number;

  defeated: boolean;

  rewardClaimed: boolean;

  lastAttackAt: Nullable<ISODateString>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BossWithProgress = Boss & {
  progress: BossProgress;
};

export type BossAttackInput = {
  bossId: UUID;

  damage: number;
};

export type BossAttackResult = {
  bossId: UUID;

  damageDealt: number;

  totalDamageDealt: number;

  remainingHp: number;

  defeated: boolean;

  xpEarned: number;

  goldEarned: number;

  rewardClaimed: boolean;

  attackedAt: ISODateString;
};

export type BossReward = {
  xp: number;

  gold: number;

  itemId?: UUID;

  achievementId?: UUID;

  titleId?: UUID;
};

export type BossDefeatResult = {
  boss: Boss;

  progress: BossProgress;

  reward: BossReward;

  defeatedAt: ISODateString;
};

export type BossState = {
  boss: Nullable<BossWithProgress>;

  damageDealt: number;

  remainingHp: number;

  isLoading: boolean;

  error: Nullable<string>;
};

export type BossLeaderboardEntry = {
  userId: UUID;

  displayName: string;

  avatarUrl: Nullable<string>;

  damageDealt: number;

  contributionPercentage: number;

  rank: number;
};

export type BossLeaderboard = {
  bossId: UUID;

  entries: BossLeaderboardEntry[];

  updatedAt: ISODateString;
};