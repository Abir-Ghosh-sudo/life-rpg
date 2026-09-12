"use client";

type TimerControlsProps = {
  isRunning?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onSkip?: () => void;
};

export function TimerControls({
  isRunning = false,
  isCompleted = false,
  disabled = false,
  onStart,
  onPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  const handlePrimaryAction = () => {
    if (disabled || isCompleted) return;

    if (isRunning) {
      onPause?.();
    } else {
      onStart?.();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Main Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          aria-label="Reset timer"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            background: "var(--surface-light)",
            color: "var(--text)",
            fontSize: "21px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          ↻
        </button>

        {/* Start / Pause */}
        <button
          type="button"
          onClick={handlePrimaryAction}
          disabled={disabled || isCompleted}
          className="ui-button ui-button-primary"
          style={{
            minWidth: "180px",
            height: "52px",
            fontSize: "14px",
            fontWeight: 900,
            opacity: disabled || isCompleted ? 0.6 : 1,
            cursor:
              disabled || isCompleted
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isCompleted
            ? "✓ Session Complete"
            : isRunning
              ? "⏸ Pause Focus"
              : "▶ Start Focus"}
        </button>

        {/* Skip */}
        <button
          type="button"
          onClick={onSkip}
          disabled={disabled || isCompleted}
          aria-label="Skip focus session"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            background: "var(--surface-light)",
            color: "var(--text-muted)",
            fontSize: "18px",
            cursor:
              disabled || isCompleted
                ? "not-allowed"
                : "pointer",
            opacity:
              disabled || isCompleted ? 0.5 : 1,
          }}
        >
          ⏭
        </button>
      </div>

      {/* Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: isCompleted
              ? "rgba(16, 185, 129, 0.1)"
              : isRunning
                ? "rgba(124, 58, 237, 0.1)"
                : "var(--surface-light)",
            border: isCompleted
              ? "1px solid rgba(16, 185, 129, 0.22)"
              : isRunning
                ? "1px solid rgba(124, 58, 237, 0.22)"
                : "1px solid var(--border)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isCompleted
                ? "var(--emerald)"
                : isRunning
                  ? "var(--violet)"
                  : "var(--text-muted)",
            }}
          />

          <span
            style={{
              color: isCompleted
                ? "var(--emerald)"
                : isRunning
                  ? "var(--violet)"
                  : "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            {isCompleted
              ? "Focus session completed"
              : isRunning
                ? "Focus mode is active"
                : "Timer is ready"}
          </span>
        </div>
      </div>
    </div>
  );
}