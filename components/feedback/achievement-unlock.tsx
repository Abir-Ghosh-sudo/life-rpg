"use client";

import { useEffect, useState } from "react";

type AchievementUnlockProps = {
  open?: boolean;
  title?: string;
  description?: string;
  icon?: string;
  xp?: number;
  rarity?: string;
  onClose?: () => void;
};

export function AchievementUnlock({
  open = true,
  title = "Quest Master",
  description = "Complete 10 quests and prove yourself as a true adventurer.",
  icon = "🏆",
  xp = 500,
  rarity = "Rare",
  onClose,
}: AchievementUnlockProps) {
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
      aria-label="Achievement unlocked"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(15, 23, 42, 0.76)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "500px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          background:
            "linear-gradient(135deg, var(--surface), rgba(245, 158, 11, 0.1))",
          boxShadow: "0 30px 80px rgba(245, 158, 11, 0.2)",
          animation: "achievementUnlockEnter 0.45s ease-out",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            top: "-170px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(245, 158, 11, 0.16)",
            filter: "blur(35px)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "36px 28px 28px",
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close achievement"
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

          {/* Achievement label */}
          <p
            style={{
              margin: 0,
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            ✨ Achievement Unlocked
          </p>

          {/* Icon */}
          <div
            style={{
              width: "110px",
              height: "110px",
              margin: "22px auto 0",
              borderRadius: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "55px",
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(124, 58, 237, 0.14))",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              animation:
                "achievementIconFloat 2s ease-in-out infinite",
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h2
            style={{
              margin: "22px 0 0",
              color: "var(--text)",
              fontSize: "30px",
              fontWeight: 900,
            }}
          >
            {title}
          </h2>

          {/* Rarity */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
              padding: "7px 14px",
              borderRadius: "999px",
              background: "rgba(124, 58, 237, 0.12)",
              border: "1px solid rgba(124, 58, 237, 0.22)",
              color: "var(--violet)",
              fontSize: "11px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ◆ {rarity}
          </div>

          {/* Description */}
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "400px",
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>

          {/* Reward */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              borderRadius: "18px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Achievement Reward
            </p>

            <strong
              style={{
                display: "block",
                marginTop: "7px",
                color: "var(--emerald)",
                fontSize: "23px",
                fontWeight: 900,
              }}
            >
              ⚡ +{xp} XP
            </strong>
          </div>

          {/* Button */}
          <button
            type="button"
            className="ui-button ui-button-primary"
            onClick={handleClose}
            style={{
              width: "100%",
              marginTop: "22px",
            }}
          >
            Claim Achievement 🏆
          </button>

          <p
            style={{
              margin: "14px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Your achievement has been added to your collection.
          </p>
        </div>
      </div>
    </div>
  );
}