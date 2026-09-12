"use client";

import { useState } from "react";

type QuestCardProps = {
  title?: string;
  description?: string;
  category?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | "Legendary";
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  xp?: number;
  gold?: number;
  current?: number;
  total?: number;
  completed?: boolean;
  onComplete?: () => void;
};

export function QuestCard({
  title = "Complete Your Assignment",
  description = "Finish your important task and earn rewards.",
  category = "Study",
  difficulty = "Medium",
  rarity = "Common",
  xp = 100,
  gold = 25,
  current = 0,
  total = 1,
  completed = false,
  onComplete,
}: QuestCardProps) {
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

  const difficultyColor = {
    Easy: "var(--emerald)",
    Medium: "var(--gold)",
    Hard: "var(--danger)",
    Legendary: "var(--violet)",
  };

  const rarityColor = {
    Common: "var(--text-muted)",
    Rare: "#3B82F6",
    Epic: "var(--violet)",
    Legendary: "var(--gold)",
  };

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
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          {/* Category */}
          <span
            style={{
              display: "inline-block",
              padding: "5px 9px",
              borderRadius: "999px",
              background:
                "rgba(124, 58, 237, 0.1)",
              color: "var(--violet)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>

          {/* Title */}
          <h3
            style={{
              margin: "11px 0 0",
              color: "var(--text)",
              fontSize: "16px",
              fontWeight: 900,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              margin: "7px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>

        {/* Status */}
        <div
          style={{
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            flexShrink: 0,
            background: isCompleted
              ? "rgba(16, 185, 129, 0.12)"
              : "rgba(124, 58, 237, 0.1)",
            color: isCompleted
              ? "var(--emerald)"
              : "var(--violet)",
            fontSize: "17px",
            fontWeight: 900,
          }}
        >
          {isCompleted ? "✓" : "⚔️"}
        </div>
      </div>

      {/* Difficulty + Rarity */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            border: `1px solid ${difficultyColor[difficulty]}`,
            color: difficultyColor[difficulty],
            fontSize: "9px",
            fontWeight: 900,
          }}
        >
          🔥 {difficulty}
        </span>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: "999px",
            border: `1px solid ${rarityColor[rarity]}`,
            color: rarityColor[rarity],
            fontSize: "9px",
            fontWeight: 900,
          }}
        >
          ✨ {rarity}
        </span>
      </div>

      {/* Progress */}
      <div>
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
            {safeCurrent}/{safeTotal} • {percentage}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "9px",
            overflow: "hidden",
            borderRadius: "999px",
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
        }}
      >
        {/* XP */}
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background:
              "rgba(124, 58, 237, 0.08)",
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
            }}
          >
            XP REWARD
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
            }}
          >
            GOLD REWARD
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
          minHeight: "44px",
          border: "none",
          borderRadius: "12px",
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
          ? "✓ Quest Completed"
          : "⚔️ Complete Quest"}
      </button>
    </article>
  );
}