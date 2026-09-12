"use client";

import { useState } from "react";

type RandomEventModalProps = {
  open?: boolean;
  title?: string;
  description?: string;
  icon?: string;
  reward?: string;
  risk?: string;
  onAccept?: () => void;
  onIgnore?: () => void;
  onClose?: () => void;
};

export function RandomEventModal({
  open = true,
  title = "A Mysterious Stranger",
  description = "A mysterious stranger appears on your journey and offers you a risky challenge. Your decision may change the course of your adventure.",
  icon = "🎭",
  reward = "+150 XP",
  risk = "Lose 20 Energy",
  onAccept,
  onIgnore,
  onClose,
}: RandomEventModalProps) {
  const [visible, setVisible] = useState(open);

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleAccept = () => {
    onAccept?.();
    setVisible(false);
  };

  const handleIgnore = () => {
    onIgnore?.();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Random event"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.72)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "560px",
          position: "relative",
          overflow: "hidden",
          padding: 0,
          background:
            "linear-gradient(135deg, var(--surface) 0%, rgba(124, 58, 237, 0.08) 100%)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            top: "-140px",
            right: "-100px",
            background: "rgba(124, 58, 237, 0.14)",
            filter: "blur(20px)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "28px",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "var(--surface-light)",
              color: "var(--text-muted)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          {/* Event badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(124, 58, 237, 0.1)",
              color: "var(--violet)",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            🎲 Random Encounter
          </div>

          {/* Icon */}
          <div
            style={{
              width: "92px",
              height: "92px",
              margin: "24px auto 0",
              borderRadius: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.14), rgba(124, 58, 237, 0.12))",
              border: "1px solid rgba(124, 58, 237, 0.22)",
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <div
            style={{
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "28px",
                fontWeight: 900,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                margin: "12px auto 0",
                maxWidth: "470px",
                color: "var(--text-muted)",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>
          </div>

          {/* Reward & Risk */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
              marginTop: "26px",
            }}
          >
            <div
              style={{
                padding: "17px",
                borderRadius: "18px",
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
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
                  marginTop: "8px",
                  color: "var(--emerald)",
                  fontSize: "18px",
                }}
              >
                🎁 {reward}
              </strong>
            </div>

            <div
              style={{
                padding: "17px",
                borderRadius: "18px",
                background: "rgba(244, 63, 94, 0.07)",
                border: "1px solid rgba(244, 63, 94, 0.2)",
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
                  marginTop: "8px",
                  color: "var(--rose)",
                  fontSize: "18px",
                }}
              >
                ⚠️ {risk}
              </strong>
            </div>
          </div>

          {/* Warning */}
          <div
            style={{
              marginTop: "18px",
              padding: "13px 15px",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.07)",
              border: "1px solid rgba(245, 158, 11, 0.16)",
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            ⚡ Your choice cannot be changed after accepting the event.
          </div>

          {/* Actions */}
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
              onClick={handleAccept}
            >
              ⚔️ Accept
            </button>

            <button
              type="button"
              onClick={handleIgnore}
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
              Ignore
            </button>
          </div>

          <p
            style={{
              margin: "16px 0 0",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            🎲 Random events make every adventure unique.
          </p>
        </div>
      </div>
    </div>
  );
}