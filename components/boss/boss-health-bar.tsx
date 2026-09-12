type BossHealthProps = {
  currentHealth?: number;
  maxHealth?: number;
  bossName?: string;
};

export function BossHealth({
  currentHealth = 100,
  maxHealth = 100,
  bossName = "Boss",
}: BossHealthProps) {
  const safeMaxHealth = Math.max(maxHealth, 1);

  const safeHealth = Math.min(
    Math.max(currentHealth, 0),
    safeMaxHealth
  );

  const percentage = Math.round(
    (safeHealth / safeMaxHealth) * 100
  );

  const healthColor =
    percentage > 60
      ? "var(--emerald)"
      : percentage > 30
        ? "var(--gold)"
        : "var(--rose)";

  const healthBackground =
    percentage > 60
      ? "rgba(16, 185, 129, 0.1)"
      : percentage > 30
        ? "rgba(245, 158, 11, 0.1)"
        : "rgba(244, 63, 94, 0.1)";

  return (
    <section
      className="ui-card"
      style={{
        borderColor: healthColor,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "18px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--rose)",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Enemy Status
          </p>

          <h3
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            ❤️ {bossName} Health
          </h3>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            background: healthBackground,
            color: healthColor,
            fontSize: "13px",
            fontWeight: 800,
          }}
        >
          {percentage}% Remaining
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          color: "var(--text-muted)",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        <span>HP</span>

        <span>
          {safeHealth} / {safeMaxHealth}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "16px",
          borderRadius: "999px",
          overflow: "hidden",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background: healthColor,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {percentage === 0
            ? "Boss defeated!"
            : percentage <= 30
              ? "⚠️ Boss is critically weakened!"
              : "⚔️ Keep fighting!"}
        </span>

        <span
          style={{
            color: healthColor,
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          {percentage > 60
            ? "Strong"
            : percentage > 30
              ? "Weakening"
              : "Critical"}
        </span>
      </div>
    </section>
  );
}