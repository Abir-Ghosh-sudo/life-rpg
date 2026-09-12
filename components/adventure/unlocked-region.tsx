type UnlockedRegionProps = {
  name: string;
  description?: string;
  level?: number;
  progress?: number;
  icon?: string;
  onExplore?: () => void;
};

export function UnlockedRegion({
  name,
  description = "This region is ready to explore.",
  level = 1,
  progress = 0,
  icon = "🗺️",
  onExplore,
}: UnlockedRegionProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <article
      className="ui-card"
      style={{
        borderColor: "var(--emerald)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
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
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(16, 185, 129, 0.12)",
            color: "var(--emerald)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          Unlocked
        </span>
      </div>

      <h3
        style={{
          margin: "18px 0 0",
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
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--text-muted)",
        }}
      >
        <span>Level {level}</span>
        <span>{safeProgress}% explored</span>
      </div>

      <div
        style={{
          marginTop: "8px",
          width: "100%",
          height: "8px",
          borderRadius: "999px",
          overflow: "hidden",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: `${safeProgress}%`,
            height: "100%",
            borderRadius: "999px",
            background: "var(--emerald)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <button
        type="button"
        className="ui-button ui-button-primary"
        onClick={onExplore}
        style={{
          width: "100%",
          marginTop: "18px",
        }}
      >
        Explore Region
      </button>
    </article>
  );
}