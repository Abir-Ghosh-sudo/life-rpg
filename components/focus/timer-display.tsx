"use client";

type TimerDisplayProps = {
  secondsLeft?: number;
  totalSeconds?: number;
  label?: string;
  isRunning?: boolean;
  completed?: boolean;
  size?: number;
};

export function TimerDisplay({
  secondsLeft = 25 * 60,
  totalSeconds = 25 * 60,
  label = "Focus Time",
  isRunning = false,
  completed = false,
  size = 220,
}: TimerDisplayProps) {
  const safeSeconds = Math.max(0, secondsLeft);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  const progress =
    totalSeconds > 0
      ? ((totalSeconds - safeSeconds) / totalSeconds) * 100
      : 0;

  const progressDegrees = Math.min(
    360,
    Math.max(0, progress * 3.6)
  );

  const innerSize = size - 28;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Label */}
      <p
        style={{
          margin: "0 0 16px",
          color: "var(--text-muted)",
          fontSize: "11px",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </p>

      {/* Circular Timer */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: "90vw",
          maxHeight: "90vw",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `conic-gradient(
            var(--violet) 0deg,
            var(--violet) ${progressDegrees}deg,
            var(--surface-light) ${progressDegrees}deg,
            var(--surface-light) 360deg
          )`,
          boxShadow: isRunning
            ? "0 0 45px rgba(124, 58, 237, 0.22)"
            : "none",
          transition: "background 0.3s ease",
        }}
      >
        {/* Inner Circle */}
        <div
          style={{
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Timer */}
          <span
            style={{
              color: completed
                ? "var(--emerald)"
                : "var(--text)",
              fontSize: "clamp(32px, 7vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formattedTime}
          </span>

          {/* Status */}
          <span
            style={{
              marginTop: "10px",
              color: completed
                ? "var(--emerald)"
                : isRunning
                  ? "var(--violet)"
                  : "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {completed
              ? "✓ Complete"
              : isRunning
                ? "● Focusing"
                : "Ready"}
          </span>
        </div>
      </div>

      {/* Progress Information */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "18px",
          padding: "9px 14px",
          borderRadius: "999px",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            color: "var(--violet)",
            fontSize: "13px",
            fontWeight: 900,
          }}
        >
          {Math.round(progress)}%
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          session complete
        </span>
      </div>
    </div>
  );
}