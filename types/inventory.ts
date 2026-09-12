import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

export type ItemType =
  | "avatar"
  | "equipment"
  | "consumable"
  | "theme"
  | "badge"
  | "title"
  | "boost"
  | "special";

export type ItemSlot =
  | "head"
  | "body"
  | "accessory"
  | "weapon"
  | "background"
  | "badge"
  | "none";

export type Item = {
  id: UUID;

  name: string;
  description: string;

  type: ItemType;
  slot: ItemSlot;

  rarity: Rarity;

  icon: string;

  price: number;

  sellPrice: number;

  stackable: boolean;
  maxStack: number;

  effectValue: number;

  requiredLevel: number;

  tradeable: boolean;

  category?: string;
  isActive?: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type InventoryItem = {
  id: UUID;

  userId: UUID;
  itemId: UUID;

  quantity: number;

  equipped: boolean;
  isEquipped?: boolean;
  is_equipped?: boolean;

  acquiredAt: ISODateString;

  updatedAt: ISODateString;
};

export type InventoryItemWithDetails = InventoryItem & {
  item: Item;
};

export type AddInventoryItemInput = {
  userId: UUID;
  itemId: UUID;
  quantity?: number;
};

export type RemoveInventoryItemInput = {
  itemId: UUID;
  quantity?: number;
};

export type EquipItemInput = {
  itemId: UUID;
};

export type UnequipItemInput = {
  itemId: UUID;
};

export type InventoryFilter = {
  type?: ItemType;
  slot?: ItemSlot;
  rarity?: Rarity;
  equipped?: boolean;
};

export type InventorySortField =
  | "name"
  | "rarity"
  | "price"
  | "acquiredAt";

export type InventorySort = {
  field: InventorySortField;
  direction: "asc" | "desc";
};

export type InventoryListParams = {
  filter?: InventoryFilter;
  sort?: InventorySort;

  page?: number;
  limit?: number;
};

export type InventoryState = {
  items: InventoryItemWithDetails[];

  equippedItems: InventoryItemWithDetails[];

  totalItems: number;

  isLoading: boolean;
  error: Nullable<string>;
};

export type InventoryActionResult = {
  success: boolean;

  item?: InventoryItemWithDetails;

  message?: string;
};