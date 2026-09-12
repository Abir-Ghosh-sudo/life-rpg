import type { FocusSession } from "@/types/focus";

export const MIN_FOCUS_MINUTES = 1;
export const MAX_FOCUS_MINUTES = 240;

export type FocusSessionStatus =
  | "active"
  | "completed"
  | "cancelled";

export interface FocusSessionProgress {
  elapsedMinutes: number;
  remainingMinutes: number;
  percentage: number;
  completed: boolean;
}

export interface FocusSessionDuration {
  startedAt: Date;
  endsAt: Date;
  durationMinutes: number;
}

export function normalizeFocusDuration(
  minutes: number,
): number {
  if (
    !Number.isFinite(minutes) ||
    minutes < MIN_FOCUS_MINUTES ||
    minutes > MAX_FOCUS_MINUTES
  ) {
    throw new Error(
      `Focus duration must be between ${MIN_FOCUS_MINUTES} and ${MAX_FOCUS_MINUTES} minutes.`,
    );
  }

  return Math.floor(minutes);
}

export function createSessionDuration(
  minutes: number,
  startedAt = new Date(),
): FocusSessionDuration {
  const duration =
    normalizeFocusDuration(minutes);

  const start = new Date(
    startedAt.getTime(),
  );

  const endsAt = new Date(
    start.getTime() +
      duration * 60 * 1000,
  );

  return {
    startedAt: start,
    endsAt,
    durationMinutes: duration,
  };
}

export function getElapsedMinutes(
  startedAt: Date | string,
  now = new Date(),
): number {
  const start =
    startedAt instanceof Date
      ? startedAt.getTime()
      : new Date(startedAt).getTime();

  const elapsed =
    now.getTime() - start;

  return Math.max(
    0,
    Math.floor(elapsed / 60000),
  );
}

export function getRemainingMinutes(
  endsAt: Date | string,
  now = new Date(),
): number {
  const end =
    endsAt instanceof Date
      ? endsAt.getTime()
      : new Date(endsAt).getTime();

  const remaining =
    end - now.getTime();

  return Math.max(
    0,
    Math.ceil(remaining / 60000),
  );
}

export function getSessionProgress(
  session: FocusSession,
  now = new Date(),
): FocusSessionProgress {
  const duration = Math.max(
    1,
    Number(session.plannedDuration),
  );

  const elapsed = Math.min(
    duration,
    getElapsedMinutes(
      session.startedAt,
      now,
    ),
  );

  const remaining =
    Math.max(0, duration - elapsed);

  const percentage = Math.min(
    100,
    Math.max(
      0,
      (elapsed / duration) * 100,
    ),
  );

  return {
    elapsedMinutes: elapsed,
    remainingMinutes: remaining,
    percentage,
    completed:
      session.status === "completed" ||
      remaining === 0,
  };
}

export function isSessionActive(
  session: FocusSession,
): boolean {
  return session.status === "active";
}

export function isSessionCompleted(
  session: FocusSession,
): boolean {
  return session.status === "completed";
}

export function isSessionCancelled(
  session: FocusSession,
): boolean {
  return session.status === "cancelled";
}

export function canCompleteSession(
  session: FocusSession,
  now = new Date(),
): boolean {
  if (!isSessionActive(session)) {
    return false;
  }

  const progress =
    getSessionProgress(
      session,
      now,
    );

  return progress.remainingMinutes === 0;
}

export function canCancelSession(
  session: FocusSession,
): boolean {
  return isSessionActive(session);
}

export function getSessionCompletionDate(
  session: FocusSession,
): Date | null {
  if (!session.endedAt) {
    return null;
  }

  return new Date(
    session.endedAt,
  );
}

export function getSessionDurationMinutes(
  session: FocusSession,
): number {
  return Math.max(
    0,
    Number(
      session.plannedDuration ?? 0,
    ),
  );
}

export function getCompletedMinutes(
  session: FocusSession,
): number {
  return Math.min(
    getSessionDurationMinutes(session),
    Math.max(
      0,
      Number(
        session.actualDuration ?? 0,
      ),
    ),
  );
}

export function getCompletionRate(
  session: FocusSession,
): number {
  const duration =
    getSessionDurationMinutes(session);

  if (duration === 0) {
    return 0;
  }

  return Math.min(
    100,
    (getCompletedMinutes(session) /
      duration) *
      100,
  );
}

export function isPerfectSession(
  session: FocusSession,
): boolean {
  return (
    isSessionCompleted(session) &&
    getCompletedMinutes(session) >=
      getSessionDurationMinutes(session)
  );
}

export function formatFocusDuration(
  minutes: number,
): string {
  const safeMinutes = Math.max(
    0,
    Math.floor(minutes),
  );

  const hours =
    Math.floor(safeMinutes / 60);

  const remaining =
    safeMinutes % 60;

  if (hours > 0) {
    return remaining > 0
      ? `${hours}h ${remaining}m`
      : `${hours}h`;
  }

  return `${remaining}m`;
}