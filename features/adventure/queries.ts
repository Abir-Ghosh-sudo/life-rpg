import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";
import { getAllWorldConfigs } from "@/features/adventure/worlds";
import { getRegionsForWorld } from "@/features/adventure/regions";

import type {
  AdventureProgress,
  Region,
  World,
} from "@/types/adventure";

import type {
  AdventureProgressSummary,
  RegionWithProgress,
  WorldWithProgress,
} from "@/features/adventure/types";

export async function getWorlds(): Promise<World[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("worlds")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as World[];
}

export async function getWorldById(
  worldId: string,
): Promise<World | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("worlds")
    .select("*")
    .eq("id", worldId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as World | null;
}

export async function getRegions(
  worldId: string,
): Promise<Region[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("world_id", worldId)
    .eq("is_active", true)
    .order("order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Region[];
}

export async function getRegionById(
  worldId: string,
  regionId: string,
): Promise<Region | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("id", regionId)
    .eq("world_id", worldId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Region | null;
}

export async function getAdventureProgress(): Promise<
  AdventureProgress[]
> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("adventure_progress")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdventureProgress[];
}

export async function getWorldProgress(
  worldId: string,
): Promise<AdventureProgress[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("adventure_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("world_id", worldId)
    .order("region_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdventureProgress[];
}

export async function getWorldsWithProgress(
  characterLevel: number,
): Promise<WorldWithProgress[]> {
  const worlds = await getWorlds();
  const progress = await getAdventureProgress();

  return worlds.map((world) => {
    const worldProgress =
      progress.find(
        (item) => item.worldId === world.id,
      ) ?? null;

    return {
      world,
      progress: worldProgress,
      unlocked:
        characterLevel >= world.requiredLevel,
    };
  });
}

export async function getRegionsWithProgress(
  worldId: string,
  characterLevel: number,
): Promise<RegionWithProgress[]> {
  const regions = await getRegions(worldId);
  const progress = await getWorldProgress(worldId);

  return regions.map((region) => {
    const regionProgress =
      progress.find(
        (item) => item.regionId === region.id,
      ) ?? null;

    return {
      region,
      progress: regionProgress,
      unlocked:
        characterLevel >= region.requiredLevel,
    };
  });
}

export async function getAdventureSummary(): Promise<
  AdventureProgressSummary
> {
  const progress = await getAdventureProgress();

  const worlds = getAllWorldConfigs();

  const totalRegions = worlds.reduce(
    (total, world) =>
      total + getRegionsForWorld(world.id).length,
    0,
  );

  const unlockedWorldIds = new Set(
    progress
      .filter((item) => item.isUnlocked ?? item.unlocked)
      .map((item) => item.worldId),
  );

  const completedWorldIds = new Set(
    progress
      .filter((item) => item.isCompleted ?? item.completed)
      .map((item) => item.worldId),
  );

  const unlockedRegions = progress.filter(
    (item) => item.isUnlocked ?? item.unlocked,
  ).length;

  const completedRegions = progress.filter(
    (item) => item.isCompleted ?? item.completed,
  ).length;

  return {
    totalWorlds: worlds.length,
    unlockedWorlds: unlockedWorldIds.size,
    completedWorlds: completedWorldIds.size,
    totalRegions,
    unlockedRegions,
    completedRegions,
    overallProgress:
      totalRegions === 0
        ? 0
        : Math.min(
            100,
            Math.round(
              (completedRegions / totalRegions) * 100,
            ),
          ),
  };
}