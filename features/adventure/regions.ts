import type { Region } from "@/types/adventure";

import { WORLD_CONFIG } from "@/config/worlds";

export function getRegionsForWorld(worldId: string) {
  const world = WORLD_CONFIG.find(
    (item) => item.id === worldId,
  );

  if (!world) {
    return [];
  }

  return world.regions ?? [];
}

export function getRegionConfig(
  worldId: string,
  regionId: string,
) {
  const regions = getRegionsForWorld(worldId);

  return (
    regions.find(
      (region) => region.id === regionId,
    ) ?? null
  );
}

export function getRegionByOrder(
  worldId: string,
  order: number,
) {
  const regions = getRegionsForWorld(worldId);

  return (
    regions.find(
      (region) => region.order === order,
    ) ?? null
  );
}

export function getNextRegion(
  worldId: string,
  currentOrder: number,
) {
  const regions = getRegionsForWorld(worldId);

  return (
    regions.find(
      (region) => region.order > currentOrder,
    ) ?? null
  );
}

export function canAccessRegion(
  region: Region,
  characterLevel: number,
): boolean {
  const level = Math.max(
    1,
    Math.floor(characterLevel),
  );

  return level >= region.requiredLevel;
}

export function getAccessibleRegions(
  worldId: string,
  characterLevel: number,
) {
  return getRegionsForWorld(worldId).filter(
    (region) =>
      canAccessRegion(region, characterLevel),
  );
}

export function getRegionCount(
  worldId: string,
): number {
  return getRegionsForWorld(worldId).length;
}

export function toRegionSummary(
  region: Region,
) {
  return {
    id: region.id,
    worldId: region.worldId,
    name: region.name,
    description: region.description,
    order: region.order,
    requiredLevel: region.requiredLevel,
    isActive: region.isActive,
  };
}