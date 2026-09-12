type CharacterLevelProps = {
  level?: number;
  currentXP?: number;
  nextLevelXP?: number;
  title?: string;
};

export function CharacterLevel({
  level = 1,
  currentXP = 0,
  nextLevelXP = 100,
  title = "Character Level",
}: CharacterLevelProps) {
  const safeNextLevelXP = Math.max(nextLevelXP, 1);

  const safeCurrentXP = Math.min(
    Math.max(currentXP, 0),
    safeNextLevelXP
  );

  const percentage = Math.round(
    (safeCurrentXP / safeNextLevelXP) * 100
  );

  const remainingXP = Math.max(
    safeNextLevelXP - safeCurrentXP,
    0
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
            Character Progression
          </p>

          <h2
            style={{
              margin: "7px 0 0",
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
            width: "62px",
            height: "62px",
            borderRadius: "18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, var(--indigo), var(--violet))",
            color: "white",
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              opacity: 0.85,
              textTransform: "uppercase",
            }}
          >
            Level
          </span>

          <span
            style={{
              fontSize: "24px",
              fontWeight: 900,
              lineHeight: 1,
              marginTop: "3px",
            }}
          >
            {level}
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "18px",
          borderRadius: "18px",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "12px",
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
              Current Experience
            </p>

            <h3
              style={{
                margin: "6px 0 0",
                color: "var(--indigo)",
                fontSize: "26px",
                fontWeight: 900,
              }}
            >
              {safeCurrentXP} XP
            </h3>
          </div>

          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {percentage}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "14px",
            marginTop: "16px",
            borderRadius: "999px",
            overflow: "hidden",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, var(--indigo), var(--violet))",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "12px",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          <span>{safeCurrentXP} XP earned</span>

          <span>{safeNextLevelXP} XP needed</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          padding: "14px 16px",
          borderRadius: "14px",
          background:
            percentage === 100
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(245, 158, 11, 0.08)",
          border:
            percentage === 100
              ? "1px solid rgba(16, 185, 129, 0.2)"
              : "1px solid rgba(245, 158, 11, 0.2)",
          color:
            percentage === 100
              ? "var(--emerald)"
              : "var(--gold)",
          fontSize: "13px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {percentage === 100
          ? "🎉 Level up is ready!"
          : `⚡ ${remainingXP} XP remaining until Level ${level + 1}`}
      </div>
    </section>
  );
}