"use client";

import { useState } from "react";

type DailyQuestCardProps = {
  title?: string;
  description?: string;
  category?: string;
  xp?: number;
  gold?: number;
  current?: number;
  total?: number;
  completed?: boolean;
  onComplete?: () => void;
};

export function DailyQuestCard({
  title = "Complete Your Daily Mission",
  description = "Finish your important task and earn rewards.",
  category = "Daily Quest",
  xp = 100,
  gold = 25,
  current = 0,
  total = 1,
  completed = false,
  onComplete,
}: DailyQuestCardProps) {
  const [isCompleted, setIsCompleted] =
    useState(completed);

  const safeTotal = total > 0 ? total : 1;

  const safeCurrent = isCompleted
    ? safeTotal
    : Math.min(
        Math.max(current, 0),
        safeTotal
      );

  const percentage = Math.round(
    (safeCurrent / safeTotal) * 100
  );

  const handleComplete = () => {
    if (isCompleted) return;

    setIsCompleted(true);

    onComplete?.();
  };

  return (
    <article
      className="ui-card"
      style={{
        width: "100%",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: isCompleted
            ? "var(--emerald)"
            : "var(--violet)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px",
              background: isCompleted
                ? "rgba(16, 185, 129, 0.12)"
                : "rgba(124, 58, 237, 0.12)",
              fontSize: "22px",
              flexShrink: 0,
            }}
          >
            {isCompleted ? "🏆" : "📅"}
          </div>

          <div>
            <span
              style={{
                display: "inline-block",
                marginBottom: "5px",
                color: isCompleted
                  ? "var(--emerald)"
                  : "var(--violet)",
                fontSize: "9px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {isCompleted
                ? "Daily Quest Complete"
                : category}
            </span>

            <h3
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "15px",
                fontWeight: 900,
              }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Status */}
        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            background: isCompleted
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(245, 158, 11, 0.1)",
            color: isCompleted
              ? "var(--emerald)"
              : "var(--gold)",
            fontSize: "9px",
            fontWeight: 900,
            whiteSpace: "nowrap",
          }}
        >
          {isCompleted
            ? "✓ Completed"
            : "Today"}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          margin: "14px 0 0",
          color: "var(--text-muted)",
          fontSize: "11px",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* Progress */}
      <div
        style={{
          marginTop: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            Progress
          </span>

          <span
            style={{
              color: isCompleted
                ? "var(--emerald)"
                : "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
            }}
          >
            {safeCurrent}/{safeTotal}
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "9px",
            borderRadius: "999px",
            overflow: "hidden",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: "999px",
              background: isCompleted
                ? "var(--emerald)"
                : "var(--violet)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Rewards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "10px",
          marginTop: "18px",
        }}
      >
        {/* XP */}
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background:
              "rgba(124, 58, 237, 0.08)",
            border:
              "1px solid rgba(124, 58, 237, 0.14)",
          }}
        >
          <span
            style={{
              fontSize: "16px",
            }}
          >
            ✨
          </span>

          <span
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            XP Reward
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--violet)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            +{xp} XP
          </strong>
        </div>

        {/* Gold */}
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background:
              "rgba(245, 158, 11, 0.08)",
            border:
              "1px solid rgba(245, 158, 11, 0.14)",
          }}
        >
          <span
            style={{
              fontSize: "16px",
            }}
          >
            🪙
          </span>

          <span
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Gold Reward
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--gold)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            +{gold} Gold
          </strong>
        </div>
      </div>

      {/* Complete Button */}
      <button
        type="button"
        disabled={isCompleted}
        onClick={handleComplete}
        style={{
          width: "100%",
          minHeight: "46px",
          marginTop: "18px",
          border: "none",
          borderRadius: "13px",
          background: isCompleted
            ? "var(--emerald)"
            : "var(--violet)",
          color: "white",
          fontSize: "11px",
          fontWeight: 900,
          cursor: isCompleted
            ? "not-allowed"
            : "pointer",
          opacity: isCompleted ? 0.85 : 1,
        }}
      >
        {isCompleted
          ? "✓ Daily Quest Completed"
          : "⚔️ Complete Daily Quest"}
      </button>
    </article>
  );
}