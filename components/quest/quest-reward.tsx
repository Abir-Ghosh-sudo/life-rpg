type QuestRewardProps = {
  xp?: number;
  gold?: number;
  bonus?: string;
  completed?: boolean;
  compact?: boolean;
};

export function QuestReward({
  xp = 120,
  gold = 50,
  bonus,
  completed = false,
  compact = false,
}: QuestRewardProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: compact ? "8px" : "12px",
      }}
    >
      {/* Reward Header */}
      {!compact && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Quest Rewards
          </span>

          {completed && (
            <span
              style={{
                padding: "5px 9px",
                borderRadius: "999px",
                background:
                  "rgba(16, 185, 129, 0.1)",
                color: "var(--emerald)",
                fontSize: "9px",
                fontWeight: 900,
              }}
            >
              ✓ Claimed
            </span>
          )}
        </div>
      )}

      {/* Main Rewards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            bonus
              ? "repeat(3, minmax(0, 1fr))"
              : "repeat(2, minmax(0, 1fr))",
          gap: compact ? "8px" : "10px",
        }}
      >
        {/* XP */}
        <div
          style={{
            padding: compact
              ? "10px"
              : "14px",
            borderRadius: compact
              ? "11px"
              : "14px",
            background:
              "rgba(124, 58, 237, 0.08)",
            border:
              "1px solid rgba(124, 58, 237, 0.16)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: compact
                ? "16px"
                : "20px",
            }}
          >
            ✨
          </span>

          <span
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            XP
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--violet)",
              fontSize: compact
                ? "13px"
                : "16px",
              fontWeight: 900,
            }}
          >
            +{xp}
          </strong>
        </div>

        {/* Gold */}
        <div
          style={{
            padding: compact
              ? "10px"
              : "14px",
            borderRadius: compact
              ? "11px"
              : "14px",
            background:
              "rgba(245, 158, 11, 0.08)",
            border:
              "1px solid rgba(245, 158, 11, 0.16)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: compact
                ? "16px"
                : "20px",
            }}
          >
            🪙
          </span>

          <span
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Gold
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--gold)",
              fontSize: compact
                ? "13px"
                : "16px",
              fontWeight: 900,
            }}
          >
            +{gold}
          </strong>
        </div>

        {/* Bonus */}
        {bonus && (
          <div
            style={{
              padding: compact
                ? "10px"
                : "14px",
              borderRadius: compact
                ? "11px"
                : "14px",
              background:
                "rgba(16, 185, 129, 0.08)",
              border:
                "1px solid rgba(16, 185, 129, 0.16)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: compact
                  ? "16px"
                  : "20px",
              }}
            >
              🎁
            </span>

            <span
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--text-muted)",
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Bonus
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--emerald)",
                fontSize: compact
                  ? "10px"
                  : "12px",
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {bonus}
            </strong>
          </div>
        )}
      </div>

      {/* Completion Message */}
      {completed && !compact && (
        <div
          style={{
            padding: "11px 13px",
            borderRadius: "12px",
            background:
              "rgba(16, 185, 129, 0.07)",
            border:
              "1px solid rgba(16, 185, 129, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🏆</span>

          <span
            style={{
              color: "var(--emerald)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            Rewards successfully earned!
          </span>
        </div>
      )}
    </div>
  );
}