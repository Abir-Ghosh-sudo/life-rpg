import type { Rarity } from "@/types/common";

export const WORLD_CONFIG = {
  awakening: {
    name: "The Awakening",
    description:
      "The beginning of your journey. Build your first habits and discover your potential.",
    icon: "🌅",

    order: 1,

    requiredLevel: 1,

    rarity: "common" as Rarity,

    regions: [
      "first_step",
      "training_grounds",
      "village_of_habits",
    ],

    rewards: {
      xp: 100,
      gold: 50,
    },
  },

  iron_valley: {
    name: "Iron Valley",
    description:
      "A land of discipline where consistency and physical strength are tested.",
    icon: "⛰️",

    order: 2,

    requiredLevel: 5,

    rarity: "uncommon" as Rarity,

    regions: [
      "warriors_path",
      "forge_of_discipline",
      "iron_peak",
    ],

    rewards: {
      xp: 250,
      gold: 100,
    },
  },

  crystal_library: {
    name: "Crystal Library",
    description:
      "A mystical realm of knowledge, learning, coding, and intellectual mastery.",
    icon: "📚",

    order: 3,

    requiredLevel: 10,

    rarity: "rare" as Rarity,

    regions: [
      "hall_of_knowledge",
      "arcane_studies",
      "crystal_archive",
    ],

    rewards: {
      xp: 500,
      gold: 200,
    },
  },

  emerald_wilds: {
    name: "Emerald Wilds",
    description:
      "An unexplored wilderness where wisdom, exploration, and resilience matter.",
    icon: "🌲",

    order: 4,

    requiredLevel: 15,

    rarity: "rare" as Rarity,

    regions: [
      "forest_of_focus",
      "rangers_trail",
      "emerald_sanctuary",
    ],

    rewards: {
      xp: 750,
      gold: 300,
    },
  },

  celestial_summit: {
    name: "Celestial Summit",
    description:
      "A high realm where only disciplined heroes can reach their true potential.",
    icon: "🏔️",

    order: 5,

    requiredLevel: 20,

    rarity: "epic" as Rarity,

    regions: [
      "cloud_temple",
      "monks_ascent",
      "celestial_gate",
    ],

    rewards: {
      xp: 1000,
      gold: 500,
    },
  },

  shadow_frontier: {
    name: "Shadow Frontier",
    description:
      "A dangerous frontier where your weakest habits become your greatest enemies.",
    icon: "🌑",

    order: 6,

    requiredLevel: 30,

    rarity: "epic" as Rarity,

    regions: [
      "shadow_forest",
      "lost_ruins",
      "nightmare_pass",
    ],

    rewards: {
      xp: 1500,
      gold: 750,
    },
  },

  golden_kingdom: {
    name: "Golden Kingdom",
    description:
      "A prosperous realm unlocked by mastery, achievement, and sustained progress.",
    icon: "🏰",

    order: 7,

    requiredLevel: 40,

    rarity: "legendary" as Rarity,

    regions: [
      "golden_city",
      "royal_academy",
      "heroes_court",
    ],

    rewards: {
      xp: 2500,
      gold: 1200,
    },
  },

  dragon_realm: {
    name: "Dragon Realm",
    description:
      "A legendary world where the greatest challenges await.",
    icon: "🐉",

    order: 8,

    requiredLevel: 50,

    rarity: "legendary" as Rarity,

    regions: [
      "dragon_lair",
      "flame_mountain",
      "dragon_throne",
    ],

    rewards: {
      xp: 5000,
      gold: 2500,
    },
  },

  astral_domain: {
    name: "Astral Domain",
    description:
      "A mysterious dimension beyond ordinary limits.",
    icon: "🌌",

    order: 9,

    requiredLevel: 75,

    rarity: "mythic" as Rarity,

    regions: [
      "astral_gate",
      "starfall_realm",
      "infinity_chamber",
    ],

    rewards: {
      xp: 10000,
      gold: 5000,
    },
  },

  life_mastery: {
    name: "Life Mastery",
    description:
      "The final realm. Master your quests, habits, and yourself.",
    icon: "👑",

    order: 10,

    requiredLevel: 100,

    rarity: "mythic" as Rarity,

    regions: [
      "mastery_gate",
      "hall_of_legends",
      "the_final_quest",
    ],

    rewards: {
      xp: 25000,
      gold: 10000,
    },
  },
} as const;

export const WORLD_LIST = Object.entries(
  WORLD_CONFIG,
).map(([id, world]) => ({
  id,
  ...world,
}));

export function getWorldConfig(id: string) {
  return WORLD_CONFIG[
    id as keyof typeof WORLD_CONFIG
  ];
}

export function getWorldByOrder(order: number) {
  return WORLD_LIST.find(
    (world) => world.order === order,
  );
}

export function getWorldsForLevel(level: number) {
  return WORLD_LIST.filter(
    (world) => world.requiredLevel <= level,
  );
}

export type WorldConfig = typeof WORLD_CONFIG;