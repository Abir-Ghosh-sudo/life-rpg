type WeeklySummaryProps = {
  title?: string;
  totalXP?: number;
  questsCompleted?: number;
  focusMinutes?: number;
  streak?: number;
};

export function WeeklySummary({
  title = "Weekly Summary",
  totalXP = 0,
  questsCompleted = 0,
  focusMinutes = 0,
  streak = 0,
}: WeeklySummaryProps) {
  const summaryItems = [
    {
      label: "XP Earned",
      value: totalXP,
      icon: "⚡",
      color: "var(--indigo)",
      background: "rgba(79, 70, 229, 0.1)",
    },
    {
      label: "Quests Completed",
      value: questsCompleted,
      icon: "🎯",
      color: "var(--emerald)",
      background: "rgba(16, 185, 129, 0.1)",
    },
    {
      label: "Focus Time",
      value: `${focusMinutes} min`,
      icon: "⏳",
      color: "var(--gold)",
      background: "rgba(245, 158, 11, 0.1)",
    },
    {
      label: "Current Streak",
      value: `${streak} days`,
      icon: "🔥",
      color: "var(--rose)",
      background: "rgba(244, 63, 94, 0.1)",
    },
  ];

  return (
    <section className="ui-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            This Week
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "var(--text)",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            background: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          📅
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "16px",
        }}
      >
        {summaryItems.map((item) => (
          <div
            key={item.label}
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "var(--surface-light)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                background: item.background,
                marginBottom: "16px",
              }}
            >
              {item.icon}
            </div>

            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {item.label}
            </p>

            <h3
              style={{
                margin: "6px 0 0",
                color: item.color,
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}