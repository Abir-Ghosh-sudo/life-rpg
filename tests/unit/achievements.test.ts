import { describe, expect, it } from "vitest";

import {
  achievementExists,
  getAchievementByCode,
  getAchievementDefinition,
  getAchievementDefinitions,
  getActiveAchievements,
  getSecretAchievements,
} from "@/features/achievements/definitions";

describe("achievement definitions", () => {
  it("returns all configured achievements", () => {
    const achievements = getAchievementDefinitions();

    expect(Array.isArray(achievements)).toBe(true);
    expect(achievements.length).toBeGreaterThan(0);
  });

  it("returns a copy of the achievement definitions", () => {
    const first = getAchievementDefinitions();
    const second = getAchievementDefinitions();

    expect(first).not.toBe(second);
    expect(first).toEqual(second);
  });

  it("finds an achievement by id", () => {
    const achievements = getAchievementDefinitions();
    const first = achievements[0];

    const result = getAchievementDefinition(first.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(first.id);
  });

  it("returns null for an unknown achievement id", () => {
    expect(
      getAchievementDefinition("achievement-that-does-not-exist"),
    ).toBeNull();
  });

  it("finds an achievement by code", () => {
    const achievements = getAchievementDefinitions();
    const achievementWithCode = achievements.find(
      (achievement) => Boolean(achievement.code),
    );

    expect(achievementWithCode).toBeDefined();

    if (!achievementWithCode?.code) {
      return;
    }

    const result = getAchievementByCode(achievementWithCode.code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(achievementWithCode.code);
  });

  it("returns null for an unknown achievement code", () => {
    expect(
      getAchievementByCode("CODE_THAT_DOES_NOT_EXIST"),
    ).toBeNull();
  });

  it("returns only secret achievements", () => {
    const secretAchievements = getSecretAchievements();

    expect(Array.isArray(secretAchievements)).toBe(true);

    for (const achievement of secretAchievements) {
      expect(achievement.isSecret).toBe(true);
    }
  });

  it("returns only active achievements", () => {
    const activeAchievements = getActiveAchievements();

    expect(Array.isArray(activeAchievements)).toBe(true);

    for (const achievement of activeAchievements) {
      expect(achievement.isActive).toBe(true);
    }
  });

  it("checks whether an achievement exists", () => {
    const achievements = getAchievementDefinitions();
    const first = achievements[0];

    expect(achievementExists(first.id)).toBe(true);
  });

  it("returns false for an unknown achievement", () => {
    expect(
      achievementExists("achievement-that-does-not-exist"),
    ).toBe(false);
  });
});