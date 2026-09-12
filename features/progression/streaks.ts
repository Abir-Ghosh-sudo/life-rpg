function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function differenceInCalendarDays(left: Date | string, right: Date | string): number {
  const startLeft = startOfDay(left).getTime();
  const startRight = startOfDay(right).getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((startLeft - startRight) / msPerDay);
}

/**
 * Normalize a date to the start of its local calendar day.
 */
function normalizeDate(date: Date | string): Date {
  return startOfDay(
    typeof date === "string" ? new Date(date) : date,
  );
}

/**
 * Check whether two dates belong to the same calendar day.
 */
export function isSameDay(
  first: Date | string,
  second: Date | string,
): boolean {
  return (
    normalizeDate(first).getTime() ===
    normalizeDate(second).getTime()
  );
}

/**
 * Check whether the second date is exactly one day after the first.
 */
export function isConsecutiveDay(
  previousDate: Date | string,
  currentDate: Date | string,
): boolean {
  return (
    differenceInCalendarDays(
      normalizeDate(currentDate),
      normalizeDate(previousDate),
    ) === 1
  );
}

/**
 * Calculate the next streak value.
 *
 * Rules:
 * - Same day → keep current streak.
 * - Next consecutive day → increase by 1.
 * - Any gap → reset to 1.
 * - No previous activity → start at 1.
 */
export function calculateNextStreak(
  currentStreak: number,
  lastActivityDate: Date | string | null,
  activityDate: Date | string = new Date(),
): number {
  const safeStreak = Math.max(
    0,
    Math.floor(currentStreak),
  );

  if (!lastActivityDate) {
    return 1;
  }

  if (isSameDay(lastActivityDate, activityDate)) {
    return safeStreak;
  }

  if (
    isConsecutiveDay(
      lastActivityDate,
      activityDate,
    )
  ) {
    return safeStreak + 1;
  }

  return 1;
}

/**
 * Determine whether today's activity should extend the streak.
 */
export function shouldIncreaseStreak(
  lastActivityDate: Date | string | null,
  activityDate: Date | string = new Date(),
): boolean {
  if (!lastActivityDate) {
    return true;
  }

  return (
    !isSameDay(lastActivityDate, activityDate) &&
    isConsecutiveDay(lastActivityDate, activityDate)
  );
}

/**
 * Determine whether a streak has been broken.
 */
export function isStreakBroken(
  lastActivityDate: Date | string | null,
  currentDate: Date | string = new Date(),
): boolean {
  if (!lastActivityDate) {
    return false;
  }

  return (
    differenceInCalendarDays(
      normalizeDate(currentDate),
      normalizeDate(lastActivityDate),
    ) > 1
  );
}

/**
 * Get a safe streak value after checking the current activity date.
 */
export function getStreakAfterActivity(
  currentStreak: number,
  lastActivityDate: Date | string | null,
  activityDate: Date | string = new Date(),
): number {
  return calculateNextStreak(
    currentStreak,
    lastActivityDate,
    activityDate,
  );
}

/**
 * Check whether a streak milestone has been reached.
 */
export function isStreakMilestone(
  streak: number,
  milestones: readonly number[] = [3, 7, 14, 30, 60, 100],
): boolean {
  return milestones.includes(Math.max(0, Math.floor(streak)));
}