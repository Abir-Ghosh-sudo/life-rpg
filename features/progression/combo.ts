import { GAME_CONFIG } from "@/config/game";

export type ComboState = {
  multiplier: number;
  lastCompletionAt: Date | string | null;
};

/**
 * Return the configured combo multiplier increase.
 */
function getComboIncrement(): number {
  return GAME_CONFIG.combo.incrementPerQuest;
}

/**
 * Return the configured maximum combo multiplier.
 */
function getMaxComboMultiplier(): number {
  return GAME_CONFIG.combo.maximumMultiplier;
}

/**
 * Return the combo reset window in milliseconds.
 */
function getComboResetWindow(): number {
  return GAME_CONFIG.combo.resetAfterHours * 60 * 60 * 1000;
}

/**
 * Calculate the combo multiplier for a given combo count.
 */
export function calculateComboMultiplier(combo: number): number {
  if (combo <= 0) {
    return 1;
  }

  const multiplier = 1 + combo * getComboIncrement();
  return Math.min(getMaxComboMultiplier(), multiplier);
}

/**
 * Increment combo count safely.
 */
export function incrementCombo(combo: number): number {
  const safe = Math.max(0, combo);
  return safe + 1;
}

/**
 * Reset combo count to zero.
 */
export function resetCombo(): number {
  return 0;
}

/**
 * Get multiplier for a combo count.
 */
export function getComboMultiplier(combo: number): number {
  return calculateComboMultiplier(combo);
}

/**
 * Check whether a combo window has expired.
 */
export function isComboExpired(
  lastActivity: Date | string | null,
  now: Date | string = new Date(),
): boolean {
  if (!lastActivity) {
    return false;
  }

  const last = new Date(lastActivity).getTime();
  const current = new Date(now).getTime();

  if (!Number.isFinite(last) || !Number.isFinite(current)) {
    return false;
  }

  return current - last > getComboResetWindow();
}

/**
 * Check whether a combo is still active.
 */
export function isComboActive(
  lastCompletionAt: Date | string | null,
  now: Date | string = new Date(),
): boolean {
  if (!lastCompletionAt) {
    return false;
  }

  return !isComboExpired(lastCompletionAt, now);
}

/**
 * Calculate the next combo multiplier after a completion.
 */
export function calculateNextCombo(
  currentMultiplier: number,
  lastCompletionAt: Date | string | null,
  completionAt: Date | string = new Date(),
): number {
  const safeMultiplier = Math.max(
    1,
    Number.isFinite(currentMultiplier)
      ? currentMultiplier
      : 1,
  );

  if (!lastCompletionAt) {
    return Math.min(
      getMaxComboMultiplier(),
      safeMultiplier + getComboIncrement(),
    );
  }

  if (!isComboActive(lastCompletionAt, completionAt)) {
    return 1;
  }

  return Math.min(
    getMaxComboMultiplier(),
    safeMultiplier + getComboIncrement(),
  );
}

/**
 * Get a normalized combo multiplier.
 */
export function normalizeCombo(
  multiplier: number,
): number {
  if (!Number.isFinite(multiplier)) {
    return 1;
  }

  return Math.min(
    getMaxComboMultiplier(),
    Math.max(1, multiplier),
  );
}

/**
 * Apply a combo multiplier to a reward.
 */
export function applyComboMultiplier(
  reward: number,
  multiplier: number,
): number {
  if (!Number.isFinite(reward) || reward <= 0) {
    return 0;
  }

  return Math.max(
    0,
    Math.round(
      reward * normalizeCombo(multiplier),
    ),
  );
}

/**
 * Get the effective combo multiplier for a completion.
 */
export function getEffectiveCombo(
  multiplier: number,
  lastCompletionAt: Date | string | null,
  now: Date | string = new Date(),
): number {
  if (!isComboActive(lastCompletionAt, now)) {
    return 1;
  }

  return normalizeCombo(multiplier);
}