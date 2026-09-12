import type {
  Attribute,
} from "@/types/common";

import type {
  CharacterClass,
  CharacterAttributeValues,
} from "@/types/character";

export const CLASS_CONFIG = {
  warrior: {
    name: "Warrior",
    description:
      "A powerful class built around strength, endurance, and physical challenges.",

    icon: "⚔️",

    primaryAttribute: "strength" as Attribute,

    startingStats: {
      strength: 5,
      intellect: 1,
      wisdom: 1,
      discipline: 3,
      charisma: 1,
    } satisfies CharacterAttributeValues,

    attributeBonuses: {
      strength: 4,
      intellect: 0,
      wisdom: 0,
      discipline: 2,
      charisma: 0,
    } satisfies CharacterAttributeValues,

    hpBonus: 25,
    energyBonus: 0,

    bonuses: {
      fitnessXpMultiplier: 1.15,
      physicalQuestMultiplier: 1.1,
    },
  },

  mage: {
    name: "Mage",
    description:
      "A knowledge-focused class that grows through learning, coding, and intellectual challenges.",

    icon: "🔮",

    primaryAttribute: "intellect" as Attribute,

    startingStats: {
      strength: 1,
      intellect: 5,
      wisdom: 3,
      discipline: 2,
      charisma: 1,
    } satisfies CharacterAttributeValues,

    attributeBonuses: {
      strength: 0,
      intellect: 4,
      wisdom: 2,
      discipline: 1,
      charisma: 0,
    } satisfies CharacterAttributeValues,

    hpBonus: 0,
    energyBonus: 25,

    bonuses: {
      codingXpMultiplier: 1.15,
      studyXpMultiplier: 1.1,
    },
  },

  ranger: {
    name: "Ranger",
    description:
      "A balanced explorer class focused on consistency, awareness, and steady progress.",

    icon: "🏹",

    primaryAttribute: "wisdom" as Attribute,

    startingStats: {
      strength: 2,
      intellect: 2,
      wisdom: 5,
      discipline: 3,
      charisma: 1,
    } satisfies CharacterAttributeValues,

    attributeBonuses: {
      strength: 1,
      intellect: 1,
      wisdom: 4,
      discipline: 2,
      charisma: 0,
    } satisfies CharacterAttributeValues,

    hpBonus: 10,
    energyBonus: 10,

    bonuses: {
      adventureXpMultiplier: 1.15,
      streakXpMultiplier: 1.1,
    },
  },

  monk: {
    name: "Monk",
    description:
      "A discipline-driven class focused on meditation, focus, consistency, and self-mastery.",

    icon: "🧘",

    primaryAttribute: "discipline" as Attribute,

    startingStats: {
      strength: 2,
      intellect: 2,
      wisdom: 3,
      discipline: 5,
      charisma: 1,
    } satisfies CharacterAttributeValues,

    attributeBonuses: {
      strength: 1,
      intellect: 1,
      wisdom: 2,
      discipline: 4,
      charisma: 0,
    } satisfies CharacterAttributeValues,

    hpBonus: 10,
    energyBonus: 20,

    bonuses: {
      focusXpMultiplier: 1.15,
      streakXpMultiplier: 1.15,
    },
  },
} satisfies Record<
  CharacterClass,
  {
    name: string;
    description: string;
    icon: string;
    primaryAttribute: Attribute;
    startingStats: CharacterAttributeValues;
    attributeBonuses: CharacterAttributeValues;
    hpBonus: number;
    energyBonus: number;
    bonuses: Record<string, number>;
  }
>;

export const CLASS_LIST = Object.keys(
  CLASS_CONFIG,
) as CharacterClass[];

export function getClassConfig(characterClass: CharacterClass) {
  return CLASS_CONFIG[characterClass];
}

export type ClassConfig = typeof CLASS_CONFIG;