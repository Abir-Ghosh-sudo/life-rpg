import type {
  UUID,
  ISODateString,
  Attribute,
  RewardType,
} from "@/types/common";

export type Progression = {
  characterId: UUID;

  level: number;

  totalXp: number;
  currentXp: number;
  xpToNextLevel: number;

  gold: number;

  currentHp: number;
  maxHp: number;

  currentEnergy: number;
  maxEnergy: number;

  currentStreak: number;
  longestStreak: number;

  combo: number;
  maxCombo: number;

  updatedAt: ISODateString;
};

export type XpSource =
  | "quest"
  | "daily_challenge"
  | "boss"
  | "focus"
  | "achievement"
  | "random_event"
  | "system";

export type XpGain = {
  amount: number;
  source: XpSource;
  sourceId?: UUID;
};

export type XpResult = {
  previousXp: number;
  newXp: number;

  gainedXp: number;

  previousLevel: number;
  currentLevel: number;

  leveledUp: boolean;

  xpForCurrentLevel: number;
  xpForNextLevel: number;
  xpRemaining: number;
};

export type LevelProgress = {
  level: number;

  currentXp: number;
  totalXp: number;

  xpRequired: number;
  xpToNextLevel: number;

  progressPercentage: number;
};

export type LevelUpReward = {
  type: RewardType;
  amount?: number;
  itemId?: UUID;
  titleId?: UUID;
  skillId?: UUID;
};

export type LevelUpResult = {
  previousLevel: number;
  newLevel: number;

  xp: number;

  rewards: LevelUpReward[];

  unlockedWorldIds: UUID[];
  unlockedSkillIds: UUID[];
  unlockedThemeIds: UUID[];
};

export type AttributeChange = {
  attribute: Attribute;

  previousValue: number;
  change: number;
  newValue: number;
};

export type AttributeProgress = {
  attribute: Attribute;

  value: number;

  totalGained: number;

  lastUpdatedAt: ISODateString;
};

export type AttributeProgression = {
  strength: AttributeProgress;
  intellect: AttributeProgress;
  wisdom: AttributeProgress;
  discipline: AttributeProgress;
  charisma: AttributeProgress;
};

export type StreakStatus =
  | "new"
  | "continued"
  | "broken"
  | "protected";

export type StreakProgress = {
  current: number;
  longest: number;

  status: StreakStatus;

  lastActiveDate: ISODateString | null;

  nextMilestone: number | null;
};

export type StreakReward = {
  streak: number;

  xpBonus: number;
  goldBonus: number;

  itemId?: UUID;
  titleId?: UUID;
};

export type ComboStatus =
  | "inactive"
  | "active"
  | "maxed";

export type ComboProgress = {
  current: number;
  highest: number;

  status: ComboStatus;

  multiplier: number;

  lastCompletedAt: ISODateString | null;
};

export type EnergyState = {
  current: number;
  max: number;

  regenerationRate: number;

  lastRegeneratedAt: ISODateString;
};

export type EnergyChange = {
  previousEnergy: number;
  change: number;
  newEnergy: number;
};

export type ProgressionReward = {
  type: RewardType;

  amount?: number;

  attribute?: Attribute;

  itemId?: UUID;
  titleId?: UUID;
  skillId?: UUID;
  worldId?: UUID;
  themeId?: UUID;
};

export type ProgressionEventType =
  | "xp_gained"
  | "level_up"
  | "attribute_increased"
  | "streak_increased"
  | "combo_increased"
  | "energy_changed"
  | "reward_granted";

export type ProgressionEvent = {
  id: UUID;

  characterId: UUID;

  type: ProgressionEventType;

  source: XpSource;

  sourceId: UUID | null;

  xpGained: number;
  goldGained: number;

  attributeChanges: AttributeChange[];

  createdAt: ISODateString;
};

export type ProgressionSnapshot = {
  level: number;

  totalXp: number;
  currentXp: number;
  xpToNextLevel: number;

  gold: number;

  hp: {
    current: number;
    max: number;
  };

  energy: {
    current: number;
    max: number;
  };

  streak: StreakProgress;
  combo: ComboProgress;

  attributes: AttributeProgression;
};

export type ProgressionUpdate = {
  xp?: number;
  gold?: number;

  hp?: number;
  energy?: number;

  streak?: number;
  combo?: number;

  attributes?: Partial<Record<Attribute, number>>;
};