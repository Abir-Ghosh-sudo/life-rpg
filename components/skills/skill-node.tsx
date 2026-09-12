"use client";

export type SkillStatus =
  | "locked"
  | "available"
  | "unlocked";

type SkillNodeProps = {
  name?: string;
  description?: string;
  icon?: string;
  level?: number;
  status?: SkillStatus;
  cost?: number;
  branch?: "Focus" | "Study" | "Fitness";
  availablePoints?: number;
  onUnlock?: () => void;
};

export function SkillNode({
  name = "Deep Focus",
  description = "Increase your focus efficiency during productivity sessions.",
  icon = "🎯",
  level = 1,
  status = "available",
  cost = 1,
  branch = "Focus",
  availablePoints = 3,
  onUnlock,
}: SkillNodeProps) {
  const branchColors = {
    Focus: "var(--violet)",
    Study: "#3B82F6",
    Fitness: "var(--emerald)",
  };

  const branchColor =
    branchColors[branch];

  const isLocked =
    status === "locked";

  const isUnlocked =
    status === "unlocked";

  const canUnlock =
    status === "available" &&
    availablePoints >= cost;

  const statusText = isUnlocked
    ? "Unlocked"
    : isLocked
    ? "Locked"
    : "Available";

  const statusColor = isUnlocked
    ? "var(--emerald)"
    : isLocked
    ? "var(--text-muted)"
    : branchColor;

  const handleUnlock = () => {
    if (!canUnlock) return;

    onUnlock?.();
  };

  return (
    <article
      className="ui-card"
      style={{
        width: "100%",
        padding: "18px",
        position: "relative",
        overflow: "hidden",
        opacity: isLocked ? 0.65 : 1,
      }}
    >
      {/* Top branch line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: branchColor,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "58px",
            height: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: "16px",
            background: isUnlocked
              ? "rgba(16, 185, 129, 0.12)"
              : `${branchColor}15`,
            border: `1px solid ${
              isUnlocked
                ? "rgba(16, 185, 129, 0.3)"
                : `${branchColor}30`
            }`,
            fontSize: "28px",
            filter: isLocked
              ? "grayscale(1)"
              : "none",
          }}
        >
          {isLocked ? "🔒" : icon}
        </div>

        {/* Status */}
        <span
          style={{
            padding: "6px 9px",
            borderRadius: "999px",
            background: `${statusColor}12`,
            border: `1px solid ${statusColor}25`,
            color: statusColor,
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {isUnlocked && "✓ "}
          {isLocked && "🔒 "}
          {statusText}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          marginTop: "16px",
        }}
      >
        <span
          style={{
            display: "block",
            color: branchColor,
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {branch} • Level {level}
        </span>

        <h3
          style={{
            margin: "7px 0 0",
            color: "var(--text)",
            fontSize: "16px",
            fontWeight: 900,
          }}
        >
          {name}
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "10px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginTop: "20px",
          paddingTop: "14px",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Skill Cost */}
        <div>
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Skill Cost
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: branchColor,
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            ✨ {isUnlocked ? "Unlocked" : cost}
          </strong>
        </div>

        {/* Action */}
        {isUnlocked ? (
          <div
            style={{
              padding: "10px 13px",
              borderRadius: "10px",
              background:
                "rgba(16, 185, 129, 0.1)",
              color: "var(--emerald)",
              fontSize: "9px",
              fontWeight: 900,
            }}
          >
            ✓ Active
          </div>
        ) : (
          <button
            type="button"
            disabled={!canUnlock}
            onClick={handleUnlock}
            style={{
              minHeight: "38px",
              padding: "0 13px",
              border: "none",
              borderRadius: "10px",
              background: canUnlock
                ? branchColor
                : "var(--surface-light)",
              color: canUnlock
                ? "white"
                : "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              cursor: canUnlock
                ? "pointer"
                : "not-allowed",
              opacity: canUnlock ? 1 : 0.7,
            }}
          >
            {isLocked
              ? "🔒 Locked"
              : availablePoints < cost
              ? "Not Enough Points"
              : "✨ Unlock"}
          </button>
        )}
      </div>
    </article>
  );
}