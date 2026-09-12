import { describe, expect, it } from "vitest";

import {
  normalizeReward,
  combineRewards,
  multiplyReward,
  addRewardBonus,
  hasReward,
  getRewardTotal,
} from "@/features/progression/rewards";

describe("Progression rewards", () => {
  describe("normalizeReward", () => {
    it("fills missing values with zero", () => {
      expect(normalizeReward({})).toEqual({
        xp: 0,
        gold: 0,
        energy: 0,
        hp: 0,
        attributePoints: 0,
        rewardType: undefined,
      });
    });

    it("floors decimal values", () => {
      expect(
        normalizeReward({
          xp: 25.9,
          gold: 10.8,
          energy: 5.7,
          hp: 3.4,
          attributePoints: 2.9,
        }),
      ).toEqual({
        xp: 25,
        gold: 10,
        energy: 5,
        hp: 3,
        attributePoints: 2,
        rewardType: undefined,
      });
    });

    it("prevents negative rewards", () => {
      const result = normalizeReward({
        xp: -100,
        gold: -50,
        energy: -10,
        hp: -5,
        attributePoints: -2,
      });

      expect(result.xp).toBe(0);
      expect(result.gold).toBe(0);
      expect(result.energy).toBe(0);
      expect(result.hp).toBe(0);
      expect(result.attributePoints).toBe(0);
    });
  });

  describe("combineRewards", () => {
    it("combines multiple rewards", () => {
      expect(
        combineRewards(
          { xp: 100, gold: 20 },
          { xp: 50, gold: 10, energy: 5 },
        ),
      ).toEqual({
        xp: 150,
        gold: 30,
        energy: 5,
        hp: 0,
        attributePoints: 0,
      });
    });

    it("handles no rewards", () => {
      expect(combineRewards()).toEqual({
        xp: 0,
        gold: 0,
        energy: 0,
        hp: 0,
        attributePoints: 0,
      });
    });
  });

  describe("multiplyReward", () => {
    it("multiplies XP and gold", () => {
      expect(
        multiplyReward(
          {
            xp: 100,
            gold: 50,
            energy: 10,
          },
          2,
        ),
      ).toEqual({
        xp: 200,
        gold: 100,
        energy: 10,
        hp: 0,
        attributePoints: 0,
      });
    });

    it("floors multiplied values", () => {
      const result = multiplyReward(
        { xp: 100, gold: 50 },
        1.5,
      );

      expect(result.xp).toBe(150);
      expect(result.gold).toBe(75);
    });

    it("does not allow a negative multiplier", () => {
      const result = multiplyReward(
        { xp: 100, gold: 50 },
        -2,
      );

      expect(result.xp).toBe(0);
      expect(result.gold).toBe(0);
    });

    it("uses a safe multiplier for Infinity", () => {
      const result = multiplyReward(
        { xp: 100, gold: 50 },
        Infinity,
      );

      expect(result.xp).toBe(100);
      expect(result.gold).toBe(50);
    });
  });

  describe("addRewardBonus", () => {
    it("adds a bonus reward", () => {
      expect(
        addRewardBonus({ xp: 100 }, { xp: 50, gold: 20 }),
      ).toEqual({
        xp: 150,
        gold: 20,
        energy: 0,
        hp: 0,
        attributePoints: 0,
      });
    });
  });

  describe("hasReward", () => {
    it("returns true when reward has values", () => {
      expect(hasReward({ xp: 10 })).toBe(true);
    });

    it("returns false when reward is empty", () => {
      expect(hasReward({})).toBe(false);
      expect(hasReward({ xp: 0 })).toBe(false);
    });
  });

  describe("getRewardTotal", () => {
    it("sums all reward values", () => {
      expect(
        getRewardTotal({
          xp: 100,
          gold: 50,
          energy: 10,
          hp: 5,
          attributePoints: 2,
        }),
      ).toBe(167);
    });
  });
});