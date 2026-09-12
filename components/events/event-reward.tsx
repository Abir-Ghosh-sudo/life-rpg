type EventRewardProps = {
  title?: string;
  xp?: number;
  gold?: number;
  itemName?: string;
  itemIcon?: string;
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  claimed?: boolean;
  onClaim?: () => void;
};

export function EventReward({
  title = "Event Rewards",
  xp = 500,
  gold = 250,
  itemName = "Champion's Badge",
  itemIcon = "🏅",
  rarity = "Epic",
  claimed = false,
  onClaim,
}: EventRewardProps) {
  const rarityStyles = {
    Common: {
      color: "var(--text-muted)",
      background: "var(--surface-light)",
    },
    Rare: {
      color: "var(--indigo)",
      background: "rgba(79, 70, 229, 0.1)",
    },
    Epic: {
      color: "var(--violet)",
      background: "rgba(124, 58, 237, 0.1)",
    },
    Legendary: {
      color: "var(--gold)",
      background: "rgba(245, 158, 11, 0.1)",
    },
  };

  const rarityStyle = rarityStyles[rarity];

  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          top: "-90px",
          right: "-70px",
          background: "rgba(245, 158, 11, 0.08)",
          filter: "blur(12px)",
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
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              {title}
            </h2>
          </div>

          <span
            style={{
              padding: "7px 12px",
              borderRadius: "999px",
              background: claimed
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(245, 158, 11, 0.1)",
              color: claimed
                ? "var(--emerald)"
                : "var(--gold)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            {claimed ? "✓ Claimed" : "🎁 Available"}
          </span>
        </div>

        {/* Rewards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          {/* XP */}
          <div
            style={{
              padding: "18px",
              borderRadius: "18px",
              textAlign: "center",
              background: "rgba(79, 70, 229, 0.08)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "30px" }}>⚡</div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Experience
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--indigo)",
                fontSize: "23px",
              }}
            >
              +{xp} XP
            </strong>
          </div>

          {/* Gold */}
          <div
            style={{
              padding: "18px",
              borderRadius: "18px",
              textAlign: "center",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "30px" }}>🪙</div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Gold
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: "var(--gold)",
                fontSize: "23px",
              }}
            >
              +{gold}
            </strong>
          </div>

          {/* Special Item */}
          <div
            style={{
              padding: "18px",
              borderRadius: "18px",
              textAlign: "center",
              background: rarityStyle.background,
              border: `1px solid ${rarityStyle.color}`,
            }}
          >
            <div
              style={{
                fontSize: "30px",
                filter: claimed ? "none" : "none",
              }}
            >
              {itemIcon}
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Special Item
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "6px",
                color: rarityStyle.color,
                fontSize: "15px",
              }}
            >
              {itemName}
            </strong>

            <span
              style={{
                display: "inline-block",
                marginTop: "8px",
                padding: "4px 8px",
                borderRadius: "999px",
                background: rarityStyle.background,
                color: rarityStyle.color,
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              {rarity}
            </span>
          </div>
        </div>

        {/* Claim Button */}
        <button
          type="button"
          className="ui-button ui-button-primary"
          onClick={onClaim}
          disabled={claimed}
          style={{
            width: "100%",
            marginTop: "22px",
            opacity: claimed ? 0.65 : 1,
            cursor: claimed ? "not-allowed" : "pointer",
          }}
        >
          {claimed
            ? "✓ Rewards Already Claimed"
            : "🎁 Claim Event Rewards"}
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "16px",
            padding: "13px",
            borderRadius: "14px",
            textAlign: "center",
            background: claimed
              ? "rgba(16, 185, 129, 0.07)"
              : "var(--surface-light)",
            border: claimed
              ? "1px solid rgba(16, 185, 129, 0.18)"
              : "1px solid var(--border)",
            color: claimed
              ? "var(--emerald)"
              : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {claimed
            ? "🏆 Event rewards successfully added to your inventory!"
            : "Complete the event requirements to claim these rewards."}
        </div>
      </div>
    </section>
  );
}