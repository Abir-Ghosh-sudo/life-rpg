import type { ID, Rarity } from "@/types/common";
import type { InventoryItem, Item } from "@/types/inventory";

export interface ItemIdInput {
  itemId: ID;
}

export interface QuantityInput {
  quantity?: number;
}

export interface PurchaseItemInput {
  itemId: ID;
  quantity?: number;
}

export interface SellItemInput {
  itemId: ID;
  quantity?: number;
}

export interface EquipItemInput {
  itemId: ID;
}

export interface WalletSummary {
  balance: number;
  currency: "gold";
}

export interface InventorySummary {
  totalItems: number;
  equippedItems: number;
  uniqueItems: number;
}

export interface ShopItem extends Item {
  canAfford: boolean;
  ownedQuantity: number;
}

export interface ShopQueryOptions {
  category?: string;
  rarity?: Rarity;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ShopListResult {
  items: ShopItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface InventoryQueryOptions {
  equippedOnly?: boolean;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface InventoryListResult {
  items: InventoryItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PurchaseResult {
  success: boolean;
  item?: Item;
  inventoryItem?: InventoryItem;
  quantity: number;
  totalCost: number;
  remainingGold: number;
  message: string;
}

export interface SellResult {
  success: boolean;
  item?: Item;
  quantity: number;
  totalGold: number;
  remainingQuantity: number;
  newBalance: number;
  message: string;
}

export interface EquipResult {
  success: boolean;
  inventoryItem?: InventoryItem;
  message: string;
}

export interface EconomyActionResult {
  success: boolean;
  message: string;
}

export interface EconomyTransaction {
  id: ID;
  userId: ID;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  type: string;
  sourceType?: string | null;
  sourceId?: ID | null;
  metadata?: Record<string, unknown>;
  createdAt: string;
}