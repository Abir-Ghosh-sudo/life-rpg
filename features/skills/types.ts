import type {
  Skill,
  UserSkill,
} from "@/types/skill";

export interface SkillIdInput {
  skillId: string;
}

export interface SkillQueryOptions {
  includeInactive?: boolean;
  unlockedOnly?: boolean;
  category?: string;
}

export interface SkillWithProgress {
  skill: Skill;
  userSkill: UserSkill | null;
  unlocked: boolean;
}

export interface SkillSummary {
  total: number;
  unlocked: number;
  available: number;
  locked: number;
}

export interface SkillUnlockResult {
  success: boolean;
  skill?: Skill;
  userSkill?: UserSkill;
  message: string;
}

export interface SkillUpgradeResult {
  success: boolean;
  skill?: Skill;
  userSkill?: UserSkill;
  previousLevel?: number;
  newLevel?: number;
  message: string;
}