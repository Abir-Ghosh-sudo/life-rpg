"use server";

import {
  purchaseItem,
  sellItem,
  equipItem,
  unequipItem,
} from "@/features/economy/service";

export async function purchaseItemAction(
  itemId: string,
  quantity: number = 1,
) {
  return purchaseItem(itemId, quantity);
}

export async function sellItemAction(
  itemId: string,
  quantity: number = 1,
) {
  return sellItem(itemId, quantity);
}

export async function equipItemAction(
  itemId: string,
) {
  return equipItem(itemId);
}

export async function unequipItemAction(
  itemId: string,
) {
  return unequipItem(itemId);
}