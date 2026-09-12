import type { Skill } from "@/types/skill";

import { SKILL_CONFIG } from "@/config/skills";

export function getSkillTree(): Skill[] {
  return [...SKILL_CONFIG] as Skill[];
}

export function getSkillById(
  skillId: string,
): Skill | null {
  const skill = SKILL_CONFIG.find(
    (item) => item.id === skillId,
  );

  return skill
    ? (skill as Skill)
    : null;
}

export function getSkillChildren(
  skillId: string,
): Skill[] {
  return SKILL_CONFIG
    .filter(
      (skill) =>
        skill.prerequisiteSkillId === skillId,
    )
    .map((skill) => skill as Skill);
}

export function getSkillPrerequisite(
  skillId: string,
): Skill | null {
  const skill = getSkillById(skillId);

  if (!skill?.prerequisiteSkillId) {
    return null;
  }

  return getSkillById(
    skill.prerequisiteSkillId,
  );
}

export function getSkillAncestors(
  skillId: string,
): Skill[] {
  const ancestors: Skill[] = [];
  let current = getSkillById(skillId);

  while (current?.prerequisiteSkillId) {
    const parent = getSkillById(
      current.prerequisiteSkillId,
    );

    if (!parent) {
      break;
    }

    ancestors.push(parent);
    current = parent;
  }

  return ancestors.reverse();
}

export function getSkillDepth(
  skillId: string,
): number {
  return getSkillAncestors(skillId).length;
}

export function isRootSkill(
  skillId: string,
): boolean {
  const skill = getSkillById(skillId);

  return Boolean(
    skill && !skill.prerequisiteSkillId,
  );
}

export function hasSkillChildren(
  skillId: string,
): boolean {
  return getSkillChildren(skillId).length > 0;
}

export function getRootSkills(): Skill[] {
  return SKILL_CONFIG
    .filter(
      (skill) =>
        !skill.prerequisiteSkillId,
    )
    .map((skill) => skill as Skill);
}