"use client";

import { useEffect, useState } from "react";

type NotificationType =
  | "success"
  | "info"
  | "warning"
  | "achievement"
  | "reward";

type NotificationProps = {
  show?: boolean;
  type?: NotificationType;
  title?: string;
  message?: string;
  icon?: string;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  onClose?: () => void;
  onClick?: () => void;
};

const notificationConfig: Record<
  NotificationType,
  {
    icon: string;
    color: string;
    background: string;
    border: string;
  }
> = {
  success: {
    icon: "✓",
    color: "var(--emerald)",
    background: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.28)",
  },

  info: {
    icon: "ℹ",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
    border: "rgba(124, 58, 237, 0.28)",
  },

  warning: {
    icon: "⚠",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.28)",
  },

  achievement: {
    icon: "🏆",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.28)",
  },

  reward: {
    icon: "🎁",
    color: "var(--emerald)",
    background: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.28)",
  },
};

const positionStyles = {
  "top-right": {
    top: "24px",
    right: "24px",
  },

  "top-left": {
    top: "24px",
    left: "24px",
  },

  "bottom-right": {
    bottom: "24px",
    right: "24px",
  },

  "bottom-left": {
    bottom: "24px",
    left: "24px",
  },
};

export function Notification({
  show = true,
  type = "info",
  title = "New Notification",
  message = "Something new happened in your adventure.",
  icon,
  duration = 5000,
  position = "top-right",
  onClose,
  onClick,
}: NotificationProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (!show) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!visible) {
    return null;
  }

  const config = notificationConfig[type];

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleNotificationClick = () => {
    onClick?.();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        zIndex: 9999,
        width: "min(92vw, 400px)",
        animation: "notificationEnter 0.4s ease-out",
        ...positionStyles[position],
      }}
    >
      <div
        className="ui-card"
        onClick={handleNotificationClick}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "18px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          border: `1px solid ${config.border}`,
          background:
            "linear-gradient(135deg, var(--surface), var(--surface-light))",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.22)",
          cursor: onClick ? "pointer" : "default",
        }}
      >
        {/* Side Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: config.color,
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: "52px",
            height: "52px",
            flexShrink: 0,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: config.background,
            border: `1px solid ${config.border}`,
            fontSize: type === "achievement" || type === "reward"
              ? "25px"
              : "22px",
            color: config.color,
            fontWeight: 900,
          }}
        >
          {icon ?? config.icon}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              color: config.color,
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {type}
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text)",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            {title}
          </strong>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--text-muted)",
              fontSize: "12px",
              lineHeight: 1.55,
            }}
          >
            {message}
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleClose();
          }}
          aria-label="Close notification"
          style={{
            width: "30px",
            height: "30px",
            flexShrink: 0,
            border: "none",
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: "20px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          ×
        </button>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: "3px",
          marginTop: "5px",
          overflow: "hidden",
          borderRadius: "999px",
          background: "var(--surface-light)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: config.color,
            transformOrigin: "left",
            animation: `notificationProgress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}