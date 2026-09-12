import type { ActivityHistory } from "@/types/analytics";

export interface AggregatedPeriod {
  period: string;
  xp: number;
  gold: number;
  quests: number;
  completedQuests: number;
  activities: number;
  focusMinutes: number;
}

export interface AnalyticsTrend {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  direction: "up" | "down" | "flat";
}

export type AggregationPeriod =
  | "day"
  | "week"
  | "month";

function toNumber(
  value: unknown,
): number {
  const number = Number(value ?? 0);

  return Number.isFinite(number)
    ? number
    : 0;
}

function getDate(
  value: string | Date,
): Date {
  return value instanceof Date
    ? value
    : new Date(value);
}

function getDayKey(
  value: string | Date,
): string {
  return getDate(value)
    .toISOString()
    .slice(0, 10);
}

function getWeekKey(
  value: string | Date,
): string {
  const date = getDate(value);

  const day =
    date.getUTCDay();

  const diff =
    day === 0 ? -6 : 1 - day;

  const monday =
    new Date(date);

  monday.setUTCDate(
    monday.getUTCDate() + diff,
  );

  return monday
    .toISOString()
    .slice(0, 10);
}

function getMonthKey(
  value: string | Date,
): string {
  const date = getDate(value);

  return [
    date.getUTCFullYear(),
    String(
      date.getUTCMonth() + 1,
    ).padStart(2, "0"),
  ].join("-");
}

function getPeriodKey(
  value: string | Date,
  period: AggregationPeriod,
): string {
  switch (period) {
    case "week":
      return getWeekKey(value);

    case "month":
      return getMonthKey(value);

    case "day":
    default:
      return getDayKey(value);
  }
}

function isQuest(
  activity: ActivityHistory,
): boolean {
  return (
    String(
      activity.entityType ?? "",
    ).toLowerCase() === "quest"
  );
}

function isCompletedQuest(
  activity: ActivityHistory,
): boolean {
  if (!isQuest(activity)) {
    return false;
  }

  const action =
    String(
      activity.action ?? "",
    ).toLowerCase();

  return (
    action === "complete" ||
    action === "completed"
  );
}

function getFocusMinutes(
  activity: ActivityHistory,
): number {
  const type =
    String(
      activity.entityType ?? "",
    ).toLowerCase();

  if (
    type !== "focus" &&
    type !== "focus_session"
  ) {
    return 0;
  }

  const metadata =
    activity.metadata;

  return toNumber(
    metadata?.minutes ??
      metadata?.durationMinutes ??
      metadata?.completedMinutes,
  );
}

export function aggregateActivities(
  activities: ActivityHistory[],
  period: AggregationPeriod = "day",
): AggregatedPeriod[] {
  const groups =
    new Map<string, AggregatedPeriod>();

  for (const activity of activities) {
    const key = getPeriodKey(
      activity.createdAt,
      period,
    );

    const existing =
      groups.get(key) ?? {
        period: key,
        xp: 0,
        gold: 0,
        quests: 0,
        completedQuests: 0,
        activities: 0,
        focusMinutes: 0,
      };

    existing.xp += toNumber(
      activity.xpEarned,
    );

    existing.gold += toNumber(
      activity.goldEarned,
    );

    existing.activities += 1;

    if (isQuest(activity)) {
      existing.quests += 1;
    }

    if (isCompletedQuest(activity)) {
      existing.completedQuests += 1;
    }

    existing.focusMinutes +=
      getFocusMinutes(activity);

    groups.set(key, existing);
  }

  return Array.from(
    groups.values(),
  ).sort((a, b) =>
    a.period.localeCompare(
      b.period,
    ),
  );
}

export function aggregateDaily(
  activities: ActivityHistory[],
): AggregatedPeriod[] {
  return aggregateActivities(
    activities,
    "day",
  );
}

export function aggregateWeekly(
  activities: ActivityHistory[],
): AggregatedPeriod[] {
  return aggregateActivities(
    activities,
    "week",
  );
}

export function aggregateMonthly(
  activities: ActivityHistory[],
): AggregatedPeriod[] {
  return aggregateActivities(
    activities,
    "month",
  );
}

export function calculateTrend(
  current: number,
  previous: number,
): AnalyticsTrend {
  const change =
    current - previous;

  const changePercentage =
    previous === 0
      ? current === 0
        ? 0
        : 100
      : (change / previous) * 100;

  let direction:
    | "up"
    | "down"
    | "flat";

  if (change > 0) {
    direction = "up";
  } else if (change < 0) {
    direction = "down";
  } else {
    direction = "flat";
  }

  return {
    current,
    previous,
    change,
    changePercentage,
    direction,
  };
}

export function getLatestPeriodTrend(
  periods: AggregatedPeriod[],
  selector: (
    period: AggregatedPeriod,
  ) => number,
): AnalyticsTrend {
  if (periods.length === 0) {
    return calculateTrend(0, 0);
  }

  const current =
    selector(
      periods[periods.length - 1],
    );

  const previous =
    periods.length > 1
      ? selector(
          periods[periods.length - 2],
        )
      : 0;

  return calculateTrend(
    current,
    previous,
  );
}

export function getAggregationTotals(
  periods: AggregatedPeriod[],
): AggregatedPeriod {
  return periods.reduce(
    (total, period) => ({
      period: "total",
      xp: total.xp + period.xp,
      gold:
        total.gold + period.gold,
      quests:
        total.quests + period.quests,
      completedQuests:
        total.completedQuests +
        period.completedQuests,
      activities:
        total.activities +
        period.activities,
      focusMinutes:
        total.focusMinutes +
        period.focusMinutes,
    }),
    {
      period: "total",
      xp: 0,
      gold: 0,
      quests: 0,
      completedQuests: 0,
      activities: 0,
      focusMinutes: 0,
    },
  );
}

export function fillMissingPeriods(
  periods: AggregatedPeriod[],
  keys: string[],
): AggregatedPeriod[] {
  const existing =
    new Map(
      periods.map((period) => [
        period.period,
        period,
      ]),
    );

  return keys.map(
    (key) =>
      existing.get(key) ?? {
        period: key,
        xp: 0,
        gold: 0,
        quests: 0,
        completedQuests: 0,
        activities: 0,
        focusMinutes: 0,
      },
  );
}