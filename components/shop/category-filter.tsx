"use client";

import { useState } from "react";

export type ItemCategory =
  | "All"
  | "Consumable"
  | "Boost"
  | "Weapon"
  | "Armor"
  | "Accessory"
  | "Cosmetic";

type CategoryFilterProps = {
  value?: ItemCategory;
  onChange?: (category: ItemCategory) => void;
};

const categories: {
  name: ItemCategory;
  icon: string;
}[] = [
  {
    name: "All",
    icon: "📦",
  },
  {
    name: "Consumable",
    icon: "🧪",
  },
  {
    name: "Boost",
    icon: "⚡",
  },
  {
    name: "Weapon",
    icon: "⚔️",
  },
  {
    name: "Armor",
    icon: "🛡️",
  },
  {
    name: "Accessory",
    icon: "💍",
  },
  {
    name: "Cosmetic",
    icon: "👑",
  },
];

export function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ItemCategory>(value ?? "All");

  const activeCategory =
    value ?? selectedCategory;

  const handleChange = (
    category: ItemCategory
  ) => {
    if (value === undefined) {
      setSelectedCategory(category);
    }

    onChange?.(category);
  };

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "16px",
      }}
    >
      {/* Header */}
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
            Item Type
          </p>

          <h3
            style={{
              margin: "5px 0 0",
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            Filter by Category
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
          {activeCategory === "All"
            ? "📦 All"
            : activeCategory}
        </span>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
        }}
      >
        {categories.map((category) => {
          const isActive =
            activeCategory === category.name;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                handleChange(category.name)
              }
              style={{
                minHeight: "38px",
                padding: "0 13px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                borderRadius: "10px",
                border: isActive
                  ? "1px solid var(--violet)"
                  : "1px solid var(--border)",
                background: isActive
                  ? "rgba(124, 58, 237, 0.12)"
                  : "var(--surface-light)",
                color: isActive
                  ? "var(--violet)"
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
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                {category.icon}
              </span>

              {category.name === "All"
                ? "All Items"
                : category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}