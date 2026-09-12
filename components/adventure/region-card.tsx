type RegionCardProps = {
  name: string;
  description: string;
  level?: number;
  unlocked?: boolean;
  completed?: boolean;
  icon?: string;
  reward?: string;
};

export function RegionCard({
  name,
  description,
  level = 1,
  unlocked = false,
  completed = false,
  icon = "📍",
  reward,
}: RegionCardProps) {
  const statusText = completed
    ? "Completed"
    : unlocked
      ? "Available"
      : "Locked";

  const statusColor = completed
    ? "var(--emerald)"
    : unlocked
      ? "var(--indigo)"
      : "var(--text-muted)";

  return (
    <article
      className="ui-card"
      style={{
        opacity: unlocked ? 1 : 0.65,
        borderColor: completed
          ? "var(--emerald)"
          : unlocked
            ? "var(--indigo)"
            : "var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            background: unlocked
              ? "rgba(124, 58, 237, 0.1)"
              : "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          {unlocked ? icon : "🔒"}
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: unlocked
              ? completed
                ? "rgba(16, 185, 129, 0.12)"
                : "rgba(79, 70, 229, 0.1)"
              : "var(--surface-light)",
            color: statusColor,
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          {statusText}
        </span>
      </div>

      <h3
        style={{
          margin: "16px 0 0",
          color: "var(--text)",
          fontSize: "18px",
          fontWeight: 800,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          margin: "8px 0 0",
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          Region Level {level}
        </span>

        {reward ? (
          <span
            style={{
              color: "var(--gold)",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            🎁 {reward}
          </span>
        ) : null}
      </div>
    </article>
  );
}