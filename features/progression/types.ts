import type { Attribute, RewardType } from "@/types/common";
import type { Character } from "@/types/character";

export type XpSource =
  | "quest"
  | "daily_challenge"
  | "boss"
  | "focus"
  | "achievement"
  | "random_event"
  | "system";

export type ProgressionReward = {
  xp: number;
  gold: number;
  energy?: number;
  hp?: number;
  attributePoints?: number;
  rewardType?: RewardType;
};

export type ProgressionUpdate = {
  character: Character;
  reward: ProgressionReward;
  attribute?: Attribute;
  levelUp: boolean;
  previousLevel: number;
  newLevel: number;
  previousXp: number;
  newXp: number;
};

export type ProgressionSnapshot = {
  level: number;
  xp: number;
  gold: number;
  hp: number;
  energy: number;
  streak: number;
  combo: number;
};

export type ProgressionResult = {
  snapshot: ProgressionSnapshot;
  reward: ProgressionReward;
  levelUp: boolean;
  levelsGained: number;
  unlockedMilestones: number[];
};

export type ApplyProgressionInput = {
  userId: string;
  xp?: number;
  gold?: number;
  energy?: number;
  hp?: number;
  attribute?: Attribute;
  attributePoints?: number;
  source: XpSource;
  sourceId?: string;
  description?: string;
};

export type LevelUpEvent = {
  previousLevel: number;
  newLevel: number;
  xp: number;
};

export type StreakState = {
  current: number;
  lastActivityDate: string | null;
};

export type ComboState = {
  multiplier: number;
  lastCompletionAt: string | null;
};

export type EnergyState = {
  current: number;
  max: number;
  lastUpdatedAt: string | null;
};