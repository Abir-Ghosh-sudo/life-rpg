type CharacterClassCardProps = {
  className?: string;
  description?: string;
  icon?: string;
  level?: number;
  specialty?: string;
};

export function CharacterClassCard({
  className = "Adventurer",
  description = "A versatile character ready to take on new challenges and grow stronger every day.",
  icon = "⚔️",
  level = 1,
  specialty = "Balanced Growth",
}: CharacterClassCardProps) {
  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, var(--surface) 0%, rgba(79, 70, 229, 0.06) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          top: "-70px",
          right: "-50px",
          background: "rgba(124, 58, 237, 0.08)",
          filter: "blur(10px)",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
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
                width: "68px",
                height: "68px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "32px",
                background: "rgba(79, 70, 229, 0.1)",
                border: "1px solid rgba(79, 70, 229, 0.2)",
              }}
            >
              {icon}
            </div>

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
                Character Class
              </p>

              <h2
                style={{
                  margin: "6px 0 0",
                  color: "var(--text)",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                {className}
              </h2>
            </div>
          </div>

          <span
            style={{
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.1)",
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            Level {level}
          </span>
        </div>

        <p
          style={{
            margin: "20px 0 0",
            color: "var(--text-muted)",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px 16px",
            borderRadius: "16px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Specialty
          </p>

          <p
            style={{
              margin: "7px 0 0",
              color: "var(--indigo)",
              fontSize: "16px",
              fontWeight: 800,
            }}
          >
            ✨ {specialty}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "18px",
            color: "var(--emerald)",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          <span>●</span>
          <span>Character class active</span>
        </div>
      </div>
    </section>
  );
}