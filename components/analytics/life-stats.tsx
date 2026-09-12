type LifeStat = {
  label: string;
  value: string | number;
  icon?: string;
  trend?: string;
  positive?: boolean;
};

type LifeStatsProps = {
  title?: string;
  stats?: LifeStat[];
};

export function LifeStats({
  title = "Life Statistics",
  stats = [],
}: LifeStatsProps) {
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
              color: "var(--indigo)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Your Journey
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
            background: "rgba(79, 70, 229, 0.1)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
          }}
        >
          📈
        </div>
      </div>

      {stats.length === 0 ? (
        <div
          style={{
            padding: "32px 16px",
            textAlign: "center",
            color: "var(--text-muted)",
            background: "var(--surface-light)",
            borderRadius: "14px",
            border: "1px solid var(--border)",
          }}
        >
          No life statistics available yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "var(--surface-light)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {stat.icon ?? "✨"}
                </span>

                {stat.trend ? (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: stat.positive
                        ? "var(--emerald)"
                        : "var(--rose)",
                      background: stat.positive
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(244, 63, 94, 0.1)",
                      padding: "5px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    {stat.trend}
                  </span>
                ) : null}
              </div>

              <p
                style={{
                  margin: "16px 0 0",
                  color: "var(--text-muted)",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                {stat.label}
              </p>

              <h3
                style={{
                  margin: "6px 0 0",
                  color: "var(--text)",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}