"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserTheme } from "@/types/theme";

export function useTheme() {
  const [themes, setThemes] = useState<UserTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThemes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setThemes([]);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("user_themes")
        .select("*")
        .eq("user_id", user.id)
        .order("unlocked_at", { ascending: false });

      if (queryError) {
        throw queryError;
      }

      setThemes((data ?? []) as UserTheme[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load themes.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchThemes();
  }, [fetchThemes]);

  const unlockedThemes = useMemo(
    () => themes.filter((theme) => theme.unlockedAt !== null),
    [themes],
  );

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.equipped) ?? null,
    [themes],
  );

  return {
    themes,
    unlockedThemes,
    activeTheme,
    loading,
    error,
    refresh: fetchThemes,
    unlockedCount: unlockedThemes.length,
    hasThemes: themes.length > 0,
  };
}