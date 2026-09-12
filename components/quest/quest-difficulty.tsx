"use client";

type QuestDifficultyType =
  | "all"
  | "easy"
  | "medium"
  | "hard"
  | "legendary";

type QuestDifficultyProps = {
  value?: QuestDifficultyType;
  onChange?: (
    difficulty: QuestDifficultyType
  ) => void;
};

const difficulties: {
  value: QuestDifficultyType;
  label: string;
  icon: string;
  description: string;
  color: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: "⚔️",
    description: "Every challenge",
    color: "var(--text-muted)",
  },
  {
    value: "easy",
    label: "Easy",
    icon: "🌱",
    description: "Quick and simple",
    color: "var(--emerald)",
  },
  {
    value: "medium",
    label: "Medium",
    icon: "⚡",
    description: "A balanced challenge",
    color: "var(--gold)",
  },
  {
    value: "hard",
    label: "Hard",
    icon: "🔥",
    description: "Requires focus",
    color: "var(--danger)",
  },
  {
    value: "legendary",
    label: "Legendary",
    icon: "👑",
    description: "Ultimate challenge",
    color: "var(--violet)",
  },
];

export function QuestDifficulty({
  value = "all",
  onChange,
}: QuestDifficultyProps) {
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
          marginBottom: "16px",
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
          Difficulty Level
        </p>

        <h3
          style={{
            margin: "6px 0 0",
            color: "var(--text)",
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          Choose Your Challenge
        </h3>
      </div>

      {/* Difficulty Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        {difficulties.map((difficulty) => {
          const isActive =
            value === difficulty.value;

          return (
            <button
              key={difficulty.value}
              type="button"
              onClick={() =>
                onChange?.(difficulty.value)
              }
              style={{
                padding: "14px",
                textAlign: "left",
                borderRadius: "14px",
                border: isActive
                  ? `1px solid ${difficulty.color}`
                  : "1px solid var(--border)",
                background: isActive
                  ? "rgba(124, 58, 237, 0.08)"
                  : "var(--surface-light)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {/* Icon + Active */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  marginBottom: "9px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {difficulty.icon}
                </span>

                {isActive && (
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background:
                        difficulty.color,
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>

              {/* Label */}
              <strong
                style={{
                  display: "block",
                  color: isActive
                    ? difficulty.color
                    : "var(--text)",
                  fontSize: "11px",
                  fontWeight: 900,
                }}
              >
                {difficulty.label}
              </strong>

              {/* Description */}
              <span
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "var(--text-muted)",
                  fontSize: "9px",
                  lineHeight: 1.5,
                }}
              >
                {difficulty.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}