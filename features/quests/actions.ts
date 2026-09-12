"use server";

import {
  cancelQuest,
  completeQuest,
  createQuest,
  deleteQuest,
  startQuest,
  updateQuest,
} from "@/features/quests/service";

/**
 * Create a new quest for the authenticated user.
 */
export async function createQuestAction(input: unknown) {
  return createQuest(input);
}

/**
 * Update an existing quest owned by the authenticated user.
 */
export async function updateQuestAction(
  questId: string,
  input: unknown,
) {
  return updateQuest(questId, input);
}

/**
 * Delete an existing quest owned by the authenticated user.
 */
export async function deleteQuestAction(questId: string) {
  return deleteQuest(questId);
}

/**
 * Move a pending quest into the in-progress state.
 */
export async function startQuestAction(questId: string) {
  return startQuest(questId);
}

/**
 * Complete a quest.
 *
 * The service is responsible for validating ownership,
 * preventing duplicate completion and calculating rewards.
 */
export async function completeQuestAction(input: unknown) {
  return completeQuest(input);
}

/**
 * Cancel an active quest.
 */
export async function cancelQuestAction(questId: string) {
  return cancelQuest(questId);
}