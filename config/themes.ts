import type { Rarity } from "@/types/common";

export const THEME_CONFIG = {
  default: {
    name: "Life RPG",
    description:
      "The default light fantasy interface for your everyday adventure.",
    category: "default",
    rarity: "common" as Rarity,
    icon: "✨",

    primaryColor: "#5B5CE2",
    secondaryColor: "#8B5CF6",
    accentColor: "#F59E0B",

    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",

    requiredLevel: 1,
    price: 0,
  },

  enchanted_forest: {
    name: "Enchanted Forest",
    description:
      "A peaceful fantasy theme inspired by magical forests.",
    category: "world",
    rarity: "uncommon" as Rarity,
    icon: "🌲",

    primaryColor: "#059669",
    secondaryColor: "#10B981",
    accentColor: "#F59E0B",

    background: "#F0FDF4",
    surface: "#FFFFFF",
    text: "#064E3B",

    requiredLevel: 5,
    price: 250,
  },

  arcane_library: {
    name: "Arcane Library",
    description:
      "A mystical scholarly theme for knowledge seekers.",
    category: "world",
    rarity: "rare" as Rarity,
    icon: "🔮",

    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    accentColor: "#F59E0B",

    background: "#EEF2FF",
    surface: "#FFFFFF",
    text: "#1E1B4B",

    requiredLevel: 10,
    price: 500,
  },

  celestial: {
    name: "Celestial",
    description:
      "A luminous theme inspired by stars and the night sky.",
    category: "level",
    rarity: "epic" as Rarity,
    icon: "🌌",

    primaryColor: "#6366F1",
    secondaryColor: "#8B5CF6",
    accentColor: "#FBBF24",

    background: "#F5F3FF",
    surface: "#FFFFFF",
    text: "#312E81",

    requiredLevel: 20,
    price: 1000,
  },

  golden_hero: {
    name: "Golden Hero",
    description:
      "A prestigious theme reserved for accomplished heroes.",
    category: "achievement",
    rarity: "legendary" as Rarity,
    icon: "👑",

    primaryColor: "#D97706",
    secondaryColor: "#F59E0B",
    accentColor: "#B45309",

    background: "#FFFBEB",
    surface: "#FFFFFF",
    text: "#78350F",

    requiredLevel: 40,
    price: 2500,
  },

  mythic: {
    name: "Mythic Realm",
    description:
      "The ultimate visual realm for legendary Life RPG players.",
    category: "special",
    rarity: "mythic" as Rarity,
    icon: "💎",

    primaryColor: "#7C3AED",
    secondaryColor: "#A855F7",
    accentColor: "#EC4899",

    background: "#FAF5FF",
    surface: "#FFFFFF",
    text: "#3B0764",

    requiredLevel: 75,
    price: 5000,
  },
} as const;

export const THEME_LIST = Object.entries(
  THEME_CONFIG,
).map(([id, theme]) => ({
  id,
  ...theme,
}));

export function getThemeConfig(id: string) {
  return THEME_CONFIG[
    id as keyof typeof THEME_CONFIG
  ];
}

export function getThemesForLevel(level: number) {
  return THEME_LIST.filter(
    (theme) => theme.requiredLevel <= level,
  );
}

export type ThemeConfig = typeof THEME_CONFIG;