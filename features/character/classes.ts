import type {
  CharacterClass,
  CharacterClassConfig,
} from "@/types/character";

import { CLASS_CONFIG } from "@/config/classes";

/**
 * Return the complete configuration for a character class.
 */
export function getCharacterClassConfig(
  characterClass: CharacterClass,
): CharacterClassConfig {
  return CLASS_CONFIG[characterClass];
}

/**
 * Return all available character classes.
 */
export function getCharacterClasses(): CharacterClassConfig[] {
  return Object.values(CLASS_CONFIG);
}

/**
 * Check whether a character class is valid.
 */
export function isValidCharacterClass(
  value: string,
): value is CharacterClass {
  return value in CLASS_CONFIG;
}

/**
 * Get the display name of a character class.
 */
export function getCharacterClassName(
  characterClass: CharacterClass,
): string {
  return CLASS_CONFIG[characterClass].name;
}

/**
 * Get the description of a character class.
 */
export function getCharacterClassDescription(
  characterClass: CharacterClass,
): string {
  return CLASS_CONFIG[characterClass].description;
}

/**
 * Get the starting configuration for a character.
 *
 * A fresh object is returned so callers cannot accidentally
 * mutate the global class configuration.
 */
export function getStartingClassStats(
  characterClass: CharacterClass,
) {
  const config = CLASS_CONFIG[characterClass];

  return {
    ...config.startingStats,
  };
}

/**
 * Get the class attribute bonuses.
 *
 * A fresh object is returned to protect the configuration.
 */
export function getClassAttributeBonuses(
  characterClass: CharacterClass,
) {
  const config = CLASS_CONFIG[characterClass];

  return {
    ...config.attributeBonuses,
  };
}