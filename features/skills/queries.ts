import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";

import type {
  Skill,
  UserSkill,
} from "@/types/skill";

import type {
  SkillQueryOptions,
  SkillWithProgress,
  SkillSummary,
} from "@/features/skills/types";

export async function getSkills(
  options: SkillQueryOptions = {},
): Promise<Skill[]> {
  const supabase = await createClient();

  let query = supabase
    .from("skills")
    .select("*")
    .order("required_level", {
      ascending: true,
    });

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  if (options.category) {
    query = query.eq(
      "category",
      options.category,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Skill[];
}

export async function getSkillByIdFromDatabase(
  skillId: string,
): Promise<Skill | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", skillId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Skill | null;
}

export async function getUserSkills(): Promise<
  UserSkill[]
> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_skills")
    .select("*")
    .eq("user_id", userId)
    .order("unlocked_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as UserSkill[];
}

export async function getUserSkill(
  skillId: string,
): Promise<UserSkill | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_skills")
    .select("*")
    .eq("user_id", userId)
    .eq("skill_id", skillId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserSkill | null;
}

export async function getSkillsWithProgress(
  options: SkillQueryOptions = {},
): Promise<SkillWithProgress[]> {
  const skills = await getSkills(options);
  const userSkills = await getUserSkills();

  const results = skills.map((skill) => {
    const userSkill =
      userSkills.find(
        (item) => item.skillId === skill.id,
      ) ?? null;

    return {
      skill,
      userSkill,
      unlocked: Boolean(
        userSkill?.unlockedAt,
      ),
    };
  });

  if (options.unlockedOnly) {
    return results.filter(
      (item) => item.unlocked,
    );
  }

  return results;
}

export async function getSkillSummary(): Promise<
  SkillSummary
> {
  const skills = await getSkills({
    includeInactive: false,
  });

  const userSkills = await getUserSkills();

  const unlocked = userSkills.filter(
    (skill) => skill.unlockedAt !== null,
  ).length;

  const total = skills.length;

  return {
    total,
    unlocked,
    available: Math.max(
      0,
      total - unlocked,
    ),
    locked: Math.max(
      0,
      total - unlocked,
    ),
  };
}