import { describe, expect, it } from "vitest";

import type { Item } from "@/types/inventory";

import {
  buildShopItem,
  canAffordItem,
  clampPurchaseQuantity,
  filterShopItems,
  getItemSellPrice,
  getMaximumAffordableQuantity,
  getTotalPurchasePrice,
  isValidShopRarity,
  sortShopItems,
} from "@/features/economy/shop";

function createItem(overrides: Partial<Item> = {}): Item {
  return {
    id: "item-1",
    name: "Iron Sword",
    description: "A basic training sword",
    category: "equipment",
    rarity: "common",
    price: 100,
    isActive: true,
    ...overrides,
  } as Item;
}

describe("Economy integration", () => {
  describe("wallet → shop pricing", () => {
    it("calculates the total purchase cost", () => {
      const item = createItem({ price: 100 });

      expect(getTotalPurchasePrice(item, 3)).toBe(300);
    });

    it("checks whether the wallet can afford a purchase", () => {
      const item = createItem({ price: 100 });

      expect(canAffordItem(item, 300, 3)).toBe(true);
      expect(canAffordItem(item, 299, 3)).toBe(false);
    });

    it("calculates the maximum affordable quantity", () => {
      const item = createItem({ price: 100 });

      expect(getMaximumAffordableQuantity(item, 450)).toBe(4);
      expect(getMaximumAffordableQuantity(item, 50)).toBe(0);
    });
  });

  describe("shop → inventory", () => {
    it("builds a shop item with wallet and inventory state", () => {
      const item = createItem({ price: 100 });

      const shopItem = buildShopItem(item, 250, 2);

      expect(shopItem.id).toBe(item.id);
      expect(shopItem.canAfford).toBe(true);
      expect(shopItem.ownedQuantity).toBe(2);
    });

    it("does not mark an expensive item as affordable", () => {
      const item = createItem({ price: 500 });

      const shopItem = buildShopItem(item, 100, 0);

      expect(shopItem.canAfford).toBe(false);
    });
  });

  describe("purchase quantity safety", () => {
    it("normalizes invalid quantities", () => {
      expect(clampPurchaseQuantity(0)).toBe(1);
      expect(clampPurchaseQuantity(-5)).toBe(1);
      expect(clampPurchaseQuantity(5.9)).toBe(5);
    });

    it("caps purchases at 99 items", () => {
      expect(clampPurchaseQuantity(1000)).toBe(99);
    });

    it("caps the calculated purchase price quantity", () => {
      const item = createItem({ price: 10 });

      expect(getTotalPurchasePrice(item, 1000)).toBe(990);
    });
  });

  describe("item selling", () => {
    it("returns half the purchase price as sell value", () => {
      const item = createItem({ price: 100 });

      expect(getItemSellPrice(item)).toBe(50);
    });

    it("floors fractional sell values", () => {
      const item = createItem({ price: 99 });

      expect(getItemSellPrice(item)).toBe(49);
    });
  });

  describe("shop filtering", () => {
    const items = [
      createItem({
        id: "sword",
        name: "Iron Sword",
        category: "equipment",
        rarity: "common",
        price: 100,
      }),
      createItem({
        id: "potion",
        name: "Health Potion",
        category: "consumable",
        rarity: "rare",
        price: 50,
      }),
    ];

    it("filters by category", () => {
      const result = filterShopItems(items, {
        category: "equipment",
      });

      expect(result.map((item) => item.id)).toEqual(["sword"]);
    });

    it("filters by rarity", () => {
      const result = filterShopItems(items, {
        rarity: "rare",
      });

      expect(result.map((item) => item.id)).toEqual(["potion"]);
    });

    it("filters by search text", () => {
      const result = filterShopItems(items, {
        search: "sword",
      });

      expect(result.map((item) => item.id)).toEqual(["sword"]);
    });
  });

  describe("shop sorting", () => {
    const items = [
      createItem({
        id: "expensive",
        name: "Zeta Sword",
        price: 500,
      }),
      createItem({
        id: "cheap",
        name: "Alpha Potion",
        price: 50,
      }),
    ];

    it("sorts by ascending price", () => {
      const result = sortShopItems(items, "price_asc");

      expect(result.map((item) => item.id)).toEqual([
        "cheap",
        "expensive",
      ]);
    });

    it("sorts by descending price", () => {
      const result = sortShopItems(items, "price_desc");

      expect(result.map((item) => item.id)).toEqual([
        "expensive",
        "cheap",
      ]);
    });

    it("sorts by name", () => {
      const result = sortShopItems(items, "name");

      expect(result.map((item) => item.name)).toEqual([
        "Alpha Potion",
        "Zeta Sword",
      ]);
    });
  });

  describe("rarity validation", () => {
    it("accepts supported rarities", () => {
      expect(isValidShopRarity("common")).toBe(true);
      expect(isValidShopRarity("rare")).toBe(true);
      expect(isValidShopRarity("legendary")).toBe(true);
      expect(isValidShopRarity("mythic")).toBe(true);
    });

    it("rejects unsupported rarities", () => {
      expect(isValidShopRarity("invalid")).toBe(false);
      expect(isValidShopRarity("ultra")).toBe(false);
    });
  });
});