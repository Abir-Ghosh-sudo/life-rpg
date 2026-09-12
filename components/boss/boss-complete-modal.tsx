type BossCompleteModalProps = {
  bossName?: string;
  rewardXP?: number;
  rewardGold?: number;
  visible?: boolean;
  onContinue?: () => void;
};

export function BossCompleteModal({
  bossName = "The Boss",
  rewardXP = 0,
  rewardGold = 0,
  visible = true,
  onContinue,
}: BossCompleteModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.55)",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
          borderColor: "var(--gold)",
          boxShadow: "0 24px 60px rgba(79, 70, 229, 0.25)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            width: "88px",
            height: "88px",
            margin: "0 auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "44px",
            background: "rgba(245, 158, 11, 0.12)",
            border: "2px solid var(--gold)",
          }}
        >
          🏆
        </div>

        <p
          style={{
            margin: "20px 0 0",
            color: "var(--emerald)",
            fontSize: "13px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Victory!
        </p>

        <h2
          style={{
            margin: "8px 0 0",
            color: "var(--text)",
            fontSize: "28px",
            fontWeight: 800,
          }}
        >
          Boss Defeated!
        </h2>

        <p
          style={{
            margin: "12px 0 0",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          You defeated <strong>{bossName}</strong> and completed this
          challenge!
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(79, 70, 229, 0.08)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "26px" }}>⚡</div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              XP Earned
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--indigo)",
                fontSize: "22px",
              }}
            >
              +{rewardXP}
            </strong>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "26px" }}>🪙</div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Gold Earned
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--gold)",
                fontSize: "22px",
              }}
            >
              +{rewardGold}
            </strong>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "var(--emerald)",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          🎉 New progress has been unlocked!
        </div>

        <button
          type="button"
          className="ui-button ui-button-primary"
          onClick={onContinue}
          style={{
            width: "100%",
            marginTop: "24px",
          }}
        >
          Continue Adventure →
        </button>
      </div>
    </div>
  );
}