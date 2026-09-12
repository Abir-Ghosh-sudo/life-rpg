import type {
  UUID,
  ISODateString,
  Nullable,
  Attribute,
} from "@/types/common";

export type SkillType =
  | "passive"
  | "active"
  | "utility"
  | "special";

export type SkillStatus =
  | "locked"
  | "available"
  | "unlocked";

export type Skill = {
  id: UUID;

  name: string;
  description: string;

  type: SkillType;

  icon: string;

  attribute: Nullable<Attribute>;

  requiredLevel: number;
  requiredXp: number;

  prerequisiteSkillId: Nullable<UUID>;

  effectValue: number;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserSkill = {
  id: UUID;

  userId: UUID;
  skillId: UUID;

  status: SkillStatus;

  unlockedAt: Nullable<ISODateString>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type SkillProgress = {
  skillId: UUID;

  status: SkillStatus;

  requiredLevel: number;
  currentLevel: number;

  prerequisiteMet: boolean;

  canUnlock: boolean;

  unlockedAt: Nullable<ISODateString>;
};

export type SkillWithProgress = Skill & {
  progress: SkillProgress;
};

export type SkillUnlockRequirement = {
  level?: number;
  xp?: number;
  attribute?: Attribute;
  attributeValue?: number;
  prerequisiteSkillId?: UUID;
};

export type SkillUnlockResult = {
  skill: Skill;

  unlockedAt: ISODateString;

  remainingSkillPoints: number;
};

export type SkillTreeNode = {
  skill: Skill;

  x: number;
  y: number;

  children: UUID[];
  parent: Nullable<UUID>;
};

export type SkillTree = {
  nodes: SkillTreeNode[];

  unlockedSkills: UUID[];

  availableSkills: UUID[];
};

export type SkillState = {
  skills: SkillWithProgress[];

  unlockedSkills: number;
  availableSkills: number;
  totalSkills: number;

  isLoading: boolean;
  error: Nullable<string>;
};