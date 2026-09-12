"use client";

import { useState } from "react";
import { useGameState, QuestItem } from "@/lib/game/game-context";

const diffClass: Record<string, string> = {
  Easy: "diff-easy",
  Medium: "diff-medium",
  Hard: "diff-hard",
  Epic: "diff-epic",
};

export default function QuestsPage() {
  const {
    activeQuests,
    completedQuests,
    createQuest,
    completeQuest,
    deleteQuest,
  } = useGameState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Work");
  const [diff, setDiff] = useState<"Easy" | "Medium" | "Hard" | "Epic">("Medium");

  const totalAvailableXp = activeQuests.reduce((acc, q) => acc + q.xp, 0);

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const xp = diff === "Epic" ? 200 : diff === "Hard" ? 100 : diff === "Medium" ? 50 : 25;
    const gold = diff === "Epic" ? 60 : diff === "Hard" ? 30 : diff === "Medium" ? 15 : 8;
    const emoji = type === "Fitness" ? "🏃" : type === "Study" ? "📚" : type === "Coding" ? "💻" : type === "Health" ? "🧘" : "💼";

    createQuest({
      title: title.trim(),
      desc: desc.trim() || "Daily adventure objective",
      diff,
      type,
      xp,
      gold,
      emoji,
    });

    setTitle("");
    setDesc("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="page-header">
        <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 className="page-title">⚔️ Quests & Trials</h1>
            <p className="page-subtitle">Vanquish daily tasks to accumulate XP, earn Gold, and strike the Daily Boss.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            ＋ Forge New Quest
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid-3 stagger" style={{ marginBottom: "28px" }}>
        <div className="stat-card">
          <div className="stat-icon stat-icon-violet">⚔️</div>
          <div className="stat-body">
            <div className="stat-label">Active Quests</div>
            <div className="stat-value">{activeQuests.length}</div>
            <div className="stat-sub">Ready to complete</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-emerald">✅</div>
          <div className="stat-body">
            <div className="stat-label">Completed Today</div>
            <div className="stat-value stat-value-emerald">{completedQuests.length}</div>
            <div className="stat-sub">Keep your momentum!</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-gold">✨</div>
          <div className="stat-body">
            <div className="stat-label">XP Available</div>
            <div className="stat-value stat-value-gold">{totalAvailableXp}</div>
            <div className="stat-sub">From pending trials</div>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div className="section-title" style={{ marginBottom: "16px" }}>
        <span>📋</span> Active Quests ({activeQuests.length})
      </div>

      {activeQuests.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "40px", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>All Quests Completed!</h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            You have crushed all your objectives for now. Forge a new quest to keep leveling up!
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ marginTop: "16px" }}
            onClick={() => setIsModalOpen(true)}
          >
            ＋ Add Another Quest
          </button>
        </div>
      ) : (
        <div className="flex-col gap-3 stagger">
          {activeQuests.map((q) => (
            <div key={q.id} className="quest-card">
              <div className="quest-card-header">
                <div className="flex items-start gap-3" style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "10px",
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {q.emoji}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="quest-title">{q.title}</div>
                    <div className="quest-desc" style={{ marginTop: "4px" }}>{q.desc}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ color: "var(--text-dim)", padding: "4px 8px" }}
                  onClick={() => deleteQuest(q.id)}
                  title="Discard Quest"
                >
                  ✕
                </button>
              </div>

              <div className="quest-meta">
                <span className={`badge ${diffClass[q.diff]}`}>{q.diff}</span>
                <span className="badge badge-gray">{q.type}</span>
                <span className="badge badge-violet">Ready</span>
              </div>

              <div className="quest-reward">
                <div className="quest-reward-item quest-reward-xp">
                  <span>✨</span>
                  <span>+{q.xp} XP</span>
                </div>
                <div className="quest-reward-item quest-reward-gold">
                  <span>💰</span>
                  <span>+{q.gold} Gold</span>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <button
                    type="button"
                    className="btn btn-emerald btn-sm"
                    style={{ minWidth: "120px" }}
                    onClick={() => completeQuest(q.id)}
                  >
                    ✓ Complete Trial
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed section */}
      <div className="section-title" style={{ marginTop: "36px", marginBottom: "16px" }}>
        <span>✅</span> Completed Today ({completedQuests.length})
      </div>

      {completedQuests.length === 0 ? (
        <div
          className="glass-card"
          style={{ textAlign: "center", padding: "36px 24px", opacity: 0.7 }}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>⏳</div>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            No quests finished yet today. Complete your first quest above to gain XP!
          </div>
        </div>
      ) : (
        <div className="flex-col gap-2">
          {completedQuests.map((q) => (
            <div
              key={q.id}
              className="glass-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px",
                opacity: 0.8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "20px" }}>{q.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px", textDecoration: "line-through", color: "var(--text-muted)" }}>
                    {q.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--emerald)" }}>
                    ✓ Vanquished {q.completedAt ? `at ${q.completedAt}` : "today"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="badge badge-violet">+{q.xp} XP</span>
                <span className="badge badge-gold">+{q.gold} GP</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Quest Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="glass-card card-glow-violet"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "32px",
              background: "var(--surface)",
              animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)" }}>
                ⚔️ Forge New Quest
              </h2>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuest} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Quest Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Clean workspace & organize backlog"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Objective Description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Clear desk, file receipts, review sprint tickets"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Work">💼 Work & Career</option>
                    <option value="Fitness">🏃 Health & Fitness</option>
                    <option value="Study">📚 Study & Reading</option>
                    <option value="Coding">💻 Code & Tech</option>
                    <option value="Health">🧘 Mindfulness</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty Tier</label>
                  <select
                    value={diff}
                    onChange={(e) => setDiff(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="Easy">Easy (25 XP, 8 GP)</option>
                    <option value="Medium">Medium (50 XP, 15 GP)</option>
                    <option value="Hard">Hard (100 XP, 30 GP)</option>
                    <option value="Epic">Epic (200 XP, 60 GP)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  ✨ Accept Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}