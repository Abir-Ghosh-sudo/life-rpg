"use server";

import {
  startFocusSession,
  completeFocusSession,
  cancelFocusSession,
} from "@/features/focus/service";

export async function startFocusSessionAction(
  input: unknown,
) {
  return startFocusSession(input);
}

export async function completeFocusSessionAction(
  input: unknown,
) {
  return completeFocusSession(input);
}

export async function cancelFocusSessionAction(
  sessionId: string,
) {
  return cancelFocusSession(sessionId);
}