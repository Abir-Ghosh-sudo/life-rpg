type LockedRegionProps = {
  name: string;
  description?: string;
  requiredLevel?: number;
};

export function LockedRegion({
  name,
  description = "Complete previous regions to unlock this area.",
  requiredLevel = 1,
}: LockedRegionProps) {
  return (
    <article
      className="ui-card"
      style={{
        opacity: 0.7,
        borderColor: "var(--border)",
        background: "var(--surface-light)",
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
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          🔒
        </div>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(244, 63, 94, 0.1)",
            color: "var(--rose)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          Locked
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
          padding: "12px",
          borderRadius: "12px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        ⭐ Required Level: {requiredLevel}
      </div>
    </article>
  );
}