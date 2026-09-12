import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import type { Item, InventoryItem } from "@/types/inventory";

export interface EconomyActionResult {
  success: boolean;
  item?: Item;
  inventoryItem?: InventoryItem;
  message: string;
}

function normalizeQuantity(quantity: number): number {
  return Math.max(1, Math.floor(quantity));
}

export async function purchaseItem(
  itemId: string,
  quantity = 1,
): Promise<EconomyActionResult> {
  const userId = await requireUserId();
  const safeQuantity = normalizeQuantity(quantity);

  const supabase = await createClient();

  const { data: item, error: itemError } =
    await supabase
      .from("items")
      .select("*")
      .eq("id", itemId)
      .eq("is_active", true)
      .maybeSingle();

  if (itemError) {
    throw new Error(itemError.message);
  }

  if (!item) {
    return {
      success: false,
      message: "Item not found.",
    };
  }

  const typedItem = item as Item;
  const totalCost =
    Number(typedItem.price) * safeQuantity;

  const { data: wallet, error: walletError } =
    await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

  if (walletError) {
    throw new Error(walletError.message);
  }

  if (!wallet) {
    return {
      success: false,
      message: "Wallet not found.",
    };
  }

  if (Number(wallet.balance) < totalCost) {
    return {
      success: false,
      item: typedItem,
      message: "Insufficient gold.",
    };
  }

  const { data: existing, error: inventoryError } =
    await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .maybeSingle();

  if (inventoryError) {
    throw new Error(inventoryError.message);
  }

  const currentQuantity =
    Number(existing?.quantity ?? 0);

  const maxQuantity = 99;

  if (
    currentQuantity + safeQuantity >
    maxQuantity
  ) {
    return {
      success: false,
      item: typedItem,
      message: `Maximum quantity is ${maxQuantity}.`,
    };
  }

  const newBalance =
    Number(wallet.balance) - totalCost;

  const { error: balanceError } =
    await supabase
      .from("wallet")
      .update({
        balance: newBalance,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("balance", wallet.balance);

  if (balanceError) {
    throw new Error(balanceError.message);
  }

  let inventoryData: InventoryItem | null = null;

  if (existing) {
    const { data, error } = await supabase
      .from("inventory")
      .update({
        quantity:
          currentQuantity + safeQuantity,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    inventoryData = data as InventoryItem;
  } else {
    const { data, error } = await supabase
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

    inventoryData = data as InventoryItem;
  }

  await supabase.from("wallet_transactions").insert({
    user_id: userId,
    amount: -totalCost,
    balance_before: Number(wallet.balance),
    balance_after: newBalance,
    type: "purchase",
    source_type: "shop",
    source_id: itemId,
    metadata: {
      quantity: safeQuantity,
    },
  });

  return {
    success: true,
    item: typedItem,
    inventoryItem: inventoryData,
    message: "Item purchased successfully.",
  };
}

export async function sellItem(
  itemId: string,
  quantity = 1,
): Promise<EconomyActionResult> {
  const userId = await requireUserId();
  const safeQuantity = normalizeQuantity(quantity);

  const supabase = await createClient();

  const { data: inventory, error } =
    await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!inventory) {
    return {
      success: false,
      message: "Item is not in your inventory.",
    };
  }

  if (Number(inventory.quantity) < safeQuantity) {
    return {
      success: false,
      message: "Not enough items.",
    };
  }

  const { data: item, error: itemError } =
    await supabase
      .from("items")
      .select("*")
      .eq("id", itemId)
      .maybeSingle();

  if (itemError) {
    throw new Error(itemError.message);
  }

  if (!item) {
    return {
      success: false,
      message: "Item not found.",
    };
  }

  const typedItem = item as Item;

  const sellValue = Math.floor(
    Number(typedItem.price) * 0.5,
  );

  const totalGold =
    sellValue * safeQuantity;

  const remaining =
    Number(inventory.quantity) - safeQuantity;

  if (remaining === 0) {
    const { error: deleteError } =
      await supabase
        .from("inventory")
        .delete()
        .eq("user_id", userId)
        .eq("item_id", itemId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  } else {
    const { error: updateError } =
      await supabase
        .from("inventory")
        .update({
          quantity: remaining,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("item_id", itemId);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  const { data: wallet, error: walletError } =
    await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", userId)
      .single();

  if (walletError) {
    throw new Error(walletError.message);
  }

  const newBalance =
    Number(wallet.balance) + totalGold;

  const { error: balanceError } =
    await supabase
      .from("wallet")
      .update({
        balance: newBalance,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

  if (balanceError) {
    throw new Error(balanceError.message);
  }

  await supabase.from("wallet_transactions").insert({
    user_id: userId,
    amount: totalGold,
    balance_before: Number(wallet.balance),
    balance_after: newBalance,
    type: "reward",
    source_type: "shop",
    source_id: itemId,
    metadata: {
      action: "sell",
      quantity: safeQuantity,
    },
  });

  return {
    success: true,
    item: typedItem,
    message: "Item sold successfully.",
  };
}

export async function equipItem(
  itemId: string,
): Promise<EconomyActionResult> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data: inventory, error } =
    await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!inventory) {
    return {
      success: false,
      message: "Item is not in your inventory.",
    };
  }

  const { error: unequipError } =
    await supabase
      .from("inventory")
      .update({
        is_equipped: false,
      })
      .eq("user_id", userId);

  if (unequipError) {
    throw new Error(unequipError.message);
  }

  const { data, error: equipError } =
    await supabase
      .from("inventory")
      .update({
        is_equipped: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .select("*")
      .single();

  if (equipError) {
    throw new Error(equipError.message);
  }

  return {
    success: true,
    inventoryItem: data as InventoryItem,
    message: "Item equipped successfully.",
  };
}

export async function unequipItem(
  itemId: string,
): Promise<EconomyActionResult> {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventory")
    .update({
      is_equipped: false,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    inventoryItem: data as InventoryItem,
    message: "Item unequipped successfully.",
  };
}