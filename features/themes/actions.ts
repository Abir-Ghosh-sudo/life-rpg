"use server";

import {
  unlockTheme,
  applyTheme,
} from "@/features/themes/service";

import type {
  UnlockThemeInput,
  ApplyThemeInput,
} from "@/features/themes/types";

export async function unlockThemeAction(
  input: UnlockThemeInput,
) {
  return unlockTheme(input);
}

export async function applyThemeAction(
  input: ApplyThemeInput,
) {
  return applyTheme(input);
}