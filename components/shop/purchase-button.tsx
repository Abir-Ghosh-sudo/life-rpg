"use client";

import { useState } from "react";

type PurchaseButtonProps = {
  price?: number;
  userGold?: number;
  owned?: boolean;
  loading?: boolean;
  onPurchase?: () => void;
};

export function PurchaseButton({
  price = 50,
  userGold = 1250,
  owned = false,
  loading = false,
  onPurchase,
}: PurchaseButtonProps) {
  const [isPurchased, setIsPurchased] =
    useState(false);

  const canAfford = userGold >= price;

  const isOwned = owned || isPurchased;

  const handlePurchase = () => {
    if (!canAfford || isOwned || loading) {
      return;
    }

    setIsPurchased(true);

    onPurchase?.();
  };

  const getButtonText = () => {
    if (loading) {
      return "Processing...";
    }

    if (isOwned) {
      return "✓ Owned";
    }

    if (!canAfford) {
      return "Not Enough Gold";
    }

    return `🪙 Buy for ${price}`;
  };

  return (
    <button
      type="button"
      disabled={
        loading ||
        isOwned ||
        !canAfford
      }
      onClick={handlePurchase}
      style={{
        width: "100%",
        minHeight: "44px",
        padding: "0 16px",
        border: "none",
        borderRadius: "12px",
        background: isOwned
          ? "var(--emerald)"
          : canAfford
          ? "var(--violet)"
          : "var(--surface-light)",
        color: isOwned || canAfford
          ? "white"
          : "var(--text-muted)",
        fontSize: "11px",
        fontWeight: 900,
        cursor:
          loading ||
          isOwned ||
          !canAfford
            ? "not-allowed"
            : "pointer",
        opacity:
          loading ||
          !canAfford
            ? 0.7
            : 1,
        transition:
          "transform 0.2s ease, opacity 0.2s ease",
      }}
      onMouseEnter={(event) => {
        if (
          canAfford &&
          !isOwned &&
          !loading
        ) {
          event.currentTarget.style.transform =
            "translateY(-1px)";
        }
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      {getButtonText()}
    </button>
  );
}