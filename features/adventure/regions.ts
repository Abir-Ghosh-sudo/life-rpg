import type { Region } from "@/types/adventure";
import { WORLD_LIST } from "@/config/worlds";

export function getRegionsForWorld(worldId: string): Region[] {
  const world = WORLD_LIST.find(
    (item) => item.id === worldId,
  );

  if (!world) {
    return [];
  }

  return (world.regions ?? []).map((regionId, idx) => ({
    id: regionId,
    worldId: world.id,
    name: regionId
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: `${world.name} - ${regionId}`,
    icon: world.icon,
    order: idx + 1,
    requiredLevel: world.requiredLevel,
    difficulty: "medium" as const,
    rarity: world.rarity,
    status: "available" as const,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function getRegionConfig(
  worldId: string,
  regionId: string,
): Region | null {
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
): Region | null {
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
): Region | null {
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
): Region[] {
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
    isActive: region.isActive ?? true,
  };
}