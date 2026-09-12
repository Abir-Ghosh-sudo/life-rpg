import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/features/auth/queries";

import {
  validateCompleteQuestInput,
  validateCreateQuestInput,
  validateQuestId,
  validateUpdateQuestInput,
} from "@/features/quests/validations";

import {
  DEFAULT_QUEST_VALUES,
} from "@/features/quests/constants";

import {
  calculateQuestReward,
} from "@/features/quests/rewards";

import type { Quest, QuestCategory } from "@/types/quest";

import { QUEST_CONFIG } from "@/config/quests";

/**
 * Create a new quest for the authenticated user.
 */
export async function createQuest(input: unknown) {
  const validation = validateCreateQuestInput(input);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest data.",
        details: validation.error.flatten(),
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in to create a quest.",
      },
    };
  }

  const data = validation.data;

  const difficulty =
    data.difficulty ?? DEFAULT_QUEST_VALUES.difficulty;

  const rarity =
    data.rarity ?? DEFAULT_QUEST_VALUES.rarity;

  const reward = calculateQuestReward({
    difficulty,
    rarity,
  });

  const supabase = await createClient();

  /*
   * Check the user's active quest limit before creating another quest.
   */
  const { count, error: countError } = await supabase
    .from("quests")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .in("status", ["pending", "in_progress"]);

  if (countError) {
    throw new Error(
      `Failed to check active quests: ${countError.message}`,
    );
  }

  if ((count ?? 0) >= QUEST_CONFIG.limits.maxActiveQuests) {
    return {
      success: false as const,
      error: {
        code: "QUEST_LIMIT_REACHED",
        message: "You have reached the maximum number of active quests.",
      },
    };
  }

  const { data: quest, error } = await supabase
    .from("quests")
    .insert({
      user_id: userId,
      title: data.title.trim(),
      description: data.description?.trim() || null,
      category: (data.category ?? "other") as QuestCategory,
      type: data.type ?? DEFAULT_QUEST_VALUES.type,
      difficulty,
      rarity,
      status: "pending",
      xp_reward: reward.xp,
      gold_reward: reward.gold,
      energy_cost:
        QUEST_CONFIG.energyCost[difficulty as keyof typeof QUEST_CONFIG.energyCost],
      is_daily: (data.type ?? DEFAULT_QUEST_VALUES.type) === "daily",
      due_at: data.dueDate ?? null,
      chain_id: data.chainId ?? null,
      chain_order: data.chainOrder ?? null,
    })
    .select("*")
    .single();

  if (error || !quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_CREATE_ERROR",
        message: error?.message ?? "Failed to create quest.",
      },
    };
  }

  return {
    success: true as const,
    data: {
      quest: quest as Quest,
    },
  };
}

/**
 * Update a quest owned by the authenticated user.
 */
