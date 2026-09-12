import { describe, expect, it } from "vitest";

import {
  getAttributeForQuestCategory,
  calculateAttributePoints,
  increaseAttribute,
  applyAttributeReward,
  getTotalAttributePoints,
} from "@/features/progression/attributes";

describe("Attribute progression", () => {
  describe("getAttributeForQuestCategory", () => {
    it("maps coding to intellect", () => {
      expect(getAttributeForQuestCategory("coding")).toBe("intellect");
    });

    it("maps fitness to strength", () => {
      expect(getAttributeForQuestCategory("fitness")).toBe("strength");
    });

    it("maps reading to wisdom", () => {
      expect(getAttributeForQuestCategory("reading")).toBe("wisdom");
    });

    it("maps meditation to discipline", () => {
      expect(getAttributeForQuestCategory("meditation")).toBe("discipline");
    });

    it("maps social to charisma", () => {
      expect(getAttributeForQuestCategory("social")).toBe("charisma");
    });

    it("falls back to discipline for unmapped categories", () => {
      expect(getAttributeForQuestCategory("creative")).toBe("discipline");
    });
  });

  describe("calculateAttributePoints", () => {
    it("returns correct points for each difficulty", () => {
      expect(calculateAttributePoints("easy")).toBe(1);
      expect(calculateAttributePoints("medium")).toBe(2);
      expect(calculateAttributePoints("hard")).toBe(3);
      expect(calculateAttributePoints("epic")).toBe(5);
    });
  });

  describe("increaseAttribute", () => {
    it("adds positive points", () => {
      expect(increaseAttribute(10, 3)).toBe(13);
    });

    it("does not allow negative points", () => {
      expect(increaseAttribute(10, -5)).toBe(10);
    });

    it("does not allow the attribute to become negative", () => {
      expect(increaseAttribute(-10, 0)).toBe(0);
    });

    it("floors fractional values", () => {
      expect(increaseAttribute(10.9, 2.9)).toBe(12);
    });
  });

  describe("applyAttributeReward", () => {
    const attributes = {
      strength: 10,
      intellect: 10,
      discipline: 10,
      charisma: 10,
      wisdom: 10,
    };

    it("applies reward to the mapped attribute", () => {
      const result = applyAttributeReward(attributes, "fitness", "medium");
      expect(result.strength).toBe(12);
      expect(result.intellect).toBe(10);
    });
  });

  describe("getTotalAttributePoints", () => {
    it("sums all attribute values", () => {
      const attributes = {
        strength: 10,
        intellect: 15,
        discipline: 20,
        charisma: 5,
        wisdom: 8,
      };
      expect(getTotalAttributePoints(attributes)).toBe(58);
    });
  });
});