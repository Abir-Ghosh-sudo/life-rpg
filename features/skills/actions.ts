"use server";

import {
  unlockSkill,
  upgradeSkill,
} from "@/features/skills/service";

export async function unlockSkillAction(
  skillId: string,
) {
  return unlockSkill(skillId);
}

export async function upgradeSkillAction(
  skillId: string,
) {
  return upgradeSkill(skillId);
}