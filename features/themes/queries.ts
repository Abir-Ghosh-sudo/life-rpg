import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type {
  Theme,
  UserTheme,
} from "@/types/theme";

import type {
  ThemeQueryOptions,
} from "@/features/themes/types";

function mapTheme(
  row: Record<string, unknown>,
): Theme {
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: String(
      row.description ?? "",
    ),
    primaryColor: String(
      row.primary_color ?? "",
    ),
    secondaryColor: String(
      row.secondary_color ?? "",
    ),
    accentColor: String(
      row.accent_color ?? "",
    ),
    backgroundColor: String(
      row.background_color ?? "",
    ),
    surfaceColor: String(
      row.surface_color ?? "",
    ),
    textColor: String(
      row.text_color ?? "",
    ),
    requiredLevel: Number(
      row.required_level ?? 1,
    ),
    goldCost: Number(
      row.gold_cost ?? 0,
    ),
    isDefault: Boolean(
      row.is_default,
    ),
    isActive: Boolean(
      row.is_active ?? true,
    ),
    metadata:
      (row.metadata as Record<
        string,
        unknown
      > | null) ?? null,
    createdAt: String(
      row.created_at,
    ),
    updatedAt: String(
      row.updated_at,
    ),
  };
}

function mapUserTheme(
  row: Record<string, unknown>,
): UserTheme {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    themeId: String(row.theme_id),
    isApplied: Boolean(
      row.is_applied,
    ),
    unlockedAt: String(
      row.unlocked_at,
    ),
    appliedAt:
      row.applied_at
        ? String(row.applied_at)
        : null,
    createdAt: String(
      row.created_at,
    ),
    updatedAt: String(
      row.updated_at,
    ),
  };
}

export async function getThemeById(
  themeId: string,
): Promise<Theme | null> {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("themes")
      .select("*")
      .eq("id", themeId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch theme: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  return mapTheme(
    data as Record<
      string,
      unknown
    >,
  );
}

export async function getThemeBySlug(
  slug: string,
): Promise<Theme | null> {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("themes")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch theme: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  return mapTheme(
    data as Record<
      string,
      unknown
    >,
  );
}

export async function getThemes(
  options: ThemeQueryOptions = {},
): Promise<Theme[]> {
  const supabase =
    await createClient();

  let query = supabase
    .from("themes")
    .select("*")
    .order(
      "required_level",
      { ascending: true },
    );

  if (
    options.activeOnly !== false
  ) {
    query = query.eq(
      "is_active",
      true,
    );
  }

  if (
    options.defaultOnly
  ) {
    query = query.eq(
      "is_default",
      true,
    );
  }

  if (
    options.minLevel !==
    undefined
  ) {
    query = query.gte(
      "required_level",
      options.minLevel,
    );
  }

  const { data, error } =
    await query;

  if (error) {
    throw new Error(
      `Failed to fetch themes: ${error.message}`,
    );
  }

  return (data ?? []).map(
    (row) =>
      mapTheme(
        row as Record<
          string,
          unknown
        >,
      ),
  );
}

export async function getUserThemes(): Promise<
  UserTheme[]
> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("user_themes")
      .select("*")
      .eq("user_id", userId)
      .order(
        "created_at",
        { ascending: false },
      );

  if (error) {
    throw new Error(
      `Failed to fetch user themes: ${error.message}`,
    );
  }

  return (data ?? []).map(
    (row) =>
      mapUserTheme(
        row as Record<
          string,
          unknown
        >,
      ),
  );
}

export async function getUserThemeByThemeId(
  themeId: string,
): Promise<UserTheme | null> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("user_themes")
      .select("*")
      .eq("user_id", userId)
      .eq("theme_id", themeId)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch user theme: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  return mapUserTheme(
    data as Record<
      string,
      unknown
    >,
  );
}

export async function getAppliedTheme(): Promise<
  Theme | null
> {
  const userId =
    await requireUserId();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("user_themes")
      .select(
        "*, themes(*)",
      )
      .eq("user_id", userId)
      .eq("is_applied", true)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch applied theme: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  const row =
    data as Record<
      string,
      unknown
    >;

  const theme =
    row.themes as
      | Record<string, unknown>
      | null;

  return theme
    ? mapTheme(theme)
    : null;
}

export async function getAvailableThemes(): Promise<
  Array<{
    theme: Theme;
    unlocked: boolean;
    applied: boolean;
  }>
> {
  const [
    themes,
    userThemes,
  ] = await Promise.all([
    getThemes(),
    getUserThemes(),
  ]);

  const userThemeMap =
    new Map(
      userThemes.map(
        (item) => [
          item.themeId,
          item,
        ],
      ),
    );

  return themes.map(
    (theme) => {
      const userTheme =
        userThemeMap.get(
          theme.id,
        );

      return {
        theme,
        unlocked:
          Boolean(userTheme),
        applied:
          userTheme?.isApplied ??
          false,
      };
    },
  );
}