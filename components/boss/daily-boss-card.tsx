type DailyBossCardProps = {
  bossName?: string;
  level?: number;
  icon?: string;
  description?: string;
  currentHealth?: number;
  maxHealth?: number;
  rewardXP?: number;
  rewardGold?: number;
  timeLeft?: string;
  onChallenge?: () => void;
};

export function DailyBossCard({
  bossName = "Shadow Guardian",
  level = 5,
  icon = "👹",
  description = "A powerful daily boss has appeared. Defeat it before time runs out!",
  currentHealth = 100,
  maxHealth = 100,
  rewardXP = 250,
  rewardGold = 100,
  timeLeft = "12h 45m",
  onChallenge,
}: DailyBossCardProps) {
  const safeMaxHealth = Math.max(maxHealth, 1);

  const safeHealth = Math.min(
    Math.max(currentHealth, 0),
    safeMaxHealth
  );

  const healthPercentage = Math.round(
    (safeHealth / safeMaxHealth) * 100
  );

  const defeated = healthPercentage === 0;

  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderColor: defeated
          ? "var(--emerald)"
          : "rgba(244, 63, 94, 0.35)",
        background:
          "linear-gradient(135deg, var(--surface) 0%, rgba(244, 63, 94, 0.05) 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          top: "-90px",
          right: "-70px",
          background: "rgba(244, 63, 94, 0.08)",
          filter: "blur(10px)",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Header */}
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
                color: "var(--rose)",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Daily Boss
            </p>

            <h2
              style={{
                margin: "7px 0 0",
                color: "var(--text)",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              Today's Challenge
            </h2>
          </div>

          <div
            style={{
              padding: "9px 12px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.1)",
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            ⏳ {defeated ? "Completed" : timeLeft}
          </div>
        </div>

        {/* Boss Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              width: "74px",
              height: "74px",
              flexShrink: 0,
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "38px",
              background: defeated
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(244, 63, 94, 0.1)",
              border: defeated
                ? "1px solid rgba(16, 185, 129, 0.25)"
                : "1px solid rgba(244, 63, 94, 0.25)",
            }}
          >
            {defeated ? "🏆" : icon}
          </div>

          <div>
            <p
              style={{
                margin: 0,
                color: "var(--gold)",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              LEVEL {level}
            </p>

            <h3
              style={{
                margin: "5px 0 0",
                color: "var(--text)",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              {bossName}
            </h3>

            <p
              style={{
                margin: "6px 0 0",
                color: "var(--text-muted)",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Health */}
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            <span>❤️ Boss Health</span>

            <span>
              {safeHealth} / {safeMaxHealth}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "14px",
              borderRadius: "999px",
              overflow: "hidden",
              background: "var(--surface-light)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: `${healthPercentage}%`,
                height: "100%",
                borderRadius: "999px",
                background: defeated
                  ? "var(--emerald)"
                  : "linear-gradient(90deg, var(--rose), var(--gold))",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Rewards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              padding: "14px",
              borderRadius: "14px",
              background: "rgba(79, 70, 229, 0.07)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              ⚡ XP Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--indigo)",
                fontSize: "20px",
              }}
            >
              +{rewardXP}
            </strong>
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.07)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              🪙 Gold Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--gold)",
                fontSize: "20px",
              }}
            >
              +{rewardGold}
            </strong>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          className="ui-button ui-button-primary"
          onClick={onChallenge}
          disabled={defeated}
          style={{
            width: "100%",
            marginTop: "22px",
            opacity: defeated ? 0.65 : 1,
            cursor: defeated ? "not-allowed" : "pointer",
          }}
        >
          {defeated
            ? "🏆 Daily Boss Defeated"
            : "⚔️ Start Daily Battle"}
        </button>
      </div>
    </section>
  );
}