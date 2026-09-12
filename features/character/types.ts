import type {
  Character,
  CharacterClass,
  CharacterStats,
} from "@/types/character";

export type CreateCharacterInput = {
  name: string;
  class: CharacterClass;
};

export type UpdateCharacterInput = {
  name?: string;
  class?: CharacterClass;
};

export type CharacterResult = {
  character: Character;
  stats: CharacterStats;
};

export type CharacterSummary = {
  id: string;
  userId: string;
  name: string;
  class: CharacterClass;
  level: number;
  xp: number;
  gold: number;
  hp: number;
  energy: number;
  streak: number;
  combo: number;
};

export type CharacterStatsResult = {
  characterId: string;
  stats: CharacterStats;
};

export type CharacterProgress = {
  level: number;
  currentXp: number;
  requiredXp: number;
  xpRemaining: number;
  progressPercentage: number;
};

export type CharacterUpdateResult = {
  character: Character;
  stats?: CharacterStats;
};