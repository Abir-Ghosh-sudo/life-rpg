export const SOUND_CONFIG = {
  enabledByDefault: true,

  volume: {
    master: 0.7,
    effects: 0.8,
    ambient: 0.4,
  },

  effects: {
    questComplete: {
      file: "/sounds/quest-complete.mp3",
      volume: 0.8,
    },

    xpGain: {
      file: "/sounds/xp-gain.mp3",
      volume: 0.7,
    },

    levelUp: {
      file: "/sounds/level-up.mp3",
      volume: 1,
    },

    goldEarned: {
      file: "/sounds/gold-earned.mp3",
      volume: 0.7,
    },

    achievementUnlock: {
      file: "/sounds/achievement-unlock.mp3",
      volume: 0.9,
    },

    skillUnlock: {
      file: "/sounds/skill-unlock.mp3",
      volume: 0.9,
    },

    bossAttack: {
      file: "/sounds/boss-attack.mp3",
      volume: 0.8,
    },

    bossDefeat: {
      file: "/sounds/boss-defeat.mp3",
      volume: 1,
    },

    itemPurchase: {
      file: "/sounds/item-purchase.mp3",
      volume: 0.7,
    },

    itemEquip: {
      file: "/sounds/item-equip.mp3",
      volume: 0.7,
    },

    worldUnlock: {
      file: "/sounds/world-unlock.mp3",
      volume: 0.9,
    },

    randomEvent: {
      file: "/sounds/random-event.mp3",
      volume: 0.8,
    },

    streakMilestone: {
      file: "/sounds/streak-milestone.mp3",
      volume: 0.9,
    },

    buttonClick: {
      file: "/sounds/button-click.mp3",
      volume: 0.25,
    },

    notification: {
      file: "/sounds/notification.mp3",
      volume: 0.5,
    },
  },

  ambient: {
    dashboard: {
      file: "/sounds/ambient-dashboard.mp3",
      volume: 0.15,
      loop: true,
    },

    adventure: {
      file: "/sounds/ambient-adventure.mp3",
      volume: 0.15,
      loop: true,
    },

    boss: {
      file: "/sounds/ambient-boss.mp3",
      volume: 0.15,
      loop: true,
    },

    focus: {
      file: "/sounds/ambient-focus.mp3",
      volume: 0.1,
      loop: true,
    },
  },

  accessibility: {
    respectReducedMotion: true,

    allowMute: true,

    persistPreference: true,
  },
} as const;

export type SoundEffect =
  keyof typeof SOUND_CONFIG.effects;

export type AmbientTrack =
  keyof typeof SOUND_CONFIG.ambient;

export type SoundConfig = typeof SOUND_CONFIG;