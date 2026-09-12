import { getWorldConfig } from "@/features/adventure/worlds";
import { getRegionConfig } from "@/features/adventure/regions";

export interface AdventureUnlockCheck {
  unlocked: boolean;
  reason?: string;
}

export function canUnlockWorld(
  worldId: string,
  characterLevel: number,
): AdventureUnlockCheck {
  const world = getWorldConfig(worldId);

  if (!world) {
    return {
      unlocked: false,
      reason: "World not found.",
    };
  }

  if ((world as { isActive?: boolean }).isActive === false) {
    return {
      unlocked: false,
      reason: "This world is currently unavailable.",
    };
  }

  if (characterLevel < world.requiredLevel) {
    return {
      unlocked: false,
      reason: `Requires level ${world.requiredLevel}.`,
    };
  }

  return {
    unlocked: true,
  };
}

export function canUnlockRegion(
  worldId: string,
  regionId: string,
  characterLevel: number,
): AdventureUnlockCheck {
  const world = getWorldConfig(worldId);

  if (!world) {
    return {
      unlocked: false,
      reason: "World not found.",
    };
  }

  if ((world as { isActive?: boolean }).isActive === false) {
    return {
      unlocked: false,
      reason: "This world is currently unavailable.",
    };
  }

  const region = getRegionConfig(
    worldId,
    regionId,
  );

  if (!region) {
    return {
      unlocked: false,
      reason: "Region not found.",
    };
  }

  if (!region.isActive) {
    return {
      unlocked: false,
      reason: "This region is currently unavailable.",
    };
  }

  if (characterLevel < region.requiredLevel) {
    return {
      unlocked: false,
      reason: `Requires level ${region.requiredLevel}.`,
    };
  }

  return {
    unlocked: true,
  };
}

export function getLevelsUntilWorldUnlock(
  worldId: string,
  characterLevel: number,
): number {
  const world = getWorldConfig(worldId);

  if (!world) {
    return 0;
  }

  return Math.max(
    0,
    world.requiredLevel - characterLevel,
  );
}

export function getLevelsUntilRegionUnlock(
  worldId: string,
  regionId: string,
  characterLevel: number,
): number {
  const region = getRegionConfig(
    worldId,
    regionId,
  );

  if (!region) {
    return 0;
  }

  return Math.max(
    0,
    region.requiredLevel - characterLevel,
  );
}