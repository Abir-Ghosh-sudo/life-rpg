import type { Rarity } from "@/types/common";

const CURRENCY_LOCALE = "en-IN";

export function formatNumber(
  value: number,
  maximumFractionDigits = 0,
): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits,
  }).format(value);
}

export function formatGold(
  value: number,
): string {
  return `🪙 ${formatNumber(value)}`;
}

export function formatXp(
  value: number,
): string {
  return `${formatNumber(value)} XP`;
}

export function formatPercentage(
  value: number,
  maximumFractionDigits = 0,
): string {
  return `${value.toLocaleString("en-IN", {
    maximumFractionDigits,
  })}%`;
}

export function formatDuration(
  totalSeconds: number,
): string {
  const safeSeconds = Math.max(
    0,
    Math.floor(totalSeconds),
  );

  const hours = Math.floor(
    safeSeconds / 3600,
  );

  const minutes = Math.floor(
    (safeSeconds % 3600) / 60,
  );

  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

export function formatMinutes(
  minutes: number,
): string {
  const safeMinutes = Math.max(
    0,
    Math.floor(minutes),
  );

  if (safeMinutes < 60) {
    return `${safeMinutes}m`;
  }

  const hours = Math.floor(
    safeMinutes / 60,
  );

  const remainingMinutes =
    safeMinutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export function formatStreak(
  days: number,
): string {
  return `🔥 ${formatNumber(days)} day${
    days === 1 ? "" : "s"
  }`;
}

export function formatLevel(
  level: number,
): string {
  return `Lv. ${formatNumber(level)}`;
}

export function formatRarity(
  rarity: Rarity,
): string {
  return (
    rarity.charAt(0).toUpperCase() +
    rarity.slice(1)
  );
}

export function formatSignedNumber(
  value: number,
): string {
  if (value > 0) {
    return `+${formatNumber(value)}`;
  }

  return formatNumber(value);
}

export function formatCompactNumber(
  value: number,
): string {
  return new Intl.NumberFormat(
    CURRENCY_LOCALE,
    {
      notation: "compact",
      maximumFractionDigits: 1,
    },
  ).format(value);
}

export function formatName(
  value: string,
): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}