import type { World } from "@/types/adventure";
import { WORLD_LIST } from "@/config/worlds";

/**
 * Get a world configuration by its identifier.
 */
export function getWorldConfig(
  worldId: string,
) {
  return (
    WORLD_LIST.find(
      (world) => world.id === worldId,
    ) ?? null
  );
}

/**
 * Get all configured worlds.
 */
export function getAllWorldConfigs() {
  return [...WORLD_LIST];
}

/**
 * Get worlds unlocked at a given character level.
 */
export function getUnlockedWorldConfigs(
  level: number,
) {
  const safeLevel = Math.max(
    1,
    Math.floor(level),
  );

  return WORLD_LIST.filter(
    (world) => world.requiredLevel <= safeLevel,
  );
}

/**
 * Check whether a world can be unlocked at a given level.
 */
export function canUnlockWorld(
  worldId: string,
  level: number,
): boolean {
  const world = getWorldConfig(worldId);

  if (!world) {
    return false;
  }

  return (
    Math.max(1, Math.floor(level)) >=
    world.requiredLevel
  );
}

/**
 * Get the next world that becomes available.
 */
export function getNextWorld(
  level: number,
) {
  const safeLevel = Math.max(
    1,
    Math.floor(level),
  );

  return (
    WORLD_LIST.find(
      (world) => world.requiredLevel > safeLevel,
    ) ?? null
  );
}

/**
 * Get a world by its order.
 */
export function getWorldByOrder(
  order: number,
) {
  return (
    WORLD_LIST.find(
      (world) => world.order === order,
    ) ?? null
  );
}

/**
 * Return the total number of configured worlds.
 */
export function getWorldCount(): number {
  return WORLD_LIST.length;
}

/**
 * Convert a database world into a lightweight summary.
 */
export function toWorldSummary(
  world: World,
) {
  return {
    id: world.id,
    name: world.name,
    description: world.description,
    order: world.order,
    requiredLevel: world.requiredLevel,
    regionCount: world.regionCount ?? 0,
    isActive: world.isActive ?? true,
  };
}