import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getThemeById,
  getUserThemeByThemeId,
} from "@/features/themes/queries";

import {
  canUnlockTheme,
} from "@/features/themes/unlocks";

import type {
  ThemeUnlockResult,
  ThemeApplyResult,
  UnlockThemeInput,
  ApplyThemeInput,
} from "@/features/themes/types";

export async function unlockTheme(
  input: UnlockThemeInput,
): Promise<ThemeUnlockResult> {
  const userId =
    await requireUserId();

  const theme =
    await getThemeById(
      input.themeId,
    );

  if (!theme) {
    return {
      success: false,
      message: "Theme not found.",
    };
  }

  if (!theme.isActive) {
    return {
      success: false,
      message:
        "This theme is currently unavailable.",
    };
  }

  const existing =
    await getUserThemeByThemeId(
      input.themeId,
    );

  if (existing) {
    return {
      success: false,
      theme,
      userTheme: existing,
      message:
        "You already own this theme.",
    };
  }

  const supabase =
    await createClient();

  const {
    data: character,
    error: characterError,
  } = await supabase
    .from("characters")
    .select(
      "id, level, gold",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (characterError) {
    throw new Error(
      `Failed to fetch character: ${characterError.message}`,
    );
  }

  if (!character) {
    return {
      success: false,
      message:
        "Character not found.",
    };
  }

  const level =
    Number(character.level ?? 1);

  const gold =
    Number(character.gold ?? 0);

  if (
    !canUnlockTheme(
      theme.slug ?? theme.id,
      level,
      gold,
    )
  ) {
    if (
      level <
      theme.requiredLevel
    ) {
      return {
        success: false,
        theme,
        message:
          `Reach level ${theme.requiredLevel} to unlock this theme.`,
      };
    }

    return {
      success: false,
      theme,
      message:
        `You need ${theme.goldCost ?? theme.price} gold to unlock this theme.`,
    };
  }

  /*
   * Deduct the theme cost before granting ownership.
   *
   * The update is guarded by user_id and the current
   * gold balance, preventing a client from spending
   * another user's gold or making the balance negative.
   */
  if ((theme.goldCost ?? theme.price ?? 0) > 0) {
    const themeCost = theme.goldCost ?? theme.price ?? 0;
    const { data: updatedCharacter, error } =
      await supabase
        .from("characters")
        .update({
          gold:
            gold -
            themeCost,
        })
        .eq("id", character.id)
        .eq("user_id", userId)
        .gte(
          "gold",
          themeCost,
        )
        .select(
          "id, gold",
        )
        .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to charge theme cost: ${error.message}`,
      );
    }

    if (!updatedCharacter) {
      return {
        success: false,
        theme,
        message:
          "Theme purchase could not be completed. Please try again.",
      };
    }
  }

  const {
    data: userTheme,
    error: insertError,
  } = await supabase
    .from("user_themes")
    .insert({
      user_id: userId,
      theme_id: input.themeId,
      is_applied: false,
      unlocked_at:
        new Date().toISOString(),
    })
    .select("*")
    .single();

  if (insertError) {
    /*
     * Important: without a database transaction/RPC,
     * a failed ownership insert after charging gold
     * cannot be rolled back here. The production-safe
     * version should move this operation into a
     * SECURITY DEFINER PostgreSQL function/transaction.
     */
    throw new Error(
      `Failed to unlock theme: ${insertError.message}`,
    );
  }

  return {
    success: true,
    theme,
    userTheme,
    goldSpent:
      theme.goldCost,
    message:
      `${theme.name} unlocked successfully!`,
  };
}

export async function applyTheme(
  input: ApplyThemeInput,
): Promise<ThemeApplyResult> {
  const userId =
    await requireUserId();

  const theme =
    await getThemeById(
      input.themeId,
    );

  if (!theme) {
    return {
      success: false,
      message: "Theme not found.",
    };
  }

  if (!theme.isActive) {
    return {
      success: false,
      message:
        "This theme is currently unavailable.",
    };
  }

  const ownedTheme =
    await getUserThemeByThemeId(
      input.themeId,
    );

  if (!ownedTheme) {
    return {
      success: false,
      message:
        "Unlock this theme before applying it.",
    };
  }

  const supabase =
    await createClient();

  /*
   * Clear the previous applied theme.
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
      `Failed to reset current theme: ${resetError.message}`,
    );
  }

  const {
    data: appliedTheme,
    error: applyError,
  } = await supabase
    .from("user_themes")
    .update({
      is_applied: true,
      applied_at:
        new Date().toISOString(),
    })
    .eq("id", ownedTheme.id)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (applyError) {
    throw new Error(
      `Failed to apply theme: ${applyError.message}`,
    );
  }

  if (!appliedTheme) {
    return {
      success: false,
      message:
        "Theme could not be applied.",
    };
  }

  return {
    success: true,
    theme,
    message:
      `${theme.name} applied successfully.`,
  };
}