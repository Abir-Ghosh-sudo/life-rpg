"use client";

import { useState } from "react";

type ItemRarity =
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary";

type ItemCardProps = {
  name?: string;
  description?: string;
  category?: string;
  rarity?: ItemRarity;
  price?: number;
  icon?: string;
  owned?: boolean;
  onPurchase?: () => void;
};

export function ItemCard({
  name = "Focus Potion",
  description = "Boost your focus and stay productive during difficult quests.",
  category = "Consumable",
  rarity = "Common",
  price = 50,
  icon = "🧪",
  owned = false,
  onPurchase,
}: ItemCardProps) {
  const [isOwned, setIsOwned] =
    useState(owned);

  const rarityColors: Record<
    ItemRarity,
    string
  > = {
    Common: "var(--text-muted)",
    Rare: "#3B82F6",
    Epic: "var(--violet)",
    Legendary: "var(--gold)",
  };

  const rarityColor =
    rarityColors[rarity];

  const handlePurchase = () => {
    if (isOwned) return;

    setIsOwned(true);

    onPurchase?.();
  };

  return (
    <article
      className="ui-card"
      style={{
        width: "100%",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rarity line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: rarityColor,
        }}
      />

      {/* Item Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: "16px",
            background: `${rarityColor}15`,
            border: `1px solid ${rarityColor}30`,
            fontSize: "28px",
          }}
        >
          {icon}
        </div>

        {/* Rarity */}
        <span
          style={{
            padding: "6px 9px",
            borderRadius: "999px",
            border: `1px solid ${rarityColor}`,
            color: rarityColor,
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          ✨ {rarity}
        </span>
      </div>

      {/* Item Info */}
      <div
        style={{
          marginTop: "16px",
        }}
      >
        <span
          style={{
            display: "block",
            color: "var(--text-muted)",
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {category}
        </span>

        <h3
          style={{
            margin: "7px 0 0",
            color: "var(--text)",
            fontSize: "16px",
            fontWeight: 900,
          }}
        >
          {name}
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "10px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* Price */}
        <div>
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Price
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--gold)",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            🪙 {price}
          </strong>
        </div>

        {/* Purchase Button */}
        <button
          type="button"
          disabled={isOwned}
          onClick={handlePurchase}
          style={{
            minHeight: "40px",
            padding: "0 15px",
            border: "none",
            borderRadius: "11px",
            background: isOwned
              ? "var(--emerald)"
              : "var(--violet)",
            color: "white",
            fontSize: "10px",
            fontWeight: 900,
            cursor: isOwned
              ? "not-allowed"
              : "pointer",
            opacity: isOwned ? 0.85 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {isOwned
            ? "✓ Owned"
            : "Buy Item"}
        </button>
      </div>
    </article>
  );
}