import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  canUnlockWorld,
  canUnlockRegion,
} from "@/features/adventure/unlocks";

import {
  getWorldById,
  getRegionById,
} from "@/features/adventure/queries";

import type {
  AdventureProgress,
} from "@/types/adventure";

import type {
  AdventureCompletionResult,
  AdventureUnlockResult,
} from "@/features/adventure/types";

export async function unlockWorld(
  worldId: string,
  characterLevel: number,
): Promise<AdventureUnlockResult> {
  const userId = await requireUserId();

  const check = canUnlockWorld(
    worldId,
    characterLevel,
  );

  if (!check.unlocked) {
    return {
      success: false,
      message: check.reason ?? "World cannot be unlocked.",
    };
  }

  const world = await getWorldById(worldId);

  if (!world) {
    return {
      success: false,
      message: "World not found.",
    };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("adventure_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("world_id", worldId)
    .maybeSingle();

  if (existing) {
    return {
      success: true,
      world,
      progress: existing as AdventureProgress,
      message: "World is already unlocked.",
    };
  }

  const { data, error } = await supabase
    .from("adventure_progress")
    .insert({
      user_id: userId,
      world_id: worldId,
      region_id: null,
      is_unlocked: true,
      is_completed: false,
      progress: 0,
      total_required: world.regionCount,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    world,
    progress: data as AdventureProgress,
    message: "World unlocked successfully.",
  };
}

export async function unlockRegion(
  worldId: string,
  regionId: string,
  characterLevel: number,
): Promise<AdventureUnlockResult> {
  const userId = await requireUserId();

  const check = canUnlockRegion(
    worldId,
    regionId,
    characterLevel,
  );

  if (!check.unlocked) {
    return {
      success: false,
      message: check.reason ?? "Region cannot be unlocked.",
    };
  }

  const region = await getRegionById(
    worldId,
    regionId,
  );

  if (!region) {
    return {
      success: false,
      message: "Region not found.",
    };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("adventure_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("world_id", worldId)
    .eq("region_id", regionId)
    .maybeSingle();

  if (existing) {
    return {
      success: true,
      region,
      progress: existing as AdventureProgress,
      message: "Region is already unlocked.",
    };
  }

  const { data, error } = await supabase
    .from("adventure_progress")
    .insert({
      user_id: userId,
      world_id: worldId,
      region_id: regionId,
      is_unlocked: true,
      is_completed: false,
      progress: 0,
      total_required: 1,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    region,
    progress: data as AdventureProgress,
    message: "Region unlocked successfully.",
  };
}

export async function updateRegionProgress(
  worldId: string,
  regionId: string,
  progressValue: number,
): Promise<AdventureProgress> {
  const userId = await requireUserId();

  const supabase = await createClient();

  const safeProgress = Math.max(
    0,
    Math.min(100, Math.floor(progressValue)),
  );

  const completed = safeProgress >= 100;

  const { data, error } = await supabase
    .from("adventure_progress")
    .update({
      progress: safeProgress,
      is_completed: completed,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("world_id", worldId)
    .eq("region_id", regionId)
    .eq("is_unlocked", true)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdventureProgress;
}

export async function completeRegion(
  worldId: string,
  regionId: string,
): Promise<AdventureCompletionResult> {
  const progress = await updateRegionProgress(
    worldId,
    regionId,
    100,
  );

  return {
    success: true,
    progress,
    worldCompleted: false,
    regionCompleted: true,
    message: "Region completed successfully.",
  };
}