import type {
  UUID,
  ISODateString,
  Nullable,
  Attribute,
} from "@/types/common";

export type CharacterClass =
  | "warrior"
  | "mage"
  | "ranger"
  | "monk";

export type Character = {
  id: UUID;
  userId: UUID;

  name: string;
  class: CharacterClass;

  level: number;

  totalXp: number;
  currentXp: number;

  gold: number;

  currentHp: number;
  maxHp: number;

  currentEnergy: number;
  maxEnergy: number;

  currentStreak: number;
  longestStreak: number;

  combo: number;
  maxCombo: number;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CharacterStats = {
  id: UUID;
  characterId: UUID;

  strength: number;
  intellect: number;
  wisdom: number;
  discipline: number;
  charisma: number;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CharacterAttributeValues = {
  strength: number;
  intellect: number;
  wisdom: number;
  discipline: number;
  charisma: number;
};

export type CreateCharacterInput = {
  name: string;
  class: CharacterClass;
};

export type UpdateCharacterInput = {
  name?: string;
  class?: CharacterClass;
};

export type CharacterSummary = {
  id: UUID;
  name: string;
  class: CharacterClass;
  level: number;

  totalXp: number;
  currentXp: number;

  currentHp: number;
  maxHp: number;

  currentEnergy: number;
  maxEnergy: number;

  gold: number;

  currentStreak: number;
  combo: number;
};

export type CharacterWithStats = Character & {
  stats: CharacterStats;
};

export type AttributeChange = {
  attribute: Attribute;
  amount: number;
  previousValue: number;
  newValue: number;
};

export type CharacterProgress = {
  level: number;

  previousLevel: number;

  totalXp: number;
  currentXp: number;
  xpGained: number;
  xpToNextLevel: number;

  leveledUp: boolean;

  attributeChanges: AttributeChange[];
};

export type CharacterClassBonus = {
  class: CharacterClass;

  primaryAttribute: Attribute;

  startingStats: CharacterAttributeValues;

  hpBonus: number;
  energyBonus: number;
};

export type CharacterCreationResult = {
  character: Character;
  stats: CharacterStats;
};

export type CharacterLevelUpResult = {
  character: Character;
  progress: CharacterProgress;
  unlockedRewards: string[];
};

export type CharacterState = {
  character: Nullable<Character>;
  stats: Nullable<CharacterStats>;
  isLoading: boolean;
  error: Nullable<string>;
};