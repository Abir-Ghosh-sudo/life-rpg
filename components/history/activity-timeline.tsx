"use client";

type TimelineCategory =
  | "quest"
  | "focus"
  | "boss"
  | "achievement"
  | "reward"
  | "event";

type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  category: TimelineCategory;
  time: string;
  xp?: number;
  gold?: number;
};

type TimelineGroup = {
  date: string;
  items: TimelineItem[];
};

type ActivityTimelineProps = {
  groups?: TimelineGroup[];
};

const defaultGroups: TimelineGroup[] = [
  {
    date: "Today",
    items: [
      {
        id: "1",
        title: "Quest Completed",
        description: "Completed Data Structures Practice",
        category: "quest",
        time: "10:30 AM",
        xp: 120,
        gold: 50,
      },
      {
        id: "2",
        title: "Focus Session Completed",
        description: "45 minutes of deep focus",
        category: "focus",
        time: "9:15 AM",
        xp: 180,
      },
      {
        id: "3",
        title: "Random Event Discovered",
        description: "A mysterious opportunity appeared",
        category: "event",
        time: "8:40 AM",
        xp: 75,
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        id: "4",
        title: "Daily Boss Defeated",
        description: "The Procrastination Dragon was defeated",
        category: "boss",
        time: "6:20 PM",
        xp: 300,
        gold: 150,
      },
      {
        id: "5",
        title: "Achievement Unlocked",
        description: "Consistency Master",
        category: "achievement",
        time: "5:10 PM",
        xp: 250,
      },
    ],
  },
];

const categoryConfig: Record<
  TimelineCategory,
  {
    icon: string;
    color: string;
    background: string;
  }
> = {
  quest: {
    icon: "⚔️",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
  focus: {
    icon: "🎯",
    color: "var(--emerald)",
    background: "rgba(16, 185, 129, 0.12)",
  },
  boss: {
    icon: "👹",
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
  },
  achievement: {
    icon: "🏆",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
  reward: {
    icon: "🎁",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
  event: {
    icon: "✨",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
};

export function ActivityTimeline({
  groups = defaultGroups,
}: ActivityTimelineProps) {
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
          marginBottom: "24px",
        }}
      >
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
          Activity Timeline
        </h2>
      </div>

      {groups.length === 0 ? (
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
              fontSize: "34px",
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
            Your timeline is empty
          </p>

          <p
            style={{
              margin: "6px 0 0",
              color: "var(--text-muted)",
              fontSize: "12px",
            }}
          >
            Complete activities to start your journey.
          </p>
        </div>
      ) : (
        <div>
          {groups.map((group, groupIndex) => (
            <div
              key={`${group.date}-${groupIndex}`}
              style={{
                marginBottom:
                  groupIndex === groups.length - 1
                    ? 0
                    : "28px",
              }}
            >
              {/* Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: "999px",
                    background:
                      "rgba(124, 58, 237, 0.1)",
                    border:
                      "1px solid rgba(124, 58, 237, 0.2)",
                    color: "var(--violet)",
                    fontSize: "10px",
                    fontWeight: 900,
                  }}
                >
                  {group.date}
                </span>

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "var(--border)",
                  }}
                />
              </div>

              {/* Timeline Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {group.items.map(
                  (item, index) => {
                    const config =
                      categoryConfig[item.category];

                    const isLast =
                      index ===
                      group.items.length - 1;

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "54px minmax(0, 1fr)",
                          gap: "14px",
                          minHeight: isLast
                            ? "70px"
                            : "105px",
                        }}
                      >
                        {/* Timeline */}
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {!isLast && (
                            <div
                              style={{
                                position: "absolute",
                                top: "48px",
                                bottom: "-8px",
                                width: "2px",
                                background:
                                  "var(--border)",
                              }}
                            />
                          )}

                          <div
                            style={{
                              position: "relative",
                              zIndex: 1,
                              width: "46px",
                              height: "46px",
                              borderRadius: "15px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",
                              background:
                                config.background,
                              border: `1px solid ${config.color}33`,
                              fontSize: "20px",
                            }}
                          >
                            {config.icon}
                          </div>
                        </div>

                        {/* Activity Card */}
                        <div
                          style={{
                            padding: "13px 14px",
                            marginBottom: isLast
                              ? 0
                              : "12px",
                            borderRadius: "15px",
                            border:
                              "1px solid var(--border)",
                            background:
                              "var(--surface-light)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <h3
                                style={{
                                  margin: 0,
                                  color:
                                    "var(--text)",
                                  fontSize:
                                    "13px",
                                  fontWeight: 900,
                                }}
                              >
                                {item.title}
                              </h3>

                              {item.description && (
                                <p
                                  style={{
                                    margin:
                                      "5px 0 0",
                                    color:
                                      "var(--text-muted)",
                                    fontSize:
                                      "11px",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {
                                    item.description
                                  }
                                </p>
                              )}
                            </div>

                            <span
                              style={{
                                flexShrink: 0,
                                color:
                                  "var(--text-muted)",
                                fontSize: "10px",
                                fontWeight: 800,
                              }}
                            >
                              {item.time}
                            </span>
                          </div>

                          {(item.xp ||
                            item.gold) && (
                            <div
                              style={{
                                display: "flex",
                                alignItems:
                                  "center",
                                gap: "8px",
                                marginTop:
                                  "10px",
                                flexWrap:
                                  "wrap",
                              }}
                            >
                              {item.xp &&
                                item.xp > 0 && (
                                  <span
                                    style={{
                                      padding:
                                        "5px 8px",
                                      borderRadius:
                                        "8px",
                                      background:
                                        "rgba(124, 58, 237, 0.1)",
                                      color:
                                        "var(--violet)",
                                      fontSize:
                                        "9px",
                                      fontWeight: 900,
                                    }}
                                  >
                                    +
                                    {item.xp} XP
                                  </span>
                                )}

                              {item.gold &&
                                item.gold > 0 && (
                                  <span
                                    style={{
                                      padding:
                                        "5px 8px",
                                      borderRadius:
                                        "8px",
                                      background:
                                        "rgba(245, 158, 11, 0.1)",
                                      color:
                                        "var(--gold)",
                                      fontSize:
                                        "9px",
                                      fontWeight: 900,
                                    }}
                                  >
                                    🪙 +
                                    {item.gold}
                                  </span>
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}