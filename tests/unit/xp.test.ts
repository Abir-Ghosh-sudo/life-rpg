import { describe, expect, it } from "vitest";

import {
  calculateXpReward,
  addXp,
  getLevelFromXp,
  getXpRequiredForLevel,
  getXpForNextLevel,
  getCurrentLevelXp,
  getXpRemaining,
  getXpProgressPercentage,
  didLevelUp,
  getLevelsGained,
  calculateSourceXp,
} from "@/features/progression/xp";

describe("XP progression", () => {
  describe("calculateXpReward", () => {
    it("returns base XP by default", () => {
      expect(calculateXpReward({ baseXp: 100 })).toBe(100);
    });

    it("applies multiplier and bonus XP", () => {
      expect(
        calculateXpReward({
          baseXp: 100,
          multiplier: 1.5,
          bonusXp: 25,
        }),
      ).toBe(175);
    });

    it("does not allow negative rewards", () => {
      expect(
        calculateXpReward({
          baseXp: -100,
          multiplier: -2,
          bonusXp: -50,
        }),
      ).toBe(0);
    });
  });

  describe("addXp", () => {
    it("adds earned XP", () => {
      expect(addXp(100, 50)).toBe(150);
    });

    it("prevents negative earned XP", () => {
      expect(addXp(100, -50)).toBe(100);
    });

    it("normalizes fractional XP", () => {
      expect(addXp(100.9, 20.9)).toBe(120);
    });
  });

  describe("level calculations", () => {
    it("starts at level 1", () => {
      expect(getLevelFromXp(0)).toBe(1);
    });

    it("returns XP required for a level", () => {
      expect(getXpRequiredForLevel(1)).toBe(0);
    });

    it("returns XP required for the next level", () => {
      expect(getXpForNextLevel(1)).toBe(
        getXpRequiredForLevel(2),
      );
    });

    it("never returns a level below 1 for negative XP", () => {
      expect(getLevelFromXp(-100)).toBe(1);
    });
  });

  describe("level progress", () => {
    it("calculates current-level XP", () => {
      const level = 2;
      const levelXp = getXpRequiredForLevel(level);

      expect(getCurrentLevelXp(levelXp + 25, level)).toBe(25);
    });

    it("calculates remaining XP", () => {
      const level = 1;
      const nextLevelXp = getXpForNextLevel(level);

      expect(getXpRemaining(nextLevelXp - 25, level)).toBe(25);
    });

    it("keeps progress percentage between 0 and 100", () => {
      const progress = getXpProgressPercentage(50, 1);

      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);
    });
  });

  describe("level-up detection", () => {
    it("detects a level-up", () => {
      const nextLevelXp = getXpForNextLevel(1);

      expect(didLevelUp(0, nextLevelXp)).toBe(true);
    });

    it("calculates levels gained", () => {
      const level3Xp = getXpRequiredForLevel(3);
      expect(getLevelsGained(0, level3Xp)).toBe(2);
    });
  });

  describe("calculateSourceXp", () => {
    it("returns baseXp for valid sources", () => {
      expect(calculateSourceXp("quest", 100)).toBe(100);
      expect(calculateSourceXp("boss", 500)).toBe(500);
    });

    it("returns 0 for non-positive baseXp", () => {
      expect(calculateSourceXp("quest", 0)).toBe(0);
      expect(calculateSourceXp("quest", -50)).toBe(0);
    });
  });
});