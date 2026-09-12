import {
  THEME_CONFIG,
} from "@/config/themes";

export interface ThemeDefinition {
  slug: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  requiredLevel: number;
  goldCost: number;
  isDefault: boolean;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

function normalizeTheme(
  slug: string,
  theme: typeof THEME_CONFIG[keyof typeof THEME_CONFIG],
): ThemeDefinition {
  return {
    slug,
    name: theme.name,
    description: theme.description,
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    accentColor: theme.accentColor,
    backgroundColor: theme.background,
    surfaceColor: theme.surface,
    textColor: theme.text,
    requiredLevel: theme.requiredLevel,
    goldCost: theme.price,
    isDefault: slug === "default",
    isActive: true,
    metadata: undefined,
  };
}

export const THEME_DEFINITIONS: ThemeDefinition[] =
  Object.entries(THEME_CONFIG).map(
    ([slug, theme]) => normalizeTheme(slug, theme),
  );


export function getThemeDefinition(
  slug: string,
): ThemeDefinition | null {
  return (
    THEME_DEFINITIONS.find(
      (theme) =>
        theme.slug === slug,
    ) ?? null
  );
}

export function getDefaultTheme(): ThemeDefinition {
  return (
    THEME_DEFINITIONS.find(
      (theme) =>
        theme.isDefault,
    ) ??
    THEME_DEFINITIONS[0]
  );
}

export function getActiveThemes(): ThemeDefinition[] {
  return THEME_DEFINITIONS.filter(
    (theme) =>
      theme.isActive,
  );
}

export function getThemesForLevel(
  level: number,
): ThemeDefinition[] {
  return getActiveThemes().filter(
    (theme) =>
      theme.requiredLevel <=
      level,
  );
}

export function isThemeUnlockedForLevel(
  slug: string,
  level: number,
): boolean {
  const theme =
    getThemeDefinition(slug);

  if (!theme) {
    return false;
  }

  return (
    theme.isActive &&
    level >=
      theme.requiredLevel
  );
}

export function getThemeCost(
  slug: string,
): number {
  return (
    getThemeDefinition(slug)
      ?.goldCost ?? 0
  );
}

export function canPurchaseTheme(
  slug: string,
  level: number,
  gold: number,
): boolean {
  const theme =
    getThemeDefinition(slug);

  if (!theme || !theme.isActive) {
    return false;
  }

  return (
    level >=
      theme.requiredLevel &&
    gold >= theme.goldCost
  );
}

export function getThemeSlugs(): string[] {
  return THEME_DEFINITIONS.map(
    (theme) => theme.slug,
  );
}

export function isValidThemeSlug(
  slug: string,
): boolean {
  return Boolean(
    getThemeDefinition(slug),
  );
}