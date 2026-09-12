import {
  getThemeDefinition,
  isThemeUnlockedForLevel,
} from "@/features/themes/themes";

export interface ThemeUnlockCheck {
  themeSlug: string;
  unlocked: boolean;
  requiredLevel: number;
  currentLevel: number;
  levelMissing: number;
  goldCost: number;
}

export function checkThemeUnlock(
  themeSlug: string,
  currentLevel: number,
): ThemeUnlockCheck {
  const theme =
    getThemeDefinition(themeSlug);

  if (!theme) {
    return {
      themeSlug,
      unlocked: false,
      requiredLevel: Number.MAX_SAFE_INTEGER,
      currentLevel,
      levelMissing:
        Number.MAX_SAFE_INTEGER,
      goldCost: 0,
    };
  }

  const unlocked =
    isThemeUnlockedForLevel(
      themeSlug,
      currentLevel,
    );

  return {
    themeSlug,
    unlocked,
    requiredLevel:
      theme.requiredLevel,
    currentLevel,
    levelMissing: Math.max(
      0,
      theme.requiredLevel -
        currentLevel,
    ),
    goldCost:
      theme.goldCost,
  };
}

export function canUnlockTheme(
  themeSlug: string,
  currentLevel: number,
  currentGold: number,
): boolean {
  const theme =
    getThemeDefinition(themeSlug);

  if (!theme || !theme.isActive) {
    return false;
  }

  return (
    currentLevel >=
      theme.requiredLevel &&
    currentGold >=
      theme.goldCost
  );
}

export function getMissingThemeRequirements(
  themeSlug: string,
  currentLevel: number,
  currentGold: number,
): string[] {
  const theme =
    getThemeDefinition(themeSlug);

  if (!theme) {
    return ["Theme not found."];
  }

  const requirements: string[] =
    [];

  if (
    currentLevel <
    theme.requiredLevel
  ) {
    requirements.push(
      `Reach level ${theme.requiredLevel}.`,
    );
  }

  if (
    currentGold <
    theme.goldCost
  ) {
    requirements.push(
      `Need ${theme.goldCost - currentGold} more gold.`,
    );
  }

  return requirements;
}

export function getNextUnlockableTheme(
  currentLevel: number,
  unlockedSlugs: string[] = [],
) {
  const unlocked = new Set(
    unlockedSlugs,
  );

  return (
    Object.values(
      requireThemes(),
    )
      .filter(
        (theme) =>
          theme.isActive &&
          !unlocked.has(theme.slug) &&
          theme.requiredLevel >
            currentLevel,
      )
      .sort(
        (a, b) =>
          a.requiredLevel -
          b.requiredLevel,
      )[0] ?? null
  );
}

function requireThemes() {
  /*
   * Kept as a small compatibility layer so
   * callers only depend on this module's API.
   */
  return Object.fromEntries(
    [
      "default",
      "enchanted_forest",
      "arcane_library",
      "celestial",
      "golden_hero",
      "mythic",
    ].map((slug) => {
      const theme =
        getThemeDefinition(slug);

      return [slug, theme];
    }).filter(
      ([, theme]) => theme !== null,
    ),
  ) as Record<
    string,
    NonNullable<
      ReturnType<
        typeof getThemeDefinition
      >
    >
  >;
}