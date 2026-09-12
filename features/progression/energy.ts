import { GAME_CONFIG } from "@/config/game";

const MAX_ENERGY = GAME_CONFIG.energy.maximum;
const ENERGY_REGEN_PER_HOUR = GAME_CONFIG.energy.regenerationPerHour;
const MIN_QUEST_ENERGY = GAME_CONFIG.energy.minimumForQuest;

export type EnergyState = {
  energy: number;
  lastUpdatedAt: Date | string | null;
};

/**
 * Clamp energy between 0 and the configured maximum.
 */
export function normalizeEnergy(
  energy: number,
  maxEnergy: number = MAX_ENERGY,
): number {
  if (!Number.isFinite(energy)) {
    return 0;
  }

  return Math.min(
    maxEnergy,
    Math.max(0, Math.floor(energy)),
  );
}

/**
 * Calculate regenerated energy from elapsed hours.
 */
export function calculateEnergyRegen(hours: number): number {
  if (!Number.isFinite(hours) || hours <= 0) {
    return 0;
  }

  return Math.floor(hours * ENERGY_REGEN_PER_HOUR);
}

/**
 * Return the energy amount after passive regeneration over elapsed hours.
 */
export function getEnergyAfterRegen(
  currentEnergy: number,
  hours: number,
  maxEnergy: number = MAX_ENERGY,
): number {
  const regen = calculateEnergyRegen(hours);
  return normalizeEnergy(currentEnergy + regen, maxEnergy);
}

/**
 * Consume energy and prevent dropping below zero.
 */
export function consumeEnergy(
  currentEnergy: number,
  cost: number,
): number {
  if (!Number.isFinite(cost) || cost <= 0) {
    return normalizeEnergy(currentEnergy);
  }

  return Math.max(0, normalizeEnergy(currentEnergy) - Math.floor(cost));
}

/**
 * Restore energy without exceeding maximum.
 */
export function restoreEnergy(
  currentEnergy: number,
  amount: number,
  maxEnergy: number = MAX_ENERGY,
): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    return normalizeEnergy(currentEnergy, maxEnergy);
  }

  return normalizeEnergy(
    currentEnergy + Math.floor(amount),
    maxEnergy,
  );
}

/**
 * Check whether the player can afford an energy cost.
 */
export function canAffordEnergy(
  currentEnergy: number,
  cost: number,
): boolean {
  if (!Number.isFinite(cost) || cost < 0) {
    return false;
  }

  return normalizeEnergy(currentEnergy) >= Math.floor(cost);
}

/**
 * Calculate energy percentage.
 */
export function getEnergyPercentage(
  currentEnergy: number,
  maxEnergy: number = MAX_ENERGY,
): number {
  if (maxEnergy <= 0) {
    return 0;
  }

  const safe = Math.max(0, Math.floor(currentEnergy));
  return Math.min(100, Math.max(0, Math.round((safe / maxEnergy) * 100)));
}

/**
 * Check whether energy is empty.
 */
export function isEnergyEmpty(currentEnergy: number): boolean {
  return normalizeEnergy(currentEnergy) === 0;
}

/**
 * Check whether energy is full.
 */
export function isEnergyFull(
  currentEnergy: number,
  maxEnergy: number = MAX_ENERGY,
): boolean {
  return normalizeEnergy(currentEnergy, maxEnergy) >= maxEnergy;
}

/**
 * Return the current effective energy after passive regeneration from a timestamp.
 */
export function getEffectiveEnergy(
  currentEnergy: number,
  lastUpdatedAt: Date | string | null,
  now: Date | string = new Date(),
): number {
  if (!lastUpdatedAt) {
    return normalizeEnergy(currentEnergy);
  }

  const last = new Date(lastUpdatedAt).getTime();
  const current = new Date(now).getTime();

  if (!Number.isFinite(last) || !Number.isFinite(current)) {
    return normalizeEnergy(currentEnergy);
  }

  const elapsedHours = Math.max(0, current - last) / (60 * 60 * 1000);
  return getEnergyAfterRegen(currentEnergy, elapsedHours);
}

/**
 * Check whether the player has enough energy for an action.
 */
export function hasEnoughEnergy(
  currentEnergy: number,
  cost: number,
): boolean {
  return canAffordEnergy(currentEnergy, cost);
}

/**
 * Spend energy or throw if insufficient.
 */
export function spendEnergy(
  currentEnergy: number,
  cost: number,
): number {
  const normalizedEnergy = normalizeEnergy(currentEnergy);
  const normalizedCost = Math.max(0, Math.floor(cost));

  if (!hasEnoughEnergy(normalizedEnergy, normalizedCost)) {
    throw new Error("INSUFFICIENT_ENERGY");
  }

  return normalizedEnergy - normalizedCost;
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