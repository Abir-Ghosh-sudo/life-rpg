"use client";

type QuestRarityType =
  | "all"
  | "common"
  | "rare"
  | "epic"
  | "legendary";

type QuestRarityProps = {
  value?: QuestRarityType;
  onChange?: (
    rarity: QuestRarityType
  ) => void;
};

const rarities: {
  value: QuestRarityType;
  label: string;
  icon: string;
  description: string;
  color: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: "⚔️",
    description: "Every quest rarity",
    color: "var(--text-muted)",
  },
  {
    value: "common",
    label: "Common",
    icon: "⚪",
    description: "Simple daily quests",
    color: "#94A3B8",
  },
  {
    value: "rare",
    label: "Rare",
    icon: "🔵",
    description: "Worth the effort",
    color: "#3B82F6",
  },
  {
    value: "epic",
    label: "Epic",
    icon: "🟣",
    description: "A serious challenge",
    color: "var(--violet)",
  },
  {
    value: "legendary",
    label: "Legendary",
    icon: "👑",
    description: "Ultimate achievement",
    color: "var(--gold)",
  },
];

export function QuestRarity({
  value = "all",
  onChange,
}: QuestRarityProps) {
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
          Quest Rarity
        </p>

        <h3
          style={{
            margin: "6px 0 0",
            color: "var(--text)",
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          Discover Rare Adventures
        </h3>
      </div>

      {/* Rarity Options */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        {rarities.map((rarity) => {
          const isActive =
            value === rarity.value;

          return (
            <button
              key={rarity.value}
              type="button"
              onClick={() =>
                onChange?.(rarity.value)
              }
              style={{
                position: "relative",
                padding: "14px",
                textAlign: "left",
                borderRadius: "14px",
                border: isActive
                  ? `1px solid ${rarity.color}`
                  : "1px solid var(--border)",
                background: isActive
                  ? `${rarity.color}15`
                  : "var(--surface-light)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {/* Active Indicator */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: rarity.color,
                    color: "white",
                    fontSize: "10px",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
              )}

              {/* Icon */}
              <span
                style={{
                  display: "block",
                  fontSize: "20px",
                  marginBottom: "9px",
                }}
              >
                {rarity.icon}
              </span>

              {/* Name */}
              <strong
                style={{
                  display: "block",
                  color: isActive
                    ? rarity.color
                    : "var(--text)",
                  fontSize: "11px",
                  fontWeight: 900,
                }}
              >
                {rarity.label}
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
                {rarity.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}