import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";
import type {
  RandomEvent,
  RandomEventStatus,
  UserEvent,
} from "@/types/event";

export interface EventQueryOptions {
  status?: RandomEventStatus;
  limit?: number;
  activeOnly?: boolean;
}

export async function getEventDefinitions(
  options: EventQueryOptions = {},
): Promise<RandomEvent[]> {
  const supabase = await createClient();

  let query = supabase
    .from("random_events")
    .select("*")
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    });

  if (options.limit) {
    query = query.limit(
      Math.min(
        Math.max(options.limit, 1),
        100,
      ),
    );
  }

  const { data, error } =
    await query;

  if (error) {
    throw new Error(
      `Failed to fetch event definitions: ${error.message}`,
    );
  }

  return (data ?? []) as RandomEvent[];
}

export async function getEventDefinitionById(
  eventId: string,
): Promise<RandomEvent | null> {
  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("random_events")
      .select("*")
      .eq("id", eventId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch event: ${error.message}`,
    );
  }

  return data as RandomEvent | null;
}

export async function getUserEvents(
  options: EventQueryOptions = {},
): Promise<UserEvent[]> {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  let query = supabase
    .from("user_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (options.status) {
    query = query.eq(
      "status",
      options.status,
    );
  }

  if (options.activeOnly) {
    query = query
      .eq("status", "active")
      .or(
        "expires_at.is.null,expires_at.gt.now()",
      );
  }

  if (options.limit) {
    query = query.limit(
      Math.min(
        Math.max(options.limit, 1),
        100,
      ),
    );
  }

  const { data, error } =
    await query;

  if (error) {
    throw new Error(
      `Failed to fetch user events: ${error.message}`,
    );
  }

  return (data ?? []) as UserEvent[];
}

export async function getUserEventById(
  eventId: string,
): Promise<UserEvent | null> {
  const userId =
    await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("user_events")
      .select("*")
      .eq("id", eventId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch user event: ${error.message}`,
    );
  }

  return data as UserEvent | null;
}

export async function getActiveUserEvents(): Promise<
  UserEvent[]
> {
  return getUserEvents({
    activeOnly: true,
    limit: 20,
  });
}

export async function getPendingUserEvents(): Promise<
  UserEvent[]
> {
  return getUserEvents({
    status: "pending",
    limit: 20,
  });
}

export async function getClaimedUserEvents(
  limit = 50,
): Promise<UserEvent[]> {
  return getUserEvents({
    status: "claimed",
    limit,
  });
}

export async function getEventHistory(
  limit = 50,
): Promise<UserEvent[]> {
  return getUserEvents({
    limit,
  });
}

export async function hasActiveRandomEvent(): Promise<boolean> {
  const events =
    await getActiveUserEvents();

  return events.length > 0;
}

export async function getLatestUserEvent(): Promise<
  UserEvent | null
> {
  const events =
    await getUserEvents({
      limit: 1,
    });

  return events[0] ?? null;
}