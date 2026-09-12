type CategoryItem = {
  label: string;
  value: number;
  icon?: string;
};

type CategoryBreakdownProps = {
  title?: string;
  data?: CategoryItem[];
};

export function CategoryBreakdown({
  title = "Category Breakdown",
  data = [],
}: CategoryBreakdownProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

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
              color: "var(--violet)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Activity Insights
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
            background: "rgba(124, 58, 237, 0.1)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          🧩
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
          No category data available yet.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {data.map((item, index) => {
            const percentage =
              total > 0
                ? Math.round((item.value / total) * 100)
                : 0;

            const colors = [
              "var(--indigo)",
              "var(--violet)",
              "var(--emerald)",
              "var(--gold)",
              "var(--rose)",
            ];

            const color = colors[index % colors.length];

            return (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--surface-light)",
                        border: "1px solid var(--border)",
                        fontSize: "18px",
                      }}
                    >
                      {item.icon ?? "📌"}
                    </span>

                    <span
                      style={{
                        color: "var(--text)",
                        fontSize: "14px",
                        fontWeight: 800,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--text)",
                        fontSize: "14px",
                        fontWeight: 800,
                      }}
                    >
                      {item.value}
                    </div>

                    <div
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
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
                      background: color,
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