import { getCurrentUserId } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

import type {
  EconomyTransaction,
} from "@/features/economy/types";

export interface TransactionQueryOptions {
  type?: string;
  sourceType?: string;
  limit?: number;
  offset?: number;
}

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netChange: number;
  transactionCount: number;
}

function mapTransaction(
  transaction: any,
): EconomyTransaction {
  return {
    id: transaction.id,
    userId: transaction.userId ?? transaction.user_id,
    amount: Number(transaction.amount),
    balanceBefore:
      Number(transaction.balanceBefore ?? transaction.balance_before ?? 0),
    balanceAfter:
      Number(transaction.balanceAfter ?? transaction.balance_after ?? 0),
    type: transaction.type,
    sourceType:
      transaction.sourceType ?? transaction.source_type ?? null,
    sourceId:
      transaction.sourceId ?? transaction.source_id ?? null,
    metadata:
      transaction.metadata ?? {},
    createdAt:
      transaction.createdAt ?? transaction.created_at ?? new Date().toISOString(),
  };
}

export async function getTransactions(
  options: TransactionQueryOptions = {},
): Promise<EconomyTransaction[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return [];
  }

  const supabase = await createClient();

  const limit = Math.min(
    100,
    Math.max(
      1,
      Math.floor(options.limit ?? 50),
    ),
  );

  const offset = Math.max(
    0,
    Math.floor(options.offset ?? 0),
  );

  let query = supabase
    .from("wallet_transactions")
    .select("*")
    .eq("user_id", userId);

  if (options.type) {
    query = query.eq(
      "type",
      options.type,
    );
  }

  if (options.sourceType) {
    query = query.eq(
      "source_type",
      options.sourceType,
    );
  }

  const { data, error } = await query
    .order("created_at", {
      ascending: false,
    })
    .range(
      offset,
      offset + limit - 1,
    );

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(
    mapTransaction,
  );
}

export async function getTransactionById(
  transactionId: string,
): Promise<EconomyTransaction | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase
      .from("wallet_transactions")
      .select("*")
      .eq("id", transactionId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data
    ? mapTransaction(data)
    : null;
}

export async function getRecentTransactions(
  limit = 10,
): Promise<EconomyTransaction[]> {
  return getTransactions({
    limit,
  });
}

export async function getCreditTransactions(
  limit = 50,
): Promise<EconomyTransaction[]> {
  return getTransactions({
    type: "reward",
    limit,
  });
}

export async function getPurchaseTransactions(
  limit = 50,
): Promise<EconomyTransaction[]> {
  return getTransactions({
    type: "purchase",
    limit,
  });
}

export async function getTransactionSummary(
  options: Pick<
    TransactionQueryOptions,
    "type" | "sourceType"
  > = {},
): Promise<TransactionSummary> {
  const transactions =
    await getTransactions({
      ...options,
      limit: 100,
      offset: 0,
    });

  let totalCredits = 0;
  let totalDebits = 0;

  for (const transaction of transactions) {
    const amount =
      Number(transaction.amount);

    if (amount > 0) {
      totalCredits += amount;
    } else if (amount < 0) {
      totalDebits += Math.abs(amount);
    }
  }

  return {
    totalCredits,
    totalDebits,
    netChange:
      totalCredits - totalDebits,
    transactionCount:
      transactions.length,
  };
}

export async function getTransactionCount(): Promise<number> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return 0;
  }

  const supabase = await createClient();

  const { count, error } =
    await supabase
      .from("wallet_transactions")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export function isCreditTransaction(
  transaction: EconomyTransaction,
): boolean {
  return Number(transaction.amount) > 0;
}

export function isDebitTransaction(
  transaction: EconomyTransaction,
): boolean {
  return Number(transaction.amount) < 0;
}

export function formatTransactionAmount(
  transaction: EconomyTransaction,
): string {
  const amount =
    Math.abs(Number(transaction.amount));

  return isCreditTransaction(transaction)
    ? `+${amount} Gold`
    : `-${amount} Gold`;
}