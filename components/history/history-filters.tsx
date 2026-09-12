"use client";

import { useState } from "react";

type HistoryCategory =
  | "all"
  | "quest"
  | "focus"
  | "boss"
  | "achievement"
  | "reward"
  | "event";

type HistoryPeriod =
  | "all"
  | "today"
  | "week"
  | "month";

type HistoryFiltersProps = {
  defaultCategory?: HistoryCategory;
  defaultPeriod?: HistoryPeriod;
  onFilterChange?: (
    category: HistoryCategory,
    period: HistoryPeriod
  ) => void;
};

const categories: {
  value: HistoryCategory;
  label: string;
  icon: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: "📋",
  },
  {
    value: "quest",
    label: "Quest",
    icon: "⚔️",
  },
  {
    value: "focus",
    label: "Focus",
    icon: "🎯",
  },
  {
    value: "boss",
    label: "Boss",
    icon: "👹",
  },
  {
    value: "achievement",
    label: "Achievements",
    icon: "🏆",
  },
  {
    value: "reward",
    label: "Rewards",
    icon: "🎁",
  },
  {
    value: "event",
    label: "Events",
    icon: "✨",
  },
];

const periods: {
  value: HistoryPeriod;
  label: string;
}[] = [
  {
    value: "all",
    label: "All Time",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "week",
    label: "This Week",
  },
  {
    value: "month",
    label: "This Month",
  },
];

export function HistoryFilters({
  defaultCategory = "all",
  defaultPeriod = "all",
  onFilterChange,
}: HistoryFiltersProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<HistoryCategory>(defaultCategory);

  const [selectedPeriod, setSelectedPeriod] =
    useState<HistoryPeriod>(defaultPeriod);

  const handleCategoryChange = (
    category: HistoryCategory
  ) => {
    setSelectedCategory(category);

    onFilterChange?.(
      category,
      selectedPeriod
    );
  };

  const handlePeriodChange = (
    period: HistoryPeriod
  ) => {
    setSelectedPeriod(period);

    onFilterChange?.(
      selectedCategory,
      period
    );
  };

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedPeriod("all");

    onFilterChange?.("all", "all");
  };

  const isFiltered =
    selectedCategory !== "all" ||
    selectedPeriod !== "all";

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
          marginBottom: "18px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Activity Controls
          </p>

          <h3
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            Filter History
          </h3>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface-light)",
              color: "var(--text-muted)",
              padding: "8px 12px",
              borderRadius: "10px",
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
            paddingBottom: "4px",
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
                  handleCategoryChange(
                    category.value
                  )
                }
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "9px 12px",
                  borderRadius: "999px",
                  border: isSelected
                    ? "1px solid rgba(124, 58, 237, 0.45)"
                    : "1px solid var(--border)",
                  background: isSelected
                    ? "rgba(124, 58, 237, 0.14)"
                    : "var(--surface-light)",
                  color: isSelected
                    ? "var(--violet)"
                    : "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition:
                    "all 0.2s ease",
                }}
              >
                <span>
                  {category.icon}
                </span>

                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Filter */}
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
          Time Period
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "8px",
          }}
        >
          {periods.map((period) => {
            const isSelected =
              selectedPeriod === period.value;

            return (
              <button
                key={period.value}
                type="button"
                onClick={() =>
                  handlePeriodChange(
                    period.value
                  )
                }
                style={{
                  minHeight: "42px",
                  padding: "8px",
                  borderRadius: "11px",
                  border: isSelected
                    ? "1px solid rgba(124, 58, 237, 0.45)"
                    : "1px solid var(--border)",
                  background: isSelected
                    ? "rgba(124, 58, 237, 0.14)"
                    : "var(--surface-light)",
                  color: isSelected
                    ? "var(--violet)"
                    : "var(--text-muted)",
                  fontSize: "10px",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition:
                    "all 0.2s ease",
                }}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters */}
      {isFiltered && (
        <div
          style={{
            marginTop: "18px",
            padding: "12px",
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
            Showing filtered activity results
          </span>
        </div>
      )}
    </section>
  );
}