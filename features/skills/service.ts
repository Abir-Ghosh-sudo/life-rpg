import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type { Skill, UserSkill } from "@/types/skill";

export interface SkillActionResult {
  success: boolean;
  skill?: Skill;
  userSkill?: UserSkill;
  message: string;
}

export async function unlockSkill(
  skillId: string,
): Promise<SkillActionResult> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: skill, error: skillError } =
    await supabase
      .from("skills")
      .select("*")
      .eq("id", skillId)
      .eq("is_active", true)
      .maybeSingle();

  if (skillError) {
    throw new Error(skillError.message);
  }

  if (!skill) {
    return {
      success: false,
      message: "Skill not found.",
    };
  }

  const typedSkill = skill as Skill;

  const { data: existing, error: existingError } =
    await supabase
      .from("user_skills")
      .select("*")
      .eq("user_id", userId)
      .eq("skill_id", skillId)
      .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    const userSkill = existing as UserSkill;

    if (userSkill.isUnlocked) {
      return {
        success: true,
        skill: typedSkill,
        userSkill,
        message: "Skill is already unlocked.",
      };
    }

    const { data, error } = await supabase
      .from("user_skills")
      .update({
        is_unlocked: true,
        unlocked_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("skill_id", skillId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      skill: typedSkill,
      userSkill: data as UserSkill,
      message: "Skill unlocked successfully.",
    };
  }

  const { data, error } = await supabase
    .from("user_skills")
    .insert({
      user_id: userId,
      skill_id: skillId,
      level: 1,
      is_unlocked: true,
      unlocked_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    skill: typedSkill,
    userSkill: data as UserSkill,
    message: "Skill unlocked successfully.",
  };
}

export async function upgradeSkill(
  skillId: string,
): Promise<SkillActionResult> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: skill, error: skillError } =
    await supabase
      .from("skills")
      .select("*")
      .eq("id", skillId)
      .eq("is_active", true)
      .maybeSingle();

  if (skillError) {
    throw new Error(skillError.message);
  }

  if (!skill) {
    return {
      success: false,
      message: "Skill not found.",
    };
  }

  const typedSkill = skill as Skill;

  const { data: userSkill, error: userSkillError } =
    await supabase
      .from("user_skills")
      .select("*")
      .eq("user_id", userId)
      .eq("skill_id", skillId)
      .maybeSingle();

  if (userSkillError) {
    throw new Error(userSkillError.message);
  }

  if (!userSkill) {
    return {
      success: false,
      skill: typedSkill,
      message: "Unlock the skill before upgrading it.",
    };
  }

  const current = userSkill as UserSkill;

  if (!current.isUnlocked) {
    return {
      success: false,
      skill: typedSkill,
      userSkill: current,
      message: "Unlock the skill before upgrading it.",
    };
  }

  const currentLevel = Math.max(
    1,
    current.level ?? 1,
  );

  const { data, error } = await supabase
    .from("user_skills")
    .update({
      level: currentLevel + 1,
    })
    .eq("user_id", userId)
    .eq("skill_id", skillId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    skill: typedSkill,
    userSkill: data as UserSkill,
    message: "Skill upgraded successfully.",
  };
}