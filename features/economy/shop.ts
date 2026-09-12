import type { Rarity } from "@/types/common";
import type { Item } from "@/types/inventory";

import {
  getItemById,
  getOwnedItemQuantity,
  getWallet,
} from "@/features/economy/queries";

import type {
  ShopItem,
  ShopQueryOptions,
} from "@/features/economy/types";

const SELL_PRICE_RATIO = 0.5;
const MAX_PURCHASE_QUANTITY = 99;

export function getItemSellPrice(
  item: Item,
): number {
  return Math.max(
    0,
    Math.floor(
      Number(item.price) * SELL_PRICE_RATIO,
    ),
  );
}

export function getTotalPurchasePrice(
  item: Item,
  quantity = 1,
): number {
  const safeQuantity = Math.min(
    MAX_PURCHASE_QUANTITY,
    Math.max(1, Math.floor(quantity)),
  );

  return Number(item.price) * safeQuantity;
}

export function canAffordItem(
  item: Item,
  balance: number,
  quantity = 1,
): boolean {
  return (
    Number(balance) >=
    getTotalPurchasePrice(item, quantity)
  );
}

export function buildShopItem(
  item: Item,
  balance: number,
  ownedQuantity = 0,
): ShopItem {
  return {
    ...item,
    canAfford:
      Number(balance) >= Number(item.price),
    ownedQuantity,
  };
}

export function filterShopItems(
  items: Item[],
  options: ShopQueryOptions = {},
): Item[] {
  let result = [...items];

  if (options.category) {
    result = result.filter(
      (item) =>
        item.category === options.category,
    );
  }

  if (options.rarity) {
    result = result.filter(
      (item) =>
        item.rarity === options.rarity,
    );
  }

  if (options.search?.trim()) {
    const search =
      options.search.trim().toLowerCase();

    result = result.filter((item) =>
      [
        item.name,
        item.description,
        item.category,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(search),
        ),
    );
  }

  return result;
}

export function sortShopItems(
  items: Item[],
  sort:
    | "price_asc"
    | "price_desc"
    | "name"
    | "rarity" = "price_asc",
): Item[] {
  return [...items].sort((a, b) => {
    switch (sort) {
      case "price_desc":
        return (
          Number(b.price) -
          Number(a.price)
        );

      case "name":
        return a.name.localeCompare(b.name);

      case "rarity":
        return String(a.rarity).localeCompare(
          String(b.rarity),
        );

      case "price_asc":
      default:
        return (
          Number(a.price) -
          Number(b.price)
        );
    }
  });
}

export function getMaximumAffordableQuantity(
  item: Item,
  balance: number,
): number {
  const price = Number(item.price);

  if (price <= 0) {
    return MAX_PURCHASE_QUANTITY;
  }

  return Math.min(
    MAX_PURCHASE_QUANTITY,
    Math.floor(Number(balance) / price),
  );
}

export async function getShopItem(
  itemId: string,
): Promise<ShopItem | null> {
  const item = await getItemById(itemId);

  if (!item || !item.isActive) {
    return null;
  }

  const [wallet, ownedQuantity] =
    await Promise.all([
      getWallet(),
      getOwnedItemQuantity(itemId),
    ]);

  return buildShopItem(
    item,
    wallet.balance,
    ownedQuantity,
  );
}

export async function getShopItemPricing(
  itemId: string,
) {
  const item = await getItemById(itemId);

  if (!item) {
    return null;
  }

  const wallet = await getWallet();

  return {
    itemId,
    price: Number(item.price),
    sellPrice: getItemSellPrice(item),
    balance: wallet.balance,
    maximumAffordableQuantity:
      getMaximumAffordableQuantity(
        item,
        wallet.balance,
      ),
  };
}

export function isValidShopRarity(
  rarity: string,
): rarity is Rarity {
  return [
    "common",
    "uncommon",
    "rare",
    "epic",
    "legendary",
    "mythic",
  ].includes(rarity);
}

export function clampPurchaseQuantity(
  quantity: number,
): number {
  return Math.min(
    MAX_PURCHASE_QUANTITY,
    Math.max(1, Math.floor(quantity)),
  );
}