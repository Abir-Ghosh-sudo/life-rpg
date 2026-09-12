import { describe, expect, it } from "vitest";

import {
  calculateXpForLevel,
  calculateLevelFromXp,
  calculateXpProgress,
  calculateXpRemaining,
} from "@/features/progression/xp";

describe("XP progression", () => {
  it("calculates XP required for a level", () => {
    expect(calculateXpForLevel(1)).toBe(0);
    expect(calculateXpForLevel(2)).toBe(100);
  });

  it("calculates level from XP", () => {
    expect(calculateLevelFromXp(0)).toBe(1);
    expect(calculateLevelFromXp(99)).toBe(1);
    expect(calculateLevelFromXp(100)).toBe(2);
  });

  it("calculates remaining XP", () => {
    expect(calculateXpRemaining(0)).toBe(0);
    expect(calculateXpRemaining(100)).toBe(0);
  });

  it("calculates XP progress percentage", () => {
    const progress = calculateXpProgress(50);

    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });

  it("handles negative XP safely", () => {
    expect(calculateLevelFromXp(-100)).toBe(1);
  });
});