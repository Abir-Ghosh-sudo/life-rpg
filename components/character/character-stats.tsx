type CharacterStatsProps = {
  strength?: number;
  intelligence?: number;
  focus?: number;
  creativity?: number;
  consistency?: number;
  totalXP?: number;
};

export function CharacterStats({
  strength = 75,
  intelligence = 82,
  focus = 68,
  creativity = 90,
  consistency = 72,
  totalXP = 2450,
}: CharacterStatsProps) {
  const stats = [
    {
      name: "Strength",
      value: strength,
      icon: "💪",
      color: "var(--rose)",
    },
    {
      name: "Intelligence",
      value: intelligence,
      icon: "🧠",
      color: "var(--indigo)",
    },
    {
      name: "Focus",
      value: focus,
      icon: "🎯",
      color: "var(--gold)",
    },
    {
      name: "Creativity",
      value: creativity,
      icon: "✨",
      color: "var(--violet)",
    },
    {
      name: "Consistency",
      value: consistency,
      icon: "🔥",
      color: "var(--emerald)",
    },
  ];

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
            Character Power
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            Character Stats
          </h2>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: "14px",
            background: "rgba(79, 70, 229, 0.08)",
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
            TOTAL XP
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--indigo)",
              fontSize: "18px",
            }}
          >
            ⚡ {totalXP.toLocaleString()}
          </strong>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {stats.map((stat) => {
          const safeValue = Math.min(
            Math.max(stat.value, 0),
            100
          );

          return (
            <div
              key={stat.name}
              style={{
                padding: "16px",
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
                }}
              >
                <span
                  style={{
                    fontSize: "26px",
                  }}
                >
                  {stat.icon}
                </span>

                <strong
                  style={{
                    color: stat.color,
                    fontSize: "22px",
                    fontWeight: 900,
                  }}
                >
                  {safeValue}
                </strong>
              </div>

              <p
                style={{
                  margin: "14px 0 0",
                  color: "var(--text)",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {stat.name}
              </p>

              <div
                style={{
                  width: "100%",
                  height: "8px",
                  marginTop: "10px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: `${safeValue}%`,
                    height: "100%",
                    borderRadius: "999px",
                    background: stat.color,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          borderRadius: "16px",
          background: "rgba(16, 185, 129, 0.07)",
          border: "1px solid rgba(16, 185, 129, 0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Overall Status
          </p>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--emerald)",
              fontSize: "15px",
              fontWeight: 800,
            }}
          >
            ● Your character is growing stronger!
          </p>
        </div>

        <span
          style={{
            padding: "7px 11px",
            borderRadius: "999px",
            background: "rgba(16, 185, 129, 0.1)",
            color: "var(--emerald)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          Active Progress
        </span>
      </div>
    </section>
  );
}