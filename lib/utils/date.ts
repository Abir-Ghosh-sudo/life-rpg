import type { ISODateString } from "@/types/common";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function toISODate(date: Date): ISODateString {
  return date.toISOString();
}

export function startOfDay(date: Date = new Date()): Date {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

export function endOfDay(date: Date = new Date()): Date {
  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
}

export function startOfWeek(date: Date = new Date()): Date {
  const result = startOfDay(date);
  const day = result.getDay();

  const daysFromMonday = day === 0 ? 6 : day - 1;

  result.setDate(
    result.getDate() - daysFromMonday,
  );

  return result;
}

export function endOfWeek(date: Date = new Date()): Date {
  const result = endOfDay(startOfWeek(date));

  result.setDate(result.getDate() + 6);

  return result;
}

export function startOfMonth(date: Date = new Date()): Date {
  const result = startOfDay(date);

  result.setDate(1);

  return result;
}

export function endOfMonth(date: Date = new Date()): Date {
  const result = endOfMonthBase(date);

  return endOfDay(result);
}

function endOfMonthBase(date: Date): Date {
  const result = new Date(date);

  result.setDate(1);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);

  return result;
}

export function addDays(
  date: Date,
  days: number,
): Date {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
}

export function subtractDays(
  date: Date,
  days: number,
): Date {
  return addDays(date, -days);
}

export function differenceInDays(
  from: Date,
  to: Date,
): number {
  const fromDay = startOfDay(from).getTime();
  const toDay = startOfDay(to).getTime();

  return Math.round(
    (toDay - fromDay) / DAY_IN_MS,
  );
}

export function isSameDay(
  first: Date,
  second: Date,
): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function isYesterday(date: Date): boolean {
  return isSameDay(
    date,
    subtractDays(new Date(), 1),
  );
}

export function isTomorrow(date: Date): boolean {
  return isSameDay(
    date,
    addDays(new Date(), 1),
  );
}

export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

export function isFuture(date: Date): boolean {
  return date.getTime() > Date.now();
}

export function daysBetween(
  from: Date,
  to: Date,
): number {
  return Math.abs(differenceInDays(from, to));
}

export function formatDateKey(
  date: Date,
): string {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDate(
  value: string | Date,
): Date {
  return value instanceof Date
    ? new Date(value)
    : new Date(value);
}

export function isValidDate(
  date: Date,
): boolean {
  return !Number.isNaN(date.getTime());
}