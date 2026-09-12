import { describe, expect, it } from "vitest";

import {
  isSameDay,
  isConsecutiveDay,
  calculateNextStreak,
  shouldIncreaseStreak,
  isStreakBroken,
  getStreakAfterActivity,
  isStreakMilestone,
} from "@/features/progression/streaks";

describe("Streak progression", () => {
  const day1 = "2026-09-10T10:00:00.000Z";
  const sameDay = "2026-09-10T18:00:00.000Z";
  const day2 = "2026-09-11T10:00:00.000Z";
  const day3 = "2026-09-12T10:00:00.000Z";
  const day5 = "2026-09-14T10:00:00.000Z";

  describe("isSameDay", () => {
    it("returns true for dates on the same calendar day", () => {
      expect(isSameDay(day1, sameDay)).toBe(true);
    });

    it("returns false for different days", () => {
      expect(isSameDay(day1, day2)).toBe(false);
    });
  });

  describe("isConsecutiveDay", () => {
    it("returns true for the next calendar day", () => {
      expect(isConsecutiveDay(day1, day2)).toBe(true);
    });

    it("returns false when there is a gap", () => {
      expect(isConsecutiveDay(day1, day5)).toBe(false);
    });

    it("returns false for the same day", () => {
      expect(isConsecutiveDay(day1, sameDay)).toBe(false);
    });
  });

  describe("calculateNextStreak", () => {
    it("starts a new streak when there is no previous activity", () => {
      expect(calculateNextStreak(0, null, day1)).toBe(1);
    });

    it("keeps the streak on the same day", () => {
      expect(calculateNextStreak(5, day1, sameDay)).toBe(5);
    });

    it("increments the streak on the next day", () => {
      expect(calculateNextStreak(5, day1, day2)).toBe(6);
    });

    it("resets the streak after a gap", () => {
      expect(calculateNextStreak(5, day1, day5)).toBe(1);
    });
  });

  describe("shouldIncreaseStreak", () => {
    it("returns true if no previous activity", () => {
      expect(shouldIncreaseStreak(null, day1)).toBe(true);
    });

    it("returns false for same day", () => {
      expect(shouldIncreaseStreak(day1, sameDay)).toBe(false);
    });

    it("returns true for consecutive day", () => {
      expect(shouldIncreaseStreak(day1, day2)).toBe(true);
    });
  });

  describe("isStreakBroken", () => {
    it("returns false if no previous activity", () => {
      expect(isStreakBroken(null, day1)).toBe(false);
    });

    it("returns false for consecutive day", () => {
      expect(isStreakBroken(day1, day2)).toBe(false);
    });

    it("returns true for gap day", () => {
      expect(isStreakBroken(day1, day5)).toBe(true);
    });
  });

  describe("getStreakAfterActivity", () => {
    it("computes next streak", () => {
      expect(getStreakAfterActivity(5, day1, day2)).toBe(6);
    });
  });

  describe("isStreakMilestone", () => {
    it("identifies milestones", () => {
      expect(isStreakMilestone(3)).toBe(true);
      expect(isStreakMilestone(7)).toBe(true);
      expect(isStreakMilestone(4)).toBe(false);
    });
  });
});