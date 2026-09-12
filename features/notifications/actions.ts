"use server";

import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/features/notifications/service";

import type {
  NotificationIdInput,
} from "@/features/notifications/types";

export async function markNotificationAsReadAction(
  input: NotificationIdInput,
) {
  return markNotificationAsRead(input);
}

export async function markAllNotificationsAsReadAction() {
  return markAllNotificationsAsRead();
}

export async function deleteNotificationAction(
  input: NotificationIdInput,
) {
  return deleteNotification(input);
}