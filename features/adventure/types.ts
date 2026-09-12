import type {
  AdventureProgress,
  Region,
  World,
} from "@/types/adventure";

export interface WorldIdInput {
  worldId: string;
}

export interface RegionIdInput {
  worldId: string;
  regionId: string;
}

export interface AdventureQueryOptions {
  includeLocked?: boolean;
  includeInactive?: boolean;
}

export interface WorldWithProgress {
  world: World;
  progress: AdventureProgress | null;
  unlocked: boolean;
}

export interface RegionWithProgress {
  region: Region;
  progress: AdventureProgress | null;
  unlocked: boolean;
}

export interface AdventureProgressSummary {
  totalWorlds: number;
  unlockedWorlds: number;
  completedWorlds: number;
  totalRegions: number;
  unlockedRegions: number;
  completedRegions: number;
  overallProgress: number;
}

export interface AdventureUnlockResult {
  success: boolean;
  world?: World;
  region?: Region;
  progress?: AdventureProgress;
  message: string;
}

export interface AdventureCompletionResult {
  success: boolean;
  progress: AdventureProgress;
  worldCompleted: boolean;
  regionCompleted: boolean;
  message: string;
}