import type {
  ID,
  ISODateString,
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

  metadata: Record<
    string,
    unknown
  > | null;

  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CreateNotificationInput {
  userId: ID;
  type: NotificationType;
  title: string;
  message: string;

  actionUrl?: string | null;
  entityType?: string | null;
  entityId?: ID | null;
  expiresAt?: ISODateString | null;
  metadata?: Record<
    string,
    unknown
  > | null;
}

export interface UpdateNotificationInput {
  isRead?: boolean;
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