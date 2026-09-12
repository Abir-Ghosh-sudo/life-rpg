import type { Attribute } from "@/types/common";
import type { CharacterClass } from "@/types/character";

export const SKILL_CONFIG = {
  iron_will: {
    name: "Iron Will",
    description:
      "Increase maximum HP and reduce the impact of failed quests.",
    type: "passive",
    icon: "🛡️",

    attribute: "discipline" as Attribute,

    requiredLevel: 3,
    requiredXp: 250,

    prerequisiteSkillId: null,

    effectValue: 10,

    classes: ["warrior", "monk"] as CharacterClass[],
  },

  mental_fortress: {
    name: "Mental Fortress",
    description:
      "Increase maximum energy for longer focus and productivity sessions.",
    type: "passive",
    icon: "🧠",

    attribute: "intellect" as Attribute,

    requiredLevel: 5,
    requiredXp: 500,

    prerequisiteSkillId: null,

    effectValue: 15,

    classes: ["mage", "monk"] as CharacterClass[],
  },

  quick_learner: {
    name: "Quick Learner",
    description:
      "Gain additional XP from coding and study quests.",
    type: "passive",
    icon: "📖",

    attribute: "intellect" as Attribute,

    requiredLevel: 5,
    requiredXp: 500,

    prerequisiteSkillId: null,

    effectValue: 10,

    classes: ["mage", "ranger"] as CharacterClass[],
  },

  battle_focus: {
    name: "Battle Focus",
    description:
      "Increase rewards from difficult and epic quests.",
    type: "passive",
    icon: "⚔️",

    attribute: "strength" as Attribute,

    requiredLevel: 7,
    requiredXp: 750,

    prerequisiteSkillId: "iron_will",

    effectValue: 10,

    classes: ["warrior"] as CharacterClass[],
  },

  meditation_mastery: {
    name: "Meditation Mastery",
    description:
      "Improve rewards from focus and meditation activities.",
    type: "passive",
    icon: "🧘",

    attribute: "discipline" as Attribute,

    requiredLevel: 7,
    requiredXp: 750,

    prerequisiteSkillId: "mental_fortress",

    effectValue: 15,

    classes: ["monk"] as CharacterClass[],
  },

  treasure_sense: {
    name: "Treasure Sense",
    description:
      "Increase the chance of discovering rare rewards and items.",
    type: "passive",
    icon: "💎",

    attribute: "wisdom" as Attribute,

    requiredLevel: 8,
    requiredXp: 1000,

    prerequisiteSkillId: "quick_learner",

    effectValue: 10,

    classes: ["ranger", "mage"] as CharacterClass[],
  },

  combo_mastery: {
    name: "Combo Mastery",
    description:
      "Increase the maximum combo multiplier.",
    type: "passive",
    icon: "🔥",

    attribute: "discipline" as Attribute,

    requiredLevel: 10,
    requiredXp: 1500,

    prerequisiteSkillId: "meditation_mastery",

    effectValue: 25,

    classes: ["monk", "warrior"] as CharacterClass[],
  },

  boss_slayer: {
    name: "Boss Slayer",
    description:
      "Deal increased damage against Daily Bosses.",
    type: "active",
    icon: "🐉",

    attribute: "strength" as Attribute,

    requiredLevel: 10,
    requiredXp: 1500,

    prerequisiteSkillId: "battle_focus",

    effectValue: 20,

    classes: ["warrior", "ranger"] as CharacterClass[],
  },

  pathfinder: {
    name: "Pathfinder",
    description:
      "Reduce requirements for unlocking adventure regions.",
    type: "utility",
    icon: "🗺️",

    attribute: "wisdom" as Attribute,

    requiredLevel: 12,
    requiredXp: 2000,

    prerequisiteSkillId: "treasure_sense",

    effectValue: 10,

    classes: ["ranger"] as CharacterClass[],
  },

  legendary_mind: {
    name: "Legendary Mind",
    description:
      "A powerful mastery skill that greatly improves intellectual rewards.",
    type: "special",
    icon: "🔮",

    attribute: "intellect" as Attribute,

    requiredLevel: 20,
    requiredXp: 5000,

    prerequisiteSkillId: "treasure_sense",

    effectValue: 25,

    classes: ["mage"] as CharacterClass[],
  },
} as const;

export const SKILL_LIST = Object.entries(
  SKILL_CONFIG,
).map(([id, skill]) => ({
  id,
  ...skill,
}));

export function getSkillConfig(id: string) {
  return SKILL_CONFIG[
    id as keyof typeof SKILL_CONFIG
  ];
}

export function getSkillsForClass(
  characterClass: CharacterClass,
) {
  return SKILL_LIST.filter((skill) =>
    skill.classes.includes(characterClass),
  );
}

export type SkillConfig = typeof SKILL_CONFIG;