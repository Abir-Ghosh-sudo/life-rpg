type ActivityData = {
  label: string;
  value: number;
};

type ActivityChartProps = {
  title?: string;
  data?: ActivityData[];
};

export function ActivityChart({
  title = "Activity Overview",
  data = [],
}: ActivityChartProps) {
  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => item.value), 1)
      : 1;

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
              color: "var(--emerald)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Productivity Analytics
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
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          📊
        </div>
      </div>

      {data.length === 0 ? (
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
          No activity data available yet.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {data.map((item) => {
            const percentage = Math.min(
              Math.max((item.value / maxValue) * 100, 0),
              100
            );

            return (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "7px",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text)",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
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
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, var(--emerald), var(--indigo))",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}