"use server";

import {
  unlockWorld,
  unlockRegion,
  updateRegionProgress,
  completeRegion,
} from "@/features/adventure/service";

export async function unlockWorldAction(
  worldId: string,
  characterLevel: number,
) {
  return unlockWorld(
    worldId,
    characterLevel,
  );
}

export async function unlockRegionAction(
  worldId: string,
  regionId: string,
  characterLevel: number,
) {
  return unlockRegion(
    worldId,
    regionId,
    characterLevel,
  );
}

export async function updateRegionProgressAction(
  worldId: string,
  regionId: string,
  progress: number,
) {
  return updateRegionProgress(
    worldId,
    regionId,
    progress,
  );
}

export async function completeRegionAction(
  worldId: string,
  regionId: string,
) {
  return completeRegion(
    worldId,
    regionId,
  );
}