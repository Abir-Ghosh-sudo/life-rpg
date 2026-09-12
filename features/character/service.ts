"use server";

import type { CharacterClass } from "@/types/character";

import { createClient } from "@/lib/supabase/server";
import {
  requireUserId,
} from "@/lib/auth/session";

import {
  calculateClassStats,
  getDefaultAttributeStats,
} from "@/features/character/stats";

import {
  validateCreateCharacterInput,
  validateUpdateCharacterInput,
} from "@/features/character/validations";

import type {
  CreateCharacterInput,
  UpdateCharacterInput,
  CharacterResult,
} from "@/features/character/types";

/**
 * Create a character for the authenticated user.
 *
 * A user can have only one character, enforced by the database.
 */
export async function createCharacter(
  input: unknown,
): Promise<CharacterResult> {
  const userId = await requireUserId();
  const data = validateCreateCharacterInput(input);

  const supabase = await createClient();

  const { data: existingCharacter, error: existingError } =
    await supabase
      .from("characters")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existingCharacter) {
    throw new Error("CHARACTER_ALREADY_EXISTS");
  }

  const { data: character, error: characterError } =
    await supabase
      .from("characters")
      .insert({
        user_id: userId,
        name: data.name,
        class: data.class,
      })
      .select("*")
      .single();

  if (characterError || !character) {
    throw new Error(
      characterError?.message ?? "Failed to create character.",
    );
  }

  const classStats = calculateClassStats(data.class);
  const defaultStats = getDefaultAttributeStats();

  const { data: stats, error: statsError } = await supabase
    .from("character_stats")
    .insert({
      character_id: character.id,
      strength: classStats.strength,
      intellect: classStats.intellect,
      wisdom: classStats.wisdom,
      discipline: classStats.discipline,
      charisma: classStats.charisma,
      ...defaultStats,
    })
    .select("*")
    .single();

  if (statsError || !stats) {
    throw new Error(
      statsError?.message ?? "Failed to create character stats.",
    );
  }

  return {
    character,
    stats,
  };
}

/**
 * Get the authenticated user's character.
 */
export async function getCharacter(): Promise<CharacterResult | null> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: character, error: characterError } =
    await supabase
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

/**
 * Update basic character information.
 *
 * Progression fields such as XP, level, gold, HP and energy
 * are intentionally not accepted here.
 */
export async function updateCharacter(
  input: unknown,
): Promise<CharacterResult> {
  const userId = await requireUserId();
  const data = validateUpdateCharacterInput(input);

  const supabase = await createClient();

  const { data: currentCharacter, error: currentError } =
    await supabase
      .from("characters")
      .select("*")
      .eq("user_id", userId)
      .single();

  if (currentError || !currentCharacter) {
    throw new Error(
      currentError?.message ?? "Character not found.",
    );
  }

  const updateData: {
    name?: string;
    class?: CharacterClass;
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.class !== undefined) {
    updateData.class = data.class;
  }

  let character = currentCharacter;

  if (Object.keys(updateData).length > 0) {
    const { data: updatedCharacter, error: updateError } =
      await supabase
        .from("characters")
        .update(updateData)
        .eq("id", currentCharacter.id)
        .eq("user_id", userId)
        .select("*")
        .single();

    if (updateError || !updatedCharacter) {
      throw new Error(
        updateError?.message ?? "Failed to update character.",
      );
    }

    character = updatedCharacter;
  }

  const { data: stats, error: statsError } = await supabase
    .from("character_stats")
    .select("*")
    .eq("character_id", character.id)
    .single();

  if (statsError || !stats) {
    throw new Error(
      statsError?.message ?? "Character stats not found.",
    );
  }

  return {
    character,
    stats,
  };
}