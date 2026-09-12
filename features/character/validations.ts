import {
  characterCreateSchema,
  characterUpdateSchema,
} from "@/lib/validation/schemas";

import type {
  CreateCharacterInput,
  UpdateCharacterInput,
} from "@/types/character";

/**
 * Validate character creation input.
 */
export function validateCreateCharacterInput(
  input: unknown,
): CreateCharacterInput {
  return characterCreateSchema.parse(input);
}

/**
 * Validate character update input.
 */
export function validateUpdateCharacterInput(
  input: unknown,
): UpdateCharacterInput {
  return characterUpdateSchema.parse(input);
}