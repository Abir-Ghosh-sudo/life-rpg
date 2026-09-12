export const APP_CONFIG = {
  name: "Life RPG",
  shortName: "Life RPG",
  description:
    "Turn your real life into an RPG. Complete quests, gain XP, level up, unlock skills, and build your character.",
  tagline: "Level up your life.",

  version: "1.0.0",

  author: {
    name: "Life RPG Team",
  },

  urls: {
    home: "/",
    dashboard: "/dashboard",
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },

  defaults: {
    avatar: "default",
    theme: "default",
    characterClass: "warrior",
    timezone: "UTC",
    language: "en",
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  dateFormat: {
    short: "MMM d, yyyy",
    long: "MMMM d, yyyy",
    full: "EEEE, MMMM d, yyyy",
  },

  storage: {
    prefix: "life-rpg",
  },

  metadata: {
    keywords: [
      "productivity",
      "RPG",
      "habit tracker",
      "gamification",
      "quests",
      "XP",
      "level up",
      "life RPG",
      "personal growth",
    ],
  },

  social: {
    github: "",
    twitter: "",
    discord: "",
  },

  features: {
    googleAuth: true,
    emailAuth: true,
    quests: true,
    character: true,
    achievements: true,
    skillTree: true,
    adventureMap: true,
    dailyBoss: true,
    shop: true,
    inventory: true,
    focusMode: true,
    randomEvents: true,
    analytics: true,
    notifications: true,
    themes: true,
  },

  ui: {
    maxContentWidth: "1440px",
    defaultAnimationDuration: 0.25,
    toastDuration: 4000,
    skeletonRows: 5,
  },
} as const;

export type AppFeature = keyof typeof APP_CONFIG.features;