import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";

import type { FocusSession } from "@/types/focus";

export interface FocusQueryOptions {
  status?: string;
  limit?: number;
  offset?: number;
}

export interface FocusStats {
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalMinutes: number;
  completedMinutes: number;
  totalXp: number;
  totalGold: number;
}

function mapFocusSession(
  row: Record<string, unknown>,
): FocusSession {
  return row as FocusSession;
}

function normalizeLimit(
  limit = 20,
): number {
  return Math.min(
    100,
    Math.max(1, Math.floor(limit)),
  );
}

function normalizeOffset(
  offset = 0,
): number {
  return Math.max(
    0,
    Math.floor(offset),
  );
}

export async function getFocusSessionById(
  sessionId: string,
): Promise<FocusSession | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  if (!sessionId?.trim()) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("focus_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? mapFocusSession(data)
    : null;
}

export async function getActiveFocusSession():
  Promise<FocusSession | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("focus_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? mapFocusSession(data)
    : null;
}

export async function getFocusSessions(
  options: FocusQueryOptions = {},
): Promise<FocusSession[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const limit =
    normalizeLimit(options.limit);

  const offset =
    normalizeOffset(options.offset);

  const supabase = await createClient();

  let query = supabase
    .from("focus_sessions")
    .select("*")
    .eq("user_id", userId);

  if (options.status) {
    query = query.eq(
      "status",
      options.status,
    );
  }

  const { data, error } =
    await query
      .order("started_at", {
        ascending: false,
      })
      .range(
        offset,
        offset + limit - 1,
      );

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(
    mapFocusSession,
  );
}

export async function getCompletedFocusSessions(
  limit = 20,
): Promise<FocusSession[]> {
  return getFocusSessions({
    status: "completed",
    limit,
  });
}

export async function getFocusHistory(
  limit = 20,
): Promise<FocusSession[]> {
  return getFocusSessions({
    limit,
  });
}

export async function getFocusStats(): Promise<FocusStats> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      totalSessions: 0,
      completedSessions: 0,
      cancelledSessions: 0,
      totalMinutes: 0,
      completedMinutes: 0,
      totalXp: 0,
      totalGold: 0,
    };
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("focus_sessions")
      .select(
        "status,duration_minutes,completed_minutes,xp_earned,gold_earned",
      )
      .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  const sessions = data ?? [];

  let completedSessions = 0;
  let cancelledSessions = 0;
  let totalMinutes = 0;
  let completedMinutes = 0;
  let totalXp = 0;
  let totalGold = 0;

  for (const session of sessions) {
    totalMinutes += Number(
      session.duration_minutes ?? 0,
    );

    completedMinutes += Number(
      session.completed_minutes ?? 0,
    );

    totalXp += Number(
      session.xp_earned ?? 0,
    );

    totalGold += Number(
      session.gold_earned ?? 0,
    );

    if (session.status === "completed") {
      completedSessions += 1;
    }

    if (session.status === "cancelled") {
      cancelledSessions += 1;
    }
  }

  return {
    totalSessions: sessions.length,
    completedSessions,
    cancelledSessions,
    totalMinutes,
    completedMinutes,
    totalXp,
    totalGold,
  };
}

export async function getTodayFocusStats() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      sessions: 0,
      minutes: 0,
      xp: 0,
      gold: 0,
    };
  }

  const supabase = await createClient();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { data, error } =
    await supabase
      .from("focus_sessions")
      .select(
        "duration_minutes,completed_minutes,xp_earned,gold_earned,status",
      )
      .eq("user_id", userId)
      .gte(
        "started_at",
        startOfDay.toISOString(),
      )
      .eq("status", "completed");

  if (error) {
    throw new Error(error.message);
  }

  const sessions = data ?? [];

  return {
    sessions: sessions.length,
    minutes: sessions.reduce(
      (sum, session) =>
        sum +
        Number(
          session.completed_minutes ??
            session.duration_minutes ??
            0,
        ),
      0,
    ),
    xp: sessions.reduce(
      (sum, session) =>
        sum +
        Number(session.xp_earned ?? 0),
      0,
    ),
    gold: sessions.reduce(
      (sum, session) =>
        sum +
        Number(session.gold_earned ?? 0),
      0,
    ),
  };
}

export async function hasActiveFocusSession(): Promise<boolean> {
  const session =
    await getActiveFocusSession();

  return session !== null;
}