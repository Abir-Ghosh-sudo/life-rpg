import type {
  ID,
  ISODateString,
  PaginationMeta,
} from "@/types/common";
import type {
  Theme,
  UserTheme,
} from "@/types/theme";

export interface UnlockThemeInput {
  themeId: ID;
}

export interface ApplyThemeInput {
  themeId: ID;
}

export interface ThemeIdInput {
  themeId: ID;
}

export interface ThemeSlugInput {
  slug: string;
}

export interface ThemeQueryOptions {
  activeOnly?: boolean;
  defaultOnly?: boolean;
  minLevel?: number;
}

export interface ThemeWithStatus {
  theme: Theme;
  unlocked: boolean;
  applied: boolean;
  canUnlock: boolean;
  canApply: boolean;
  levelRequired: number;
  goldCost: number;
}

export interface ThemeListResult {
  themes: ThemeWithStatus[];
  pagination?: PaginationMeta;
}

export interface UserThemeResult {
  userTheme: UserTheme;
  theme?: Theme;
}

export interface ThemeUnlockResult {
  success: boolean;
  theme?: Theme;
  userTheme?: UserTheme;
  goldSpent?: number;
  message?: string;
}

export interface ThemeApplyResult {
  success: boolean;
  theme?: Theme;
  message?: string;
}

export interface ThemeActionResult {
  success: boolean;
  themeId?: ID;
  message?: string;
}

export interface AppliedTheme {
  theme: Theme;
  appliedAt: ISODateString | null;
}

export interface ThemeCssVariables {
  "--theme-primary": string;
  "--theme-secondary": string;
  "--theme-accent": string;
  "--theme-background": string;
  "--theme-surface": string;
  "--theme-text": string;
}

export interface ThemeUnlockRequirement {
  requiredLevel: number;
  goldCost: number;
  currentLevel: number;
  currentGold: number;
  levelUnlocked: boolean;
  affordable: boolean;
  unlocked: boolean;
}

export type ThemeStatus =
  | "locked"
  | "available"
  | "unlocked"
  | "applied";