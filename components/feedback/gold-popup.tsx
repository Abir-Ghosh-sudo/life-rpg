"use client";

import { useEffect, useState } from "react";

type GoldPopupProps = {
  gold?: number;
  label?: string;
  duration?: number;
  show?: boolean;
  onComplete?: () => void;
};

export function GoldPopup({
  gold = 50,
  label = "Gold Earned",
  duration = 2500,
  show = true,
  onComplete,
}: GoldPopupProps) {
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
        top: "92px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(90vw, 360px)",
        animation: "goldPopupEnter 0.35s ease-out",
      }}
    >
      <div
        className="ui-card"
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          background:
            "linear-gradient(135deg, var(--surface), rgba(245, 158, 11, 0.1))",
          boxShadow: "0 20px 50px rgba(245, 158, 11, 0.15)",
        }}
      >
        {/* Gold Icon */}
        <div
          style={{
            width: "54px",
            height: "54px",
            flexShrink: 0,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "27px",
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          🪙
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--gold)",
              fontSize: "25px",
              fontWeight: 900,
            }}
          >
            +{gold} Gold
          </strong>
        </div>

        {/* Success */}
        <div
          style={{
            color: "var(--gold)",
            fontSize: "20px",
            fontWeight: 900,
          }}
        >
          ✨
        </div>
      </div>
    </div>
  );
}