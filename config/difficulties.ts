import type {
  Difficulty,
} from "@/types/common";

export const DIFFICULTY_CONFIG = {
  easy: {
    name: "Easy",
    description:
      "Small tasks that can be completed quickly and consistently.",

    icon: "🟢",

    xpReward: 25,
    goldReward: 5,

    energyCost: 5,

    recommendedMinutes: 15,

    rewardMultiplier: 1,

    order: 1,
  },

  medium: {
    name: "Medium",
    description:
      "Meaningful tasks that require moderate effort and focus.",

    icon: "🔵",

    xpReward: 50,
    goldReward: 10,

    energyCost: 10,

    recommendedMinutes: 30,

    rewardMultiplier: 1,

    order: 2,
  },

  hard: {
    name: "Hard",
    description:
      "Challenging tasks that require serious effort and commitment.",

    icon: "🟣",

    xpReward: 100,
    goldReward: 25,

    energyCost: 20,

    recommendedMinutes: 60,

    rewardMultiplier: 1,

    order: 3,
  },

  epic: {
    name: "Epic",
    description:
      "Major challenges that demand exceptional effort and discipline.",

    icon: "🟠",

    xpReward: 200,
    goldReward: 50,

    energyCost: 30,

    recommendedMinutes: 120,

    rewardMultiplier: 1,

    order: 4,
  },
} satisfies Record<
  Difficulty,
  {
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    goldReward: number;
    energyCost: number;
    recommendedMinutes: number;
    rewardMultiplier: number;
    order: number;
  }
>;

export const DIFFICULTY_LIST = Object.keys(
  DIFFICULTY_CONFIG,
) as Difficulty[];

export function getDifficultyConfig(
  difficulty: Difficulty,
) {
  return DIFFICULTY_CONFIG[difficulty];
}

export function getDifficultyXp(
  difficulty: Difficulty,
): number {
  return DIFFICULTY_CONFIG[difficulty].xpReward;
}

export function getDifficultyGold(
  difficulty: Difficulty,
): number {
  return DIFFICULTY_CONFIG[difficulty].goldReward;
}

export function getDifficultyEnergyCost(
  difficulty: Difficulty,
): number {
  return DIFFICULTY_CONFIG[difficulty].energyCost;
}

export type DifficultyConfig = typeof DIFFICULTY_CONFIG;