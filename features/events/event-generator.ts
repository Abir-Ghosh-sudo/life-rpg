import type {
  RandomEvent,
  UserEvent,
} from "@/types/event";

import {
  generateEventReward,
  selectRandomEvent,
  type GeneratedEventReward,
} from "@/features/events/random-events";

export interface EventGenerationOptions {
  now?: Date;
  durationOverrideHours?: number;
}

export interface GeneratedRandomEvent {
  definition: RandomEvent;
  reward: GeneratedEventReward;
  expiresAt: Date | null;
}

export interface EventGenerationResult {
  event: GeneratedRandomEvent | null;
  generated: boolean;
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

export function calculateEventExpiry(
  event: RandomEvent,
  now = new Date(),
  durationOverrideHours?: number,
): Date | null {
  const duration =
    durationOverrideHours ??
    toNumber(
      event.durationHours,
      0,
    );

  if (
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    return null;
  }

  return new Date(
    now.getTime() +
      duration * 60 * 60 * 1000,
  );
}

export function generateEventInstance(
  events: RandomEvent[],
  options: EventGenerationOptions = {},
): GeneratedRandomEvent | null {
  const event =
    selectRandomEvent(events);

  if (!event) {
    return null;
  }

  const now =
    options.now ?? new Date();

  const reward =
    generateEventReward(event);

  const expiresAt =
    calculateEventExpiry(
      event,
      now,
      options.durationOverrideHours,
    );

  return {
    definition: event,
    reward,
    expiresAt,
  };
}

export function generateRandomEventResult(
  events: RandomEvent[],
  options: EventGenerationOptions = {},
): EventGenerationResult {
  const event =
    generateEventInstance(
      events,
      options,
    );

  return {
    event,
    generated: event !== null,
  };
}

export function buildUserEventPayload(
  userId: string,
  generated: GeneratedRandomEvent,
): Record<string, unknown> {
  const {
    definition,
    reward,
    expiresAt,
  } = generated;

  return {
    user_id: userId,
    event_id: definition.id,
    status: "active",
    xp_reward: reward.xp,
    gold_reward: reward.gold,
    energy_change: reward.energy,
    hp_change: reward.hp,
    expires_at:
      expiresAt?.toISOString() ??
      null,
    metadata: {
      generatedAt:
        new Date().toISOString(),
      eventType:
        definition.type,
      isPositive:
        Boolean(
          definition.isPositive,
        ),
    },
  };
}

export function getEventTitle(
  event: RandomEvent,
): string {
  return (
    String(
      event.name ?? "",
    ).trim() ||
    "Mysterious Event"
  );
}

export function getEventDescription(
  event: RandomEvent,
): string {
  return (
    String(
      event.description ?? "",
    ).trim() ||
    "A mysterious event has appeared on your adventure."
  );
}

export function getEventDurationLabel(
  event: RandomEvent,
): string {
  const hours = toNumber(
    event.durationHours,
    0,
  );

  if (hours <= 0) {
    return "No time limit";
  }

  if (hours < 1) {
    return `${Math.round(
      hours * 60,
    )}m`;
  }

  if (
    Number.isInteger(hours)
  ) {
    return `${hours}h`;
  }

  return `${hours.toFixed(1)}h`;
}

export function isEventAvailable(
  event: RandomEvent,
): boolean {
  return Boolean(
    event.isActive,
  );
}

export function filterAvailableEvents(
  events: RandomEvent[],
): RandomEvent[] {
  return events.filter(
    isEventAvailable,
  );
}

export function sortEventsByProbability(
  events: RandomEvent[],
): RandomEvent[] {
  return [...events].sort(
    (a, b) =>
      toNumber(
        b.probability,
      ) -
      toNumber(
        a.probability,
      ),
  );
}

export function getEventRewardPreview(
  event: RandomEvent,
): GeneratedEventReward {
  return generateEventReward(
    event,
  );
}

export function isGeneratedEventExpired(
  event: GeneratedRandomEvent,
  now = new Date(),
): boolean {
  if (!event.expiresAt) {
    return false;
  }

  return (
    event.expiresAt.getTime() <=
    now.getTime()
  );
}