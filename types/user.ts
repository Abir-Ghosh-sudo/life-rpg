import type {
  UUID,
  ISODateString,
  Nullable,
  Timestamped,
} from "@/types/common";

export type User = {
  id: UUID;
  email: string;
  displayName: string;
  avatarUrl: Nullable<string>;
  role: "user" | "admin";
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserProfile = {
  id: UUID;
  userId: UUID;
  username: Nullable<string>;
  bio: Nullable<string>;
  avatarUrl: Nullable<string>;
  title: Nullable<string>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CreateUserInput = {
  email: string;
  displayName: string;
  avatarUrl?: string | null;
};

export type UpdateUserInput = {
  displayName?: string;
  username?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type UserPreferences = {
  userId: UUID;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  reducedMotion: boolean;
  theme: string;
  timezone: string;
};

export type UpdateUserPreferencesInput = {
  soundEnabled?: boolean;
  notificationsEnabled?: boolean;
  reducedMotion?: boolean;
  theme?: string;
  timezone?: string;
};

export type UserSummary = {
  id: UUID;
  displayName: string;
  avatarUrl: Nullable<string>;
  title: Nullable<string>;
};

export type UserWithProfile = User &
  UserProfile & {
    preferences?: UserPreferences;
  };