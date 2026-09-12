"use server";

import {
  generateRandomEvent,
  claimRandomEvent,
  dismissRandomEvent,
} from "@/features/events/service";
import type {
  GenerateRandomEventInput,
  ClaimRandomEventInput,
  DismissRandomEventInput,
} from "@/features/events/types";

export async function generateRandomEventAction(
  input?: GenerateRandomEventInput,
) {
  return generateRandomEvent(input);
}

export async function claimRandomEventAction(
  input: ClaimRandomEventInput,
) {
  return claimRandomEvent(input);
}

export async function dismissRandomEventAction(
  input: DismissRandomEventInput,
) {
  return dismissRandomEvent(input);
}