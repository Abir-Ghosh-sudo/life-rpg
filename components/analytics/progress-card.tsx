type ProgressCardProps = {
  title?: string;
  current?: number;
  target?: number;
  label?: string;
  icon?: string;
};

export function ProgressCard({
  title = "Progress",
  current = 0,
  target = 100,
  label = "Overall Progress",
  icon = "🚀",
}: ProgressCardProps) {
  const safeTarget = Math.max(target, 1);

  const percentage = Math.min(
    Math.max((current / safeTarget) * 100, 0),
    100
  );

  const remaining = Math.max(target - current, 0);

  return (
    <section className="ui-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "24px",
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
            Goal Tracking
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
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            background: "rgba(79, 70, 229, 0.1)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
          }}
        >
          {icon}
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
            fontSize: "32px",
            fontWeight: 800,
          }}
        >
          {Math.round(percentage)}%
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          complete
        </span>
      </div>

      <p
        style={{
          margin: "0 0 16px",
          color: "var(--text-muted)",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {label}
      </p>

      <div
        style={{
          width: "100%",
          height: "14px",
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
              "linear-gradient(90deg, var(--indigo), var(--violet))",
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
              fontSize: "12px",
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
            {current}
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
              fontSize: "12px",
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
            {target}
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
              fontSize: "12px",
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
    </section>
  );
}