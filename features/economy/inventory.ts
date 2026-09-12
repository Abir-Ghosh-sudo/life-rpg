import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";

import type {
  InventoryItem,
  Item,
} from "@/types/inventory";

import {
  getInventory,
  getInventoryItem,
  getEquippedItems,
  getItemById,
} from "@/features/economy/queries";

const MAX_ITEM_QUANTITY = 99;

export async function getUserInventory(): Promise<
  InventoryItem[]
> {
  const result = await getInventory({
    page: 1,
    pageSize: 100,
  });

  return result.items;
}

export async function hasItem(
  itemId: string,
): Promise<boolean> {
  const inventory =
    await getInventoryItem(itemId);

  return (
    inventory !== null &&
    Number(inventory.quantity) > 0
  );
}

export async function getItemQuantity(
  itemId: string,
): Promise<number> {
  const inventory =
    await getInventoryItem(itemId);

  return Number(
    inventory?.quantity ?? 0,
  );
}

export async function addInventoryItem(
  itemId: string,
  quantity = 1,
): Promise<InventoryItem> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const safeQuantity = Math.max(
    1,
    Math.floor(quantity),
  );

  if (safeQuantity > MAX_ITEM_QUANTITY) {
    throw new Error(
      `Maximum quantity is ${MAX_ITEM_QUANTITY}.`,
    );
  }

  const supabase = await createClient();

  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found.");
  }

  const existing =
    await getInventoryItem(itemId);

  const currentQuantity =
    Number(existing?.quantity ?? 0);

  const newQuantity =
    currentQuantity + safeQuantity;

  if (newQuantity > MAX_ITEM_QUANTITY) {
    throw new Error(
      `Inventory limit is ${MAX_ITEM_QUANTITY}.`,
    );
  }

  if (existing) {
    const { data, error } =
      await supabase
        .from("inventory")
        .update({
          quantity: newQuantity,
          updated_at:
            new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .select("*")
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as InventoryItem;
  }

  const { data, error } =
    await supabase
      .from("inventory")
      .insert({
        user_id: userId,
        item_id: itemId,
        quantity: safeQuantity,
        is_equipped: false,
      })
      .select("*")
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

export async function removeInventoryItem(
  itemId: string,
  quantity = 1,
): Promise<InventoryItem | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const safeQuantity = Math.max(
    1,
    Math.floor(quantity),
  );

  const existing =
    await getInventoryItem(itemId);

  if (!existing) {
    return null;
  }

  const currentQuantity =
    Number(existing.quantity);

  if (currentQuantity < safeQuantity) {
    throw new Error(
      "Not enough items in inventory.",
    );
  }

  const remaining =
    currentQuantity - safeQuantity;

  const supabase = await createClient();

  if (remaining === 0) {
    const { error } =
      await supabase
        .from("inventory")
        .delete()
        .eq("user_id", userId)
        .eq("item_id", itemId);

    if (error) {
      throw new Error(error.message);
    }

    return null;
  }

  const { data, error } =
    await supabase
      .from("inventory")
      .update({
        quantity: remaining,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select("*")
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

export async function equipInventoryItem(
  itemId: string,
): Promise<InventoryItem> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const inventory =
    await getInventoryItem(itemId);

  if (!inventory) {
    throw new Error(
      "Item is not in your inventory.",
    );
  }

  if (Number(inventory.quantity) <= 0) {
    throw new Error(
      "You do not own this item.",
    );
  }

  const item = await getItemById(itemId);

  if (!item) {
    throw new Error("Item not found.");
  }

  const supabase = await createClient();

  /*
   * Current MVP equipment model:
   * one equipped item at a time.
   *
   * Later this can be expanded into slots:
   * weapon / armor / accessory / cosmetic.
   */
  const { error: clearError } =
    await supabase
      .from("inventory")
      .update({
        is_equipped: false,
      })
      .eq("user_id", userId);

  if (clearError) {
    throw new Error(clearError.message);
  }

  const { data, error } =
    await supabase
      .from("inventory")
      .update({
        is_equipped: true,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select("*")
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

export async function unequipInventoryItem(
  itemId: string,
): Promise<InventoryItem> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("inventory")
      .update({
        is_equipped: false,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select("*")
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as InventoryItem;
}

export async function getEquippedInventory():
  Promise<InventoryItem[]> {
  return getEquippedItems();
}

export async function getInventoryItemWithDetails(
  itemId: string,
): Promise<{
  inventory: InventoryItem;
  item: Item;
} | null> {
  const inventory =
    await getInventoryItem(itemId);

  if (!inventory) {
    return null;
  }

  const item =
    await getItemById(itemId);

  if (!item) {
    return null;
  }

  return {
    inventory,
    item,
  };
}

export async function getInventoryStats() {
  const items =
    await getUserInventory();

  const equipped =
    items.filter(
      (item) => item.isEquipped,
    );

  const totalQuantity =
    items.reduce(
      (total, item) =>
        total + Number(item.quantity ?? 0),
      0,
    );

  return {
    uniqueItems: items.length,
    totalQuantity,
    equippedItems: equipped.length,
  };
}

export function isInventoryFull(
  inventory: InventoryItem[],
): boolean {
  return inventory.length >= 100;
}

export function getInventoryValue(
  inventory: InventoryItem[],
  items: Item[],
): number {
  const priceMap = new Map(
    items.map((item) => [
      item.id,
      Number(item.price),
    ]),
  );

  return inventory.reduce(
    (total, inventoryItem) => {
      const price =
        priceMap.get(inventoryItem.itemId) ??
        0;

      return (
        total +
        price *
          Number(inventoryItem.quantity ?? 0)
      );
    },
    0,
  );
}