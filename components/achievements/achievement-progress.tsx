type AchievementProgressProps = {
  value: number;
  max?: number;
  label?: string;
};

export function AchievementProgress({
  value,
  max = 100,
  label = "Progress",
}: AchievementProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percentage = Math.round((safeValue / max) * 100);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          color: "var(--text-muted)",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        <span>{label}</span>

        <span>
          {safeValue} / {max}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background:
              percentage === 100
                ? "var(--emerald)"
                : "var(--indigo)",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p
        style={{
          margin: "8px 0 0",
          color: "var(--text-muted)",
          fontSize: "13px",
        }}
      >
        {percentage}% complete
      </p>
    </div>
  );
}