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
    description: "A basic sword",
    category: "equipment",
    rarity: "common",
    price: 100,
    isActive: true,
    ...overrides,
  } as Item;
}

describe("shop utilities", () => {
  it("calculates the sell price at 50% of the purchase price", () => {
    expect(getItemSellPrice(createItem({ price: 100 }))).toBe(50);
    expect(getItemSellPrice(createItem({ price: 99 }))).toBe(49);
  });

  it("calculates total purchase price", () => {
    const item = createItem({ price: 100 });

    expect(getTotalPurchasePrice(item)).toBe(100);
    expect(getTotalPurchasePrice(item, 3)).toBe(300);
  });

  it("clamps purchase quantity between 1 and 99", () => {
    const item = createItem({ price: 100 });

    expect(getTotalPurchasePrice(item, 0)).toBe(100);
    expect(getTotalPurchasePrice(item, -10)).toBe(100);
    expect(getTotalPurchasePrice(item, 150)).toBe(9900);
  });

  it("checks whether an item is affordable", () => {
    const item = createItem({ price: 100 });

    expect(canAffordItem(item, 100)).toBe(true);
    expect(canAffordItem(item, 99)).toBe(false);
    expect(canAffordItem(item, 300, 3)).toBe(true);
    expect(canAffordItem(item, 299, 3)).toBe(false);
  });

  it("builds a shop item with ownership and affordability", () => {
    const item = createItem({ price: 100 });

    const result = buildShopItem(item, 150, 2);

    expect(result.id).toBe(item.id);
    expect(result.name).toBe(item.name);
    expect(result.canAfford).toBe(true);
    expect(result.ownedQuantity).toBe(2);
  });

  it("filters shop items by category", () => {
    const items = [
      createItem({
        id: "1",
        category: "equipment",
      }),
      createItem({
        id: "2",
        category: "consumable",
      }),
    ];

    const result = filterShopItems(items, {
      category: "equipment",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("filters shop items by rarity", () => {
    const items = [
      createItem({
        id: "1",
        rarity: "common",
      }),
      createItem({
        id: "2",
        rarity: "rare",
      }),
    ];

    const result = filterShopItems(items, {
      rarity: "rare",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters shop items by search text", () => {
    const items = [
      createItem({
        id: "1",
        name: "Iron Sword",
      }),
      createItem({
        id: "2",
        name: "Health Potion",
      }),
    ];

    const result = filterShopItems(items, {
      search: "sword",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Iron Sword");
  });

  it("sorts items by ascending price", () => {
    const items = [
      createItem({ id: "expensive", price: 500 }),
      createItem({ id: "cheap", price: 50 }),
    ];

    const result = sortShopItems(items, "price_asc");

    expect(result.map((item) => item.id)).toEqual([
      "cheap",
      "expensive",
    ]);
  });

  it("sorts items by descending price", () => {
    const items = [
      createItem({ id: "cheap", price: 50 }),
      createItem({ id: "expensive", price: 500 }),
    ];

    const result = sortShopItems(items, "price_desc");

    expect(result.map((item) => item.id)).toEqual([
      "expensive",
      "cheap",
    ]);
  });

  it("sorts items alphabetically by name", () => {
    const items = [
      createItem({ id: "2", name: "Zeta" }),
      createItem({ id: "1", name: "Alpha" }),
    ];

    const result = sortShopItems(items, "name");

    expect(result.map((item) => item.name)).toEqual([
      "Alpha",
      "Zeta",
    ]);
  });

  it("calculates maximum affordable quantity", () => {
    const item = createItem({ price: 100 });

    expect(getMaximumAffordableQuantity(item, 450)).toBe(4);
    expect(getMaximumAffordableQuantity(item, 50)).toBe(0);
    expect(getMaximumAffordableQuantity(item, 10000)).toBe(99);
  });

  it("validates supported rarities", () => {
    expect(isValidShopRarity("common")).toBe(true);
    expect(isValidShopRarity("legendary")).toBe(true);
    expect(isValidShopRarity("mythic")).toBe(true);
    expect(isValidShopRarity("invalid")).toBe(false);
  });

  it("clamps purchase quantity directly", () => {
    expect(clampPurchaseQuantity(0)).toBe(1);
    expect(clampPurchaseQuantity(-5)).toBe(1);
    expect(clampPurchaseQuantity(5.9)).toBe(5);
    expect(clampPurchaseQuantity(200)).toBe(99);
  });
});