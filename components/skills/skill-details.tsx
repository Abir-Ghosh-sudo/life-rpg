"use client";

import type { SkillStatus } from "./skill-node";

type BranchName =
  | "Focus"
  | "Study"
  | "Fitness";

type SkillDetailsProps = {
  name?: string;
  description?: string;
  icon?: string;
  branch?: BranchName;
  level?: number;
  status?: SkillStatus;
  cost?: number;
  availablePoints?: number;
  effect?: string;
  requirement?: string;
  onClose?: () => void;
};

export function SkillDetails({
  name = "Deep Focus",
  description = "Increase your focus efficiency and earn better rewards during productivity sessions.",
  icon = "🎯",
  branch = "Focus",
  level = 1,
  status = "available",
  cost = 2,
  availablePoints = 3,
  effect = "+15% Focus XP",
  requirement = "Complete 3 Focus Sessions",
  onClose,
}: SkillDetailsProps) {
  const branchColors: Record<
    BranchName,
    string
  > = {
    Focus: "var(--violet)",
    Study: "#3B82F6",
    Fitness: "var(--emerald)",
  };

  const branchColor =
    branchColors[branch];

  const isUnlocked =
    status === "unlocked";

  const isLocked =
    status === "locked";

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

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          top: "-100px",
          right: "-80px",
          background: `${branchColor}10`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "68px",
              height: "68px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "18px",
              background: `${branchColor}15`,
              border: `1px solid ${branchColor}30`,
              fontSize: "32px",
              filter: isLocked
                ? "grayscale(1)"
                : "none",
            }}
          >
            {isLocked ? "🔒" : icon}
          </div>

          <div>
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
              {branch} Skill • Level {level}
            </span>

            <h2
              style={{
                margin: "6px 0 0",
                color: "var(--text)",
                fontSize: "22px",
                fontWeight: 900,
              }}
            >
              {name}
            </h2>

            <span
              style={{
                display: "inline-block",
                marginTop: "7px",
                padding: "5px 9px",
                borderRadius: "999px",
                background: `${statusColor}12`,
                border: `1px solid ${statusColor}25`,
                color: statusColor,
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {isUnlocked && "✓ "}
              {isLocked && "🔒 "}
              {statusText}
            </span>
          </div>
        </div>

        {/* Close */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface-light)",
              color: "var(--text)",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          position: "relative",
          margin: "22px 0 0",
          color: "var(--text-muted)",
          fontSize: "11px",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>

      {/* Details Grid */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginTop: "22px",
        }}
      >
        {/* Effect */}
        <div
          style={{
            padding: "14px",
            borderRadius: "13px",
            background: `${branchColor}10`,
            border: `1px solid ${branchColor}20`,
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Skill Effect
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: branchColor,
              fontSize: "13px",
              fontWeight: 900,
            }}
          >
            ⚡ {effect}
          </strong>
        </div>

        {/* Cost */}
        <div
          style={{
            padding: "14px",
            borderRadius: "13px",
            background:
              "rgba(124, 58, 237, 0.08)",
            border:
              "1px solid rgba(124, 58, 237, 0.16)",
          }}
        >
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
              marginTop: "7px",
              color: "var(--violet)",
              fontSize: "13px",
              fontWeight: 900,
            }}
          >
            ✨ {isUnlocked ? 0 : cost} Points
          </strong>
        </div>

        {/* Requirement */}
        <div
          style={{
            padding: "14px",
            borderRadius: "13px",
            background:
              "var(--surface-light)",
            border:
              "1px solid var(--border)",
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Requirement
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--text)",
              fontSize: "10px",
              fontWeight: 800,
              lineHeight: 1.5,
            }}
          >
            🔓 {requirement}
          </strong>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
          marginTop: "22px",
          paddingTop: "17px",
          borderTop:
            "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
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
            Available Skill Points
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--violet)",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            ✨ {availablePoints}
          </strong>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRadius: "11px",
            background: isUnlocked
              ? "rgba(16, 185, 129, 0.1)"
              : canUnlock
              ? `${branchColor}12`
              : "var(--surface-light)",
            color: isUnlocked
              ? "var(--emerald)"
              : canUnlock
              ? branchColor
              : "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {isUnlocked
            ? "✓ Skill Active"
            : isLocked
            ? "🔒 Requirement Locked"
            : canUnlock
            ? "✨ Ready to Unlock"
            : "⚠️ Not Enough Points"}
        </div>
      </div>
    </section>
  );
}