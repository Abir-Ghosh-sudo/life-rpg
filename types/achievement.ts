import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

export type AchievementCategory =
  | "quests"
  | "progression"
  | "streaks"
  | "combat"
  | "exploration"
  | "economy"
  | "focus"
  | "special";

export type AchievementRequirementType =
  | "quest_count"
  | "quest_streak"
  | "level"
  | "total_xp"
  | "gold_earned"
  | "gold_spent"
  | "boss_damage"
  | "boss_defeat"
  | "world_unlock"
  | "item_owned"
  | "focus_minutes"
  | "focus_sessions"
  | "attribute_value"
  | "combo"
  | "custom";

export type AchievementStatus =
  | "locked"
  | "in_progress"
  | "unlocked";

export type Achievement = {
  id: UUID;

  name: string;
  description: string;

  category: AchievementCategory;
  rarity: Rarity;

  icon: string;

  requirementType: AchievementRequirementType;
  requirementValue: number;

  xpReward: number;
  goldReward: number;

  hidden: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserAchievement = {
  id: UUID;

  userId: UUID;
  achievementId: UUID;

  progress: number;

  status: AchievementStatus;

  unlockedAt: Nullable<ISODateString>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AchievementProgress = {
  achievementId: UUID;

  current: number;
  required: number;

  percentage: number;

  status: AchievementStatus;

  unlockedAt: Nullable<ISODateString>;
};

export type AchievementWithProgress = Achievement & {
  progress: AchievementProgress;
};

export type AchievementReward = {
  xp: number;
  gold: number;

  itemId?: UUID;
  titleId?: UUID;
  skillId?: UUID;
};

export type AchievementUnlockResult = {
  achievement: Achievement;

  reward: AchievementReward;

  unlockedAt: ISODateString;
};

export type AchievementEvaluationContext = {
  userId: UUID;

  questCount: number;
  completedQuestStreak: number;

  level: number;
  totalXp: number;

  goldEarned: number;
  goldSpent: number;

  bossDamage: number;
  bossesDefeated: number;

  worldsUnlocked: number;

  itemsOwned: number;

  focusMinutes: number;
  focusSessions: number;

  maxAttributeValue: number;
  maxCombo: number;
};

export type AchievementFilter = {
  category?: AchievementCategory;
  rarity?: Rarity;
  status?: AchievementStatus;

  unlockedOnly?: boolean;
  hidden?: boolean;
};

export type AchievementSortField =
  | "name"
  | "rarity"
  | "progress"
  | "unlockedAt"
  | "createdAt";

export type AchievementSort = {
  field: AchievementSortField;
  direction: "asc" | "desc";
};

export type AchievementListParams = {
  filter?: AchievementFilter;
  sort?: AchievementSort;

  page?: number;
  limit?: number;
};

export type AchievementState = {
  achievements: AchievementWithProgress[];

  unlockedCount: number;
  totalCount: number;

  isLoading: boolean;
  error: Nullable<string>;
};