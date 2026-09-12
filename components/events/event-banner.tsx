type EventBannerProps = {
  title?: string;
  description?: string;
  icon?: string;
  eventType?: string;
  timeLeft?: string;
  reward?: string;
  active?: boolean;
  onAction?: () => void;
};

export function EventBanner({
  title = "Rise of the Champions",
  description = "Complete special challenges, earn exclusive rewards, and prove your strength.",
  icon = "⚔️",
  eventType = "Special Event",
  timeLeft = "2 days left",
  reward = "+500 XP",
  active = true,
  onAction,
}: EventBannerProps) {
  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "0",
        borderColor: active
          ? "rgba(124, 58, 237, 0.35)"
          : "var(--border)",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          top: "-140px",
          right: "-80px",
          background: "rgba(124, 58, 237, 0.14)",
          filter: "blur(18px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          bottom: "-100px",
          left: "-60px",
          background: "rgba(245, 158, 11, 0.08)",
          filter: "blur(15px)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Content */}
          <div
            style={{
              flex: "1",
              minWidth: "220px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background: active
                    ? "rgba(124, 58, 237, 0.12)"
                    : "var(--surface-light)",
                  color: active
                    ? "var(--violet)"
                    : "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {active ? eventType : "Event Ended"}
              </span>

              {active && (
                <span
                  style={{
                    color: "var(--gold)",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  ⏳ {timeLeft}
                </span>
              )}
            </div>

            <h2
              style={{
                margin: "18px 0 0",
                color: "var(--text)",
                fontSize: "30px",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "var(--text-muted)",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "560px",
              }}
            >
              {description}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "22px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.16)",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  EVENT REWARD
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    color: "var(--gold)",
                    fontSize: "16px",
                  }}
                >
                  🏆 {reward}
                </strong>
              </div>

              <button
                type="button"
                className="ui-button ui-button-primary"
                onClick={onAction}
                disabled={!active}
                style={{
                  opacity: active ? 1 : 0.6,
                  cursor: active ? "pointer" : "not-allowed",
                }}
              >
                {active ? "Join Event ⚔️" : "Event Completed"}
              </button>
            </div>
          </div>

          {/* Event Icon */}
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "52px",
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.14), rgba(124, 58, 237, 0.1))",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              boxShadow: "0 15px 35px rgba(79, 70, 229, 0.12)",
              filter: active ? "none" : "grayscale(1)",
            }}
          >
            {active ? icon : "🔒"}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        style={{
          position: "relative",
          padding: "12px 28px",
          background: active
            ? "rgba(79, 70, 229, 0.06)"
            : "var(--surface-light)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: active
              ? "var(--emerald)"
              : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          {active
            ? "● Event is currently active"
            : "● This event is no longer active"}
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          🎯 Complete challenges to earn rewards
        </span>
      </div>
    </section>
  );
}