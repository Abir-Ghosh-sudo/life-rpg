import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
} from "@/types/common";

import type {
  Item,
  ItemType,
} from "@/types/inventory";

export type ShopCategory =
  | "avatar"
  | "equipment"
  | "consumable"
  | "theme"
  | "badge"
  | "title"
  | "boost"
  | "special";

export type ShopItem = {
  id: UUID;

  itemId: UUID;

  item: Item;

  category: ShopCategory;

  price: number;

  discountPercentage: number;

  finalPrice: number;

  stock: Nullable<number>;

  requiredLevel: number;

  available: boolean;

  featured: boolean;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ShopPurchaseInput = {
  shopItemId: UUID;

  quantity?: number;
};

export type ShopPurchaseResult = {
  success: boolean;

  shopItem: ShopItem;

  quantity: number;

  totalCost: number;

  remainingGold: number;

  inventoryItemId: UUID;

  purchasedAt: ISODateString;
};

export type ShopFilter = {
  category?: ShopCategory;

  itemType?: ItemType;

  rarity?: Rarity;

  minPrice?: number;

  maxPrice?: number;

  featured?: boolean;

  availableOnly?: boolean;
};

export type ShopSortField =
  | "name"
  | "price"
  | "rarity"
  | "createdAt";

export type ShopSort = {
  field: ShopSortField;

  direction: "asc" | "desc";
};

export type ShopListParams = {
  filter?: ShopFilter;

  sort?: ShopSort;

  page?: number;

  limit?: number;
};

export type ShopState = {
  items: ShopItem[];

  featuredItems: ShopItem[];

  isLoading: boolean;

  error: Nullable<string>;
};

export type ShopTransaction = {
  id: UUID;

  userId: UUID;

  shopItemId: UUID;

  itemId: UUID;

  quantity: number;

  unitPrice: number;

  totalCost: number;

  createdAt: ISODateString;
};