"use client";

import { useEffect, useState } from "react";

type XpPopupProps = {
  xp?: number;
  label?: string;
  duration?: number;
  show?: boolean;
  onComplete?: () => void;
};

export function XpPopup({
  xp = 100,
  label = "XP Gained",
  duration = 2500,
  show = true,
  onComplete,
}: XpPopupProps) {
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
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(90vw, 360px)",
        animation: "xpPopupEnter 0.35s ease-out",
      }}
    >
      <div
        className="ui-card"
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          border: "1px solid rgba(79, 70, 229, 0.28)",
          background:
            "linear-gradient(135deg, var(--surface), rgba(79, 70, 229, 0.12))",
          boxShadow: "0 20px 50px rgba(79, 70, 229, 0.18)",
        }}
      >
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
            background: "rgba(79, 70, 229, 0.14)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
          }}
        >
          ⚡
        </div>

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
              color: "var(--indigo)",
              fontSize: "25px",
              fontWeight: 900,
            }}
          >
            +{xp} XP
          </strong>
        </div>

        <div
          style={{
            color: "var(--emerald)",
            fontSize: "18px",
            fontWeight: 900,
          }}
        >
          ✓
        </div>
      </div>
    </div>
  );
}