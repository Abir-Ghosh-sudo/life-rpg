import {
  questCreateSchema,
  questIdSchema,
  questUpdateSchema,
} from "@/lib/validation/schemas";

/**
 * Validate quest creation input.
 */
export function validateCreateQuestInput(input: unknown) {
  return questCreateSchema.safeParse(input);
}

/**
 * Validate quest update input.
 */
export function validateUpdateQuestInput(input: unknown) {
  return questUpdateSchema.safeParse(input);
}

/**
 * Validate a quest ID.
 */
export function validateQuestId(input: unknown) {
  return questIdSchema.safeParse(input);
}

/**
 * Validate quest completion input.
 *
 * Completion currently only requires a valid quest ID.
 * Reward calculation is performed server-side after validation.
 */
export function validateCompleteQuestInput(input: unknown) {
  return questIdSchema.safeParse(input);
}