"use client";

import { useEffect, useState } from "react";

type UnlockAnimationProps = {
  show?: boolean;
  title?: string;
  description?: string;
  icon?: string;
  duration?: number;
  onComplete?: () => void;
};

export function UnlockAnimation({
  show = true,
  title = "New Content Unlocked!",
  description = "You have unlocked something new on your adventure.",
  icon = "🔓",
  duration = 3500,
  onComplete,
}: UnlockAnimationProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (!show) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [show, duration, onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        pointerEvents: "none",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "480px",
          position: "relative",
          overflow: "hidden",
          padding: "34px 28px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, var(--surface), rgba(16, 185, 129, 0.1))",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          boxShadow: "0 25px 80px rgba(16, 185, 129, 0.2)",
          animation: "unlockAnimationEnter 0.5s ease-out",
        }}
      >
        {/* Background Glow */}
        <div
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            top: "-170px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(16, 185, 129, 0.16)",
            filter: "blur(35px)",
          }}
        />

        <div style={{ position: "relative" }}>
          {/* Unlock Icon */}
          <div
            style={{
              width: "110px",
              height: "110px",
              margin: "0 auto",
              borderRadius: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(124, 58, 237, 0.14))",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              boxShadow: "0 15px 50px rgba(16, 185, 129, 0.2)",
              animation: "unlockIconAnimation 1.6s ease-in-out infinite",
            }}
          >
            {icon}
          </div>

          {/* Label */}
          <p
            style={{
              margin: "22px 0 0",
              color: "var(--emerald)",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ✨ Unlock Successful
          </p>

          {/* Title */}
          <h2
            style={{
              margin: "8px 0 0",
              color: "var(--text)",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: "390px",
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>

          {/* Success Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "24px",
              padding: "10px 16px",
              borderRadius: "999px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              color: "var(--emerald)",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            ✓ Added to your adventure
          </div>
        </div>
      </div>
    </div>
  );
}