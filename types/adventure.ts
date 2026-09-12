import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

export type WorldStatus =
  | "locked"
  | "available"
  | "unlocked";

export type RegionStatus =
  | "locked"
  | "available"
  | "completed";

export type World = {
  id: UUID;

  name: string;
  description: string;

  icon: string;

  order: number;

  requiredLevel: number;

  status: WorldStatus;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Region = {
  id: UUID;

  worldId: UUID;

  name: string;
  description: string;

  icon: string;

  order: number;

  requiredLevel: number;

  difficulty: "easy" | "medium" | "hard" | "epic";

  rarity: Rarity;

  status: RegionStatus;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AdventureProgress = {
  id: UUID;

  userId: UUID;

  worldId: UUID;

  regionId: UUID;

  progressPercentage: number;

  completedQuests: number;

  totalQuests: number;

  unlocked: boolean;

  completed: boolean;

  unlockedAt: Nullable<ISODateString>;

  completedAt: Nullable<ISODateString>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type WorldWithProgress = World & {
  progress: Nullable<AdventureProgress>;
};

export type RegionWithProgress = Region & {
  progress: Nullable<AdventureProgress>;
};

export type AdventureMapNode = {
  id: UUID;

  type: "world" | "region";

  name: string;

  icon: string;

  status: WorldStatus | RegionStatus;

  x: number;
  y: number;

  requiredLevel: number;

  connectedTo: UUID[];
};

export type AdventureMap = {
  nodes: AdventureMapNode[];

  currentWorldId: Nullable<UUID>;

  currentRegionId: Nullable<UUID>;
};

export type UnlockWorldInput = {
  worldId: UUID;
};

export type UnlockRegionInput = {
  regionId: UUID;
};

export type UnlockResult = {
  success: boolean;

  unlockedId: UUID;

  unlockedAt: ISODateString;

  message?: string;
};

export type AdventureSummary = {
  totalWorlds: number;

  unlockedWorlds: number;

  completedWorlds: number;

  totalRegions: number;

  unlockedRegions: number;

  completedRegions: number;

  overallProgress: number;
};

export type AdventureState = {
  worlds: WorldWithProgress[];

  regions: RegionWithProgress[];

  map: AdventureMap;

  summary: AdventureSummary;

  isLoading: boolean;

  error: Nullable<string>;
};