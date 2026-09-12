export const GAME_CONFIG = {
  appName: "Life RPG",

  starting: {
    level: 1,
    xp: 0,
    gold: 100,

    hp: 100,
    energy: 100,

    streak: 0,
    combo: 0,
  },

  progression: {
    baseXp: 100,

    levelExponent: 1.6,

    maxLevel: 100,

    xpMultiplier: 1,
  },

  energy: {
    defaultMax: 100,

    regenerationPerHour: 10,

    minimumForQuest: 5,

    maximum: 100,
  },

  combo: {
    initialMultiplier: 1,

    incrementPerQuest: 0.1,

    maximumMultiplier: 2,

    resetAfterHours: 24,
  },

  streak: {
    milestoneInterval: 7,

    maximumTrackedDays: 365,

    shieldLimit: 1,
  },

  rewards: {
    minimumXp: 5,

    maximumXp: 1000,

    minimumGold: 1,

    maximumGold: 500,
  },

  daily: {
    maximumDailyQuests: 10,

    maximumDailyChallenges: 1,

    maximumRandomEvents: 3,
  },

  boss: {
    defaultDurationHours: 24,

    minimumDamage: 1,

    maximumDamagePerAction: 500,

    rewardMultiplier: 1,
  },

  adventure: {
    startingWorld: 1,

    startingRegion: 1,

    worldsRequiredForFinale: 10,
  },

  economy: {
    minimumPurchaseQuantity: 1,

    maximumPurchaseQuantity: 99,

    minimumItemPrice: 1,

    maximumItemPrice: 100000,
  },

  focus: {
    minimumDurationMinutes: 1,

    maximumDurationMinutes: 240,

    defaultDurationMinutes: 25,

    shortBreakMinutes: 5,

    longBreakMinutes: 15,

    sessionsUntilLongBreak: 4,
  },

  limits: {
    questTitleMaxLength: 100,

    questDescriptionMaxLength: 1000,

    characterNameMaxLength: 30,

    bioMaxLength: 500,
  },
} as const;

export type GameConfig = typeof GAME_CONFIG;