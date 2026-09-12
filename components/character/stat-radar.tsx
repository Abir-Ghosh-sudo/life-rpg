type StatRadarProps = {
  strength?: number;
  intelligence?: number;
  focus?: number;
  creativity?: number;
  consistency?: number;
};

export function StatRadar({
  strength = 75,
  intelligence = 82,
  focus = 68,
  creativity = 90,
  consistency = 72,
}: StatRadarProps) {
  const stats = [
    {
      label: "Strength",
      value: strength,
      icon: "💪",
    },
    {
      label: "Intelligence",
      value: intelligence,
      icon: "🧠",
    },
    {
      label: "Focus",
      value: focus,
      icon: "🎯",
    },
    {
      label: "Creativity",
      value: creativity,
      icon: "✨",
    },
    {
      label: "Consistency",
      value: consistency,
      icon: "🔥",
    },
  ];

  const size = 280;
  const center = size / 2;
  const radius = 95;
  const totalStats = stats.length;

  const getPoint = (
    index: number,
    value: number = 100
  ) => {
    const angle =
      (Math.PI * 2 * index) / totalStats - Math.PI / 2;

    const safeValue = Math.min(Math.max(value, 0), 100);

    const distance = radius * (safeValue / 100);

    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const createPolygonPoints = (value: number) =>
    stats
      .map((_, index) => {
        const point = getPoint(index, value);

        return `${point.x},${point.y}`;
      })
      .join(" ");

  const statPoints = stats
    .map((stat, index) => {
      const point = getPoint(index, stat.value);

      return `${point.x},${point.y}`;
    })
    .join(" ");

  const levels = [20, 40, 60, 80, 100];

  const average = Math.round(
    stats.reduce(
      (total, stat) =>
        total +
        Math.min(Math.max(stat.value, 0), 100),
      0
    ) / stats.length
  );

  return (
    <section className="ui-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Character Analysis
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            Stat Radar
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            Visual overview of your character abilities.
          </p>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: "14px",
            background: "rgba(79, 70, 229, 0.08)",
            border: "1px solid var(--border)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            POWER LEVEL
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--indigo)",
              fontSize: "22px",
            }}
          >
            {average}
          </strong>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
          width: "100%",
        }}
      >
        <svg
          width="100%"
          height="320"
          viewBox={`0 0 ${size} ${size}`}
          style={{
            maxWidth: "320px",
            overflow: "visible",
          }}
        >
          {/* Radar levels */}
          {levels.map((level) => (
            <polygon
              key={level}
              points={createPolygonPoints(level)}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          ))}

          {/* Radar lines */}
          {stats.map((_, index) => {
            const point = getPoint(index, 100);

            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="var(--border)"
                strokeWidth="1"
              />
            );
          })}

          {/* Stat area */}
          <polygon
            points={statPoints}
            fill="rgba(79, 70, 229, 0.18)"
            stroke="var(--indigo)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Stat points */}
          {stats.map((stat, index) => {
            const point = getPoint(index, stat.value);

            return (
              <circle
                key={stat.label}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="var(--indigo)"
                stroke="var(--surface)"
                strokeWidth="3"
              />
            );
          })}

          {/* Labels */}
          {stats.map((stat, index) => {
            const point = getPoint(index, 125);

            return (
              <text
                key={stat.label}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-muted)"
                fontSize="11"
                fontWeight="700"
              >
                {stat.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Stats List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {stats.map((stat) => {
          const safeValue = Math.min(
            Math.max(stat.value, 0),
            100
          );

          return (
            <div
              key={stat.label}
              style={{
                padding: "13px",
                borderRadius: "14px",
                background: "var(--surface-light)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "20px" }}>
                  {stat.icon}
                </span>

                <strong
                  style={{
                    color: "var(--indigo)",
                    fontSize: "17px",
                  }}
                >
                  {safeValue}
                </strong>
              </div>

              <p
                style={{
                  margin: "9px 0 0",
                  color: "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "rgba(16, 185, 129, 0.07)",
          border: "1px solid rgba(16, 185, 129, 0.18)",
          textAlign: "center",
          color: "var(--emerald)",
          fontSize: "13px",
          fontWeight: 800,
        }}
      >
        ⚡ Overall Character Power: {average}/100
      </div>
    </section>
  );
}