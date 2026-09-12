import { describe, expect, it } from "vitest";

import {
  achievementExists,
  getAchievementByCode,
  getAchievementDefinition,
  getAchievementDefinitions,
  getActiveAchievements,
  getSecretAchievements,
} from "@/features/achievements/definitions";

describe("Achievements integration", () => {
  it("loads the achievement catalogue", () => {
    const achievements = getAchievementDefinitions();

    expect(achievements.length).toBeGreaterThan(0);

    for (const achievement of achievements) {
      expect(achievement.id).toBeTruthy();
      expect(achievement.name).toBeTruthy();
      expect(achievement.description).toBeTruthy();
    }
  });

  it("retrieves an achievement by id", () => {
    const achievements = getAchievementDefinitions();
    const first = achievements[0];

    const result = getAchievementDefinition(first.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(first.id);
  });

  it("returns null for an unknown achievement id", () => {
    expect(
      getAchievementDefinition("does-not-exist"),
    ).toBeNull();
  });

  it("retrieves an achievement by code", () => {
    const achievements = getAchievementDefinitions();

    const achievement = achievements.find(
      (item) => Boolean(item.code),
    );

    expect(achievement).toBeDefined();

    if (!achievement?.code) {
      return;
    }

    const result = getAchievementByCode(achievement.code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(achievement.code);
  });

  it("returns null for an unknown achievement code", () => {
    expect(
      getAchievementByCode("UNKNOWN_ACHIEVEMENT_CODE"),
    ).toBeNull();
  });

  it("returns only active achievements", () => {
    const active = getActiveAchievements();

    for (const achievement of active) {
      expect(achievement.isActive).toBe(true);
    }
  });

  it("returns only secret achievements", () => {
    const secret = getSecretAchievements();

    for (const achievement of secret) {
      expect(achievement.isSecret).toBe(true);
    }
  });

  it("correctly checks achievement existence", () => {
    const achievements = getAchievementDefinitions();
    const existing = achievements[0];

    expect(achievementExists(existing.id)).toBe(true);
    expect(
      achievementExists("missing-achievement"),
    ).toBe(false);
  });

  it("keeps achievement ids unique", () => {
    const achievements = getAchievementDefinitions();
    const ids = achievements.map((achievement) => achievement.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps achievement codes unique when present", () => {
    const achievements = getAchievementDefinitions();

    const codes = achievements
      .map((achievement) => achievement.code)
      .filter(Boolean);

    expect(new Set(codes).size).toBe(codes.length);
  });
});