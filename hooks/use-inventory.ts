"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { InventoryItem } from "@/types/inventory";

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setItems([]);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("inventory")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (queryError) {
        throw queryError;
      }

      setItems((data ?? []) as InventoryItem[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load inventory.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchInventory();
  }, [fetchInventory]);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const uniqueItems = items.length;

  const equippedItems = useMemo(
    () => items.filter((item) => item.equipped ?? item.is_equipped ?? item.isEquipped),
    [items],
  );

  const availableItems = useMemo(
    () => items.filter((item) => item.quantity > 0),
    [items],
  );

  return {
    items,
    equippedItems,
    availableItems,
    totalItems,
    uniqueItems,
    loading,
    error,
    refresh: fetchInventory,
    isEmpty: items.length === 0,
  };
}