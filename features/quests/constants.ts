
import type {
  QuestCategory,
  QuestDifficulty,
  QuestRarity,
  QuestType,
} from "@/types/quest";

import { DIFFICULTY_CONFIG } from "@/config/difficulties";
import { RARITY_CONFIG } from "@/config/rarities";

/**
 * Quest category metadata.
 *
 * Used by the quest UI and quest-related business logic.
 */
export const QUEST_CATEGORIES: Record<
  QuestCategory,
  {
    label: string;
    description: string;
  }
> = {
  coding: {
    label: "Coding",
    description: "Programming, development and technical practice.",
  },
  study: {
    label: "Study",
    description: "Learning, coursework and academic practice.",
  },
  fitness: {
    label: "Fitness",
    description: "Exercise, workouts and physical activity.",
  },
  health: {
    label: "Health",
    description: "Healthy habits and personal wellbeing.",
  },
  reading: {
    label: "Reading",
    description: "Books, articles and intentional reading.",
  },
  meditation: {
    label: "Meditation",
    description: "Mindfulness, meditation and mental clarity.",
  },
  work: {
    label: "Work",
    description: "Professional tasks and career progress.",
  },
  social: {
    label: "Social",
    description: "Relationships, communication and social activities.",
  },
  personal: {
    label: "Personal",
    description: "Personal development and everyday responsibilities.",
  },
  creative: {
    label: "Creative",
    description: "Writing, art, music and creative projects.",
  },
  other: {
    label: "Other",
    description: "Tasks that do not fit another category.",
  },
};

/**
 * Quest type metadata.
 */
export const QUEST_TYPES: Record<
  QuestType,
  {
    label: string;
    description: string;
  }
> = {
  one_time: {
    label: "One Time",
    description: "Complete this quest once.",
  },
  daily: {
    label: "Daily",
    description: "A quest that can be completed every day.",
  },
  weekly: {
    label: "Weekly",
    description: "A recurring quest for the week.",
  },
  challenge: {
    label: "Challenge",
    description: "A special high-value challenge.",
  },
  chain: {
    label: "Quest Chain",
    description: "Part of a multi-step quest progression.",
  },
};

/**
 * Difficulty metadata.
 *
 * Reward values come from the central difficulty configuration.
 */
export const QUEST_DIFFICULTIES: Record<
  QuestDifficulty,
  {
    label: string;
    xp: number;
    gold: number;
    energyCost: number;
  }
> = {
  easy: {
    label: DIFFICULTY_CONFIG.easy.label,
    xp: DIFFICULTY_CONFIG.easy.xp,
    gold: DIFFICULTY_CONFIG.easy.gold,
    energyCost: DIFFICULTY_CONFIG.easy.energyCost,
  },
  medium: {
    label: DIFFICULTY_CONFIG.medium.label,
    xp: DIFFICULTY_CONFIG.medium.xp,
    gold: DIFFICULTY_CONFIG.medium.gold,
    energyCost: DIFFICULTY_CONFIG.medium.energyCost,
  },
  hard: {
    label: DIFFICULTY_CONFIG.hard.label,
    xp: DIFFICULTY_CONFIG.hard.xp,
    gold: DIFFICULTY_CONFIG.hard.gold,
    energyCost: DIFFICULTY_CONFIG.hard.energyCost,
  },
  epic: {
    label: DIFFICULTY_CONFIG.epic.label,
    xp: DIFFICULTY_CONFIG.epic.xp,
    gold: DIFFICULTY_CONFIG.epic.gold,
    energyCost: DIFFICULTY_CONFIG.epic.energyCost,
  },
};

/**
 * Rarity metadata.
 *
 * Reward multipliers are intentionally read from the central
 * rarity configuration instead of being duplicated here.
 */
export const QUEST_RARITIES: Record<
  QuestRarity,
  {
    label: string;
    multiplier: number;
  }
> = {
  common: {
    label: RARITY_CONFIG.common.label,
    multiplier: RARITY_CONFIG.common.multiplier,
  },
  uncommon: {
    label: RARITY_CONFIG.uncommon.label,
    multiplier: RARITY_CONFIG.uncommon.multiplier,
  },
  rare: {
    label: RARITY_CONFIG.rare.label,
    multiplier: RARITY_CONFIG.rare.multiplier,
  },
  epic: {
    label: RARITY_CONFIG.epic.label,
    multiplier: RARITY_CONFIG.epic.multiplier,
  },
  legendary: {
    label: RARITY_CONFIG.legendary.label,
    multiplier: RARITY_CONFIG.legendary.multiplier,
  },
  mythic: {
    label: RARITY_CONFIG.mythic.label,
    multiplier: RARITY_CONFIG.mythic.multiplier,
  },
};

/**
 * Default values used when creating a new quest.
 */
export const DEFAULT_QUEST_VALUES = {
  type: "one_time" as QuestType,
  difficulty: "easy" as QuestDifficulty,
  rarity: "common" as QuestRarity,
  category: "personal" as QuestCategory,
};

/**
 * Quest ordering options.
 */
export const QUEST_SORT_FIELDS = [
  "created_at",
  "updated_at",
  "due_at",
  "completed_at",
  "xp_reward",
  "gold_reward",
] as const;

export type QuestSortField = (typeof QUEST_SORT_FIELDS)[number];

/**
 * Maximum number of quests displayed in the primary active-quest view.
 */
export const ACTIVE_QUEST_DISPLAY_LIMIT = 20;

/**
 * Number of quests shown in compact dashboard widgets.
 */
export const DASHBOARD_QUEST_LIMIT = 5;

