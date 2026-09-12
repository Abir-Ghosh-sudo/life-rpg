export const LIMITS = {
  auth: {
    passwordMinLength: 8,
    passwordMaxLength: 128,
    nameMaxLength: 100,
    emailMaxLength: 254,
  },

  profile: {
    displayNameMaxLength: 50,
    bioMaxLength: 500,
    avatarUrlMaxLength: 2048,
  },

  quests: {
    titleMinLength: 1,
    titleMaxLength: 120,
    descriptionMaxLength: 1000,
    maxActiveQuests: 50,
    maxDailyQuests: 10,
    maxQuestChainLength: 10,
    maxTags: 10,
    maxTagLength: 30,
  },

  progression: {
    minLevel: 1,
    maxLevel: 100,
    maxXpPerAction: 10000,
    maxGoldPerAction: 10000,
    maxComboMultiplier: 2,
    maxStreakShield: 1,
  },

  character: {
    nameMinLength: 1,
    nameMaxLength: 30,
    maxHp: 100,
    maxEnergy: 100,
  },

  economy: {
    maxInventoryQuantity: 99,
    maxPurchaseQuantity: 99,
    minPurchaseQuantity: 1,
    maxWalletBalance: 1_000_000,
    maxTransactionAmount: 100_000,
  },

  boss: {
    maxDamagePerAction: 500,
    minDamagePerAction: 1,
    maxBossActionsPerDay: 20,
  },

  focus: {
    minDurationMinutes: 1,
    maxDurationMinutes: 240,
    maxSessionsPerDay: 20,
  },

  analytics: {
    maxDateRangeDays: 365,
    maxDataPoints: 500,
  },

  notifications: {
    titleMaxLength: 120,
    messageMaxLength: 500,
    maxUnread: 100,
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  security: {
    maxRequestBodySize: 1_000_000,
    maxBatchSize: 50,
  },
} as const;

export type Limits = typeof LIMITS;