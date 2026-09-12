import type {
  Difficulty,
  Rarity,
} from "@/types/common";

export const QUEST_CONFIG = {
  title: {
    minLength: 3,
    maxLength: 100,
  },

  description: {
    maxLength: 1000,
  },

  rewards: {
    difficulty: {
      easy: {
        xp: 25,
        gold: 5,
      },

      medium: {
        xp: 50,
        gold: 10,
      },

      hard: {
        xp: 100,
        gold: 25,
      },

      epic: {
        xp: 200,
        gold: 50,
      },
    } satisfies Record<
      Difficulty,
      { xp: number; gold: number }
    >,

    rarityMultiplier: {
      common: 1,
      uncommon: 1.1,
      rare: 1.25,
      epic: 1.5,
      legendary: 2,
      mythic: 3,
    } satisfies Record<Rarity, number>,
  },

  energyCost: {
    easy: 5,
    medium: 10,
    hard: 20,
    epic: 30,
  } satisfies Record<Difficulty, number>,

  limits: {
    maximumActiveQuests: 50,

    maximumDailyQuests: 10,

    maximumQuestChainLength: 10,
  },

  streak: {
    completionCountsAsActivity: true,
  },

  combo: {
    enabled: true,

    bonusPerCompletion: 0.1,

    maximumMultiplier: 2,
  },

  daily: {
    resetHour: 0,

    maximumDailyChallenges: 1,
  },

  validation: {
    minimumDueDateOffsetMinutes: 0,

    allowPastDueDate: false,
  },
} as const;

export type QuestConfig = typeof QUEST_CONFIG;