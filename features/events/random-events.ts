import type {
  RandomEvent,
  UserEvent,
} from "@/types/event";

export interface RandomEventRoll {
  event: RandomEvent | null;
  rolled: boolean;
  probability: number;
  roll: number;
}

export interface EventRewardRange {
  min: number;
  max: number;
}

export interface GeneratedEventReward {
  xp: number;
  gold: number;
  energy: number;
  hp: number;
}

function toNumber(
  value: unknown,
  fallback = 0,
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function randomBetween(
  min: number,
  max: number,
): number {
  const lower = Math.min(
    min,
    max,
  );
  const upper = Math.max(
    min,
    max,
  );

  return Math.floor(
    Math.random() *
      (upper - lower + 1),
  ) + lower;
}

function clampProbability(
  probability: number,
): number {
  return Math.min(
    1,
    Math.max(0, probability),
  );
}

export function normalizeProbability(
  probability?: number,
): number {
  const value =
    toNumber(probability ?? 0);

  // Supports both 0–1 and 0–100 formats.
  return value > 1
    ? clampProbability(
        value / 100,
      )
    : clampProbability(value);
}

export function rollProbability(
  probability: number,
): boolean {
  const normalized =
    normalizeProbability(
      probability,
    );

  return (
    Math.random() < normalized
  );
}

export function selectRandomEvent(
  events: RandomEvent[],
): RandomEvent | null {
  if (events.length === 0) {
    return null;
  }

  const activeEvents =
    events.filter(
      (event) =>
        Boolean(event.isActive),
    );

  if (activeEvents.length === 0) {
    return null;
  }

  const totalWeight =
    activeEvents.reduce(
      (sum, event) =>
        sum +
        normalizeProbability(
          event.probability,
        ),
      0,
    );

  if (totalWeight <= 0) {
    return null;
  }

  let roll =
    Math.random() *
    totalWeight;

  for (const event of activeEvents) {
    const weight =
      normalizeProbability(
        event.probability,
      );

    roll -= weight;

    if (roll <= 0) {
      return event;
    }
  }

  return (
    activeEvents[
      activeEvents.length - 1
    ] ?? null
  );
}

export function rollRandomEvent(
  events: RandomEvent[],
): RandomEventRoll {
  if (events.length === 0) {
    return {
      event: null,
      rolled: false,
      probability: 0,
      roll: 1,
    };
  }

  const event =
    selectRandomEvent(events);

  const probability = event
    ? normalizeProbability(
        event.probability,
      )
    : 0;

  const roll = Math.random();

  return {
    event,
    rolled: event !== null,
    probability,
    roll,
  };
}

export function calculateRewardRange(
  min: unknown,
  max: unknown,
): EventRewardRange {
  const minimum = Math.max(
    0,
    Math.floor(toNumber(min)),
  );

  const maximum = Math.max(
    minimum,
    Math.floor(toNumber(max)),
  );

  return {
    min: minimum,
    max: maximum,
  };
}

export function generateRewardValue(
  range: EventRewardRange,
): number {
  return randomBetween(
    range.min,
    range.max,
  );
}

export function generateEventReward(
  event: RandomEvent,
): GeneratedEventReward {
  const xpRange =
    calculateRewardRange(
      event.minXpReward,
      event.maxXpReward,
    );

  const goldRange =
    calculateRewardRange(
      event.minGoldReward,
      event.maxGoldReward,
    );

  return {
    xp: generateRewardValue(
      xpRange,
    ),
    gold: generateRewardValue(
      goldRange,
    ),
    energy: toNumber(
      event.energyChange,
    ),
    hp: toNumber(
      event.hpChange,
    ),
  };
}

export function isEventExpired(
  event: UserEvent,
  now = new Date(),
): boolean {
  if (!event.expiresAt) {
    return false;
  }

  const expiresAt =
    new Date(event.expiresAt);

  if (
    Number.isNaN(
      expiresAt.getTime(),
    )
  ) {
    return false;
  }

  return (
    expiresAt.getTime() <=
    now.getTime()
  );
}

export function canClaimEvent(
  event: UserEvent,
  now = new Date(),
): boolean {
  const status =
    String(
      event.status ?? "",
    ).toLowerCase();

  if (
    status !== "active" &&
    status !== "pending"
  ) {
    return false;
  }

  return !isEventExpired(
    event,
    now,
  );
}

export function getEventRemainingSeconds(
  event: UserEvent,
  now = new Date(),
): number {
  if (!event.expiresAt) {
    return 0;
  }

  const expiresAt =
    new Date(event.expiresAt);

  if (
    Number.isNaN(
      expiresAt.getTime(),
    )
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      (expiresAt.getTime() -
        now.getTime()) /
        1000,
    ),
  );
}

export function getEventRemainingMinutes(
  event: UserEvent,
  now = new Date(),
): number {
  return Math.ceil(
    getEventRemainingSeconds(
      event,
      now,
    ) / 60,
  );
}

export function isPositiveEvent(
  event: RandomEvent,
): boolean {
  return Boolean(
    event.isPositive,
  );
}

export function getEventType(
  event: RandomEvent,
): string {
  return String(
    event.type ?? "random",
  );
}

export function getEventRewardTotal(
  reward: GeneratedEventReward,
): number {
  return (
    Math.max(0, reward.xp) +
    Math.max(0, reward.gold)
  );
}

export function applyRewardMultiplier(
  reward: GeneratedEventReward,
  multiplier: number,
): GeneratedEventReward {
  const safeMultiplier =
    Math.max(
      0,
      Number(multiplier) || 0,
    );

  return {
    xp: Math.floor(
      reward.xp * safeMultiplier,
    ),
    gold: Math.floor(
      reward.gold * safeMultiplier,
    ),
    energy: reward.energy,
    hp: reward.hp,
  };
}

export function hasMeaningfulReward(
  reward: GeneratedEventReward,
): boolean {
  return (
    reward.xp !== 0 ||
    reward.gold !== 0 ||
    reward.energy !== 0 ||
    reward.hp !== 0
  );
}