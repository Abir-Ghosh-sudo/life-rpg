import type { ReactNode } from "react";

type AchievementCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  progress?: number;
  unlocked?: boolean;
  reward?: string;
};

export function AchievementCard({
  title,
  description,
  icon,
  progress,
  unlocked = false,
  reward,
}: AchievementCardProps) {
  return (
    <div
      className="ui-card"
      style={{
        opacity: unlocked ? 1 : 0.75,
        borderColor: unlocked ? "var(--gold)" : "var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            lineHeight: 1,
          }}
        >
          {icon ?? "🏆"}
        </div>

        <span
          style={{
            background: unlocked
              ? "var(--emerald)"
              : "var(--surface-light)",
            color: unlocked ? "#ffffff" : "var(--text-muted)",
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <h3
        style={{
          margin: "16px 0 0",
          fontSize: "18px",
          fontWeight: 800,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "8px 0 0",
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {typeof progress === "number" ? (
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginBottom: "8px",
              color: "var(--text-muted)",
            }}
          >
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div
            style={{
              height: "8px",
              background: "var(--surface-light)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(Math.max(progress, 0), 100)}%`,
                height: "100%",
                background: "var(--indigo)",
                borderRadius: "999px",
              }}
            />
          </div>
        </div>
      ) : null}

      {reward ? (
        <div
          style={{
            marginTop: "16px",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(245, 158, 11, 0.12)",
            color: "var(--gold)",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          🎁 Reward: {reward}
        </div>
      ) : null}
    </div>
  );
}