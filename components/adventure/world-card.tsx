type WorldCardProps = {
  name: string;
  description: string;
  level?: number;
  unlocked?: boolean;
  progress?: number;
  icon?: string;
};

export function WorldCard({
  name,
  description,
  level = 1,
  unlocked = false,
  progress = 0,
  icon = "🌍",
}: WorldCardProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <article
      className="ui-card"
      style={{
        opacity: unlocked ? 1 : 0.7,
        borderColor: unlocked ? "var(--indigo)" : "var(--border)",
        transition: "0.2s ease",
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
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            background: unlocked
              ? "rgba(79, 70, 229, 0.1)"
              : "var(--surface-light)",
            border: unlocked
              ? "1px solid rgba(79, 70, 229, 0.2)"
              : "1px solid var(--border)",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 800,
            background: unlocked
              ? "rgba(16, 185, 129, 0.12)"
              : "var(--surface-light)",
            color: unlocked
              ? "var(--emerald)"
              : "var(--text-muted)",
          }}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <h3
        style={{
          margin: "18px 0 0",
          color: "var(--text)",
          fontSize: "20px",
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
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          color: "var(--text-muted)",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        <span>World Level {level}</span>
        <span>{safeProgress}% explored</span>
      </div>

      <div
        style={{
          marginTop: "8px",
          width: "100%",
          height: "8px",
          background: "var(--surface-light)",
          borderRadius: "999px",
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: `${safeProgress}%`,
            height: "100%",
            background: unlocked
              ? "var(--indigo)"
              : "var(--text-muted)",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </article>
  );
}