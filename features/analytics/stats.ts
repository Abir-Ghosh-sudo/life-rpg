import type {
  ActivityHistory,
  AnalyticsStats,
} from "@/types/analytics";

export interface StatValue {
  value: number;
  change?: number;
  changePercentage?: number;
}

export interface QuestStats {
  total: number;
  completed: number;
  completionRate: number;
  xpEarned: number;
  goldEarned: number;
}

export interface FocusStats {
  sessions: number;
  completedSessions: number;
  totalMinutes: number;
  averageMinutes: number;
  xpEarned: number;
  goldEarned: number;
}

export interface ProgressionStats {
  xpEarned: number;
  goldEarned: number;
  levelsGained: number;
  activities: number;
}

export interface ActivityStats {
  totalActivities: number;
  activeDays: number;
  averageActivitiesPerDay: number;
  longestActiveRun: number;
}

export interface AnalyticsStatSummary {
  quests: QuestStats;
  focus: FocusStats;
  progression: ProgressionStats;
  activity: ActivityStats;
}

function toNumber(
  value: unknown,
): number {
  const number = Number(value ?? 0);

  return Number.isFinite(number)
    ? number
    : 0;
}

function getDateKey(
  date: string | Date,
): string {
  return new Date(date)
    .toISOString()
    .slice(0, 10);
}

export function calculateQuestStats(
  activities: ActivityHistory[],
): QuestStats {
  const quests =
    activities.filter(
      (activity) =>
        String(
          activity.entityType ?? "",
        ).toLowerCase() === "quest",
    );

  const completed =
    quests.filter((activity) => {
      const action =
        String(
          activity.action ?? "",
        ).toLowerCase();

      return (
        action === "complete" ||
        action === "completed"
      );
    });

  const xpEarned =
    quests.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.xpEarned,
        ),
      0,
    );

  const goldEarned =
    quests.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.goldEarned,
        ),
      0,
    );

  return {
    total: quests.length,
    completed: completed.length,
    completionRate:
      quests.length > 0
        ? (completed.length /
            quests.length) *
          100
        : 0,
    xpEarned,
    goldEarned,
  };
}

export function calculateFocusStats(
  activities: ActivityHistory[],
): FocusStats {
  const focus =
    activities.filter((activity) => {
      const type =
        String(
          activity.entityType ?? "",
        ).toLowerCase();

      return (
        type === "focus" ||
        type === "focus_session"
      );
    });

  let totalMinutes = 0;

  for (const activity of focus) {
    const metadata =
      activity.metadata;

    totalMinutes += toNumber(
      metadata?.minutes ??
        metadata?.durationMinutes ??
        metadata?.completedMinutes,
    );
  }

  const completedSessions =
    focus.filter((activity) => {
      const action =
        String(
          activity.action ?? "",
        ).toLowerCase();

      return (
        action === "complete" ||
        action === "completed"
      );
    }).length;

  return {
    sessions: focus.length,
    completedSessions,
    totalMinutes,
    averageMinutes:
      focus.length > 0
        ? totalMinutes / focus.length
        : 0,
    xpEarned: focus.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.xpEarned,
        ),
      0,
    ),
    goldEarned: focus.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.goldEarned,
        ),
      0,
    ),
  };
}

export function calculateProgressionStats(
  activities: ActivityHistory[],
): ProgressionStats {
  const xpEarned =
    activities.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.xpEarned,
        ),
      0,
    );

  const goldEarned =
    activities.reduce(
      (total, activity) =>
        total +
        toNumber(
          activity.goldEarned,
        ),
      0,
    );

  const levelsGained =
    activities.filter((activity) => {
      const action =
        String(
          activity.action ?? "",
        ).toLowerCase();

      return (
        action === "level_up" ||
        action === "levelup" ||
        action === "level-up"
      );
    }).length;

  return {
    xpEarned,
    goldEarned,
    levelsGained,
    activities: activities.length,
  };
}

export function calculateActivityStats(
  activities: ActivityHistory[],
): ActivityStats {
  const dates = new Set(
    activities.map((activity) =>
      getDateKey(
        activity.createdAt,
      ),
    ),
  );

  const sortedDates =
    Array.from(dates).sort();

  let longestActiveRun =
    sortedDates.length > 0
      ? 1
      : 0;

  let currentRun =
    sortedDates.length > 0
      ? 1
      : 0;

  for (
    let index = 1;
    index < sortedDates.length;
    index += 1
  ) {
    const previous =
      new Date(
        `${sortedDates[index - 1]}T00:00:00`,
      );

    const current =
      new Date(
        `${sortedDates[index]}T00:00:00`,
      );

    const difference =
      Math.round(
        (current.getTime() -
          previous.getTime()) /
          86400000,
      );

    if (difference === 1) {
      currentRun += 1;

      longestActiveRun =
        Math.max(
          longestActiveRun,
          currentRun,
        );
    } else {
      currentRun = 1;
    }
  }

  return {
    totalActivities:
      activities.length,
    activeDays: dates.size,
    averageActivitiesPerDay:
      dates.size > 0
        ? activities.length /
          dates.size
        : 0,
    longestActiveRun,
  };
}

export function calculateAnalyticsSummary(
  activities: ActivityHistory[],
): AnalyticsStatSummary {
  return {
    quests:
      calculateQuestStats(
        activities,
      ),
    focus:
      calculateFocusStats(
        activities,
      ),
    progression:
      calculateProgressionStats(
        activities,
      ),
    activity:
      calculateActivityStats(
        activities,
      ),
  };
}

export function calculateChange(
  current: number,
  previous: number,
): StatValue {
  const change =
    current - previous;

  const changePercentage =
    previous === 0
      ? current === 0
        ? 0
        : 100
      : (change / previous) * 100;

  return {
    value: current,
    change,
    changePercentage,
  };
}

export function roundStat(
  value: number,
  decimals = 1,
): number {
  const factor =
    10 ** decimals;

  return (
    Math.round(value * factor) /
    factor
  );
}

/**
 * Converts the feature-level summary into
 * the compact analytics type used by UI.
 */
export function toAnalyticsStats(
  summary: AnalyticsStatSummary,
): AnalyticsStats {
  return {
    totalXp: summary.progression.xpEarned,
    totalGold:
      summary.progression.goldEarned,
    totalQuests:
      summary.quests.total,
    completedQuests:
      summary.quests.completed,
    focusMinutes:
      summary.focus.totalMinutes,
    activeDays:
      summary.activity.activeDays,
  } as unknown as AnalyticsStats;
}