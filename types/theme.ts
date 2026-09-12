import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

export type ThemeCategory =
  | "world"
  | "seasonal"
  | "achievement"
  | "level"
  | "special"
  | "default";

export type ThemeStatus =
  | "locked"
  | "available"
  | "unlocked"
  | "equipped";

export type Theme = {
  id: UUID;

  name: string;
  description: string;

  category: ThemeCategory;

  rarity: Rarity;

  previewImage: Nullable<string>;

  backgroundImage: Nullable<string>;

  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  requiredLevel: number;

  requiredAchievementId: Nullable<UUID>;

  price: number;

  status: ThemeStatus;

  // Optional convenience fields used by feature code
  slug?: string;
  goldCost?: number;
  isActive?: boolean;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserTheme = {
  id: UUID;

  userId: UUID;
  themeId: UUID;

  unlockedAt: ISODateString;

  equipped: boolean;

  // Optional alias fields
  isApplied?: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ThemeWithProgress = Theme & {
  userTheme: Nullable<UserTheme>;
};

export type UnlockThemeInput = {
  themeId: UUID;
};

export type EquipThemeInput = {
  themeId: UUID;
};

export type UnequipThemeInput = {
  themeId: UUID;
};

export type ThemeUnlockResult = {
  success: boolean;

  theme: Theme;

  unlockedAt: ISODateString;

  message?: string;
};

export type ThemeFilter = {
  category?: ThemeCategory;

  rarity?: Rarity;

  unlockedOnly?: boolean;

  equippedOnly?: boolean;
};

export type ThemeState = {
  themes: ThemeWithProgress[];

  activeTheme: Nullable<Theme>;

  unlockedThemes: number;

  totalThemes: number;

  isLoading: boolean;

  error: Nullable<string>;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type AppliedTheme = {
  id: UUID;

  name: string;

  colors: ThemeColors;

  backgroundImage: Nullable<string>;
};