import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getEventDefinitions,
  getUserEventById,
  getActiveUserEvents,
} from "@/features/events/queries";

import {
  generateEventInstance,
  buildUserEventPayload,
} from "@/features/events/event-generator";

import {
  canClaimEvent,
} from "@/features/events/random-events";

import type {
  GenerateRandomEventInput,
  ClaimRandomEventInput,
  DismissRandomEventInput,
  EventActionResult,
  GenerateEventResult,
  UserEvent,
  RandomEvent,
  UserEventStatus,
} from "@/features/events/types";

function mapUserEvent(
  row: Record<string, unknown>,
): UserEvent {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    eventId: String(row.event_id),
    status: String(
      row.status ?? "active",
    ) as UserEvent["status"],
    xpReward: Number(
      row.xp_reward ?? 0,
    ),
    goldReward: Number(
      row.gold_reward ?? 0,
    ),
    energyChange: Number(
      row.energy_change ?? 0,
    ),
    hpChange: Number(
      row.hp_change ?? 0,
    ),
    expiresAt:
      row.expires_at
        ? String(row.expires_at)
        : null,
    claimedAt:
      row.claimed_at
        ? String(row.claimed_at)
        : null,
    dismissedAt:
      row.dismissed_at
        ? String(row.dismissed_at)
        : null,
    createdAt: String(
      row.created_at,
    ),
    updatedAt: String(
      row.updated_at,
    ),
    metadata:
      (row.metadata as Record<
        string,
        unknown
      > | null) ?? null,
  };
}

export async function generateRandomEvent(
  input: GenerateRandomEventInput = {},
): Promise<GenerateEventResult> {
  const userId =
    await requireUserId();

  /*
   * Prevent event spam. A forced generation still
   * respects the existing active-event guard.
   */
  const activeEvents =
    await getActiveUserEvents();

  if (
    activeEvents.length > 0 &&
    !input.force
  ) {
    return {
      success: false,
      event: null,
      generated: false,
      message:
        "You already have an active random event.",
    };
  }

  const definitions =
    await getEventDefinitions({
      activeOnly: true,
      limit: 100,
    });

  if (definitions.length === 0) {
    return {
      success: false,
      event: null,
      generated: false,
      message:
        "No random events are currently available.",
    };
  }

  const generated =
    generateEventInstance(
      definitions,
    );

  if (!generated) {
    return {
      success: false,
      event: null,
      generated: false,
      message:
        "No random event was triggered.",
    };
  }

  const supabase =
    await createClient();

  const payload =
    buildUserEventPayload(
      userId,
      generated,
    );

  const { data, error } =
    await supabase
      .from("user_events")
      .insert(payload)
      .select("*")
      .single();

  if (error) {
    throw new Error(
      `Failed to generate random event: ${error.message}`,
    );
  }

  const userEvent =
    mapUserEvent(
      data as Record<
        string,
        unknown
      >,
    );

  return {
    success: true,
    generated: true,
    message:
      "A random event has appeared!",
    event: {
      id: userEvent.id,
      definition:
        generated.definition as unknown as RandomEvent,
      status: userEvent.status as UserEventStatus,
      reward: {
        xp: userEvent.xpReward,
        gold: userEvent.goldReward,
        energy:
          userEvent.energyChange,
        hp: userEvent.hpChange,
      },
      expiresAt:
        userEvent.expiresAt,
      createdAt:
        userEvent.createdAt,
    },
  };
}

export async function claimRandomEvent(
  input: ClaimRandomEventInput,
): Promise<EventActionResult> {
  const userId =
    await requireUserId();

  const userEvent =
    await getUserEventById(
      input.eventId,
    );

  if (!userEvent) {
    return {
      success: false,
      message:
        "Random event not found.",
    };
  }

  if (
    userEvent.userId !== userId
  ) {
    return {
      success: false,
      message:
        "You do not own this event.",
    };
  }

  if (
    !canClaimEvent(
      userEvent,
    )
  ) {
    return {
      success: false,
      message:
        "This event can no longer be claimed.",
    };
  }

  const supabase =
    await createClient();

  /*
   * Update only an active/pending event.
   * This makes repeated claims much harder to
   * exploit and keeps the operation idempotent.
   */
  const { data, error } =
    await supabase
      .from("user_events")
      .update({
        status: "claimed",
        claimed_at:
          new Date().toISOString(),
      })
      .eq("id", input.eventId)
      .eq("user_id", userId)
      .in("status", [
        "active",
        "pending",
      ])
      .select("*")
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to claim random event: ${error.message}`,
    );
  }

  if (!data) {
    return {
      success: false,
      message:
        "Event was already claimed or is no longer available.",
    };
  }

  const claimed =
    mapUserEvent(
      data as Record<
        string,
        unknown
      >,
    );

  return {
    success: true,
    message:
      "Random event claimed successfully!",
    eventId: claimed.id,
    reward: {
      xp: claimed.xpReward,
      gold: claimed.goldReward,
      energy:
        claimed.energyChange,
      hp: claimed.hpChange,
    },
  };
}

export async function dismissRandomEvent(
  input: DismissRandomEventInput,
): Promise<EventActionResult> {
  const userId =
    await requireUserId();

  const userEvent =
    await getUserEventById(
      input.eventId,
    );

  if (!userEvent) {
    return {
      success: false,
      message:
        "Random event not found.",
    };
  }

  if (
    userEvent.userId !== userId
  ) {
    return {
      success: false,
      message:
        "You do not own this event.",
    };
  }

  if (
    userEvent.status !==
      "active" &&
    userEvent.status !==
      "pending"
  ) {
    return {
      success: false,
      message:
        "This event cannot be dismissed.",
    };
  }

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("user_events")
      .update({
        status: "dismissed",
        dismissed_at:
          new Date().toISOString(),
      })
      .eq("id", input.eventId)
      .eq("user_id", userId)
      .in("status", [
        "active",
        "pending",
      ])
      .select("*")
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to dismiss random event: ${error.message}`,
    );
  }

  if (!data) {
    return {
      success: false,
      message:
        "Event was already handled.",
    };
  }

  return {
    success: true,
    message:
      "Random event dismissed.",
    eventId: input.eventId,
  };
}