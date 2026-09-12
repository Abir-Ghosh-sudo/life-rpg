type BossRewardProps = {
  xp?: number;
  gold?: number;
  item?: string;
  itemIcon?: string;
  title?: string;
  unlocked?: boolean;
};

export function BossReward({
  xp = 0,
  gold = 0,
  item = "Mystery Reward",
  itemIcon = "🎁",
  title = "Boss Rewards",
  unlocked = false,
}: BossRewardProps) {
  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderColor: unlocked
          ? "var(--gold)"
          : "var(--border)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          top: "-70px",
          right: "-50px",
          background: "rgba(245, 158, 11, 0.08)",
        }}
      />

      <div style={{ position: "relative" }}>
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
                color: "var(--gold)",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Victory Loot
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
              width: "56px",
              height: "56px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            {unlocked ? "🏆" : "🔒"}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          {/* XP REWARD */}
          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(79, 70, 229, 0.08)",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "30px",
              }}
            >
              ⚡
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              XP Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--indigo)",
                fontSize: "24px",
              }}
            >
              +{unlocked ? xp : 0}
            </strong>
          </div>

          {/* GOLD REWARD */}
          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "30px",
              }}
            >
              🪙
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Gold Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--gold)",
                fontSize: "24px",
              }}
            >
              +{unlocked ? gold : 0}
            </strong>
          </div>

          {/* SPECIAL ITEM */}
          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: unlocked
                ? "rgba(16, 185, 129, 0.08)"
                : "var(--surface-light)",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                filter: unlocked
                  ? "none"
                  : "grayscale(1)",
              }}
            >
              {unlocked ? itemIcon : "❓"}
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Special Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: unlocked
                  ? "var(--emerald)"
                  : "var(--text-muted)",
                fontSize: "15px",
              }}
            >
              {unlocked ? item : "Locked"}
            </strong>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "14px 16px",
            borderRadius: "14px",
            textAlign: "center",
            background: unlocked
              ? "rgba(16, 185, 129, 0.08)"
              : "var(--surface-light)",
            border: unlocked
              ? "1px solid rgba(16, 185, 129, 0.2)"
              : "1px solid var(--border)",
            color: unlocked
              ? "var(--emerald)"
              : "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {unlocked
            ? "🎉 Rewards unlocked! Claim your victory."
            : "⚔️ Defeat the boss to unlock these rewards."}
        </div>
      </div>
    </section>
  );
}