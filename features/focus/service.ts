import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type {
  FocusSession,
} from "@/types/focus";

const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 240;

const XP_PER_MINUTE = 2;
const GOLD_PER_MINUTE = 1;

function normalizeDuration(
  duration: number,
): number {
  if (
    !Number.isFinite(duration) ||
    duration < MIN_DURATION_MINUTES ||
    duration > MAX_DURATION_MINUTES
  ) {
    throw new Error(
      `Focus duration must be between ${MIN_DURATION_MINUTES} and ${MAX_DURATION_MINUTES} minutes.`,
    );
  }

  return Math.floor(duration);
}

function calculateRewards(
  duration: number,
) {
  return {
    xp: duration * XP_PER_MINUTE,
    gold: duration * GOLD_PER_MINUTE,
  };
}

function mapFocusSession(
  row: Record<string, unknown>,
): FocusSession {
  return row as FocusSession;
}

export async function startFocusSession(
  input: unknown,
): Promise<FocusSession> {
  const userId = await requireUserId();

  if (
    !input ||
    typeof input !== "object"
  ) {
    throw new Error(
      "Invalid focus session input.",
    );
  }

  const raw =
    input as Record<string, unknown>;

  const duration = normalizeDuration(
    Number(raw.duration ?? raw.durationMinutes),
  );

  const supabase = await createClient();

  /*
   * Prevent multiple active focus sessions.
   */
  const { data: activeSession, error: activeError } =
    await supabase
      .from("focus_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle();

  if (activeError) {
    throw new Error(activeError.message);
  }

  if (activeSession) {
    throw new Error(
      "You already have an active focus session.",
    );
  }

  const startedAt =
    new Date().toISOString();

  const endsAt = new Date(
    Date.now() +
      duration * 60 * 1000,
  ).toISOString();

  const { data, error } =
    await supabase
      .from("focus_sessions")
      .insert({
        user_id: userId,
        duration_minutes: duration,
        completed_minutes: 0,
        status: "active",
        xp_earned: 0,
        gold_earned: 0,
        started_at: startedAt,
        ends_at: endsAt,
      })
      .select("*")
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapFocusSession(data);
}

export async function completeFocusSession(
  input: unknown,
): Promise<{
  session: FocusSession;
  xp: number;
  gold: number;
}> {
  const userId = await requireUserId();

  if (
    !input ||
    typeof input !== "object"
  ) {
    throw new Error(
      "Invalid focus session input.",
    );
  }

  const raw =
    input as Record<string, unknown>;

  const sessionId =
    String(
      raw.sessionId ?? "",
    ).trim();

  if (!sessionId) {
    throw new Error(
      "Session ID is required.",
    );
  }

  const supabase = await createClient();

  const { data: session, error } =
    await supabase
      .from("focus_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!session) {
    throw new Error(
      "Focus session not found.",
    );
  }

  if (session.status !== "active") {
    throw new Error(
      "This focus session is no longer active.",
    );
  }

  const duration = normalizeDuration(
    Number(session.duration_minutes),
  );

  const rewards =
    calculateRewards(duration);

  const completedAt =
    new Date().toISOString();

  const { data: updatedSession, error: updateError } =
    await supabase
      .from("focus_sessions")
      .update({
        completed_minutes: duration,
        status: "completed",
        xp_earned: rewards.xp,
        gold_earned: rewards.gold,
        completed_at: completedAt,
      })
      .eq("id", sessionId)
      .eq("user_id", userId)
      .eq("status", "active")
      .select("*")
      .single();

  if (updateError) {
    throw new Error(
      updateError.message,
    );
  }

  return {
    session:
      mapFocusSession(updatedSession),
    xp: rewards.xp,
    gold: rewards.gold,
  };
}

export async function cancelFocusSession(
  sessionId: string,
): Promise<FocusSession> {
  const userId = await requireUserId();

  if (!sessionId?.trim()) {
    throw new Error(
      "Session ID is required.",
    );
  }

  const supabase = await createClient();

  const { data: session, error } =
    await supabase
      .from("focus_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!session) {
    throw new Error(
      "Focus session not found.",
    );
  }

  if (session.status !== "active") {
    throw new Error(
      "Only active sessions can be cancelled.",
    );
  }

  const { data, error: updateError } =
    await supabase
      .from("focus_sessions")
      .update({
        status: "cancelled",
        completed_at:
          new Date().toISOString(),
      })
      .eq("id", sessionId)
      .eq("user_id", userId)
      .eq("status", "active")
      .select("*")
      .single();

  if (updateError) {
    throw new Error(
      updateError.message,
    );
  }

  return mapFocusSession(data);
}

export async function getActiveFocusSession(): Promise<
  FocusSession | null
> {
  const userId = await requireUserId();

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

export async function calculateFocusRewards(
  durationMinutes: number,
) {
  const duration =
    normalizeDuration(
      durationMinutes,
    );

  return calculateRewards(duration);
}