export async function updateQuest(
  questId: string,
  input: unknown,
) {
  const idValidation = validateQuestId(questId);

  if (!idValidation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest ID.",
      },
    };
  }

  const validation = validateUpdateQuestInput(input);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest data.",
        details: validation.error.flatten(),
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in to update a quest.",
      },
    };
  }

  const data = validation.data;

  const supabase = await createClient();

  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) {
    updateData.title = data.title.trim();
  }

  if (data.description !== undefined) {
    updateData.description =
      data.description?.trim() || null;
  }

  if (data.category !== undefined) {
    updateData.category = data.category;
  }

  if (data.type !== undefined) {
    updateData.type = data.type;
  }

  if (data.difficulty !== undefined) {
    updateData.difficulty = data.difficulty;
  }

  if (data.rarity !== undefined) {
    updateData.rarity = data.rarity;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  if (data.dueDate !== undefined) {
    updateData.due_at = data.dueDate;
  }

  if (data.type !== undefined) {
    updateData.is_daily = data.type === "daily";
  }

  if (data.chainId !== undefined) {
    updateData.chain_id = data.chainId;
  }

  if (data.chainOrder !== undefined) {
    updateData.chain_order = data.chainOrder;
  }

  /*
   * Recalculate rewards if difficulty or rarity changes.
   * Rewards remain server-controlled.
   */
  if (
    data.difficulty !== undefined ||
    data.rarity !== undefined
  ) {
    const { data: existingQuest, error: existingError } =
      await supabase
        .from("quests")
        .select("difficulty,rarity")
        .eq("id", questId)
        .eq("user_id", userId)
        .maybeSingle();

    if (existingError) {
      throw new Error(
        `Failed to load quest: ${existingError.message}`,
      );
    }

    if (!existingQuest) {
      return {
        success: false as const,
        error: {
          code: "QUEST_NOT_FOUND",
          message: "Quest not found.",
        },
      };
    }

    const difficulty =
      data.difficulty ?? existingQuest.difficulty;

    const rarity =
      data.rarity ?? existingQuest.rarity;

    const reward = calculateQuestReward({
      difficulty,
      rarity,
    });

    updateData.xp_reward = reward.xp;
    updateData.gold_reward = reward.gold;
    updateData.energy_cost =
      QUEST_CONFIG.energyCost[difficulty as keyof typeof QUEST_CONFIG.energyCost];
  }

  if (Object.keys(updateData).length === 0) {
    const existingQuest = await getQuestOwnedByUser(
      supabase,
      questId,
      userId,
    );

    if (!existingQuest) {
      return {
        success: false as const,
        error: {
          code: "QUEST_NOT_FOUND",
          message: "Quest not found.",
        },
      };
    }

    return {
      success: true as const,
      data: {
        quest: existingQuest,
      },
    };
  }

  const { data: quest, error } = await supabase
    .from("quests")
    .update(updateData)
    .eq("id", questId)
    .eq("user_id", userId)
    .select("*")
    .maybeSingle();

  if (error) {
    return {
      success: false as const,
      error: {
        code: "QUEST_UPDATE_ERROR",
        message: error.message,
      },
    };
  }

  if (!quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_NOT_FOUND",
        message: "Quest not found.",
      },
    };
  }

  return {
    success: true as const,
    data: {
      quest: quest as Quest,
    },
  };
}

/**
 * Delete a quest owned by the authenticated user.
 */
export async function deleteQuest(questId: string) {
  const validation = validateQuestId(questId);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest ID.",
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in to delete a quest.",
      },
    };
  }

  const supabase = await createClient();

  const { data: quest, error: findError } = await supabase
    .from("quests")
    .select("id,status")
    .eq("id", questId)
    .eq("user_id", userId)
    .maybeSingle();

  if (findError) {
    throw new Error(
      `Failed to find quest: ${findError.message}`,
    );
  }

  if (!quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_NOT_FOUND",
        message: "Quest not found.",
      },
    };
  }

  if (quest.status === "completed") {
    return {
      success: false as const,
      error: {
        code: "QUEST_ALREADY_COMPLETED",
        message: "Completed quests cannot be deleted.",
      },
    };
  }

  const { error } = await supabase
    .from("quests")
    .delete()
    .eq("id", questId)
    .eq("user_id", userId);

  if (error) {
    return {
      success: false as const,
      error: {
        code: "QUEST_DELETE_ERROR",
        message: error.message,
      },
    };
  }

  return {
    success: true as const,
    data: {
      deleted: true,
      questId,
    },
  };
}

/**
 * Mark a quest as in progress.
 */
export async function startQuest(questId: string) {
  const validation = validateQuestId(questId);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest ID.",
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in.",
      },
    };
  }

  const supabase = await createClient();

  const { data: quest, error } = await supabase
    .from("quests")
    .update({
      status: "in_progress",
    })
    .eq("id", questId)
    .eq("user_id", userId)
    .eq("status", "pending")
    .select("*")
    .maybeSingle();

  if (error) {
    return {
      success: false as const,
      error: {
        code: "QUEST_START_ERROR",
        message: error.message,
      },
    };
  }

  if (!quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_NOT_AVAILABLE",
        message: "Quest cannot be started.",
      },
    };
  }

  return {
    success: true as const,
    data: {
      quest: quest as Quest,
    },
  };
}

/**
 * Cancel an active quest.
 */
