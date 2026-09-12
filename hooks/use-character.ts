"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Character } from "@/types/character";

export function useCharacter() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCharacter(null);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("characters")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (queryError) {
        throw queryError;
      }

      setCharacter(data as Character | null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load character.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCharacter();
  }, [fetchCharacter]);

  return {
    character,
    loading,
    error,
    refresh: fetchCharacter,
    hasCharacter: Boolean(character),
  };
}