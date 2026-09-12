import type { Rarity } from "@/types/common";

export const RARITY_CONFIG = {
  common: {
    name: "Common",
    description: "Everyday rewards with a reliable value.",
    icon: "⚪",

    color: "slate",

    rewardMultiplier: 1,
    dropChance: 50,

    order: 1,
  },

  uncommon: {
    name: "Uncommon",
    description: "A slightly special reward worth collecting.",
    icon: "🟢",

    color: "emerald",

    rewardMultiplier: 1.1,
    dropChance: 25,

    order: 2,
  },

  rare: {
    name: "Rare",
    description: "A valuable reward that does not appear often.",
    icon: "🔵",

    color: "blue",

    rewardMultiplier: 1.25,
    dropChance: 12,

    order: 3,
  },

  epic: {
    name: "Epic",
    description: "A powerful reward earned through difficult challenges.",
    icon: "🟣",

    color: "violet",

    rewardMultiplier: 1.5,
    dropChance: 7,

    order: 4,
  },

  legendary: {
    name: "Legendary",
    description: "An exceptional reward reserved for major achievements.",
    icon: "🟠",

    color: "amber",

    rewardMultiplier: 2,
    dropChance: 4,

    order: 5,
  },

  mythic: {
    name: "Mythic",
    description: "An extremely rare reward worthy of the greatest heroes.",
    icon: "🔴",

    color: "rose",

    rewardMultiplier: 3,
    dropChance: 2,

    order: 6,
  },
} satisfies Record<
  Rarity,
  {
    name: string;
    description: string;
    icon: string;
    color: string;
    rewardMultiplier: number;
    dropChance: number;
    order: number;
  }
>;

export const RARITY_LIST = Object.keys(
  RARITY_CONFIG,
) as Rarity[];

export function getRarityConfig(rarity: Rarity) {
  return RARITY_CONFIG[rarity];
}

export function getRarityMultiplier(rarity: Rarity): number {
  return RARITY_CONFIG[rarity].rewardMultiplier;
}

export function getRarityOrder(rarity: Rarity): number {
  return RARITY_CONFIG[rarity].order;
}

export type RarityConfig = typeof RARITY_CONFIG;