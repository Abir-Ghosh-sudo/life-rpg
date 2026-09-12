"use client";

type QuestSortOption =
  | "newest"
  | "oldest"
  | "difficulty"
  | "xp"
  | "gold"
  | "progress";

type QuestSortProps = {
  value?: QuestSortOption;
  onChange?: (
    value: QuestSortOption
  ) => void;
};

const sortOptions: {
  value: QuestSortOption;
  label: string;
}[] = [
  {
    value: "newest",
    label: "Newest First",
  },
  {
    value: "oldest",
    label: "Oldest First",
  },
  {
    value: "difficulty",
    label: "Difficulty",
  },
  {
    value: "xp",
    label: "Highest XP",
  },
  {
    value: "gold",
    label: "Highest Gold",
  },
  {
    value: "progress",
    label: "Progress",
  },
];

export function QuestSort({
  value = "newest",
  onChange,
}: QuestSortProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        borderRadius: "14px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      {/* Icon */}
      <span
        style={{
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        ↕️
      </span>

      {/* Sort Label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Sort
        </span>

        <span
          style={{
            color: "var(--text)",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          Quests
        </span>
      </div>

      {/* Select */}
      <select
        value={value}
        onChange={(event) =>
          onChange?.(
            event.target.value as QuestSortOption
          )
        }
        style={{
          flex: 1,
          minWidth: "130px",
          padding: "10px 12px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          outline: "none",
          background: "var(--surface-light)",
          color: "var(--text)",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}