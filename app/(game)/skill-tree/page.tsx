"use client";

import { useState } from "react";

const initialTrees = [
  {
    branch: "Focus Mastery",
    icon: "🧘",
    color: "var(--violet)",
    skills: [
      { id: "f1", name: "Deep Focus", icon: "🕯️", desc: "+15% XP earned from all focus sessions.", unlocked: true, cost: 1, req: "Base Skill" },
      { id: "f2", name: "Time Mastery", icon: "⏳", desc: "Reduces focus cooldown and extends streak buffer.", unlocked: false, cost: 1, req: "Requires Level 5" },
      { id: "f3", name: "Flow State", icon: "⚡", desc: "Consecutive focus sprints yield 2x Gold rewards.", unlocked: false, cost: 2, req: "Requires Time Mastery" },
    ],
  },
  {
    branch: "Iron Discipline",
    icon: "🛡️",
    color: "var(--gold)",
    skills: [
      { id: "d1", name: "Streak Keeper", icon: "🔥", desc: "Gain 10 bonus Gold for maintaining streaks > 5 days.", unlocked: true, cost: 1, req: "Base Skill" },
      { id: "d2", name: "Willpower Shield", icon: "🛡️", desc: "Auto-protects streak against one missed day every 2 weeks.", unlocked: false, cost: 1, req: "Requires 7-day streak" },
      { id: "d3", name: "Quest Champion", icon: "👑", desc: "+25% bonus damage dealt to Daily Boss on quest completion.", unlocked: false, cost: 2, req: "Complete 50 quests" },
    ],
  },
  {
    branch: "Vitality & Mind",
    icon: "🌱",
    color: "var(--emerald)",
    skills: [
      { id: "v1", name: "Energize", icon: "🍎", desc: "Health & workout quests grant +20 instant HP regeneration.", unlocked: true, cost: 1, req: "Base Skill" },
      { id: "v2", name: "Sleep Ritual", icon: "🌙", desc: "Completing evening wind-down quest grants 50 rested XP.", unlocked: false, cost: 1, req: "Requires Level 6" },
      { id: "v3", name: "Zen Clarity", icon: "🌊", desc: "Max energy capacity increased by 30 permanent points.", unlocked: false, cost: 2, req: "Requires Sleep Ritual" },
    ],
  },
];

export default function SkillTreePage() {
  const [skillPoints, setSkillPoints] = useState(2);
  const [trees, setTrees] = useState(initialTrees);

  const handleUnlock = (branchIdx: number, skillId: string, cost: number) => {
    if (skillPoints >= cost) {
      setSkillPoints((prev) => prev - cost);
      setTrees((prev) =>
        prev.map((branch, idx) => {
          if (idx !== branchIdx) return branch;
          return {
            ...branch,
            skills: branch.skills.map((s) => (s.id === skillId ? { ...s, unlocked: true } : s)),
          };
        })
      );
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "36px" }}>
        <div>
          <div className="badge badge-violet" style={{ marginBottom: "8px" }}>
            🌟 Ascension Talents
          </div>
          <h1 className="page-title">Talent Tree</h1>
          <p className="page-subtitle">
            Spend earned skill points to unlock passive perks, combat bonuses, and lifestyle mastery.
          </p>
        </div>

        {/* Skill Points Banner */}
        <div className="stat-card" style={{ padding: "14px 24px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
          <span style={{ fontSize: "28px" }}>💎</span>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Available Points</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--violet-light)" }}>{skillPoints} SP</div>
          </div>
        </div>
      </div>

      {/* Skill Branches */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {trees.map((branch, branchIdx) => (
          <div key={branch.branch} className="glass-card" style={{ padding: "28px" }}>
            {/* Branch Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "24px" }}>{branch.icon}</span>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>{branch.branch}</h2>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {branch.skills.filter((s) => s.unlocked).length} / {branch.skills.length} talents mastered
                </span>
              </div>
            </div>

            {/* Branch Skills Grid */}
            <div className="grid-3">
              {branch.skills.map((skill) => {
                const canUnlock = !skill.unlocked && skillPoints >= skill.cost;

                return (
                  <div
                    key={skill.id}
                    className={`skill-node ${skill.unlocked ? "unlocked" : "locked"}`}
                    style={{
                      background: skill.unlocked ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${skill.unlocked ? "rgba(124,58,237,0.3)" : "var(--border)"}`,
                      padding: "20px",
                      borderRadius: "var(--radius-md)",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span className="skill-icon" style={{ fontSize: "32px", margin: 0 }}>
                        {skill.icon}
                      </span>
                      {skill.unlocked ? (
                        <span className="badge badge-emerald">✓ Active</span>
                      ) : (
                        <span className="badge badge-gray">{skill.cost} SP</span>
                      )}
                    </div>

                    <h3 className="skill-name" style={{ fontSize: "15px", marginBottom: "6px" }}>{skill.name}</h3>
                    <p className="skill-desc" style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "14px" }}>
                      {skill.desc}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: 500 }}>
                        {skill.req}
                      </span>

                      {!skill.unlocked && (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          disabled={!canUnlock}
                          onClick={() => handleUnlock(branchIdx, skill.id, skill.cost)}
                        >
                          {canUnlock ? `Unlock (${skill.cost} SP)` : "Locked"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}