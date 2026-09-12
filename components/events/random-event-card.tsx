type RandomEventCardProps = {
  title?: string;
  description?: string;
  icon?: string;
  reward?: string;
  risk?: string;
  eventType?: string;
  onAccept?: () => void;
  onIgnore?: () => void;
};

export function RandomEventCard({
  title = "A Mysterious Stranger",
  description = "A mysterious stranger appears on your journey and offers you a risky challenge. Will you accept the quest?",
  icon = "🎭",
  reward = "+150 XP",
  risk = "Lose 20 Energy",
  eventType = "Random Encounter",
  onAccept,
  onIgnore,
}: RandomEventCardProps) {
  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, var(--surface) 0%, rgba(124, 58, 237, 0.06) 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          top: "-100px",
          right: "-70px",
          background: "rgba(124, 58, 237, 0.1)",
          filter: "blur(15px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          bottom: "-80px",
          left: "-50px",
          background: "rgba(245, 158, 11, 0.06)",
          filter: "blur(15px)",
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
                color: "var(--violet)",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {eventType}
            </p>

            <h2
              style={{
                margin: "7px 0 0",
                color: "var(--text)",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              Random Event!
            </h2>
          </div>

          <span
            style={{
              padding: "7px 11px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.1)",
              color: "var(--gold)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            ✨ New Encounter
          </span>
        </div>

        {/* Event content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              width: "82px",
              height: "82px",
              flexShrink: 0,
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(124, 58, 237, 0.1))",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            }}
          >
            {icon}
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
              {title}
            </h3>

            <p
              style={{
                margin: "8px 0 0",
                color: "var(--text-muted)",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Reward and Risk */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginTop: "22px",
          }}
        >
          <div
            style={{
              padding: "15px",
              borderRadius: "16px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.18)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Possible Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "7px",
                color: "var(--emerald)",
                fontSize: "17px",
              }}
            >
              🎁 {reward}
            </strong>
          </div>

          <div
            style={{
              padding: "15px",
              borderRadius: "16px",
              background: "rgba(244, 63, 94, 0.07)",
              border: "1px solid rgba(244, 63, 94, 0.18)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Possible Risk
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "7px",
                color: "var(--rose)",
                fontSize: "17px",
              }}
            >
              ⚠️ {risk}
            </strong>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginTop: "22px",
          }}
        >
          <button
            type="button"
            className="ui-button ui-button-primary"
            onClick={onAccept}
          >
            ⚔️ Accept Challenge
          </button>

          <button
            type="button"
            onClick={onIgnore}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--surface-light)",
              color: "var(--text-muted)",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Ignore Event
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "18px",
            padding: "12px",
            borderRadius: "12px",
            background: "rgba(79, 70, 229, 0.05)",
            border: "1px solid var(--border)",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          🎲 Random events can change your journey. Choose wisely!
        </div>
      </div>
    </section>
  );
}