import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type {
  Notification,
} from "@/types/notification";

import type {
  NotificationQueryOptions,
} from "@/features/notifications/types";

function mapNotification(
  row: Record<string, unknown>,
): Notification {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    type: String(row.type),
    title: String(row.title),
    message: String(row.message),
    isRead: Boolean(row.is_read),
    actionUrl:
      row.action_url
        ? String(row.action_url)
        : null,
    entityType:
      row.entity_type
        ? String(row.entity_type)
        : null,
    entityId:
      row.entity_id
        ? String(row.entity_id)
        : null,
    expiresAt:
      row.expires_at
        ? String(row.expires_at)
        : null,
    metadata:
      (row.metadata as Record<
        string,
        unknown
      > | null) ?? null,
    createdAt: String(
      row.created_at,
    ),
    updatedAt: String(
      row.updated_at,
    ),
  };
}

export async function getNotifications(
  options: NotificationQueryOptions = {},
): Promise<Notification[]> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  let query = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order(
      "created_at",
      { ascending: false },
    );

  if (
    options.unreadOnly
  ) {
    query = query.eq(
      "is_read",
      false,
    );
  }

  if (options.type) {
    query = query.eq(
      "type",
      options.type,
    );
  }

  if (options.limit) {
    query = query.limit(
      options.limit,
    );
  }

  if (
    options.offset !==
    undefined
  ) {
    query = query.range(
      options.offset,
      options.offset +
        (options.limit ?? 20) -
        1,
    );
  }

  if (options.includeExpired !== true) {
    query = query.or(
      "expires_at.is.null,expires_at.gt." +
        new Date().toISOString(),
    );
  }

  const { data, error } =
    await query;

  if (error) {
    throw new Error(
      `Failed to fetch notifications: ${error.message}`,
    );
  }

  return (data ?? []).map(
    (row) =>
      mapNotification(
        row as Record<
          string,
          unknown
        >,
      ),
  );
}

export async function getNotificationById(
  notificationId: string,
): Promise<Notification | null> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("notifications")
      .select("*")
      .eq("id", notificationId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch notification: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  return mapNotification(
    data as Record<
      string,
      unknown
    >,
  );
}

export async function getUnreadNotifications(): Promise<
  Notification[]
> {
  return getNotifications({
    unreadOnly: true,
  });
}

export async function getUnreadNotificationCount(): Promise<number> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { count, error } =
    await supabase
      .from("notifications")
      .select(
        "id",
        {
          count: "exact",
          head: true,
        },
      )
      .eq("user_id", userId)
      .eq("is_read", false)
      .or(
        "expires_at.is.null,expires_at.gt." +
          new Date().toISOString(),
      );

  if (error) {
    throw new Error(
      `Failed to count notifications: ${error.message}`,
    );
  }

  return count ?? 0;
}

export async function getRecentNotifications(
  limit = 10,
): Promise<Notification[]> {
  return getNotifications({
    limit: Math.max(
      1,
      Math.min(limit, 50),
    ),
  });
}