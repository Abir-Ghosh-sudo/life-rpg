"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Boss, BossProgress } from "@/types/boss";

export function useBoss() {
  const [boss, setBoss] = useState<Boss | null>(null);
  const [progress, setProgress] = useState<BossProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoss = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setBoss(null);
        setProgress(null);
        return;
      }

      const { data: bossData, error: bossError } = await supabase
        .from("bosses")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (bossError) {
        throw bossError;
      }

      setBoss(bossData as Boss | null);

      if (!bossData) {
        setProgress(null);
        return;
      }

      const { data: progressData, error: progressError } = await supabase
        .from("boss_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("boss_id", bossData.id)
        .maybeSingle();

      if (progressError) {
        throw progressError;
      }

      setProgress(progressData as BossProgress | null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load boss.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBoss();
  }, [fetchBoss]);

  const maxHp = boss?.maxHp ?? 0;
  const currentHp = Math.max(0, maxHp - (progress?.damageDealt ?? 0));

  const hpPercentage =
    maxHp > 0
      ? Math.max(0, Math.min(100, (currentHp / maxHp) * 100))
      : 0;

  const isDefeated =
    progress?.defeated || currentHp <= 0;

  return {
    boss,
    progress,
    currentHp,
    maxHp,
    hpPercentage,
    isDefeated,
    loading,
    error,
    refresh: fetchBoss,
    hasActiveBoss: Boolean(boss),
  };
}