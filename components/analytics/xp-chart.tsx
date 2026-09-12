type XPData = {
  label: string;
  value: number;
};

type XPChartProps = {
  title?: string;
  data?: XPData[];
};

export function XPChart({
  title = "XP Progress",
  data = [],
}: XPChartProps) {
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
              color: "var(--violet)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Progress Analytics
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
          ⚡
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
          No XP data available yet.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            minHeight: "220px",
            padding: "20px 8px 0",
          }}
        >
          {data.map((item) => {
            const height = Math.max(
              (item.value / maxValue) * 180,
              8
            );

            return (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  minWidth: "36px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {item.value}
                </span>

                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    display: "flex",
                    alignItems: "flex-end",
                    background: "var(--surface-light)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${height}px`,
                      borderRadius: "10px 10px 0 0",
                      background:
                        "linear-gradient(180deg, var(--violet), var(--indigo))",
                      transition: "height 0.3s ease",
                    }}
                  />
                </div>

                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}