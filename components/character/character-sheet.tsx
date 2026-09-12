type CharacterSheetProps = {
  name?: string;
  level?: number;
  className?: string;
  title?: string;
  strength?: number;
  intelligence?: number;
  focus?: number;
  creativity?: number;
};

export function CharacterSheet({
  name = "Adventurer",
  level = 1,
  className = "Explorer",
  title = "Rising Hero",
  strength = 75,
  intelligence = 82,
  focus = 68,
  creativity = 90,
}: CharacterSheetProps) {
  const stats = [
    {
      label: "Strength",
      value: strength,
      icon: "💪",
      color: "var(--rose)",
    },
    {
      label: "Intelligence",
      value: intelligence,
      icon: "🧠",
      color: "var(--indigo)",
    },
    {
      label: "Focus",
      value: focus,
      icon: "🎯",
      color: "var(--gold)",
    },
    {
      label: "Creativity",
      value: creativity,
      icon: "✨",
      color: "var(--violet)",
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
            Character Profile
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            Character Sheet
          </h2>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            background: "rgba(245, 158, 11, 0.1)",
            color: "var(--gold)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          Level {level}
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          borderRadius: "18px",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(124, 58, 237, 0.1))",
              border: "1px solid rgba(79, 70, 229, 0.2)",
            }}
          >
            🧙‍♂️
          </div>

          <div>
            <h3
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              {name}
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
              {className} • {title}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "14px",
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
                <span style={{ fontSize: "22px" }}>
                  {stat.icon}
                </span>

                <strong
                  style={{
                    color: stat.color,
                    fontSize: "20px",
                  }}
                >
                  {safeValue}
                </strong>
              </div>

              <p
                style={{
                  margin: "12px 0 0",
                  color: "var(--text)",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {stat.label}
              </p>

              <div
                style={{
                  width: "100%",
                  height: "7px",
                  marginTop: "10px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  background: "var(--surface)",
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
          background: "rgba(79, 70, 229, 0.06)",
          border: "1px solid var(--border)",
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
            Character Status
          </p>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--emerald)",
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            ● Ready for Adventure
          </p>
        </div>

        <span
          style={{
            color: "var(--indigo)",
            fontSize: "13px",
            fontWeight: 800,
          }}
        >
          ⚡ Keep growing
        </span>
      </div>
    </section>
  );
}