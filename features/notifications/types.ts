import type {
  ID,
  ISODateString,
  PaginationMeta,
} from "@/types/common";

export type NotificationType =
  | "quest"
  | "quest_reward"
  | "quest_completed"
  | "level_up"
  | "achievement"
  | "achievement_unlocked"
  | "boss"
  | "boss_event"
  | "random_event"
  | "streak"
  | "streak_milestone"
  | "focus"
  | "focus_session"
  | "shop"
  | "shop_item"
  | "system"
  | string;

export interface NotificationIdInput {
  notificationId: ID;
}

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string | null;
  entityType?: string | null;
  entityId?: ID | null;
  expiresAt?: ISODateString | null;
  metadata?: Record<string, unknown> | null;
}

export interface NotificationQueryOptions {
  unreadOnly?: boolean;
  type?: NotificationType;
  includeExpired?: boolean;
  limit?: number;
  offset?: number;
}

export interface NotificationListResult {
  notifications: Notification[];
  pagination?: PaginationMeta;
  unreadCount: number;
}

export interface NotificationActionResult {
  success: boolean;
  notificationId?: ID;
  message?: string;
}

export interface NotificationSummary {
  total: number;
  unread: number;
  read: number;
}

export interface NotificationPreferences {
  enabled: boolean;
  questRewards: boolean;
  levelUps: boolean;
  achievements: boolean;
  bossEvents: boolean;
  randomEvents: boolean;
  streaks: boolean;
  focusSessions: boolean;
  shop: boolean;
  system: boolean;
}

export interface UpdateNotificationPreferencesInput {
  preferences: Partial<NotificationPreferences>;
}

export interface NotificationWithStatus {
  notification: Notification;
  isExpired: boolean;
  isRead: boolean;
}

export interface Notification {
  id: ID;
  userId: ID;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl: string | null;
  entityType: string | null;
  entityId: ID | null;
  expiresAt: ISODateString | null;
  metadata: Record<string, unknown> | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface NotificationPayload {
  userId: ID;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string | null;
  entityType?: string | null;
  entityId?: ID | null;
  expiresAt?: ISODateString | null;
  metadata?: Record<string, unknown> | null;
}