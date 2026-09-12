"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  show?: boolean;
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
};

const toastConfig: Record<
  ToastType,
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
    background: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.28)",
  },

  error: {
    icon: "!",
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.1)",
    border: "rgba(244, 63, 94, 0.28)",
  },

  warning: {
    icon: "⚠",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.28)",
  },

  info: {
    icon: "i",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.1)",
    border: "rgba(124, 58, 237, 0.28)",
  },
};

export function Toast({
  show = true,
  type = "success",
  title = "Success!",
  message = "Your action was completed successfully.",
  duration = 3000,
  onClose,
}: ToastProps) {
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

  const config = toastConfig[type];

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: 9999,
        width: "min(90vw, 380px)",
        animation: "toastEnter 0.35s ease-out",
      }}
    >
      <div
        className="ui-card"
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          border: `1px solid ${config.border}`,
          background:
            "linear-gradient(135deg, var(--surface), var(--surface-light))",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "46px",
            height: "46px",
            flexShrink: 0,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: config.background,
            color: config.color,
            fontSize: "22px",
            fontWeight: 900,
            border: `1px solid ${config.border}`,
          }}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <strong
            style={{
              display: "block",
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
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
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

      {/* Duration progress */}
      <div
        style={{
          height: "3px",
          marginTop: "4px",
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
            animation: `toastProgress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}