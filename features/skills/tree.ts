import type { Skill } from "@/types/skill";

import { SKILL_LIST } from "@/config/skills";

// Convert config list entries to Skill type by adding required fields
function toSkill(item: typeof SKILL_LIST[number] & { id: string }): Skill {
  return {
    ...item,
    attribute: item.attribute ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Skill;
}

const SKILL_ENTRIES: Skill[] = SKILL_LIST.map((item) => toSkill(item as typeof item & { id: string }));

export function getSkillTree(): Skill[] {
  return SKILL_ENTRIES;
}

export function getSkillById(
  skillId: string,
): Skill | null {
  const skill = SKILL_ENTRIES.find(
    (item) => item.id === skillId,
  );

  return skill ?? null;
}

export function getSkillChildren(
  skillId: string,
): Skill[] {
  return SKILL_ENTRIES.filter(
    (skill) =>
      skill.prerequisiteSkillId === skillId,
  );
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
  return SKILL_ENTRIES.filter(
    (skill) =>
      !skill.prerequisiteSkillId,
  );
}