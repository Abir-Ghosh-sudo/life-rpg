import { describe, expect, it } from "vitest";

import {
  calculateCharacterStats,
  calculateDerivedStats,
  getDefaultCharacterStats,
} from "@/features/character/stats";

describe("Character integration", () => {
  describe("character creation", () => {
    it("creates valid default character stats", () => {
      const stats = getDefaultCharacterStats();

      expect(stats).toBeDefined();
      expect(stats).toHaveProperty("strength");
      expect(stats).toHaveProperty("intelligence");
      expect(stats).toHaveProperty("discipline");
      expect(stats).toHaveProperty("vitality");

      for (const value of Object.values(stats)) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("attribute → character stats", () => {
    it("calculates character stats from attributes", () => {
      const attributes = getDefaultCharacterStats();
      const stats = calculateCharacterStats(attributes);

      expect(stats).toBeDefined();

      for (const value of Object.values(stats)) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    });

    it("produces derived stats from character stats", () => {
      const attributes = getDefaultCharacterStats();
      const characterStats = calculateCharacterStats(attributes);
      const derived = calculateDerivedStats(characterStats);

      expect(derived).toBeDefined();

      for (const value of Object.values(derived)) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("progression consistency", () => {
    it("keeps stats deterministic for the same attributes", () => {
      const attributes = getDefaultCharacterStats();

      const first = calculateCharacterStats(attributes);
      const second = calculateCharacterStats(attributes);

      expect(second).toEqual(first);
    });
  });
});