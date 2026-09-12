"use client";

type HistoryItem = {
  id: string;
  title: string;
  description?: string;
  category:
    | "quest"
    | "focus"
    | "boss"
    | "achievement"
    | "reward"
    | "event";
  time: string;
  xp?: number;
  gold?: number;
};

type HistoryListProps = {
  items?: HistoryItem[];
  title?: string;
  onItemClick?: (item: HistoryItem) => void;
};

const defaultItems: HistoryItem[] = [
  {
    id: "1",
    title: "Quest Completed",
    description: "Completed Data Structures Practice",
    category: "quest",
    time: "Today, 10:30 AM",
    xp: 120,
    gold: 50,
  },
  {
    id: "2",
    title: "Focus Session Completed",
    description: "Deep focus session for 45 minutes",
    category: "focus",
    time: "Today, 9:15 AM",
    xp: 180,
  },
  {
    id: "3",
    title: "Achievement Unlocked",
    description: "Consistency Master",
    category: "achievement",
    time: "Yesterday, 8:40 PM",
    xp: 250,
  },
  {
    id: "4",
    title: "Daily Boss Defeated",
    description: "The Procrastination Dragon",
    category: "boss",
    time: "Yesterday, 6:20 PM",
    xp: 300,
    gold: 150,
  },
];

const categoryConfig = {
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

export function HistoryList({
  items = defaultItems,
  title = "Activity History",
  onItemClick,
}: HistoryListProps) {
  return (
    <section
      className="ui-card"
      style={{
        padding: "22px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
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
            Your Journey
          </p>

          <h2
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "21px",
              fontWeight: 900,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {items.length} Activities
        </div>
      </div>

      {/* History */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              borderRadius: "16px",
              background: "var(--surface-light)",
              border: "1px dashed var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
              }}
            >
              📜
            </div>

            <p
              style={{
                margin: "12px 0 0",
                color: "var(--text)",
                fontSize: "14px",
                fontWeight: 900,
              }}
            >
              No activity yet
            </p>

            <p
              style={{
                margin: "6px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
              }}
            >
              Complete quests and activities to build your journey.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const config =
              categoryConfig[item.category];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onItemClick?.(item)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "14px",
                  borderRadius: "16px",
                  textAlign: "left",
                  border: "1px solid var(--border)",
                  background: "var(--surface-light)",
                  cursor: onItemClick
                    ? "pointer"
                    : "default",
                  transition:
                    "transform 0.2s ease, border 0.2s ease",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    flexShrink: 0,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "21px",
                    background: config.background,
                  }}
                >
                  {config.icon}
                </div>

                {/* Main Info */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong
                      style={{
                        color: "var(--text)",
                        fontSize: "13px",
                        fontWeight: 900,
                      }}
                    >
                      {item.title}
                    </strong>

                    <span
                      style={{
                        padding: "3px 7px",
                        borderRadius: "999px",
                        background: config.background,
                        color: config.color,
                        fontSize: "8px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                      }}
                    >
                      {config.label}
                    </span>
                  </div>

                  {item.description && (
                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <span
                    style={{
                      display: "block",
                      marginTop: "6px",
                      color: "var(--text-muted)",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    🕒 {item.time}
                  </span>
                </div>

                {/* Rewards */}
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "5px",
                  }}
                >
                  {item.xp !== undefined &&
                    item.xp > 0 && (
                      <span
                        style={{
                          color: "var(--violet)",
                          fontSize: "11px",
                          fontWeight: 900,
                        }}
                      >
                        +{item.xp} XP
                      </span>
                    )}

                  {item.gold !== undefined &&
                    item.gold > 0 && (
                      <span
                        style={{
                          color: "var(--gold)",
                          fontSize: "11px",
                          fontWeight: 900,
                        }}
                      >
                        🪙 +{item.gold}
                      </span>
                    )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}