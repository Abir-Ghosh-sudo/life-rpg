"use client";

import { useState } from "react";
import { SkillNode } from "./skill-node";

export type SkillStatus =
  | "locked"
  | "available"
  | "unlocked";

export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  status: SkillStatus;
  cost: number;
  branch: "Focus" | "Study" | "Fitness";
};

type SkillTreeProps = {
  skills?: Skill[];
  availablePoints?: number;
  onUnlockSkill?: (skillId: string) => void;
};

const defaultSkills: Skill[] = [
  {
    id: "focus-1",
    name: "Deep Focus",
    description:
      "Increase your focus efficiency during productivity sessions.",
    icon: "🎯",
    level: 1,
    status: "unlocked",
    cost: 0,
    branch: "Focus",
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
    branch: "Focus",
  },
  {
    id: "study-1",
    name: "Quick Learner",
    description:
      "Earn additional XP from completing study quests.",
    icon: "📚",
    level: 1,
    status: "available",
    cost: 1,
    branch: "Study",
  },
  {
    id: "study-2",
    name: "Knowledge Master",
    description:
      "Increase rewards for difficult learning challenges.",
    icon: "🎓",
    level: 2,
    status: "locked",
    cost: 3,
    branch: "Study",
  },
  {
    id: "fitness-1",
    name: "Iron Will",
    description:
      "Improve consistency bonuses for fitness quests.",
    icon: "💪",
    level: 1,
    status: "available",
    cost: 1,
    branch: "Fitness",
  },
  {
    id: "fitness-2",
    name: "Elite Warrior",
    description:
      "Unlock powerful rewards from high-level challenges.",
    icon: "⚔️",
    level: 2,
    status: "locked",
    cost: 3,
    branch: "Fitness",
  },
];

export function SkillTree({
  skills = defaultSkills,
  availablePoints = 3,
  onUnlockSkill,
}: SkillTreeProps) {
  const [selectedBranch, setSelectedBranch] =
    useState<
      "All" | "Focus" | "Study" | "Fitness"
    >("All");

  const filteredSkills =
    selectedBranch === "All"
      ? skills
      : skills.filter(
          (skill) =>
            skill.branch === selectedBranch
        );

  return (
    <section
      style={{
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        className="ui-card"
        style={{
          padding: "20px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Character Progression
          </p>

          <h2
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "21px",
              fontWeight: 900,
            }}
          >
            Skill Tree
          </h2>
        </div>

        <div
          style={{
            padding: "11px 15px",
            borderRadius: "12px",
            background:
              "rgba(124, 58, 237, 0.1)",
            border:
              "1px solid rgba(124, 58, 237, 0.2)",
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
            Skill Points
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "4px",
              color: "var(--violet)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            ✨ {availablePoints}
          </strong>
        </div>
      </div>

      {/* Branch Filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
          marginBottom: "20px",
        }}
      >
        {[
          "All",
          "Focus",
          "Study",
          "Fitness",
        ].map((branch) => {
          const active =
            selectedBranch === branch;

          return (
            <button
              key={branch}
              type="button"
              onClick={() =>
                setSelectedBranch(
                  branch as
                    | "All"
                    | "Focus"
                    | "Study"
                    | "Fitness"
                )
              }
              style={{
                minHeight: "38px",
                padding: "0 15px",
                borderRadius: "10px",
                border: active
                  ? "1px solid var(--violet)"
                  : "1px solid var(--border)",
                background: active
                  ? "rgba(124, 58, 237, 0.12)"
                  : "var(--surface-light)",
                color: active
                  ? "var(--violet)"
                  : "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {branch === "All" && "🌟 "}
              {branch === "Focus" && "🎯 "}
              {branch === "Study" && "📚 "}
              {branch === "Fitness" && "💪 "}
              {branch}
            </button>
          );
        })}
      </div>

      {/* Skills */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredSkills.map((skill) => (
          <SkillNode
            key={skill.id}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            level={skill.level}
            status={skill.status}
            cost={skill.cost}
            branch={skill.branch}
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