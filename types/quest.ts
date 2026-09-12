import type {
  UUID,
  ISODateString,
  Nullable,
  Attribute,
  Difficulty,
  Rarity,
  RewardType,
} from "@/types/common";

export type QuestDifficulty = Difficulty;
export type QuestRarity = Rarity;

export type QuestStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";


export type QuestCategory =
  | "coding"
  | "study"
  | "fitness"
  | "health"
  | "reading"
  | "meditation"
  | "work"
  | "social"
  | "personal"
  | "creative"
  | "other";

export type QuestType =
  | "one_time"
  | "daily"
  | "weekly"
  | "challenge"
  | "chain";

export type Quest = {
  id: UUID;
  userId: UUID;

  title: string;
  description: Nullable<string>;

  category: QuestCategory;
  type: QuestType;

  difficulty: Difficulty;
  rarity: Rarity;

  status: QuestStatus;

  attribute: Attribute;

  xpReward: number;
  goldReward: number;

  energyCost: number;

  dueDate: Nullable<ISODateString>;
  completedAt: Nullable<ISODateString>;

  chainId: Nullable<UUID>;
  chainOrder: Nullable<number>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type QuestReward = {
  type: RewardType;
  amount?: number;
  itemId?: UUID;
  attribute?: Attribute;
  titleId?: UUID;
  skillId?: UUID;
};

export type QuestRewards = {
  xp: number;
  gold: number;
  energy: number;
  attributes: Partial<Record<Attribute, number>>;
  items: UUID[];
};

export type CreateQuestInput = {
  title: string;
  description?: string | null;

  category: QuestCategory;
  type?: QuestType;

  difficulty: Difficulty;
  rarity?: Rarity;

  attribute?: Attribute;

  dueDate?: ISODateString | null;

  chainId?: UUID | null;
  chainOrder?: number | null;
};

export type UpdateQuestInput = {
  title?: string;
  description?: string | null;

  category?: QuestCategory;
  type?: QuestType;

  difficulty?: Difficulty;
  rarity?: Rarity;

  attribute?: Attribute;

  dueDate?: ISODateString | null;

  status?: QuestStatus;

  chainId?: UUID | null;
  chainOrder?: number | null;
};

export type CompleteQuestInput = {
  questId: UUID;
};

export type CancelQuestInput = {
  questId: UUID;
};

export type QuestCompletion = {
  id: UUID;
  questId: UUID;
  userId: UUID;

  completedAt: ISODateString;

  xpEarned: number;
  goldEarned: number;

  energySpent: number;

  streakAfterCompletion: number;
  comboAfterCompletion: number;

  attributeChanges: Partial<Record<Attribute, number>>;

  createdAt: ISODateString;
};

export type QuestCompletionResult = {
  completion: QuestCompletion;

  rewards: QuestRewards;

  previousLevel: number;
  currentLevel: number;

  leveledUp: boolean;

  previousStreak: number;
  currentStreak: number;

  previousCombo: number;
  currentCombo: number;
};

export type QuestSummary = {
  id: UUID;

  title: string;
  category: QuestCategory;
  type: QuestType;

  difficulty: Difficulty;
  rarity: Rarity;

  status: QuestStatus;

  attribute: Attribute;

  xpReward: number;
  goldReward: number;

  energyCost: number;

  dueDate: Nullable<ISODateString>;
  completedAt: Nullable<ISODateString>;
};

export type QuestFilters = {
  status?: QuestStatus;
  category?: QuestCategory;
  type?: QuestType;
  difficulty?: Difficulty;
  rarity?: Rarity;
  attribute?: Attribute;

  dueToday?: boolean;
  completedToday?: boolean;
};

export type QuestSortField =
  | "createdAt"
  | "dueDate"
  | "xpReward"
  | "goldReward"
  | "difficulty"
  | "rarity";

export type QuestSort = {
  field: QuestSortField;
  direction: "asc" | "desc";
};

export type QuestListParams = {
  filters?: QuestFilters;
  sort?: QuestSort;

  page?: number;
  limit?: number;
};

export type QuestChain = {
  id: UUID;
  userId: UUID;

  title: string;
  description: Nullable<string>;

  totalQuests: number;
  completedQuests: number;

  currentQuestOrder: number;

  completed: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type QuestWithCompletion = Quest & {
  completion: Nullable<QuestCompletion>;
};

export type QuestState = {
  quests: Quest[];
  selectedQuest: Nullable<Quest>;

  isLoading: boolean;
  error: Nullable<string>;
};