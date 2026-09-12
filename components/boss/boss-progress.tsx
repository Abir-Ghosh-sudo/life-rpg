type BossProgressProps = {
  current?: number;
  target?: number;
  label?: string;
  bossName?: string;
};

export function BossProgress({
  current = 0,
  target = 100,
  label = "Boss Battle Progress",
  bossName = "Current Boss",
}: BossProgressProps) {
  const safeTarget = Math.max(target, 1);
  const safeCurrent = Math.min(Math.max(current, 0), safeTarget);

  const percentage = Math.round(
    (safeCurrent / safeTarget) * 100
  );

  const remaining = Math.max(safeTarget - safeCurrent, 0);

  const status =
    percentage === 100
      ? "Completed!"
      : percentage >= 75
        ? "Almost there!"
        : percentage >= 40
          ? "Keep fighting!"
          : "The battle has begun!";

  return (
    <section className="ui-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "22px",
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
            Battle Progress
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            {label}
          </h2>

          <p
            style={{
              margin: "7px 0 0",
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            ⚔️ {bossName}
          </p>
        </div>

        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.2)",
          }}
        >
          ⚔️
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            color: "var(--text)",
            fontSize: "34px",
            fontWeight: 900,
          }}
        >
          {percentage}%
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          completed
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
            background:
              "linear-gradient(90deg, var(--rose), var(--gold))",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Current
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--indigo)",
              fontSize: "18px",
            }}
          >
            {safeCurrent}
          </strong>
        </div>

        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Target
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--gold)",
              fontSize: "18px",
            }}
          >
            {safeTarget}
          </strong>
        </div>

        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Remaining
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color:
                remaining === 0
                  ? "var(--emerald)"
                  : "var(--rose)",
              fontSize: "18px",
            }}
          >
            {remaining}
          </strong>
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          padding: "13px 15px",
          borderRadius: "14px",
          background:
            percentage === 100
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(79, 70, 229, 0.06)",
          border:
            percentage === 100
              ? "1px solid rgba(16, 185, 129, 0.2)"
              : "1px solid var(--border)",
          color:
            percentage === 100
              ? "var(--emerald)"
              : "var(--text-muted)",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {percentage === 100 ? "🏆 Boss defeated!" : `⚡ ${status}`}
      </div>
    </section>
  );
}