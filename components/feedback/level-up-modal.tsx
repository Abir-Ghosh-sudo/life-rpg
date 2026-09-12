"use client";

import { useEffect, useState } from "react";

type LevelUpModalProps = {
  open?: boolean;
  previousLevel?: number;
  newLevel?: number;
  rewards?: string[];
  onClose?: () => void;
};

export function LevelUpModal({
  open = true,
  previousLevel = 4,
  newLevel = 5,
  rewards = ["+250 XP Bonus", "+100 Gold", "New Title Unlocked"],
  onClose,
}: LevelUpModalProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Level up"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "520px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          background:
            "linear-gradient(135deg, var(--surface), rgba(124, 58, 237, 0.12))",
          boxShadow: "0 30px 80px rgba(79, 70, 229, 0.3)",
          animation: "levelUpModalEnter 0.4s ease-out",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(124, 58, 237, 0.18)",
            filter: "blur(30px)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "34px 28px 28px",
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close level up modal"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
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

          {/* Icon */}
          <div
            style={{
              width: "96px",
              height: "96px",
              margin: "0 auto",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(124, 58, 237, 0.16))",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              animation: "levelUpIconPulse 1.8s ease-in-out infinite",
            }}
          >
            🎉
          </div>

          <p
            style={{
              margin: "22px 0 0",
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Congratulations
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "var(--text)",
              fontSize: "32px",
              fontWeight: 900,
            }}
          >
            Level Up!
          </h2>

          <p
            style={{
              margin: "10px 0 0",
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            Your journey continues. You have become stronger!
          </p>

          {/* Level progression */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              marginTop: "28px",
            }}
          >
            <div
              style={{
                minWidth: "82px",
                padding: "14px",
                borderRadius: "18px",
                background: "var(--surface-light)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "var(--text-muted)",
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Previous
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "var(--text-muted)",
                  fontSize: "25px",
                }}
              >
                {previousLevel}
              </strong>
            </div>

            <span
              style={{
                color: "var(--gold)",
                fontSize: "28px",
                fontWeight: 900,
              }}
            >
              →
            </span>

            <div
              style={{
                minWidth: "100px",
                padding: "14px",
                borderRadius: "18px",
                background: "rgba(124, 58, 237, 0.12)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "var(--violet)",
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                New Level
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "var(--violet)",
                  fontSize: "32px",
                }}
              >
                {newLevel}
              </strong>
            </div>
          </div>

          {/* Rewards */}
          <div
            style={{
              marginTop: "28px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "13px",
                fontWeight: 900,
              }}
            >
              🎁 Level Rewards
            </p>

            <div
              style={{
                display: "grid",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              {rewards.map((reward, index) => (
                <div
                  key={`${reward}-${index}`}
                  style={{
                    padding: "13px 15px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "var(--surface-light)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontSize: "13px",
                    fontWeight: 800,
                  }}
                >
                  <span
                    style={{
                      color: "var(--gold)",
                    }}
                  >
                    ✨
                  </span>

                  {reward}
                </div>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <button
            type="button"
            className="ui-button ui-button-primary"
            onClick={handleClose}
            style={{
              width: "100%",
              marginTop: "24px",
            }}
          >
            Continue Your Journey ⚔️
          </button>
        </div>
      </div>
    </div>
  );
}