export async function cancelQuest(questId: string) {
  const validation = validateQuestId(questId);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest ID.",
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in.",
      },
    };
  }

  const supabase = await createClient();

  const { data: quest, error } = await supabase
    .from("quests")
    .update({
      status: "cancelled",
    })
    .eq("id", questId)
    .eq("user_id", userId)
    .in("status", ["pending", "in_progress"])
    .select("*")
    .maybeSingle();

  if (error) {
    return {
      success: false as const,
      error: {
        code: "QUEST_CANCEL_ERROR",
        message: error.message,
      },
    };
  }

  if (!quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_NOT_AVAILABLE",
        message: "Quest cannot be cancelled.",
      },
    };
  }

  return {
    success: true as const,
    data: {
      quest: quest as Quest,
    },
  };
}

/**
 * Complete a quest.
 *
 * IMPORTANT:
 * Final progression mutation is intentionally kept separate.
 * Once the progression service is wired, this operation should become
 * a single transactional server-side operation.
 */
export async function completeQuest(input: unknown) {
  const validation = validateCompleteQuestInput(input);

  if (!validation.success) {
    return {
      success: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid quest ID.",
      },
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false as const,
      error: {
        code: "UNAUTHORIZED",
        message: "You must be logged in.",
      },
    };
  }

  const validData = (validation as any).data;
  const questId =
    typeof validData === "string"
      ? validData
      : validData?.questId;

  const supabase = await createClient();

  const { data: quest, error: questError } = await supabase
    .from("quests")
    .select("*")
    .eq("id", questId)
    .eq("user_id", userId)
    .maybeSingle();

  if (questError) {
    throw new Error(
      `Failed to load quest: ${questError.message}`,
    );
  }

  if (!quest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_NOT_FOUND",
        message: "Quest not found.",
      },
    };
  }

  if (quest.status === "completed") {
    return {
      success: false as const,
      error: {
        code: "QUEST_ALREADY_COMPLETED",
        message: "This quest has already been completed.",
      },
    };
  }

  if (quest.status === "cancelled") {
    return {
      success: false as const,
      error: {
        code: "QUEST_CANCELLED",
        message: "Cancelled quests cannot be completed.",
      },
    };
  }

  const reward = calculateQuestReward({
    difficulty: quest.difficulty,
    rarity: quest.rarity,
  });

  const completionDate = new Date()
    .toISOString()
    .slice(0, 10);

  /*
   * quest_completions has a unique constraint on:
   * (quest_id, user_id, completion_date)
   *
   * This prevents duplicate daily completion records.
   */
  const { data: completion, error: completionError } =
    await supabase
      .from("quest_completions")
      .insert({
        quest_id: quest.id,
        user_id: userId,
        completion_date: completionDate,
        xp_earned: reward.xp,
        gold_earned: reward.gold,
      })
      .select("*")
      .single();

  if (completionError) {
    if (
      completionError.code === "23505"
    ) {
      return {
        success: false as const,
        error: {
          code: "QUEST_ALREADY_COMPLETED_TODAY",
          message: "This quest has already been completed today.",
        },
      };
    }

    return {
      success: false as const,
      error: {
        code: "QUEST_COMPLETION_ERROR",
        message: completionError.message,
      },
    };
  }

  const { data: updatedQuest, error: updateError } =
    await supabase
      .from("quests")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", quest.id)
      .eq("user_id", userId)
      .neq("status", "completed")
      .select("*")
      .maybeSingle();

  if (updateError) {
    throw new Error(
      `Failed to complete quest: ${updateError.message}`,
    );
  }

  if (!updatedQuest) {
    return {
      success: false as const,
      error: {
        code: "QUEST_COMPLETION_CONFLICT",
        message: "Quest completion could not be finalized.",
      },
    };
  }

  return {
    success: true as const,
    data: {
      quest: updatedQuest as Quest,
      completion,
      reward: {
        xp: reward.xp,
        gold: reward.gold,
      },
    },
  };
}

/**
 * Internal helper for ownership-safe quest lookup.
 */
async function getQuestOwnedByUser(
  supabase: Awaited<ReturnType<typeof createClient>>,
  questId: string,
  userId: string,
) {
  const { data, error } = await supabase
    .from("quests")
    .select("*")
    .eq("id", questId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch quest: ${error.message}`,
    );
  }

  return data as Quest | null;
}