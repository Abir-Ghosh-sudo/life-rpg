import type {
  UUID,
  ISODateString,
  Nullable,
} from "@/types/common";

export type Profile = {
  id: UUID;
  userId: UUID;

  displayName: string;
  username: Nullable<string>;
  bio: Nullable<string>;
  avatarUrl: Nullable<string>;

  title: Nullable<string>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CreateProfileInput = {
  displayName: string;
  username?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type UpdateProfileInput = {
  displayName?: string;
  username?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type ProfileStats = {
  level: number;
  totalXp: number;
  currentXp: number;
  xpToNextLevel: number;

  gold: number;

  currentHp: number;
  maxHp: number;

  currentEnergy: number;
  maxEnergy: number;

  currentStreak: number;
  longestStreak: number;

  completedQuests: number;
};

export type PublicProfile = {
  id: UUID;
  displayName: string;
  username: Nullable<string>;
  bio: Nullable<string>;
  avatarUrl: Nullable<string>;
  title: Nullable<string>;
  level: number;
};

export type ProfileSettings = {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  reducedMotion: boolean;
  theme: string;
  timezone: string;
};

export type UpdateProfileSettingsInput = {
  soundEnabled?: boolean;
  notificationsEnabled?: boolean;
  reducedMotion?: boolean;
  theme?: string;
  timezone?: string;
};