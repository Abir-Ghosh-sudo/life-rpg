type ActivityDay = {
  date: string;
  value: number;
};

type ActivityCalendarProps = {
  title?: string;
  data?: ActivityDay[];
};

export function ActivityCalendar({
  title = "Activity Calendar",
  data = [],
}: ActivityCalendarProps) {
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
            Consistency
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
          📅
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
          No activity recorded yet.
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(44px, 1fr))",
              gap: "10px",
            }}
          >
            {data.map((item) => {
              const intensity = Math.min(
                Math.max(item.value / maxValue, 0),
                1
              );

              return (
                <div
                  key={item.date}
                  title={`${item.date}: ${item.value} activity`}
                  style={{
                    aspectRatio: "1",
                    minHeight: "44px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    background:
                      intensity === 0
                        ? "var(--surface-light)"
                        : `rgba(79, 70, 229, ${
                            0.15 + intensity * 0.85
                          })`,
                    border: "1px solid var(--border)",
                    color:
                      intensity > 0.55
                        ? "white"
                        : "var(--text)",
                    fontSize: "12px",
                    fontWeight: 800,
                    transition: "transform 0.2s ease",
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "18px",
              flexWrap: "wrap",
              color: "var(--text-muted)",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            <span>Less activity</span>

            <div
              style={{
                display: "flex",
                gap: "6px",
              }}
            >
              {[0.15, 0.35, 0.55, 0.75, 1].map(
                (intensity) => (
                  <span
                    key={intensity}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "5px",
                      background: `rgba(79, 70, 229, ${
                        0.15 + intensity * 0.85
                      })`,
                      border: "1px solid var(--border)",
                    }}
                  />
                )
              )}
            </div>

            <span>More activity</span>
          </div>
        </>
      )}
    </section>
  );
}