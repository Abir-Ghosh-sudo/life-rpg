import type { Boss } from "@/types/boss";

export type BossGenerationInput = {
  name: string;
  description?: string;
  difficulty: string;
  maxHp: number;
  xpReward: number;
  goldReward: number;
  durationHours?: number;
  damagePerAction?: number;
};

export type GeneratedBossData = Omit<
  Boss,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Clamp a numeric value to a safe range.
 */
function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Generate a normalized boss definition.
 *
 * This function does not write to the database.
 */
export function generateBoss(
  input: BossGenerationInput,
): GeneratedBossData {
  const maxHp = Math.max(
    1,
    Math.floor(input.maxHp),
  );

  const xpReward = Math.max(
    0,
    Math.floor(input.xpReward),
  );

  const goldReward = Math.max(
    0,
    Math.floor(input.goldReward),
  );

  const durationHours = clamp(
    Math.floor(input.durationHours ?? 24),
    1,
    168,
  );

  const damagePerAction = clamp(
    Math.floor(input.damagePerAction ?? 10),
    1,
    500,
  );

  const now = new Date();
  const endsAt = new Date(
    now.getTime() +
      durationHours * 60 * 60 * 1000,
  );

  return {
    name: input.name.trim(),
    description:
      input.description?.trim() ||
      "A new Daily Boss has appeared.",
    difficulty: input.difficulty,
    maxHp,
    xpReward,
    goldReward,
    durationHours,
    damagePerAction,
    baseDamage: damagePerAction,
    type: "daily",
    rarity: "common",
    icon: "👹",
    status: "active",
    isActive: true,
    startsAt: now.toISOString(),
    expiresAt: endsAt.toISOString(),
    endsAt: endsAt.toISOString(),
  } as GeneratedBossData;
}

/**
 * Generate a deterministic boss name from a date.
 *
 * Useful for creating a predictable Daily Boss identity.
 */
export function generateDailyBossName(
  date: Date = new Date(),
): string {
  const day = date.toISOString().slice(0, 10);

  return `Daily Boss — ${day}`;
}

/**
 * Generate a basic Daily Boss definition.
 */
export function generateDailyBoss(
  input: Omit<
    BossGenerationInput,
    "name"
  >,
  date: Date = new Date(),
): GeneratedBossData {
  return generateBoss({
    ...input,
    name: generateDailyBossName(date),
  });
}