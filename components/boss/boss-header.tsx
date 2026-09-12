type BossHeaderProps = {
  title?: string;
  subtitle?: string;
  bossName?: string;
  bossLevel?: number;
  icon?: string;
};

export function BossHeader({
  title = "Boss Battle",
  subtitle = "Prepare yourself for the ultimate challenge.",
  bossName = "Unknown Boss",
  bossLevel = 1,
  icon = "👹",
}: BossHeaderProps) {
  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderColor: "rgba(244, 63, 94, 0.25)",
        background:
          "linear-gradient(135deg, var(--surface) 0%, rgba(79, 70, 229, 0.08) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-30px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "rgba(244, 63, 94, 0.08)",
          filter: "blur(8px)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
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
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.25)",
              boxShadow: "0 10px 25px rgba(244, 63, 94, 0.12)",
            }}
          >
            {icon}
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "var(--rose)",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Final Challenge
            </p>

            <h1
              style={{
                margin: "6px 0 0",
                color: "var(--text)",
                fontSize: "28px",
                fontWeight: 900,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "var(--text-muted)",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "14px 18px",
            borderRadius: "16px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
            minWidth: "150px",
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
            Current Boss
          </p>

          <h3
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "16px",
              fontWeight: 800,
            }}
          >
            {bossName}
          </h3>

          <span
            style={{
              display: "inline-block",
              marginTop: "8px",
              padding: "5px 9px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.1)",
              color: "var(--gold)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            Level {bossLevel}
          </span>
        </div>
      </div>
    </section>
  );
}