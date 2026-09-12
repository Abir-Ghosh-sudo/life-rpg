import type { Skill } from "@/types/skill";

import { getSkillById } from "@/features/skills/tree";

export interface SkillUnlockCheck {
  unlocked: boolean;
  reason?: string;
}

export function canUnlockSkill(
  skillId: string,
  characterLevel: number,
  unlockedSkillIds: string[] = [],
): SkillUnlockCheck {
  const skill = getSkillById(skillId);

  if (!skill) {
    return {
      unlocked: false,
      reason: "Skill not found.",
    };
  }

  // Note: isActive is not on Skill type; DB query handles active filtering

  if (characterLevel < skill.requiredLevel) {
    return {
      unlocked: false,
      reason: `Requires level ${skill.requiredLevel}.`,
    };
  }

  if (
    skill.prerequisiteSkillId &&
    !unlockedSkillIds.includes(
      skill.prerequisiteSkillId,
    )
  ) {
    return {
      unlocked: false,
      reason: "Required prerequisite skill is not unlocked.",
    };
  }

  return {
    unlocked: true,
  };
}

export function getSkillsAvailableToUnlock(
  skills: Skill[],
  characterLevel: number,
  unlockedSkillIds: string[] = [],
): Skill[] {
  return skills.filter((skill) => {
    const result = canUnlockSkill(
      skill.id,
      characterLevel,
      unlockedSkillIds,
    );

    return result.unlocked;
  });
}

export function getLevelsUntilSkillUnlock(
  skillId: string,
  characterLevel: number,
): number {
  const skill = getSkillById(skillId);

  if (!skill) {
    return 0;
  }

  return Math.max(
    0,
    skill.requiredLevel - characterLevel,
  );
}

export function hasPrerequisite(
  skillId: string,
): boolean {
  const skill = getSkillById(skillId);

  return Boolean(
    skill?.prerequisiteSkillId,
  );
}

export function isPrerequisiteSatisfied(
  skillId: string,
  unlockedSkillIds: string[],
): boolean {
  const skill = getSkillById(skillId);

  if (!skill) {
    return false;
  }

  if (!skill.prerequisiteSkillId) {
    return true;
  }

  return unlockedSkillIds.includes(
    skill.prerequisiteSkillId,
  );
}