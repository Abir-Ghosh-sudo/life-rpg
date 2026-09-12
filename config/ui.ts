export const UI_CONFIG = {
  theme: {
    default: "default",

    mode: "light",

    supportedModes: [
      "light",
      "system",
    ],
  },

  animation: {
    duration: {
      instant: 0,
      fast: 0.15,
      normal: 0.25,
      slow: 0.5,
      dramatic: 0.8,
    },

    spring: {
      stiffness: 260,
      damping: 20,
      mass: 0.8,
    },

    hoverScale: 1.02,

    tapScale: 0.98,

    respectReducedMotion: true,
  },

  feedback: {
    xpPopupDuration: 1200,

    goldPopupDuration: 1000,

    achievementDuration: 3000,

    levelUpDuration: 4000,

    notificationDuration: 4000,
  },

  layout: {
    sidebarWidth: 260,

    mobileSidebarWidth: 280,

    headerHeight: 72,

    maxContentWidth: 1440,

    pagePadding: {
      mobile: 16,
      tablet: 24,
      desktop: 32,
    },
  },

  dashboard: {
    maxVisibleQuests: 5,

    maxVisibleAchievements: 4,

    maxVisibleEvents: 3,

    maxVisibleHistoryItems: 6,
  },

  responsive: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      large: 1280,
      xlarge: 1536,
    },
  },

  accessibility: {
    minimumTouchTarget: 44,

    focusRingEnabled: true,

    keyboardNavigationEnabled: true,

    screenReaderLabelsEnabled: true,

    reducedMotionSupported: true,
  },

  loading: {
    minimumSkeletonDuration: 300,

    showPageSkeleton: true,

    showCardSkeleton: true,
  },

  notifications: {
    position: "bottom-right",

    maxVisible: 3,

    duration: 4000,
  },

  particles: {
    enabled: true,

    maxParticles: 80,

    levelUpParticles: 60,

    achievementParticles: 40,

    questCompleteParticles: 20,

    respectReducedMotion: true,
  },

  visual: {
    borderRadius: {
      small: 8,
      medium: 12,
      large: 16,
      xlarge: 24,
    },

    shadows: {
      card: "0 4px 20px rgba(15, 23, 42, 0.06)",
      elevated: "0 12px 40px rgba(15, 23, 42, 0.10)",
    },

    glow: {
      enabled: true,

      intensity: 0.12,
    },
  },
} as const;

export type UIConfig = typeof UI_CONFIG;