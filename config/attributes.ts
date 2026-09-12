import type { Attribute } from "@/types/common";

export const ATTRIBUTE_CONFIG = {
  strength: {
    name: "Strength",
    description: "Physical power, fitness, and endurance.",
    icon: "💪",

    categories: [
      "fitness",
      "health",
    ],

    baseValue: 1,

    levelUpBonus: 1,

    color: "emerald",
  },

  intellect: {
    name: "Intellect",
    description: "Learning, coding, problem solving, and mental skill.",
    icon: "🧠",

    categories: [
      "coding",
      "study",
    ],

    baseValue: 1,

    levelUpBonus: 1,

    color: "indigo",
  },

  wisdom: {
    name: "Wisdom",
    description: "Knowledge, reading, reflection, and life experience.",
    icon: "📚",

    categories: [
      "reading",
      "learning",
    ],

    baseValue: 1,

    levelUpBonus: 1,

    color: "violet",
  },

  discipline: {
    name: "Discipline",
    description: "Consistency, meditation, focus, and self-control.",
    icon: "🎯",

    categories: [
      "meditation",
      "personal",
    ],

    baseValue: 1,

    levelUpBonus: 1,

    color: "amber",
  },

  charisma: {
    name: "Charisma",
    description: "Communication, relationships, and social growth.",
    icon: "✨",

    categories: [
      "social",
      "work",
    ],

    baseValue: 1,

    levelUpBonus: 1,

    color: "rose",
  },
} satisfies Record<
  Attribute,
  {
    name: string;
    description: string;
    icon: string;
    categories: readonly string[];
    baseValue: number;
    levelUpBonus: number;
    color: string;
  }
>;

export const ATTRIBUTE_LIST = Object.keys(
  ATTRIBUTE_CONFIG,
) as Attribute[];

export function getAttributeConfig(attribute: Attribute) {
  return ATTRIBUTE_CONFIG[attribute];
}

export function getAttributeFromCategory(
  category: string,
): Attribute {
  const normalizedCategory = category.toLowerCase();

  for (const attribute of ATTRIBUTE_LIST) {
    const config = ATTRIBUTE_CONFIG[attribute];

    if (
      config.categories.some(
        (item) => item.toLowerCase() === normalizedCategory,
      )
    ) {
      return attribute;
    }
  }

  return "discipline";
}

export type AttributeConfig = typeof ATTRIBUTE_CONFIG;