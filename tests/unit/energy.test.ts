import { describe, expect, it } from "vitest";

import {
  calculateEnergyRegen,
  getEnergyAfterRegen,
  consumeEnergy,
  restoreEnergy,
  canAffordEnergy,
  getEnergyPercentage,
  isEnergyEmpty,
  isEnergyFull,
} from "@/features/progression/energy";

describe("Energy progression", () => {
  describe("calculateEnergyRegen", () => {
    it("returns zero for zero elapsed time", () => {
      expect(calculateEnergyRegen(0)).toBe(0);
    });

    it("calculates regeneration from elapsed hours", () => {
      expect(calculateEnergyRegen(1)).toBe(10);
      expect(calculateEnergyRegen(2)).toBe(20);
    });

    it("does not return negative regeneration", () => {
      expect(calculateEnergyRegen(-2)).toBe(0);
    });
  });

  describe("getEnergyAfterRegen", () => {
    it("restores energy over time", () => {
      expect(getEnergyAfterRegen(50, 2)).toBe(70);
    });

    it("does not exceed maximum energy", () => {
      expect(getEnergyAfterRegen(95, 2)).toBeLessThanOrEqual(100);
    });

    it("does not reduce energy", () => {
      expect(getEnergyAfterRegen(50, 0)).toBe(50);
    });
  });

  describe("consumeEnergy", () => {
    it("consumes the requested energy", () => {
      expect(consumeEnergy(100, 20)).toBe(80);
    });

    it("does not allow energy below zero", () => {
      expect(consumeEnergy(10, 50)).toBe(0);
    });

    it("does not consume negative energy", () => {
      expect(consumeEnergy(50, -10)).toBe(50);
    });
  });

  describe("restoreEnergy", () => {
    it("restores energy", () => {
      expect(restoreEnergy(50, 20)).toBe(70);
    });

    it("does not exceed maximum energy", () => {
      expect(restoreEnergy(90, 50)).toBeLessThanOrEqual(100);
    });

    it("does not reduce energy with a negative amount", () => {
      expect(restoreEnergy(50, -20)).toBe(50);
    });
  });

  describe("canAffordEnergy", () => {
    it("returns true when enough energy exists", () => {
      expect(canAffordEnergy(50, 20)).toBe(true);
      expect(canAffordEnergy(20, 20)).toBe(true);
    });

    it("returns false when energy is insufficient", () => {
      expect(canAffordEnergy(10, 20)).toBe(false);
    });
  });

  describe("getEnergyPercentage", () => {
    it("calculates energy percentage", () => {
      expect(getEnergyPercentage(50)).toBe(50);
    });

    it("caps percentage at 100", () => {
      expect(getEnergyPercentage(150)).toBe(100);
    });

    it("does not return a negative percentage", () => {
      expect(getEnergyPercentage(-20)).toBe(0);
    });
  });

  describe("energy state", () => {
    it("detects empty energy", () => {
      expect(isEnergyEmpty(0)).toBe(true);
      expect(isEnergyEmpty(10)).toBe(false);
    });

    it("detects full energy", () => {
      expect(isEnergyFull(100)).toBe(true);
      expect(isEnergyFull(99)).toBe(false);
    });
  });
});