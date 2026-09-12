import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/features/auth/queries";

import type {
  Quest,
  QuestCategory,
  QuestDifficulty,
  QuestRarity,
  QuestStatus,
  QuestType,
} from "@/types/quest";

import type {
  QuestListResult,
  QuestQueryOptions,
  QuestStats,
} from "@/features/quests/types";

import { QUEST_CONFIG } from "@/config/quests";

/**
 * Get all quests belonging to the current authenticated user.
 */
export async function getQuests(
  options: QuestQueryOptions = {},
): Promise<QuestListResult> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      quests: [],
      total: 0,
      page: options.page ?? 1,
      pageSize: options.pageSize ?? QUEST_CONFIG.pagination.defaultPageSize,
      hasMore: false,
    };
  }

  const supabase = await createClient();

  const page = Math.max(options.page ?? 1, 1);
  const pageSize = Math.min(
    Math.max(
      options.pageSize ?? QUEST_CONFIG.pagination.defaultPageSize,
      1,
    ),
    QUEST_CONFIG.pagination.maxPageSize,
  );

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("quests")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (options.status) {
    query = query.eq("status", options.status);
  }

  if (options.category) {
    query = query.eq("category", options.category);
  }

  if (options.type) {
    query = query.eq("type", options.type);
  }

  if (options.difficulty) {
    query = query.eq("difficulty", options.difficulty);
  }

  if (options.rarity) {
    query = query.eq("rarity", options.rarity);
  }

  if (options.isDaily !== undefined) {
    query = query.eq("is_daily", options.isDaily);
  }

  if (options.search?.trim()) {
    const search = options.search.trim().replace(/[%_]/g, "\\$&");

    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%`,
    );
  }

  const {
    data,
    error,
    count,
  } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(`Failed to fetch quests: ${error.message}`);
  }

  const quests = (data ?? []) as Quest[];
  const total = count ?? 0;

  return {
    quests,
    total,
    page,
    pageSize,
    hasMore: from + quests.length < total,
  };
}

/**
 * Get a single quest owned by the current authenticated user.
 */
export async function getQuestById(
  questId: string,
): Promise<Quest | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .eq("id", questId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch quest: ${error.message}`);
  }

  return data as Quest | null;
}

/**
 * Get active quests for the current user.
 */
export async function getActiveQuests(): Promise<Quest[]> {
  const result = await getQuests({
    status: "pending",
    page: 1,
    pageSize: QUEST_CONFIG.limits.maxActiveQuests,
  });

  return result.quests;
}

/**
 * Get today's daily quests.
 */
export async function getDailyQuests(): Promise<Quest[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", userId)
    .eq("is_daily", true)
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch daily quests: ${error.message}`);
  }

  return (data ?? []) as Quest[];
}

/**
 * Get quests currently marked as in progress.
 */
export async function getInProgressQuests(): Promise<Quest[]> {
  const result = await getQuests({
    status: "in_progress",
    page: 1,
    pageSize: QUEST_CONFIG.limits.maxActiveQuests,
  });

  return result.quests;
}

/**
 * Get completed quests for the current user.
 */
export async function getCompletedQuests(
  page = 1,
  pageSize = QUEST_CONFIG.pagination.defaultPageSize,
): Promise<QuestListResult> {
  return getQuests({
    status: "completed",
    page,
    pageSize,
  });
}

/**
 * Get basic quest statistics for the current user.
 */
export async function getQuestStats(): Promise<QuestStats> {
  const userId = await getCurrentUserId();

  const emptyStats: QuestStats = {
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    cancelled: 0,
    completionRate: 0,
    totalXpEarned: 0,
    totalGoldEarned: 0,
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      epic: 0,
    },
    byRarity: {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythic: 0,
    },
    byCategory: {
      coding: 0,
      study: 0,
      fitness: 0,
      health: 0,
      reading: 0,
      meditation: 0,
      work: 0,
      social: 0,
      personal: 0,
      creative: 0,
      other: 0,
    },
  };

  if (!userId) {
    return emptyStats;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quests")
    .select(
      "status,difficulty,rarity,category,xp_reward,gold_reward",
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to fetch quest stats: ${error.message}`);
  }

  const quests = data ?? [];

  const stats = { ...emptyStats };

  stats.total = quests.length;

  for (const quest of quests) {
    const status = quest.status as QuestStatus;
    const difficulty = quest.difficulty as QuestDifficulty;
    const rarity = quest.rarity as QuestRarity;
    const category = quest.category as QuestCategory;

    if (status === "completed") {
      stats.completed += 1;
      stats.totalXpEarned += quest.xp_reward ?? 0;
      stats.totalGoldEarned += quest.gold_reward ?? 0;
    }

    if (status === "pending") {
      stats.pending += 1;
    }

    if (status === "in_progress") {
      stats.inProgress += 1;
    }

    if (status === "cancelled") {
      stats.cancelled += 1;
    }

    if (difficulty in stats.byDifficulty) {
      stats.byDifficulty[difficulty] += 1;
    }

    if (rarity in stats.byRarity) {
      stats.byRarity[rarity] += 1;
    }

    if (category in stats.byCategory) {
      stats.byCategory[category] += 1;
    }
  }

  stats.completionRate =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 10000) / 100
      : 0;

  return stats;
}