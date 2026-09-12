import { GAME_CONFIG } from "@/config/game";

const MAX_ENERGY = GAME_CONFIG.progression.energy.max;
const ENERGY_REGEN_PER_HOUR =
  GAME_CONFIG.progression.energy.regenPerHour;
const MIN_QUEST_ENERGY =
  GAME_CONFIG.progression.energy.minQuestCost;

export type EnergyState = {
  energy: number;
  lastUpdatedAt: Date | string | null;
};

/**
 * Clamp energy between 0 and the configured maximum.
 */
export function normalizeEnergy(energy: number): number {
  if (!Number.isFinite(energy)) {
    return 0;
  }

  return Math.min(
    MAX_ENERGY,
    Math.max(0, Math.floor(energy)),
  );
}

/**
 * Calculate regenerated energy since the last update.
 */
export function calculateEnergyRegen(
  currentEnergy: number,
  lastUpdatedAt: Date | string,
  now: Date | string = new Date(),
): number {
  const last = new Date(lastUpdatedAt).getTime();
  const current = new Date(now).getTime();

  if (!Number.isFinite(last) || !Number.isFinite(current)) {
    return normalizeEnergy(currentEnergy);
  }

  const elapsedMs = Math.max(0, current - last);
  const elapsedHours = elapsedMs / (60 * 60 * 1000);

  const regenerated = Math.floor(
    elapsedHours * ENERGY_REGEN_PER_HOUR,
  );

  return normalizeEnergy(
    currentEnergy + regenerated,
  );
}

/**
 * Return the current effective energy after passive regeneration.
 */
export function getEffectiveEnergy(
  currentEnergy: number,
  lastUpdatedAt: Date | string | null,
  now: Date | string = new Date(),
): number {
  if (!lastUpdatedAt) {
    return normalizeEnergy(currentEnergy);
  }

  return calculateEnergyRegen(
    currentEnergy,
    lastUpdatedAt,
    now,
  );
}

/**
 * Check whether the player has enough energy for an action.
 */
export function hasEnoughEnergy(
  currentEnergy: number,
  cost: number,
): boolean {
  if (!Number.isFinite(cost) || cost < 0) {
    return false;
  }

  return normalizeEnergy(currentEnergy) >= Math.floor(cost);
}

/**
 * Spend energy.
 */
export function spendEnergy(
  currentEnergy: number,
  cost: number,
): number {
  const normalizedEnergy = normalizeEnergy(currentEnergy);
  const normalizedCost = Math.max(
    0,
    Math.floor(cost),
  );

  if (!hasEnoughEnergy(normalizedEnergy, normalizedCost)) {
    throw new Error("INSUFFICIENT_ENERGY");
  }

  return normalizedEnergy - normalizedCost;
}

/**
 * Restore energy.
 */
export function restoreEnergy(
  currentEnergy: number,
  amount: number,
): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    return normalizeEnergy(currentEnergy);
  }

  return normalizeEnergy(
    currentEnergy + Math.floor(amount),
  );
}

/**
 * Calculate energy available after regeneration and an action.
 */
export function calculateEnergyAfterAction(
  currentEnergy: number,
  lastUpdatedAt: Date | string | null,
  cost: number,
  now: Date | string = new Date(),
): number {
  const effectiveEnergy = getEffectiveEnergy(
    currentEnergy,
    lastUpdatedAt,
    now,
  );

  return spendEnergy(effectiveEnergy, cost);
}

/**
 * Check whether an energy cost is valid for a quest.
 */
export function isValidQuestEnergyCost(
  cost: number,
): boolean {
  return (
    Number.isFinite(cost) &&
    cost >= MIN_QUEST_ENERGY &&
    cost <= MAX_ENERGY
  );
}

/**
 * Get the minimum energy required to start a quest.
 */
export function getMinimumQuestEnergy(): number {
  return MIN_QUEST_ENERGY;
}

/**
 * Get the maximum possible energy.
 */
export function getMaximumEnergy(): number {
  return MAX_ENERGY;
}