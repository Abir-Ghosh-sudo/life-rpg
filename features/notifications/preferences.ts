import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

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

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enabled: true,
  questRewards: true,
  levelUps: true,
  achievements: true,
  bossEvents: true,
  randomEvents: true,
  streaks: true,
  focusSessions: true,
  shop: true,
  system: true,
};

const PREFERENCE_KEY = "notification_preferences";

function normalizePreferences(
  value: unknown,
): NotificationPreferences {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
    };
  }

  const source =
    value as Record<
      string,
      unknown
    >;

  return {
    enabled:
      typeof source.enabled === "boolean"
        ? source.enabled
        : true,

    questRewards:
      typeof source.questRewards === "boolean"
        ? source.questRewards
        : true,

    levelUps:
      typeof source.levelUps === "boolean"
        ? source.levelUps
        : true,

    achievements:
      typeof source.achievements === "boolean"
        ? source.achievements
        : true,

    bossEvents:
      typeof source.bossEvents === "boolean"
        ? source.bossEvents
        : true,

    randomEvents:
      typeof source.randomEvents === "boolean"
        ? source.randomEvents
        : true,

    streaks:
      typeof source.streaks === "boolean"
        ? source.streaks
        : true,

    focusSessions:
      typeof source.focusSessions === "boolean"
        ? source.focusSessions
        : true,

    shop:
      typeof source.shop === "boolean"
        ? source.shop
        : true,

    system:
      typeof source.system === "boolean"
        ? source.system
        : true,
  };
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("profiles")
      .select("metadata")
      .eq("id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch notification preferences: ${error.message}`,
    );
  }

  const metadata =
    data?.metadata;

  if (
    !metadata ||
    typeof metadata !== "object" ||
    Array.isArray(metadata)
  ) {
    return {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
    };
  }

  const preferences =
    (
      metadata as Record<
        string,
        unknown
      >
    )[PREFERENCE_KEY];

  return normalizePreferences(
    preferences,
  );
}

export async function updateNotificationPreferences(
  updates: Partial<NotificationPreferences>,
): Promise<NotificationPreferences> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const current =
    await getNotificationPreferences();

  const next: NotificationPreferences = {
    ...current,
    ...updates,
  };

  const { data, error } =
    await supabase
      .from("profiles")
      .select("metadata")
      .eq("id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch profile metadata: ${error.message}`,
    );
  }

  const currentMetadata =
    data?.metadata;

  const metadata =
    currentMetadata &&
    typeof currentMetadata === "object" &&
    !Array.isArray(
      currentMetadata,
    )
      ? {
          ...(currentMetadata as Record<
            string,
            unknown
          >),
        }
      : {};

  metadata[PREFERENCE_KEY] =
    next;

  const { error: updateError } =
    await supabase
      .from("profiles")
      .update({
        metadata,
      })
      .eq("id", userId);

  if (updateError) {
    throw new Error(
      `Failed to update notification preferences: ${updateError.message}`,
    );
  }

  return next;
}

export function isNotificationTypeEnabled(
  preferences: NotificationPreferences,
  type: string,
): boolean {
  if (!preferences.enabled) {
    return false;
  }

  const normalized =
    type.toLowerCase();

  switch (normalized) {
    case "quest":
    case "quest_reward":
    case "quest_completed":
      return preferences.questRewards;

    case "level_up":
    case "levelup":
      return preferences.levelUps;

    case "achievement":
    case "achievement_unlocked":
      return preferences.achievements;

    case "boss":
    case "boss_event":
      return preferences.bossEvents;

    case "random_event":
    case "event":
      return preferences.randomEvents;

    case "streak":
    case "streak_milestone":
      return preferences.streaks;

    case "focus":
    case "focus_session":
      return preferences.focusSessions;

    case "shop":
    case "shop_item":
      return preferences.shop;

    case "system":
    default:
      return preferences.system;
  }
}

export function mergeNotificationPreferences(
  current: NotificationPreferences,
  updates: Partial<NotificationPreferences>,
): NotificationPreferences {
  return {
    ...current,
    ...updates,
  };
}

export function resetNotificationPreferences(): NotificationPreferences {
  return {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
  };
}