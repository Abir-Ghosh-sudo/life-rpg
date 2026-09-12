import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";
import type { ActivityHistory } from "@/types/analytics";

export interface AnalyticsQueryOptions {
  from?: string;
  to?: string;
  limit?: number;
}

export interface AnalyticsOverview {
  totalXp: number;
  totalGold: number;
  totalQuests: number;
  completedQuests: number;
  focusMinutes: number;
  currentStreak: number;
  longestStreak: number;
}

export interface DailyActivity {
  date: string;
  xp: number;
  gold: number;
  quests: number;
  activities: number;
}

export interface CategoryActivity {
  category: string;
  count: number;
  xp: number;
  gold: number;
}

function getDateRange(options: AnalyticsQueryOptions) {
  const now = new Date();

  const from =
    options.from ??
    new Date(
      now.getTime() -
        30 * 24 * 60 * 60 * 1000,
    ).toISOString();

  const to =
    options.to ??
    now.toISOString();

  return { from, to };
}

export async function getActivityHistory(
  options: AnalyticsQueryOptions = {},
): Promise<ActivityHistory[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();
  const { from, to } =
    getDateRange(options);

  const limit = Math.min(
    Math.max(options.limit ?? 100, 1),
    500,
  );

  const { data, error } = await supabase
    .from("activity_history")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", from)
    .lte("created_at", to)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw new Error(
      `Failed to fetch activity history: ${error.message}`,
    );
  }

  return (data ?? []) as ActivityHistory[];
}

export async function getAnalyticsOverview(
  options: AnalyticsQueryOptions = {},
): Promise<AnalyticsOverview> {
  const activities =
    await getActivityHistory({
      ...options,
      limit: 500,
    });

  let totalXp = 0;
  let totalGold = 0;
  let totalQuests = 0;
  let completedQuests = 0;
  let focusMinutes = 0;

  for (const activity of activities) {
    totalXp += Number(
      activity.xpEarned ?? 0,
    );

    totalGold += Number(
      activity.goldEarned ?? 0,
    );

    const entityType =
      String(
        activity.entityType ?? "",
      ).toLowerCase();

    const action =
      String(
        activity.action ?? "",
      ).toLowerCase();

    if (entityType === "quest") {
      totalQuests += 1;

      if (
        action === "completed" ||
        action === "complete"
      ) {
        completedQuests += 1;
      }
    }

    if (
      entityType === "focus" ||
      entityType === "focus_session"
    ) {
      const metadata =
        activity.metadata;

      const minutes = Number(
        metadata?.minutes ??
          metadata?.durationMinutes ??
          0,
      );

      focusMinutes +=
        Number.isFinite(minutes)
          ? minutes
          : 0;
    }
  }

  const userId =
    await getCurrentUserId();

  let currentStreak = 0;
  let longestStreak = 0;

  if (userId) {
    const supabase =
      await createClient();

    const { data } = await supabase
      .from("characters")
      .select(
        "streak",
      )
      .eq("user_id", userId)
      .maybeSingle();

    currentStreak =
      Number(data?.streak ?? 0);
  }

  const activityDates =
    new Set(
      activities.map(
        (activity) =>
          new Date(
            activity.createdAt,
          )
            .toISOString()
            .slice(0, 10),
      ),
    );

  if (activityDates.size > 0) {
    const sortedDates =
      Array.from(activityDates)
        .sort();

    let current = 1;
    longestStreak = 1;

    for (
      let index = 1;
      index < sortedDates.length;
      index += 1
    ) {
      const previous =
        new Date(
          `${sortedDates[index - 1]}T00:00:00`,
        );

      const currentDate =
        new Date(
          `${sortedDates[index]}T00:00:00`,
        );

      const difference =
        Math.round(
          (currentDate.getTime() -
            previous.getTime()) /
            (24 * 60 * 60 * 1000),
        );

      if (difference === 1) {
        current += 1;
        longestStreak =
          Math.max(
            longestStreak,
            current,
          );
      } else {
        current = 1;
      }
    }
  }

  return {
    totalXp,
    totalGold,
    totalQuests,
    completedQuests,
    focusMinutes,
    currentStreak,
    longestStreak,
  };
}

export async function getDailyActivity(
  options: AnalyticsQueryOptions = {},
): Promise<DailyActivity[]> {
  const activities =
    await getActivityHistory({
      ...options,
      limit: 500,
    });

  const grouped =
    new Map<
      string,
      DailyActivity
    >();

  for (const activity of activities) {
    const date =
      new Date(
        activity.createdAt,
      )
        .toISOString()
        .slice(0, 10);

    const existing =
      grouped.get(date) ?? {
        date,
        xp: 0,
        gold: 0,
        quests: 0,
        activities: 0,
      };

    existing.xp += Number(
      activity.xpEarned ?? 0,
    );

    existing.gold += Number(
      activity.goldEarned ?? 0,
    );

    existing.activities += 1;

    if (
      String(
        activity.entityType ?? "",
      ).toLowerCase() === "quest"
    ) {
      existing.quests += 1;
    }

    grouped.set(
      date,
      existing,
    );
  }

  return Array.from(
    grouped.values(),
  ).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export async function getCategoryActivity(
  options: AnalyticsQueryOptions = {},
): Promise<CategoryActivity[]> {
  const activities =
    await getActivityHistory({
      ...options,
      limit: 500,
    });

  const grouped =
    new Map<
      string,
      CategoryActivity
    >();

  for (const activity of activities) {
    const metadata =
      activity.metadata;

    const category =
      String(
        metadata?.category ??
          "other",
      );

    const existing =
      grouped.get(category) ?? {
        category,
        count: 0,
        xp: 0,
        gold: 0,
      };

    existing.count += 1;
    existing.xp += Number(
      activity.xpEarned ?? 0,
    );
    existing.gold += Number(
      activity.goldEarned ?? 0,
    );

    grouped.set(
      category,
      existing,
    );
  }

  return Array.from(
    grouped.values(),
  ).sort(
    (a, b) =>
      b.count - a.count,
  );
}

export async function getRecentActivity(
  limit = 10,
): Promise<ActivityHistory[]> {
  return getActivityHistory({
    limit: Math.min(
      Math.max(limit, 1),
      50,
    ),
  });
}