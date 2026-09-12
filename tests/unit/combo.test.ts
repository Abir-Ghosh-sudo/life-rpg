import { describe, expect, it } from "vitest";

import {
  calculateComboMultiplier,
  incrementCombo,
  resetCombo,
  isComboExpired,
  getComboMultiplier,
} from "@/features/progression/combo";

describe("Combo progression", () => {
  describe("calculateComboMultiplier", () => {
    it("starts at the base multiplier", () => {
      expect(calculateComboMultiplier(0)).toBe(1);
    });

    it("increases with combo count", () => {
      expect(calculateComboMultiplier(1)).toBeGreaterThan(1);
      expect(calculateComboMultiplier(5)).toBeGreaterThan(
        calculateComboMultiplier(1),
      );
    });

    it("does not exceed the configured maximum", () => {
      expect(calculateComboMultiplier(100)).toBeLessThanOrEqual(2);
    });

    it("does not produce a multiplier below 1", () => {
      expect(calculateComboMultiplier(-10)).toBe(1);
    });
  });

  describe("incrementCombo", () => {
    it("increments combo by one", () => {
      expect(incrementCombo(0)).toBe(1);
      expect(incrementCombo(5)).toBe(6);
    });

    it("does not allow a negative combo", () => {
      expect(incrementCombo(-5)).toBe(1);
    });
  });

  describe("resetCombo", () => {
    it("resets combo to zero", () => {
      expect(resetCombo()).toBe(0);
    });
  });

  describe("getComboMultiplier", () => {
    it("returns the multiplier for a combo", () => {
      expect(getComboMultiplier(0)).toBe(1);
      expect(getComboMultiplier(5)).toBeGreaterThan(1);
    });

    it("caps the multiplier", () => {
      expect(getComboMultiplier(999)).toBeLessThanOrEqual(2);
    });
  });

  describe("isComboExpired", () => {
    const now = new Date("2026-09-12T12:00:00.000Z");

    it("returns false when there is no last activity", () => {
      expect(isComboExpired(null, now)).toBe(false);
    });

    it("returns false within the combo window", () => {
      const lastActivity = new Date("2026-09-12T11:30:00.000Z");

      expect(isComboExpired(lastActivity, now)).toBe(false);
    });

    it("returns true after the combo window", () => {
      const lastActivity = new Date("2026-09-11T10:00:00.000Z");

      expect(isComboExpired(lastActivity, now)).toBe(true);
    });
  });
});