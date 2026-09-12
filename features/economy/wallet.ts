import { createClient } from "@/lib/supabase/server";
import { requireUserId } from "@/lib/auth/session";

import {
  getWallet,
} from "@/features/economy/queries";

export interface WalletOperationResult {
  success: boolean;
  previousBalance: number;
  amount: number;
  newBalance: number;
  message: string;
}

const MAX_BALANCE = 999_999_999;

function normalizeAmount(
  amount: number,
): number {
  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error(
      "Amount must be greater than zero.",
    );
  }

  return Math.floor(amount);
}

export function canAfford(
  balance: number,
  amount: number,
): boolean {
  return (
    Number.isFinite(balance) &&
    Number(balance) >=
      Math.max(0, amount)
  );
}

export function calculateNewBalance(
  balance: number,
  amount: number,
  operation: "credit" | "debit",
): number {
  const safeBalance = Math.max(
    0,
    Number(balance),
  );

  const safeAmount =
    normalizeAmount(amount);

  const newBalance =
    operation === "credit"
      ? safeBalance + safeAmount
      : safeBalance - safeAmount;

  if (newBalance < 0) {
    throw new Error(
      "Insufficient gold.",
    );
  }

  if (newBalance > MAX_BALANCE) {
    throw new Error(
      "Wallet balance limit exceeded.",
    );
  }

  return newBalance;
}

export async function getBalance(): Promise<number> {
  const wallet = await getWallet();
  return wallet.balance;
}

export async function hasEnoughGold(
  amount: number,
): Promise<boolean> {
  const safeAmount =
    normalizeAmount(amount);

  const balance =
    await getBalance();

  return canAfford(
    balance,
    safeAmount,
  );
}

export async function debitGold(
  amount: number,
): Promise<WalletOperationResult> {
  const userId = await requireUserId();
  const safeAmount =
    normalizeAmount(amount);

  const supabase = await createClient();

  const { data: wallet, error } =
    await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!wallet) {
    throw new Error(
      "Wallet not found.",
    );
  }

  const previousBalance =
    Number(wallet.balance);

  if (
    !canAfford(
      previousBalance,
      safeAmount,
    )
  ) {
    return {
      success: false,
      previousBalance,
      amount: safeAmount,
      newBalance: previousBalance,
      message:
        "Insufficient gold.",
    };
  }

  const newBalance =
    calculateNewBalance(
      previousBalance,
      safeAmount,
      "debit",
    );

  const { error: updateError } =
    await supabase
      .from("wallet")
      .update({
        balance: newBalance,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("balance", wallet.balance);

  if (updateError) {
    throw new Error(
      updateError.message,
    );
  }

  return {
    success: true,
    previousBalance,
    amount: safeAmount,
    newBalance,
    message:
      "Gold deducted successfully.",
  };
}

export async function creditGold(
  amount: number,
): Promise<WalletOperationResult> {
  const userId = await requireUserId();
  const safeAmount =
    normalizeAmount(amount);

  const supabase = await createClient();

  const { data: wallet, error } =
    await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!wallet) {
    throw new Error(
      "Wallet not found.",
    );
  }

  const previousBalance =
    Number(wallet.balance);

  const newBalance =
    calculateNewBalance(
      previousBalance,
      safeAmount,
      "credit",
    );

  const { error: updateError } =
    await supabase
      .from("wallet")
      .update({
        balance: newBalance,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("balance", wallet.balance);

  if (updateError) {
    throw new Error(
      updateError.message,
    );
  }

  return {
    success: true,
    previousBalance,
    amount: safeAmount,
    newBalance,
    message:
      "Gold added successfully.",
  };
}

export async function setBalance(
  balance: number,
): Promise<WalletOperationResult> {
  const userId = await requireUserId();

  if (
    !Number.isFinite(balance) ||
    balance < 0 ||
    balance > MAX_BALANCE
  ) {
    throw new Error(
      "Invalid wallet balance.",
    );
  }

  const supabase = await createClient();

  const { data: wallet, error } =
    await supabase
      .from("wallet")
      .select("balance")
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!wallet) {
    throw new Error(
      "Wallet not found.",
    );
  }

  const previousBalance =
    Number(wallet.balance);

  const newBalance =
    Math.floor(balance);

  const { error: updateError } =
    await supabase
      .from("wallet")
      .update({
        balance: newBalance,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("balance", wallet.balance);

  if (updateError) {
    throw new Error(
      updateError.message,
    );
  }

  return {
    success: true,
    previousBalance,
    amount: Math.abs(
      newBalance - previousBalance,
    ),
    newBalance,
    message:
      "Wallet updated successfully.",
  };
}