"use client";

import { useEffect, useState } from "react";

type FocusTimerProps = {
  initialMinutes?: number;
  title?: string;
  onComplete?: () => void;
};

export function FocusTimer({
  initialMinutes = 25,
  title = "Focus Session",
  onComplete,
}: FocusTimerProps) {
  const initialSeconds = initialMinutes * 60;

  const [secondsLeft, setSecondsLeft] =
    useState(initialSeconds);

  const [isRunning, setIsRunning] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(timer);

          setIsRunning(false);
          setCompleted(true);
          onComplete?.();

          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, secondsLeft, onComplete]);

  const minutes = Math.floor(secondsLeft / 60);

  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  const progress =
    ((initialSeconds - secondsLeft) /
      initialSeconds) *
    100;

  const handleStartPause = () => {
    if (secondsLeft === 0) return;

    setIsRunning((current) => !current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
    setCompleted(false);
  };

  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "28px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Deep Focus Mode
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            background: "rgba(124, 58, 237, 0.12)",
            border:
              "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          🎯
        </div>
      </div>

      {/* Timer Display */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "220px",
            height: "220px",
            margin: "0 auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "conic-gradient(var(--violet) 0deg, var(--violet) " +
              `${progress * 3.6}deg, ` +
              "var(--surface-light) " +
              `${progress * 3.6}deg)`,
          }}
        >
          {/* Inner Circle */}
          <div
            style={{
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                color: "var(--text)",
                fontSize: "42px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              {formattedTime}
            </span>

            <span
              style={{
                marginTop: "6px",
                color: isRunning
                  ? "var(--emerald)"
                  : "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {completed
                ? "Session Complete!"
                : isRunning
                  ? "Focusing..."
                  : "Ready to Focus"}
            </span>
          </div>
        </div>

        {/* Progress */}
        <p
          style={{
            margin: "18px 0 0",
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginTop: "24px",
        }}
      >
        <button
          type="button"
          className="ui-button ui-button-primary"
          onClick={handleStartPause}
          disabled={secondsLeft === 0}
          style={{
            minWidth: "150px",
            opacity: secondsLeft === 0 ? 0.6 : 1,
            cursor:
              secondsLeft === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isRunning ? "⏸ Pause" : "▶ Start Focus"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface-light)",
            color: "var(--text)",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ↻ Reset
        </button>
      </div>

      {/* Completion Message */}
      {completed && (
        <div
          style={{
            marginTop: "22px",
            padding: "14px",
            borderRadius: "14px",
            textAlign: "center",
            background: "rgba(16, 185, 129, 0.1)",
            border:
              "1px solid rgba(16, 185, 129, 0.22)",
            color: "var(--emerald)",
            fontSize: "13px",
            fontWeight: 800,
          }}
        >
          🎉 Great job! Your focus session is complete.
        </div>
      )}
    </section>
  );
}