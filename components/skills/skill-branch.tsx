"use client";

import { SkillNode, type SkillStatus } from "./skill-node";

type BranchName =
  | "Focus"
  | "Study"
  | "Fitness";

type BranchSkill = {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  status: SkillStatus;
  cost: number;
};

type SkillBranchProps = {
  title?: BranchName;
  description?: string;
  icon?: string;
  skills?: BranchSkill[];
  availablePoints?: number;
  onUnlockSkill?: (skillId: string) => void;
};

const defaultSkills: BranchSkill[] = [
  {
    id: "focus-1",
    name: "Deep Focus",
    description:
      "Increase your focus efficiency during productivity sessions.",
    icon: "🎯",
    level: 1,
    status: "unlocked",
    cost: 0,
  },
  {
    id: "focus-2",
    name: "Flow State",
    description:
      "Unlock longer and more rewarding focus sessions.",
    icon: "🧠",
    level: 2,
    status: "available",
    cost: 2,
  },
  {
    id: "focus-3",
    name: "Zen Master",
    description:
      "Master your concentration and earn powerful focus bonuses.",
    icon: "🧘",
    level: 3,
    status: "locked",
    cost: 4,
  },
];

export function SkillBranch({
  title = "Focus",
  description = "Improve concentration and productivity abilities.",
  icon = "🎯",
  skills = defaultSkills,
  availablePoints = 3,
  onUnlockSkill,
}: SkillBranchProps) {
  const branchColors: Record<
    BranchName,
    string
  > = {
    Focus: "var(--violet)",
    Study: "#3B82F6",
    Fitness: "var(--emerald)",
  };

  const branchColor =
    branchColors[title];

  const unlockedCount = skills.filter(
    (skill) =>
      skill.status === "unlocked"
  ).length;

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          top: "-80px",
          right: "-60px",
          background: `${branchColor}10`,
          pointerEvents: "none",
        }}
      />

      {/* Branch Header */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "13px",
          }}
        >
          {/* Branch Icon */}
          <div
            style={{
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
              background: `${branchColor}15`,
              border: `1px solid ${branchColor}30`,
              fontSize: "25px",
            }}
          >
            {icon}
          </div>

          {/* Branch Info */}
          <div>
            <span
              style={{
                display: "block",
                color: branchColor,
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.09em",
              }}
            >
              Skill Branch
            </span>

            <h2
              style={{
                margin: "5px 0 0",
                color: "var(--text)",
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "var(--text-muted)",
                fontSize: "10px",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div
          style={{
            padding: "10px 13px",
            borderRadius: "12px",
            background: `${branchColor}10`,
            border: `1px solid ${branchColor}20`,
            textAlign: "center",
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
            Unlocked
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: branchColor,
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            {unlockedCount}/{skills.length}
          </strong>
        </div>
      </div>

      {/* Progress Line */}
      <div
        style={{
          position: "relative",
          height: "4px",
          width: "100%",
          marginBottom: "22px",
          borderRadius: "999px",
          background: "var(--surface-light)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${
              skills.length === 0
                ? 0
                : (unlockedCount /
                    skills.length) *
                  100
            }%`,
            height: "100%",
            borderRadius: "inherit",
            background: branchColor,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Skill Nodes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "16px",
        }}
      >
        {skills.map((skill) => (
          <SkillNode
            key={skill.id}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            level={skill.level}
            status={skill.status}
            cost={skill.cost}
            branch={title}
            availablePoints={availablePoints}
            onUnlock={() =>
              onUnlockSkill?.(skill.id)
            }
          />
        ))}
      </div>
    </section>
  );
}