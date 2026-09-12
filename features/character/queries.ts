import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type {
  Character,
  CharacterStats,
} from "@/types/character";

/**
 * Get the current user's character.
 */
export async function getCurrentCharacter(): Promise<Character | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get character stats for the current user's character.
 */
export async function getCurrentCharacterStats(): Promise<CharacterStats | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: character, error: characterError } = await supabase
    .from("characters")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (characterError) {
    throw new Error(characterError.message);
  }

  if (!character) {
    return null;
  }

  const { data: stats, error: statsError } = await supabase
    .from("character_stats")
    .select("*")
    .eq("character_id", character.id)
    .maybeSingle();

  if (statsError) {
    throw new Error(statsError.message);
  }

  return stats;
}

/**
 * Get character and stats together.
 */
export async function getCurrentCharacterWithStats(): Promise<{
  character: Character;
  stats: CharacterStats;
} | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: character, error: characterError } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (characterError) {
    throw new Error(characterError.message);
  }

  if (!character) {
    return null;
  }

  const { data: stats, error: statsError } = await supabase
    .from("character_stats")
    .select("*")
    .eq("character_id", character.id)
    .maybeSingle();

  if (statsError) {
    throw new Error(statsError.message);
  }

  if (!stats) {
    throw new Error("CHARACTER_STATS_NOT_FOUND");
  }

  return {
    character,
    stats,
  };
}