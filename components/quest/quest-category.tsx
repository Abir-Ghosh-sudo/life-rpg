"use client";

type QuestCategory =
  | "all"
  | "study"
  | "health"
  | "fitness"
  | "career"
  | "personal"
  | "productivity";

type QuestCategoryProps = {
  value?: QuestCategory;
  onChange?: (category: QuestCategory) => void;
};

const categories: {
  value: QuestCategory;
  label: string;
  icon: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: "⚔️",
  },
  {
    value: "study",
    label: "Study",
    icon: "📚",
  },
  {
    value: "health",
    label: "Health",
    icon: "❤️",
  },
  {
    value: "fitness",
    label: "Fitness",
    icon: "💪",
  },
  {
    value: "career",
    label: "Career",
    icon: "💼",
  },
  {
    value: "personal",
    label: "Personal",
    icon: "🌱",
  },
  {
    value: "productivity",
    label: "Productivity",
    icon: "⚡",
  },
];

export function QuestCategory({
  value = "all",
  onChange,
}: QuestCategoryProps) {
  return (
    <div
      className="ui-card"
      style={{
        width: "100%",
        padding: "18px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "14px",
        }}
      >
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
          Quest Category
        </p>

        <h3
          style={{
            margin: "6px 0 0",
            color: "var(--text)",
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          Choose Your Adventure
        </h3>
      </div>

      {/* Category Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
        }}
      >
        {categories.map((category) => {
          const isActive =
            value === category.value;

          return (
            <button
              key={category.value}
              type="button"
              onClick={() =>
                onChange?.(category.value)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 13px",
                borderRadius: "12px",
                border: isActive
                  ? "1px solid var(--violet)"
                  : "1px solid var(--border)",
                background: isActive
                  ? "rgba(124, 58, 237, 0.12)"
                  : "var(--surface-light)",
                color: isActive
                  ? "var(--violet)"
                  : "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                }}
              >
                {category.icon}
              </span>

              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}