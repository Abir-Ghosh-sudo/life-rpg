export interface FocusTimerState {
  durationSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  progress: number;
  isComplete: boolean;
}

export interface FocusTimerConfig {
  durationMinutes: number;
  startedAt?: Date;
}

export const MIN_TIMER_MINUTES = 1;
export const MAX_TIMER_MINUTES = 240;

export function normalizeTimerMinutes(
  minutes: number,
): number {
  if (
    !Number.isFinite(minutes) ||
    minutes < MIN_TIMER_MINUTES ||
    minutes > MAX_TIMER_MINUTES
  ) {
    throw new Error(
      `Timer duration must be between ${MIN_TIMER_MINUTES} and ${MAX_TIMER_MINUTES} minutes.`,
    );
  }

  return Math.floor(minutes);
}

export function minutesToSeconds(
  minutes: number,
): number {
  return Math.max(
    0,
    Math.floor(minutes * 60),
  );
}

export function secondsToMinutes(
  seconds: number,
): number {
  return Math.max(
    0,
    Math.floor(seconds / 60),
  );
}

export function calculateElapsedSeconds(
  startedAt: Date | string,
  now = new Date(),
): number {
  const start =
    startedAt instanceof Date
      ? startedAt.getTime()
      : new Date(startedAt).getTime();

  if (Number.isNaN(start)) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      (now.getTime() - start) / 1000,
    ),
  );
}

export function calculateTimerState(
  durationSeconds: number,
  elapsedSeconds: number,
): FocusTimerState {
  const safeDuration = Math.max(
    1,
    Math.floor(durationSeconds),
  );

  const safeElapsed = Math.min(
    safeDuration,
    Math.max(
      0,
      Math.floor(elapsedSeconds),
    ),
  );

  const remainingSeconds =
    Math.max(
      0,
      safeDuration - safeElapsed,
    );

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        (safeElapsed /
          safeDuration) *
          100,
      ),
    );

  return {
    durationSeconds: safeDuration,
    elapsedSeconds: safeElapsed,
    remainingSeconds,
    progress,
    isComplete:
      remainingSeconds === 0,
  };
}

export function createTimerState(
  durationMinutes: number,
  elapsedSeconds = 0,
): FocusTimerState {
  const minutes =
    normalizeTimerMinutes(
      durationMinutes,
    );

  return calculateTimerState(
    minutesToSeconds(minutes),
    elapsedSeconds,
  );
}

export function getTimerStateFromDates(
  durationMinutes: number,
  startedAt: Date | string,
  now = new Date(),
): FocusTimerState {
  const duration =
    normalizeTimerMinutes(
      durationMinutes,
    );

  const elapsed =
    calculateElapsedSeconds(
      startedAt,
      now,
    );

  return calculateTimerState(
    minutesToSeconds(duration),
    elapsed,
  );
}

export function isTimerComplete(
  state: FocusTimerState,
): boolean {
  return (
    state.remainingSeconds <= 0 ||
    state.isComplete
  );
}

export function isTimerRunning(
  state: FocusTimerState,
): boolean {
  return (
    !state.isComplete &&
    state.remainingSeconds > 0
  );
}

export function getRemainingMilliseconds(
  state: FocusTimerState,
): number {
  return state.remainingSeconds * 1000;
}

export function formatTimer(
  totalSeconds: number,
): string {
  const safeSeconds = Math.max(
    0,
    Math.floor(totalSeconds),
  );

  const hours =
    Math.floor(safeSeconds / 3600);

  const minutes =
    Math.floor(
      (safeSeconds % 3600) / 60,
    );

  const seconds =
    safeSeconds % 60;

  if (hours > 0) {
    return [
      hours
        .toString()
        .padStart(2, "0"),
      minutes
        .toString()
        .padStart(2, "0"),
      seconds
        .toString()
        .padStart(2, "0"),
    ].join(":");
  }

  return [
    minutes
      .toString()
      .padStart(2, "0"),
    seconds
      .toString()
      .padStart(2, "0"),
  ].join(":");
}

export function getTimerPercentage(
  elapsedSeconds: number,
  durationSeconds: number,
): number {
  if (
    durationSeconds <= 0
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      (elapsedSeconds /
        durationSeconds) *
        100,
    ),
  );
}

export function getTimerEndTime(
  startedAt: Date | string,
  durationMinutes: number,
): Date {
  const start =
    startedAt instanceof Date
      ? new Date(
          startedAt.getTime(),
        )
      : new Date(startedAt);

  const duration =
    normalizeTimerMinutes(
      durationMinutes,
    );

  return new Date(
    start.getTime() +
      duration * 60 * 1000,
  );
}

export function getTimerRemainingLabel(
  remainingSeconds: number,
): string {
  if (remainingSeconds <= 0) {
    return "Complete";
  }

  return formatTimer(
    remainingSeconds,
  );
}

export function addSeconds(
  state: FocusTimerState,
  seconds: number,
): FocusTimerState {
  return calculateTimerState(
    state.durationSeconds,
    state.elapsedSeconds +
      Math.max(
        0,
        Math.floor(seconds),
      ),
  );
}

export function resetTimer(
  durationMinutes: number,
): FocusTimerState {
  return createTimerState(
    durationMinutes,
    0,
  );
}