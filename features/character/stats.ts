

import type {
  CharacterAttributeStats,
  CharacterClass,
} from "@/types/character";

import { ATTRIBUTE_CONFIG } from "@/config/attributes";
import { CLASS_CONFIG } from "@/config/classes";

/**
 * Return the default attribute values for a new character.
 */
export function getDefaultAttributeStats(): CharacterAttributeStats {
  return {
    strength: 1,
    intellect: 1,
    wisdom: 1,
    discipline: 1,
    charisma: 1,
  };
}

/**
 * Calculate the final attribute stats after applying
 * the selected character class bonuses.
 */
export function calculateClassStats(
  characterClass: CharacterClass,
): CharacterAttributeStats {
  const baseStats = getDefaultAttributeStats();
  const classConfig = CLASS_CONFIG[characterClass];

  return {
    strength:
      baseStats.strength +
      (classConfig.attributeBonuses.strength ?? 0),
    intellect:
      baseStats.intellect +
      (classConfig.attributeBonuses.intellect ?? 0),
    wisdom:
      baseStats.wisdom +
      (classConfig.attributeBonuses.wisdom ?? 0),
    discipline:
      baseStats.discipline +
      (classConfig.attributeBonuses.discipline ?? 0),
    charisma:
      baseStats.charisma +
      (classConfig.attributeBonuses.charisma ?? 0),
  };
}

/**
 * Calculate the attribute gained from completing a quest category.
 */
export function getAttributeForCategory(
  category: string,
): keyof CharacterAttributeStats {
  const mapping = Object.entries(ATTRIBUTE_CONFIG).find(
    ([, config]) =>
      Array.isArray(config.categories) &&
      config.categories.includes(category),
  );

  return (
    mapping?.[0] as keyof CharacterAttributeStats | undefined
  ) ?? "discipline";
}

/**
 * Increase one attribute by a given amount.
 */
export function addAttributePoints(
  stats: CharacterAttributeStats,
  attribute: keyof CharacterAttributeStats,
  amount = 1,
): CharacterAttributeStats {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ...stats };
  }

  return {
    ...stats,
    [attribute]: stats[attribute] + amount,
  };
}

/**
 * Calculate the total number of attribute points.
 */
export function getTotalAttributePoints(
  stats: CharacterAttributeStats,
): number {
  return (
    stats.strength +
    stats.intellect +
    stats.wisdom +
    stats.discipline +
    stats.charisma
  );
}