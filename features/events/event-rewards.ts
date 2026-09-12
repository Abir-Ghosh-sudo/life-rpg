import type { RandomEvent } from "@/types/event";

import {
  generateEventReward,
  type GeneratedEventReward,
} from "@/features/events/random-events";

export interface EventReward {
  xp: number;
  gold: number;
  energy: number;
  hp: number;
}

export interface EventRewardInput {
  xp?: number;
  gold?: number;
  energy?: number;
  hp?: number;
}

export interface EventRewardBreakdown {
  base: EventReward;
  multiplier: number;
  final: EventReward;
}

function safeNumber(
  value: unknown,
): number {
  const number = Number(value ?? 0);

  return Number.isFinite(number)
    ? number
    : 0;
}

function nonNegative(
  value: unknown,
): number {
  return Math.max(
    0,
    Math.floor(
      safeNumber(value),
    ),
  );
}

export function normalizeEventReward(
  reward: EventRewardInput,
): EventReward {
  return {
    xp: nonNegative(reward.xp),
    gold: nonNegative(reward.gold),
    energy: Math.floor(
      safeNumber(reward.energy),
    ),
    hp: Math.floor(
      safeNumber(reward.hp),
    ),
  };
}

export function rewardFromEvent(
  event: RandomEvent,
): EventReward {
  return normalizeEventReward(
    generateEventReward(event),
  );
}

export function createEventReward(
  input: EventRewardInput = {},
): EventReward {
  return normalizeEventReward(
    input,
  );
}

export function combineEventRewards(
  ...rewards: EventRewardInput[]
): EventReward {
  return rewards.reduce<EventReward>(
    (total, reward) => ({
      xp:
        total.xp +
        nonNegative(reward.xp),

      gold:
        total.gold +
        nonNegative(reward.gold),

      energy:
        total.energy +
        Math.floor(
          safeNumber(
            reward.energy,
          ),
        ),

      hp:
        total.hp +
        Math.floor(
          safeNumber(reward.hp),
        ),
    }),
    {
      xp: 0,
      gold: 0,
      energy: 0,
      hp: 0,
    },
  );
}

export function multiplyEventReward(
  reward: EventRewardInput,
  multiplier: number,
): EventReward {
  const normalized =
    normalizeEventReward(
      reward,
    );

  const safeMultiplier =
    Math.max(
      0,
      safeNumber(multiplier),
    );

  return {
    xp: Math.floor(
      normalized.xp *
        safeMultiplier,
    ),

    gold: Math.floor(
      normalized.gold *
        safeMultiplier,
    ),

    energy: Math.floor(
      normalized.energy *
        safeMultiplier,
    ),

    hp: Math.floor(
      normalized.hp *
        safeMultiplier,
    ),
  };
}

export function applyEventRewardMultiplier(
  reward: EventRewardInput,
  multiplier: number,
): EventRewardBreakdown {
  const base =
    normalizeEventReward(
      reward,
    );

  const final =
    multiplyEventReward(
      base,
      multiplier,
    );

  return {
    base,
    multiplier: Math.max(
      0,
      safeNumber(multiplier),
    ),
    final,
  };
}

export function clampEventReward(
  reward: EventRewardInput,
  limits: Partial<EventReward> = {},
): EventReward {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return {
    xp: Math.min(
      normalized.xp,
      limits.xp !== undefined
        ? nonNegative(limits.xp)
        : normalized.xp,
    ),

    gold: Math.min(
      normalized.gold,
      limits.gold !== undefined
        ? nonNegative(limits.gold)
        : normalized.gold,
    ),

    energy: Math.min(
      normalized.energy,
      limits.energy !== undefined
        ? Math.floor(
            safeNumber(
              limits.energy,
            ),
          )
        : normalized.energy,
    ),

    hp: Math.min(
      normalized.hp,
      limits.hp !== undefined
        ? Math.floor(
            safeNumber(limits.hp),
          )
        : normalized.hp,
    ),
  };
}

export function hasEventReward(
  reward: EventRewardInput,
): boolean {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return (
    normalized.xp > 0 ||
    normalized.gold > 0 ||
    normalized.energy !== 0 ||
    normalized.hp !== 0
  );
}

export function getEventRewardValue(
  reward: EventRewardInput,
): number {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return (
    normalized.xp +
    normalized.gold
  );
}

export function getPositiveRewardValue(
  reward: EventRewardInput,
): number {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return (
    normalized.xp +
    normalized.gold +
    Math.max(
      0,
      normalized.energy,
    ) +
    Math.max(
      0,
      normalized.hp,
    )
  );
}

export function getRewardSummary(
  reward: EventRewardInput,
): string[] {
  const normalized =
    normalizeEventReward(
      reward,
    );

  const summary: string[] = [];

  if (normalized.xp > 0) {
    summary.push(
      `+${normalized.xp} XP`,
    );
  }

  if (normalized.gold > 0) {
    summary.push(
      `+${normalized.gold} Gold`,
    );
  }

  if (normalized.energy !== 0) {
    summary.push(
      normalized.energy > 0
        ? `+${normalized.energy} Energy`
        : `${normalized.energy} Energy`,
    );
  }

  if (normalized.hp !== 0) {
    summary.push(
      normalized.hp > 0
        ? `+${normalized.hp} HP`
        : `${normalized.hp} HP`,
    );
  }

  return summary;
}

export function isRewardPositive(
  reward: EventRewardInput,
): boolean {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return (
    normalized.xp > 0 ||
    normalized.gold > 0 ||
    normalized.energy > 0 ||
    normalized.hp > 0
  );
}

export function isRewardNegative(
  reward: EventRewardInput,
): boolean {
  const normalized =
    normalizeEventReward(
      reward,
    );

  return (
    normalized.energy < 0 ||
    normalized.hp < 0
  );
}

export function toEventReward(
  reward: GeneratedEventReward,
): EventReward {
  return normalizeEventReward(
    reward,
  );
}