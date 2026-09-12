import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getThemeById,
  getThemeBySlug,
} from "@/features/themes/queries";

import type { Theme } from "@/types/theme";

export interface ApplyThemeResult {
  success: boolean;
  theme?: Theme;
  message?: string;
}

export async function applyThemeById(
  themeId: string,
): Promise<ApplyThemeResult> {
  const userId =
    await requireUserId();

  const theme =
    await getThemeById(themeId);

  if (!theme) {
    return {
      success: false,
      message: "Theme not found.",
    };
  }

  return applyThemeRecord(
    userId,
    theme,
  );
}

export async function applyThemeBySlug(
  slug: string,
): Promise<ApplyThemeResult> {
  const userId =
    await requireUserId();

  const theme =
    await getThemeBySlug(slug);

  if (!theme) {
    return {
      success: false,
      message: "Theme not found.",
    };
  }

  return applyThemeRecord(
    userId,
    theme,
  );
}

async function applyThemeRecord(
  userId: string,
  theme: Theme,
): Promise<ApplyThemeResult> {
  if (!theme.isActive) {
    return {
      success: false,
      message:
        "This theme is currently unavailable.",
    };
  }

  const supabase =
    await createClient();

  const { data: ownedTheme, error: ownedError } =
    await supabase
      .from("user_themes")
      .select("id")
      .eq("user_id", userId)
      .eq("theme_id", theme.id)
      .maybeSingle();

  if (ownedError) {
    throw new Error(
      `Failed to verify theme ownership: ${ownedError.message}`,
    );
  }

  if (!ownedTheme) {
    return {
      success: false,
      message:
        "Unlock this theme before applying it.",
    };
  }

  /*
   * Only one theme should be active for a user.
   * Clear the previous selection first, then apply
   * the requested theme.
   */
  const { error: resetError } =
    await supabase
      .from("user_themes")
      .update({
        is_applied: false,
      })
      .eq("user_id", userId)
      .eq("is_applied", true);

  if (resetError) {
    throw new Error(
      `Failed to clear current theme: ${resetError.message}`,
    );
  }

  const { error: applyError } =
    await supabase
      .from("user_themes")
      .update({
        is_applied: true,
        applied_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("theme_id", theme.id);

  if (applyError) {
    throw new Error(
      `Failed to apply theme: ${applyError.message}`,
    );
  }

  return {
    success: true,
    theme,
    message: `${theme.name} applied successfully.`,
  };
}

export function buildThemeCssVariables(
  theme: Theme,
): Record<string, string> {
  return {
    "--theme-primary":
      theme.primaryColor,
    "--theme-secondary":
      theme.secondaryColor,
    "--theme-accent":
      theme.accentColor,
    "--theme-background":
      theme.backgroundColor,
    "--theme-surface":
      theme.surfaceColor,
    "--theme-text":
      theme.textColor,
  };
}