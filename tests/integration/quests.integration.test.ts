import { describe, expect, it } from "vitest";

import {
  validateCreateQuestInput,
  validateCompleteQuestInput,
  validateUpdateQuestInput,
  validateQuestId,
} from "@/features/quests/validations";

import { calculateQuestReward } from "@/features/quests/rewards";

describe("Quest integration contract", () => {
  const validQuest = {
    title: "Complete React practice",
    description: "Finish one React lesson",
    category: "study",
    type: "one_time",
    difficulty: "medium",
    rarity: "common",
  };

  describe("create quest flow", () => {
    it("accepts a valid quest", () => {
      const result = validateCreateQuestInput(validQuest);

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.title).toBe(validQuest.title);
        expect(result.data.category).toBe("study");
      }
    });

    it("rejects an invalid quest", () => {
      const result = validateCreateQuestInput({
        ...validQuest,
        title: "",
      });

      expect(result.success).toBe(false);
    });

    it("rejects an invalid category", () => {
      const result = validateCreateQuestInput({
        ...validQuest,
        category: "invalid-category",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("update quest flow", () => {
    it("accepts valid update data", () => {
      const result = validateUpdateQuestInput({
        title: "Updated quest",
        difficulty: "hard",
      });

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.title).toBe("Updated quest");
        expect(result.data.difficulty).toBe("hard");
      }
    });

    it("allows partial updates", () => {
      const result = validateUpdateQuestInput({
        title: "New title",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("quest id flow", () => {
    it("accepts a valid quest id", () => {
      const result = validateQuestId(
        "550e8400-e29b-41d4-a716-446655440000",
      );

      expect(result.success).toBe(true);
    });

    it("rejects an invalid quest id", () => {
      const result = validateQuestId("not-a-valid-id");

      expect(result.success).toBe(false);
    });
  });

  describe("complete quest flow", () => {
    it("accepts a valid completion request", () => {
      const result = validateCompleteQuestInput({
        questId: "550e8400-e29b-41d4-a716-446655440000",
      });

      expect(result.success).toBe(true);
    });

    it("rejects an invalid completion request", () => {
      const result = validateCompleteQuestInput({
        questId: "invalid-id",
      });

      expect(result.success).toBe(false);
    });

    it("generates a reward for completing a quest", () => {
      const reward = calculateQuestReward({
        difficulty: "medium",
        rarity: "common",
      });

      expect(reward.xp).toBeGreaterThan(0);
      expect(reward.gold).toBeGreaterThanOrEqual(0);
    });

    it("gives higher rewards for harder quests", () => {
      const easy = calculateQuestReward({
        difficulty: "easy",
        rarity: "common",
      });

      const hard = calculateQuestReward({
        difficulty: "hard",
        rarity: "common",
      });

      expect(hard.xp).toBeGreaterThan(easy.xp);
    });
  });

  describe("completion safety contract", () => {
    it("requires a quest id for completion", () => {
      const result = validateCompleteQuestInput({});

      expect(result.success).toBe(false);
    });

    it("does not accept arbitrary completion payloads", () => {
      const result = validateCompleteQuestInput({
        questId: "550e8400-e29b-41d4-a716-446655440000",
        xp: 999999,
        gold: 999999,
      });

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).not.toHaveProperty("xp");
        expect(result.data).not.toHaveProperty("gold");
      }
    });
  });
});