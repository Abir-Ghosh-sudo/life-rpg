import type {
  Rarity,
} from "@/types/common";

import type {
  AchievementCategory,
  AchievementRequirementType,
} from "@/types/achievement";

export const ACHIEVEMENT_CONFIG = {
  first_quest: {
    name: "First Step",
    description: "Complete your first quest.",
    category: "quests" as AchievementCategory,
    rarity: "common" as Rarity,
    icon: "🌱",

    requirementType: "quest_count" as AchievementRequirementType,
    requirementValue: 1,

    xpReward: 25,
    goldReward: 10,

    hidden: false,
  },

  quest_10: {
    name: "Quest Apprentice",
    description: "Complete 10 quests.",
    category: "quests" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "⚔️",

    requirementType: "quest_count" as AchievementRequirementType,
    requirementValue: 10,

    xpReward: 50,
    goldReward: 25,

    hidden: false,
  },

  quest_50: {
    name: "Quest Veteran",
    description: "Complete 50 quests.",
    category: "quests" as AchievementCategory,
    rarity: "rare" as Rarity,
    icon: "🛡️",

    requirementType: "quest_count" as AchievementRequirementType,
    requirementValue: 50,

    xpReward: 150,
    goldReward: 75,

    hidden: false,
  },

  quest_100: {
    name: "Quest Master",
    description: "Complete 100 quests.",
    category: "quests" as AchievementCategory,
    rarity: "epic" as Rarity,
    icon: "👑",

    requirementType: "quest_count" as AchievementRequirementType,
    requirementValue: 100,

    xpReward: 300,
    goldReward: 150,

    hidden: false,
  },

  streak_7: {
    name: "Week Warrior",
    description: "Maintain a 7-day activity streak.",
    category: "streaks" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "🔥",

    requirementType: "quest_streak" as AchievementRequirementType,
    requirementValue: 7,

    xpReward: 100,
    goldReward: 50,

    hidden: false,
  },

  streak_30: {
    name: "Unbreakable",
    description: "Maintain a 30-day activity streak.",
    category: "streaks" as AchievementCategory,
    rarity: "epic" as Rarity,
    icon: "💎",

    requirementType: "quest_streak" as AchievementRequirementType,
    requirementValue: 30,

    xpReward: 500,
    goldReward: 250,

    hidden: false,
  },

  level_5: {
    name: "Rising Hero",
    description: "Reach level 5.",
    category: "progression" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "⭐",

    requirementType: "level" as AchievementRequirementType,
    requirementValue: 5,

    xpReward: 100,
    goldReward: 50,

    hidden: false,
  },

  level_10: {
    name: "Seasoned Hero",
    description: "Reach level 10.",
    category: "progression" as AchievementCategory,
    rarity: "rare" as Rarity,
    icon: "🏆",

    requirementType: "level" as AchievementRequirementType,
    requirementValue: 10,

    xpReward: 250,
    goldReward: 100,

    hidden: false,
  },

  level_25: {
    name: "Elite Hero",
    description: "Reach level 25.",
    category: "progression" as AchievementCategory,
    rarity: "epic" as Rarity,
    icon: "💫",

    requirementType: "level" as AchievementRequirementType,
    requirementValue: 25,

    xpReward: 750,
    goldReward: 300,

    hidden: false,
  },

  xp_1000: {
    name: "XP Hunter",
    description: "Earn 1,000 total XP.",
    category: "progression" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "✨",

    requirementType: "total_xp" as AchievementRequirementType,
    requirementValue: 1000,

    xpReward: 100,
    goldReward: 50,

    hidden: false,
  },

  gold_1000: {
    name: "Gold Collector",
    description: "Earn 1,000 gold.",
    category: "economy" as AchievementCategory,
    rarity: "rare" as Rarity,
    icon: "💰",

    requirementType: "gold_earned" as AchievementRequirementType,
    requirementValue: 1000,

    xpReward: 150,
    goldReward: 100,

    hidden: false,
  },

  focus_60: {
    name: "Focused Mind",
    description: "Complete 60 minutes of focus sessions.",
    category: "focus" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "🧘",

    requirementType: "focus_minutes" as AchievementRequirementType,
    requirementValue: 60,

    xpReward: 100,
    goldReward: 50,

    hidden: false,
  },

  focus_1000: {
    name: "Deep Work Master",
    description: "Complete 1,000 minutes of focus sessions.",
    category: "focus" as AchievementCategory,
    rarity: "epic" as Rarity,
    icon: "🧠",

    requirementType: "focus_minutes" as AchievementRequirementType,
    requirementValue: 1000,

    xpReward: 500,
    goldReward: 250,

    hidden: false,
  },

  combo_10: {
    name: "Combo Hunter",
    description: "Reach a 10 quest combo.",
    category: "quests" as AchievementCategory,
    rarity: "rare" as Rarity,
    icon: "🔥",

    requirementType: "combo" as AchievementRequirementType,
    requirementValue: 10,

    xpReward: 200,
    goldReward: 100,

    hidden: false,
  },

  world_1: {
    name: "Pathfinder",
    description: "Unlock your first adventure world.",
    category: "exploration" as AchievementCategory,
    rarity: "uncommon" as Rarity,
    icon: "🗺️",

    requirementType: "world_unlock" as AchievementRequirementType,
    requirementValue: 1,

    xpReward: 100,
    goldReward: 50,

    hidden: false,
  },

  boss_1: {
    name: "Boss Slayer",
    description: "Defeat your first Daily Boss.",
    category: "combat" as AchievementCategory,
    rarity: "rare" as Rarity,
    icon: "🐉",

    requirementType: "boss_defeat" as AchievementRequirementType,
    requirementValue: 1,

    xpReward: 200,
    goldReward: 100,

    hidden: false,
  },

  secret_hero: {
    name: "???",
    description: "A hidden achievement waiting to be discovered.",
    category: "special" as AchievementCategory,
    rarity: "mythic" as Rarity,
    icon: "❓",

    requirementType: "custom" as AchievementRequirementType,
    requirementValue: 1,

    xpReward: 1000,
    goldReward: 500,

    hidden: true,
  },
} as const;

export const ACHIEVEMENT_LIST = Object.entries(
  ACHIEVEMENT_CONFIG,
).map(([id, achievement]) => ({
  id,
  ...achievement,
}));

export function getAchievementConfig(id: string) {
  return ACHIEVEMENT_CONFIG[
    id as keyof typeof ACHIEVEMENT_CONFIG
  ];
}

export type AchievementConfig =
  typeof ACHIEVEMENT_CONFIG;