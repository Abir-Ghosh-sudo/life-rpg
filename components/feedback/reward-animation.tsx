"use client";

import { useEffect, useState } from "react";

type Reward = {
  label: string;
  value: string | number;
  icon?: string;
};

type RewardAnimationProps = {
  show?: boolean;
  title?: string;
  rewards?: Reward[];
  duration?: number;
  onComplete?: () => void;
};

export function RewardAnimation({
  show = true,
  title = "Rewards Earned!",
  rewards = [
    {
      label: "Experience",
      value: "+250 XP",
      icon: "⚡",
    },
    {
      label: "Gold",
      value: "+100 Gold",
      icon: "🪙",
    },
    {
      label: "Energy",
      value: "+20 Energy",
      icon: "⚡",
    },
  ],
  duration = 4000,
  onComplete,
}: RewardAnimationProps) {
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
        style={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          animation: "rewardAnimationEnter 0.5s ease-out",
        }}
      >
        {/* Main reward icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            margin: "0 auto",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "52px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(124, 58, 237, 0.2))",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            boxShadow: "0 20px 60px rgba(245, 158, 11, 0.25)",
            animation: "rewardIconPulse 1.5s ease-in-out infinite",
          }}
        >
          🎁
        </div>

        {/* Title */}
        <h2
          style={{
            margin: "20px 0 0",
            color: "var(--text)",
            fontSize: "30px",
            fontWeight: 900,
            textShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Your adventure has rewarded you!
        </p>

        {/* Rewards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "14px",
            marginTop: "26px",
          }}
        >
          {rewards.map((reward, index) => (
            <div
              key={`${reward.label}-${index}`}
              className="ui-card"
              style={{
                padding: "18px 14px",
                animation: `rewardCardEnter 0.45s ease-out ${
                  index * 0.12
                }s both`,
                background:
                  "linear-gradient(135deg, var(--surface), rgba(124, 58, 237, 0.1))",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                }}
              >
                {reward.icon ?? "🎁"}
              </div>

              <p
                style={{
                  margin: "10px 0 0",
                  color: "var(--text-muted)",
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {reward.label}
              </p>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "var(--gold)",
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                {reward.value}
              </strong>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p
          style={{
            margin: "20px 0 0",
            color: "var(--emerald)",
            fontSize: "13px",
            fontWeight: 800,
            animation: "rewardTextPulse 1.5s ease-in-out infinite",
          }}
        >
          ✨ Rewards added successfully!
        </p>
      </div>
    </div>
  );
}