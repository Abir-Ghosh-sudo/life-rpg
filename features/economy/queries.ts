import { createClient } from "@/lib/supabase/server";
import { getCurrentUserId } from "@/lib/auth/session";

import type {
  InventoryItem,
  Item,
} from "@/types/inventory";

import type {
  InventoryListResult,
  InventoryQueryOptions,
  ShopItem,
  ShopListResult,
  ShopQueryOptions,
  WalletSummary,
  EconomyTransaction,
} from "@/features/economy/types";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

function normalizePagination(
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(pageSize)),
  );

  return {
    page: safePage,
    pageSize: safePageSize,
    from: (safePage - 1) * safePageSize,
    to: safePage * safePageSize - 1,
  };
}

export async function getWallet(): Promise<WalletSummary> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      balance: 0,
      currency: "gold",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wallet")
    .select("balance")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return {
    balance: Number(data?.balance ?? 0),
    currency: "gold",
  };
}

export async function getShopItems(
  options: ShopQueryOptions = {},
): Promise<ShopListResult> {
  const userId = await getCurrentUserId();

  const {
    page,
    pageSize,
    from,
    to,
  } = normalizePagination(
    options.page,
    options.pageSize,
  );

  const supabase = await createClient();

  let query = supabase
    .from("items")
    .select("*", { count: "exact" })
    .eq("is_active", true);

  if (options.category) {
    query = query.eq(
      "category",
      options.category,
    );
  }

  if (options.rarity) {
    query = query.eq(
      "rarity",
      options.rarity,
    );
  }

  if (options.search?.trim()) {
    query = query.ilike(
      "name",
      `%${options.search.trim()}%`,
    );
  }

  const {
    data,
    error,
    count,
  } = await query
    .order("price", { ascending: true })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  let balance = 0;

  if (userId) {
    const wallet = await getWallet();
    balance = wallet.balance;
  }

  const items = (data ?? []).map(
    (item) => ({
      ...(item as Item),
      canAfford:
        balance >= Number(item.price),
      ownedQuantity: 0,
    }),
  );

  const total = count ?? 0;

  return {
    items,
    total,
    page,
    pageSize,
    totalPages:
      Math.ceil(total / pageSize),
  };
}

export async function getInventory(
  options: InventoryQueryOptions = {},
): Promise<InventoryListResult> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      items: [],
      total: 0,
      page: 1,
      pageSize:
        options.pageSize ?? DEFAULT_PAGE_SIZE,
      totalPages: 0,
    };
  }

  const {
    page,
    pageSize,
    from,
    to,
  } = normalizePagination(
    options.page,
    options.pageSize,
  );

  const supabase = await createClient();

  let query = supabase
    .from("inventory")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (options.equippedOnly) {
    query = query.eq(
      "is_equipped",
      true,
    );
  }

  const {
    data,
    error,
    count,
  } = await query
    .order("created_at", {
      ascending: false,
    })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const items =
    (data ?? []) as InventoryItem[];

  const total = count ?? 0;

  return {
    items,
    total,
    page,
    pageSize,
    totalPages:
      Math.ceil(total / pageSize),
  };
}

export async function getInventoryItem(
  itemId: string,
): Promise<InventoryItem | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? (data as InventoryItem)
    : null;
}

export async function getItemById(
  itemId: string,
): Promise<Item | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? (data as Item)
    : null;
}

export async function getOwnedItemQuantity(
  itemId: string,
): Promise<number> {
  const inventory =
    await getInventoryItem(itemId);

  return Number(
    inventory?.quantity ?? 0,
  );
}

export async function getEquippedItems(): Promise<
  InventoryItem[]
> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", userId)
    .eq("is_equipped", true)
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as InventoryItem[];
}

export async function getEconomyTransactions(
  limit = 20,
): Promise<EconomyTransaction[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const safeLimit = Math.min(
    100,
    Math.max(1, Math.floor(limit)),
  );

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(safeLimit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(
    (transaction) => ({
      id: transaction.id,
      userId: transaction.user_id,
      amount: Number(transaction.amount),
      balanceBefore: Number(
        transaction.balance_before,
      ),
      balanceAfter: Number(
        transaction.balance_after,
      ),
      type: transaction.type,
      sourceType:
        transaction.source_type,
      sourceId:
        transaction.source_id,
      metadata:
        transaction.metadata ?? {},
      createdAt:
        transaction.created_at,
    }),
  ) as EconomyTransaction[];
}

export async function getEconomySummary() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      wallet: {
        balance: 0,
        currency: "gold" as const,
      },
      inventory: {
        totalItems: 0,
        equippedItems: 0,
        uniqueItems: 0,
      },
    };
  }

  const supabase = await createClient();

  const [
    wallet,
    inventoryResult,
    equippedResult,
  ] = await Promise.all([
    getWallet(),

    supabase
      .from("inventory")
      .select("quantity")
      .eq("user_id", userId),

    supabase
      .from("inventory")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .eq("is_equipped", true),
  ]);

  if (inventoryResult.error) {
    throw new Error(
      inventoryResult.error.message,
    );
  }

  if (equippedResult.error) {
    throw new Error(
      equippedResult.error.message,
    );
  }

  const inventory =
    inventoryResult.data ?? [];

  return {
    wallet,
    inventory: {
      totalItems: inventory.reduce(
        (sum, item) =>
          sum + Number(item.quantity ?? 0),
        0,
      ),
      equippedItems:
        equippedResult.count ?? 0,
      uniqueItems:
        inventory.length,
    },
  };
}