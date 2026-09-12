"use server";

import {
  createCharacter,
  getCharacter,
  updateCharacter,
} from "@/features/character/service";

/**
 * Create the authenticated user's character.
 */
export async function createCharacterAction(input: unknown) {
  return createCharacter(input);
}

/**
 * Get the authenticated user's character.
 */
export async function getCharacterAction() {
  return getCharacter();
}

/**
 * Update the authenticated user's character.
 */
export async function updateCharacterAction(input: unknown) {
  return updateCharacter(input);
}