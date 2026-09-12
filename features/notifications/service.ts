import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getNotificationById,
} from "@/features/notifications/queries";

import type {
  NotificationIdInput,
  NotificationActionResult,
} from "@/features/notifications/types";

export async function markNotificationAsRead(
  input: NotificationIdInput,
): Promise<NotificationActionResult> {
  const userId =
    await requireUserId();

  const notification =
    await getNotificationById(
      input.notificationId,
    );

  if (!notification) {
    return {
      success: false,
      message:
        "Notification not found.",
    };
  }

  if (notification.isRead) {
    return {
      success: true,
      notificationId:
        notification.id,
    };
  }

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq(
        "id",
        notification.id,
      )
      .eq(
        "user_id",
        userId,
      )
      .select("id")
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to mark notification as read: ${error.message}`,
    );
  }

  if (!data) {
    return {
      success: false,
      message:
        "Notification could not be updated.",
    };
  }

  return {
    success: true,
    notificationId:
      notification.id,
    message:
      "Notification marked as read.",
  };
}

export async function markAllNotificationsAsRead(): Promise<
  NotificationActionResult
> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { error } =
    await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq(
        "user_id",
        userId,
      )
      .eq(
        "is_read",
        false,
      );

  if (error) {
    throw new Error(
      `Failed to mark notifications as read: ${error.message}`,
    );
  }

  return {
    success: true,
    message:
      "All notifications marked as read.",
  };
}

export async function deleteNotification(
  input: NotificationIdInput,
): Promise<NotificationActionResult> {
  const userId =
    await requireUserId();

  const notification =
    await getNotificationById(
      input.notificationId,
    );

  if (!notification) {
    return {
      success: false,
      message:
        "Notification not found.",
    };
  }

  const { error } =
    await (await createClient())
      .from("notifications")
      .delete()
      .eq(
        "id",
        notification.id,
      )
      .eq(
        "user_id",
        userId,
      );

  if (error) {
    throw new Error(
      `Failed to delete notification: ${error.message}`,
    );
  }

  return {
    success: true,
    notificationId:
      notification.id,
    message:
      "Notification deleted.",
  };
}