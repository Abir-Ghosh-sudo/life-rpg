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

export interface DefaultCharacterStats {
  strength: number;
  intelligence: number;
  discipline: number;
  vitality: number;
  wisdom?: number;
  charisma?: number;
  [key: string]: number | undefined;
}

/**
 * Return default character stats.
 */
export function getDefaultCharacterStats(): DefaultCharacterStats {
  return {
    strength: 10,
    intelligence: 10,
    discipline: 10,
    vitality: 10,
    wisdom: 10,
    charisma: 10,
  };
}

/**
 * Calculate character stats from attributes.
 */
export function calculateCharacterStats(
  attributes: Record<string, number | undefined>,
): Record<string, number> {
  const strength = Math.max(0, attributes.strength ?? 10);
  const intelligence = Math.max(0, attributes.intelligence ?? attributes.intellect ?? 10);
  const discipline = Math.max(0, attributes.discipline ?? 10);
  const vitality = Math.max(0, attributes.vitality ?? 10);
  const wisdom = Math.max(0, attributes.wisdom ?? 10);
  const charisma = Math.max(0, attributes.charisma ?? 10);

  return {
    strength,
    intelligence,
    discipline,
    vitality,
    wisdom,
    charisma,
  };
}

/**
 * Calculate derived stats from character stats.
 */
export function calculateDerivedStats(
  stats: Record<string, number>,
): Record<string, number> {
  const strength = stats.strength ?? 10;
  const intelligence = stats.intelligence ?? 10;
  const discipline = stats.discipline ?? 10;
  const vitality = stats.vitality ?? 10;

  return {
    maxHp: 100 + vitality * 10,
    maxEnergy: 100 + discipline * 5,
    attackPower: strength * 2,
    magicPower: intelligence * 2,
    defense: vitality * 2,
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
      (classConfig.attributeBonuses?.strength ?? 0),
    intellect:
      baseStats.intellect +
      (classConfig.attributeBonuses?.intellect ?? 0),
    wisdom:
      baseStats.wisdom +
      (classConfig.attributeBonuses?.wisdom ?? 0),
    discipline:
      baseStats.discipline +
      (classConfig.attributeBonuses?.discipline ?? 0),
    charisma:
      baseStats.charisma +
      (classConfig.attributeBonuses?.charisma ?? 0),
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