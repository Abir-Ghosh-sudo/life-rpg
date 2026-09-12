"use client";

import { useState } from "react";

export type ItemRarity =
  | "All"
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary";

type RarityFilterProps = {
  value?: ItemRarity;
  onChange?: (rarity: ItemRarity) => void;
};

const rarities: ItemRarity[] = [
  "All",
  "Common",
  "Rare",
  "Epic",
  "Legendary",
];

export function RarityFilter({
  value,
  onChange,
}: RarityFilterProps) {
  const [selectedRarity, setSelectedRarity] =
    useState<ItemRarity>(value ?? "All");

  const activeRarity =
    value ?? selectedRarity;

  const rarityColors: Record<
    ItemRarity,
    string
  > = {
    All: "var(--violet)",
    Common: "var(--text-muted)",
    Rare: "#3B82F6",
    Epic: "var(--violet)",
    Legendary: "var(--gold)",
  };

  const handleChange = (
    rarity: ItemRarity
  ) => {
    if (value === undefined) {
      setSelectedRarity(rarity);
    }

    onChange?.(rarity);
  };

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Item Quality
          </p>

          <h3
            style={{
              margin: "5px 0 0",
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            Filter by Rarity
          </h3>
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.1)",
            color: "var(--violet)",
            fontSize: "9px",
            fontWeight: 900,
          }}
        >
          ✨ {activeRarity}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
        }}
      >
        {rarities.map((rarity) => {
          const isActive =
            activeRarity === rarity;

          const rarityColor =
            rarityColors[rarity];

          return (
            <button
              key={rarity}
              type="button"
              onClick={() =>
                handleChange(rarity)
              }
              style={{
                minHeight: "36px",
                padding: "0 13px",
                borderRadius: "10px",
                border: isActive
                  ? `1px solid ${rarityColor}`
                  : "1px solid var(--border)",
                background: isActive
                  ? `${rarityColor}18`
                  : "var(--surface-light)",
                color: isActive
                  ? rarityColor
                  : "var(--text-muted)",
                fontSize: "9px",
                fontWeight: 900,
                cursor: "pointer",
                transition:
                  "all 0.2s ease",
              }}
              onMouseEnter={(event) => {
                if (!isActive) {
                  event.currentTarget.style.transform =
                    "translateY(-1px)";
                }
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              {rarity === "All"
                ? "⚡ All Items"
                : `✨ ${rarity}`}
            </button>
          );
        })}
      </div>
    </section>
  );
}