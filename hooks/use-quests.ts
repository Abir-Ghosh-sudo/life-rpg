"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Quest } from "@/types/quest";

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setQuests([]);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("quests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (queryError) {
        throw queryError;
      }

      setQuests((data ?? []) as Quest[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load quests.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuests();
  }, [fetchQuests]);

  const pendingQuests = quests.filter(
    (quest) =>
      quest.status === "pending" ||
      quest.status === "in_progress",
  );

  const completedQuests = quests.filter(
    (quest) => quest.status === "completed",
  );

  const activeQuests = quests.filter(
    (quest) =>
      quest.status !== "completed" &&
      quest.status !== "cancelled",
  );

  return {
    quests,
    pendingQuests,
    completedQuests,
    activeQuests,
    loading,
    error,
    refresh: fetchQuests,
    questCount: quests.length,
    activeQuestCount: activeQuests.length,
    completedQuestCount: completedQuests.length,
  };
}