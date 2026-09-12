"use client";

type HistoryCategory =
  | "quest"
  | "focus"
  | "boss"
  | "achievement"
  | "reward"
  | "event";

type HistoryItemProps = {
  id?: string;
  title?: string;
  description?: string;
  category?: HistoryCategory;
  time?: string;
  xp?: number;
  gold?: number;
  onClick?: () => void;
};

const categoryConfig: Record<
  HistoryCategory,
  {
    icon: string;
    label: string;
    color: string;
    background: string;
  }
> = {
  quest: {
    icon: "⚔️",
    label: "Quest",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.1)",
  },

  focus: {
    icon: "🎯",
    label: "Focus",
    color: "var(--emerald)",
    background: "rgba(16, 185, 129, 0.1)",
  },

  boss: {
    icon: "👹",
    label: "Boss",
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.1)",
  },

  achievement: {
    icon: "🏆",
    label: "Achievement",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.1)",
  },

  reward: {
    icon: "🎁",
    label: "Reward",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.1)",
  },

  event: {
    icon: "✨",
    label: "Event",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.1)",
  },
};

export function HistoryItem({
  title = "Quest Completed",
  description = "You completed an important task.",
  category = "quest",
  time = "Today, 10:30 AM",
  xp = 0,
  gold = 0,
  onClick,
}: HistoryItemProps) {
  const config = categoryConfig[category];

  return (
    <article
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "15px",
        borderRadius: "17px",
        border: "1px solid var(--border)",
        background: "var(--surface-light)",
        cursor: onClick ? "pointer" : "default",
        transition:
          "transform 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Category Icon */}
      <div
        style={{
          width: "50px",
          height: "50px",
          flexShrink: 0,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: config.background,
          border: `1px solid ${config.color}22`,
          fontSize: "22px",
        }}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Title Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "var(--text)",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            {title}
          </h3>

          <span
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              background: config.background,
              color: config.color,
              fontSize: "8px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {config.label}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            margin: "6px 0 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>

        {/* Time */}
        <p
          style={{
            margin: "7px 0 0",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          🕒 {time}
        </p>
      </div>

      {/* Rewards */}
      {(xp > 0 || gold > 0) && (
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px",
          }}
        >
          {xp > 0 && (
            <div
              style={{
                padding: "6px 9px",
                borderRadius: "10px",
                background: "rgba(124, 58, 237, 0.1)",
                color: "var(--violet)",
                fontSize: "10px",
                fontWeight: 900,
              }}
            >
              +{xp} XP
            </div>
          )}

          {gold > 0 && (
            <div
              style={{
                padding: "6px 9px",
                borderRadius: "10px",
                background: "rgba(245, 158, 11, 0.1)",
                color: "var(--gold)",
                fontSize: "10px",
                fontWeight: 900,
              }}
            >
              🪙 +{gold}
            </div>
          )}
        </div>
      )}

      {/* Arrow */}
      {onClick && (
        <span
          style={{
            flexShrink: 0,
            color: "var(--text-muted)",
            fontSize: "18px",
            fontWeight: 800,
          }}
        >
          →
        </span>
      )}
    </article>
  );
}