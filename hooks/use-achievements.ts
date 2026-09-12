"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserAchievement } from "@/types/achievement";

export function useAchievements() {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAchievements([]);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id)
        .order("unlocked_at", { ascending: false });

      if (queryError) {
        throw queryError;
      }

      setAchievements((data ?? []) as UserAchievement[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load achievements.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAchievements();
  }, [fetchAchievements]);

  const unlockedAchievements = useMemo(
    () =>
      achievements.filter(
        (achievement) => achievement.unlocked_at !== null,
      ),
    [achievements],
  );

  const unlockedCount = unlockedAchievements.length;

  return {
    achievements,
    unlockedAchievements,
    unlockedCount,
    loading,
    error,
    refresh: fetchAchievements,
    hasAchievements: achievements.length > 0,
  };
}