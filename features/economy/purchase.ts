import type { Item } from "@/types/inventory";

import {
  getItemById,
  getInventoryItem,
  getWallet,
} from "@/features/economy/queries";

import {
  clampPurchaseQuantity,
  getTotalPurchasePrice,
  getMaximumAffordableQuantity,
} from "@/features/economy/shop";

import type {
  PurchaseItemInput,
} from "@/features/economy/types";

export interface PurchaseValidationResult {
  valid: boolean;
  item: Item | null;
  quantity: number;
  totalCost: number;
  balance: number;
  ownedQuantity: number;
  error?: string;
}

const MAX_QUANTITY = 99;

export function validatePurchaseQuantity(
  quantity: number | undefined,
): number {
  if (
    quantity === undefined ||
    !Number.isFinite(quantity)
  ) {
    return 1;
  }

  return clampPurchaseQuantity(quantity);
}

export function validatePurchaseInput(
  input: PurchaseItemInput,
): string | null {
  if (!input.itemId?.trim()) {
    return "Item ID is required.";
  }

  if (
    input.quantity !== undefined &&
    (!Number.isFinite(input.quantity) ||
      input.quantity <= 0)
  ) {
    return "Quantity must be greater than zero.";
  }

  if (
    input.quantity !== undefined &&
    input.quantity > MAX_QUANTITY
  ) {
    return `Maximum purchase quantity is ${MAX_QUANTITY}.`;
  }

  return null;
}

export async function validatePurchase(
  input: PurchaseItemInput,
): Promise<PurchaseValidationResult> {
  const inputError =
    validatePurchaseInput(input);

  if (inputError) {
    return {
      valid: false,
      item: null,
      quantity: 0,
      totalCost: 0,
      balance: 0,
      ownedQuantity: 0,
      error: inputError,
    };
  }

  const quantity =
    validatePurchaseQuantity(input.quantity);

  const [
    item,
    wallet,
    inventory,
  ] = await Promise.all([
    getItemById(input.itemId),
    getWallet(),
    getInventoryItem(input.itemId),
  ]);

  if (!item || item.isActive === false) {
    return {
      valid: false,
      item: null,
      quantity,
      totalCost: 0,
      balance: wallet.balance,
      ownedQuantity:
        Number(inventory?.quantity ?? 0),
      error: "Item is unavailable.",
    };
  }

  const ownedQuantity =
    Number(inventory?.quantity ?? 0);

  const totalCost =
    getTotalPurchasePrice(
      item,
      quantity,
    );

  if (
    ownedQuantity + quantity >
    MAX_QUANTITY
  ) {
    return {
      valid: false,
      item,
      quantity,
      totalCost,
      balance: wallet.balance,
      ownedQuantity,
      error:
        `You can own at most ${MAX_QUANTITY} of this item.`,
    };
  }

  if (wallet.balance < totalCost) {
    const maximumAffordable =
      getMaximumAffordableQuantity(
        item,
        wallet.balance,
      );

    return {
      valid: false,
      item,
      quantity,
      totalCost,
      balance: wallet.balance,
      ownedQuantity,
      error:
        maximumAffordable > 0
          ? `Insufficient gold. You can afford ${maximumAffordable}.`
          : "Insufficient gold.",
    };
  }

  return {
    valid: true,
    item,
    quantity,
    totalCost,
    balance: wallet.balance,
    ownedQuantity,
  };
}

export async function canPurchase(
  input: PurchaseItemInput,
): Promise<boolean> {
  const result =
    await validatePurchase(input);

  return result.valid;
}

export async function getPurchasePreview(
  input: PurchaseItemInput,
) {
  const result =
    await validatePurchase(input);

  return {
    valid: result.valid,
    item: result.item,
    quantity: result.quantity,
    totalCost: result.totalCost,
    currentBalance: result.balance,
    remainingBalance:
      result.valid
        ? result.balance - result.totalCost
        : result.balance,
    ownedQuantity:
      result.ownedQuantity,
    error: result.error ?? null,
  };
}