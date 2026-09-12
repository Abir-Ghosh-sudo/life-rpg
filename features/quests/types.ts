import type {
  Difficulty,
  ID,
  ISODateString,
  Rarity,
  Status,
} from "@/types/common";

import type {
  Quest,
  QuestCategory,
  QuestCompletion,
  QuestDifficulty,
  QuestRarity,
  QuestStatus,
  QuestType,
} from "@/types/quest";

/**
 * Input used when creating a quest.
 *
 * Server-side validation is required before this type
 * is used by the quest service.
 */
export interface CreateQuestInput {
  title: string;
  description?: string | null;
  category: QuestCategory;
  type?: QuestType;
  difficulty?: QuestDifficulty;
  rarity?: QuestRarity;
  dueAt?: ISODateString | null;
  isDaily?: boolean;
  chainId?: ID | null;
  chainOrder?: number | null;
}

/**
 * Input used when updating an existing quest.
 */
export interface UpdateQuestInput {
  title?: string;
  description?: string | null;
  category?: QuestCategory;
  type?: QuestType;
  difficulty?: QuestDifficulty;
  rarity?: QuestRarity;
  status?: QuestStatus;
  dueAt?: ISODateString | null;
  isDaily?: boolean;
  chainId?: ID | null;
  chainOrder?: number | null;
}

/**
 * Input used to identify a quest.
 */
export interface QuestIdInput {
  questId: ID;
}

/**
 * Input used when completing a quest.
 */
export interface CompleteQuestInput {
  questId: ID;
}

/**
 * Options used when querying quests.
 */
export interface QuestQueryOptions {
  status?: QuestStatus;
  category?: QuestCategory;
  type?: QuestType;
  difficulty?: QuestDifficulty;
  rarity?: QuestRarity;
  isDaily?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Paginated quest result.
 */
export interface QuestListResult {
  quests: Quest[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Result returned after completing a quest.
 */
export interface QuestCompletionResult {
  quest: Quest;
  completion: QuestCompletion;

  reward: {
    xp: number;
    gold: number;
  };

  progression: {
    previousXp: number;
    currentXp: number;
    previousLevel: number;
    currentLevel: number;
    leveledUp: boolean;
  };

  streak: {
    current: number;
    increased: boolean;
  };

  combo: {
    multiplier: number;
    increased: boolean;
  };
}

/**
 * Result returned when cancelling a quest.
 */
export interface CancelQuestResult {
  quest: Quest;
  status: QuestStatus;
}

/**
 * Quest statistics used by dashboard/analytics features.
 */
export interface QuestStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  cancelled: number;

  completionRate: number;

  totalXpEarned: number;
  totalGoldEarned: number;

  byDifficulty: Record<QuestDifficulty, number>;
  byRarity: Record<QuestRarity, number>;
  byCategory: Record<QuestCategory, number>;
}

/**
 * Lightweight quest summary for dashboard cards.
 */
export interface QuestSummary {
  id: ID;
  title: string;
  category: QuestCategory;
  difficulty: Difficulty;
  rarity: Rarity;
  status: Status;
  xpReward: number;
  goldReward: number;
  dueAt: ISODateString | null;
  isDaily: boolean;
}