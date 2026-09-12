import type { Attribute } from "@/types/common";
import type { QuestCategory } from "@/types/quest";

import { ATTRIBUTE_CONFIG } from "@/config/attributes";

/**
 * Get the primary attribute associated with a quest category.
 */
export function getAttributeForQuestCategory(
  category: QuestCategory,
): Attribute {
  for (const [attribute, config] of Object.entries(ATTRIBUTE_CONFIG)) {
    if (config.categories.includes(category)) {
      return attribute as Attribute;
    }
  }

  return "discipline";
}

/**
 * Get the amount of attribute XP/points awarded for a quest.
 *
 * Harder quests provide slightly stronger attribute progression.
 */
export function calculateAttributePoints(
  difficulty: "easy" | "medium" | "hard" | "epic",
): number {
  switch (difficulty) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    case "epic":
      return 5;
    default:
      return 1;
  }
}

/**
 * Add points to a single attribute.
 */
export function increaseAttribute(
  currentValue: number,
  points: number,
): number {
  return Math.max(
    0,
    Math.floor(currentValue) + Math.max(0, Math.floor(points)),
  );
}

/**
 * Calculate the updated attribute set after a quest.
 */
export function applyAttributeReward(
  attributes: Record<Attribute, number>,
  category: QuestCategory,
  difficulty: "easy" | "medium" | "hard" | "epic",
): Record<Attribute, number> {
  const attribute = getAttributeForQuestCategory(category);
  const points = calculateAttributePoints(difficulty);

  return {
    ...attributes,
    [attribute]: increaseAttribute(
      attributes[attribute],
      points,
    ),
  };
}

/**
 * Get the total number of attribute points.
 */
export function getTotalAttributePoints(
  attributes: Record<Attribute, number>,
): number {
  return Object.values(attributes).reduce(
    (total, value) => total + Math.max(0, value),
    0,
  );
}