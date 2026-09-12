import { describe, expect, it } from "vitest";

import {
  addXp,
  calculateXpReward,
  didLevelUp,
  getLevelFromXp,
  getXpForNextLevel,
  getXpProgressPercentage,
  getXpRemaining,
} from "@/features/progression/xp";

import {
  calculateAttributePoints,
  increaseAttribute,
} from "@/features/progression/attributes";

import {
  calculateNextStreak,
  isStreakMilestone,
} from "@/features/progression/streaks";

describe("Progression integration contract", () => {
  describe("quest reward → XP flow", () => {
    it("calculates a positive XP reward", () => {
      const reward = calculateXpReward({
        baseXp: 100,
        multiplier: 1,
      });

      expect(reward).toBe(100);
    });

    it("adds earned XP to the current XP", () => {
      const currentXp = 900;
      const earnedXp = calculateXpReward({
        baseXp: 150,
      });

      const newXp = addXp(currentXp, earnedXp);

      expect(newXp).toBe(1050);
      expect(newXp).toBeGreaterThan(currentXp);
    });
  });

  describe("XP → level flow", () => {
    it("resolves the current level from XP", () => {
      const xp = 1000;
      const level = getLevelFromXp(xp);

      expect(level).toBeGreaterThanOrEqual(1);
    });

    it("detects a level up after earning XP", () => {
      const previousXp = 0;
      const newXp = 100000;

      expect(didLevelUp(previousXp, newXp)).toBe(true);
    });

    it("does not report a level up when XP stays unchanged", () => {
      const xp = 500;

      expect(didLevelUp(xp, xp)).toBe(false);
    });
  });

  describe("level progress", () => {
    it("returns the XP requirement for the next level", () => {
      const level = getLevelFromXp(500);
      const nextLevelXp = getXpForNextLevel(level);

      expect(nextLevelXp).toBeGreaterThan(0);
    });

    it("returns a bounded progress percentage", () => {
      const level = getLevelFromXp(500);
      const progress = getXpProgressPercentage(500, level);

      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);
    });

    it("never returns negative XP remaining", () => {
      const level = getLevelFromXp(100000);

      expect(getXpRemaining(100000, level)).toBeGreaterThanOrEqual(0);
    });
  });

  describe("attribute progression", () => {
    it("awards more attribute points for harder quests", () => {
      expect(calculateAttributePoints("easy")).toBeLessThan(
        calculateAttributePoints("hard"),
      );

      expect(calculateAttributePoints("hard")).toBeLessThan(
        calculateAttributePoints("epic"),
      );
    });

    it("increases an attribute by earned points", () => {
      expect(increaseAttribute(10, 3)).toBe(13);
    });

    it("does not allow an attribute to become negative", () => {
      expect(increaseAttribute(-10, 0)).toBe(0);
    });
  });

  describe("streak progression", () => {
    it("starts a new streak at one", () => {
      expect(
        calculateNextStreak(0, null, new Date("2026-09-12T10:00:00Z")),
      ).toBe(1);
    });

    it("recognizes streak milestones", () => {
      expect(isStreakMilestone(3)).toBe(true);
      expect(isStreakMilestone(7)).toBe(true);
      expect(isStreakMilestone(4)).toBe(false);
    });
  });
});