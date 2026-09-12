"use client";

import { useState } from "react";

type ItemCategory =
  | "all"
  | "weapon"
  | "armor"
  | "accessory"
  | "cosmetic"
  | "consumable";

type ItemRarity =
  | "all"
  | "common"
  | "rare"
  | "epic"
  | "legendary";

type InventoryFilterProps = {
  defaultCategory?: ItemCategory;
  defaultRarity?: ItemRarity;
  onFilterChange?: (
    category: ItemCategory,
    rarity: ItemRarity
  ) => void;
};

const categories: {
  value: ItemCategory;
  label: string;
  icon: string;
}[] = [
  {
    value: "all",
    label: "All Items",
    icon: "🎒",
  },
  {
    value: "weapon",
    label: "Weapons",
    icon: "⚔️",
  },
  {
    value: "armor",
    label: "Armor",
    icon: "🛡️",
  },
  {
    value: "accessory",
    label: "Accessories",
    icon: "💍",
  },
  {
    value: "cosmetic",
    label: "Cosmetics",
    icon: "👑",
  },
  {
    value: "consumable",
    label: "Consumables",
    icon: "🧪",
  },
];

const rarities: {
  value: ItemRarity;
  label: string;
  color: string;
  background: string;
}[] = [
  {
    value: "all",
    label: "All Rarities",
    color: "var(--text-muted)",
    background: "var(--surface-light)",
  },
  {
    value: "common",
    label: "Common",
    color: "var(--text-muted)",
    background: "rgba(148, 163, 184, 0.12)",
  },
  {
    value: "rare",
    label: "Rare",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
  {
    value: "epic",
    label: "Epic",
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
  },
  {
    value: "legendary",
    label: "Legendary",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
];

export function InventoryFilter({
  defaultCategory = "all",
  defaultRarity = "all",
  onFilterChange,
}: InventoryFilterProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ItemCategory>(defaultCategory);

  const [selectedRarity, setSelectedRarity] =
    useState<ItemRarity>(defaultRarity);

  const handleCategoryChange = (
    category: ItemCategory
  ) => {
    setSelectedCategory(category);

    onFilterChange?.(
      category,
      selectedRarity
    );
  };

  const handleRarityChange = (
    rarity: ItemRarity
  ) => {
    setSelectedRarity(rarity);

    onFilterChange?.(
      selectedCategory,
      rarity
    );
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedRarity("all");

    onFilterChange?.("all", "all");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedRarity !== "all";

  return (
    <section
      className="ui-card"
      style={{
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Inventory Controls
          </p>

          <h3
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            Filter Items
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface-light)",
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ↻ Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <p
          style={{
            margin: "0 0 10px",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Category
        </p>

        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "5px",
          }}
        >
          {categories.map((category) => {
            const isSelected =
              selectedCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  handleCategoryChange(category.value)
                }
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "9px 12px",
                  borderRadius: "999px",
                  border: isSelected
                    ? "1px solid rgba(124, 58, 237, 0.4)"
                    : "1px solid var(--border)",
                  background: isSelected
                    ? "rgba(124, 58, 237, 0.12)"
                    : "var(--surface-light)",
                  color: isSelected
                    ? "var(--violet)"
                    : "var(--text-muted)",
                  fontSize: "10px",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{category.icon}</span>

                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rarity Filter */}
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <p
          style={{
            margin: "0 0 10px",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Rarity
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {rarities.map((rarity) => {
            const isSelected =
              selectedRarity === rarity.value;

            return (
              <button
                key={rarity.value}
                type="button"
                onClick={() =>
                  handleRarityChange(rarity.value)
                }
                style={{
                  padding: "9px 12px",
                  borderRadius: "11px",
                  border: isSelected
                    ? `1px solid ${rarity.color}`
                    : "1px solid var(--border)",
                  background: isSelected
                    ? rarity.background
                    : "var(--surface-light)",
                  color: isSelected
                    ? rarity.color
                    : "var(--text-muted)",
                  fontSize: "10px",
                  fontWeight: 900,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {rarity.value !== "all" && "◆ "}
                {rarity.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Message */}
      {hasActiveFilters && (
        <div
          style={{
            marginTop: "18px",
            padding: "12px 14px",
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background:
              "rgba(124, 58, 237, 0.08)",
            border:
              "1px solid rgba(124, 58, 237, 0.16)",
          }}
        >
          <span
            style={{
              fontSize: "14px",
            }}
          >
            🔎
          </span>

          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Showing filtered inventory items
          </span>
        </div>
      )}
    </section>
  );
}