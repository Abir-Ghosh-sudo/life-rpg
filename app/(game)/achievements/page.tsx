"use client";

import { useState } from "react";

const achievementsData = [
  {
    id: "1",
    title: "First Steps",
    desc: "Complete your very first real-life quest.",
    icon: "🌱",
    tier: "Bronze",
    tierClass: "badge-blue",
    unlocked: true,
    unlockedDate: "Sep 8, 2026",
    xp: 50,
    gold: 15,
  },
  {
    id: "2",
    title: "Early Bird",
    desc: "Complete a morning focus quest before 9:00 AM.",
    icon: "🌅",
    tier: "Silver",
    tierClass: "badge-violet",
    unlocked: true,
    unlockedDate: "Sep 10, 2026",
    xp: 75,
    gold: 25,
  },
  {
    id: "3",
    title: "Streak Sentinel",
    desc: "Maintain an unbroken daily streak of 7 consecutive days.",
    icon: "🔥",
    tier: "Gold",
    tierClass: "badge-gold",
    unlocked: true,
    unlockedDate: "Yesterday",
    xp: 150,
    gold: 50,
  },
  {
    id: "4",
    title: "Dragon Slayer",
    desc: "Defeat your first Daily Boss by completing all daily tasks.",
    icon: "🐉",
    tier: "Gold",
    tierClass: "badge-gold",
    unlocked: true,
    unlockedDate: "Today",
    xp: 200,
    gold: 100,
  },
  {
    id: "5",
    title: "Centurion of Tasks",
    desc: "Complete 100 real-world quests across all disciplines.",
    icon: "👑",
    tier: "Platinum",
    tierClass: "badge-rose",
    unlocked: false,
    progress: "42 / 100",
    xp: 500,
    gold: 250,
  },
  {
    id: "6",
    title: "Master of Deep Work",
    desc: "Log over 20 hours in the Focus Mode chamber.",
    icon: "🧘",
    tier: "Gold",
    tierClass: "badge-gold",
    unlocked: false,
    progress: "6.5 / 20 hrs",
    xp: 300,
    gold: 120,
  },
  {
    id: "7",
    title: "Iron Body",
    desc: "Complete 30 fitness and health related quests.",
    icon: "💪",
    tier: "Silver",
    tierClass: "badge-violet",
    unlocked: false,
    progress: "12 / 30",
    xp: 150,
    gold: 60,
  },
  {
    id: "8",
    title: "Legendary Scholar",
    desc: "Read 5 full books or complete 15 study sprint quests.",
    icon: "📚",
    tier: "Platinum",
    tierClass: "badge-rose",
    unlocked: false,
    progress: "2 / 5",
    xp: 400,
    gold: 200,
  },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState("All");

  const unlockedCount = achievementsData.filter((a) => a.unlocked).length;
  const totalCount = achievementsData.length;
  const percentComplete = Math.round((unlockedCount / totalCount) * 100);

  const filtered = achievementsData.filter((a) => {
    if (filter === "Unlocked") return a.unlocked;
    if (filter === "Locked") return !a.unlocked;
    return true;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
        <div>
          <div className="badge badge-gold" style={{ marginBottom: "8px" }}>
            🏆 Hall of Triumph
          </div>
          <h1 className="page-title">Achievements & Trophies</h1>
          <p className="page-subtitle">
            Immortalize your real-life milestones and unlock prestigious rewards.
          </p>
        </div>

        {/* Progress Card */}
        <div className="glass-card" style={{ padding: "16px 24px", minWidth: "260px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Completion</span>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--gold-light)" }}>{unlockedCount} / {totalCount} ({percentComplete}%)</span>
          </div>
          <div className="ui-progress-track" style={{ height: "8px" }}>
            <div className="ui-progress-bar" style={{ width: `${percentComplete}%`, background: "var(--grad-gold)" }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {["All", "Unlocked", "Locked"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`btn btn-sm ${filter === tab ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`achievement-card ${item.unlocked ? "unlocked" : "locked"}`}
          >
            <div className={`achievement-icon ${item.unlocked ? "achievement-icon-gold" : "achievement-icon-gray"}`}>
              {item.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h3 className="achievement-title">{item.title}</h3>
                    <span className={`badge ${item.tierClass}`} style={{ fontSize: "10px" }}>
                      {item.tier}
                    </span>
                  </div>
                  <p className="achievement-desc">{item.desc}</p>
                </div>
              </div>

              {/* Unlock status or progress */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span className="badge badge-violet">+{item.xp} XP</span>
                  <span className="badge badge-gold">+{item.gold} GP</span>
                </div>

                {item.unlocked ? (
                  <span style={{ fontSize: "12px", color: "var(--emerald)", fontWeight: 700 }}>
                    ✓ Unlocked ({item.unlockedDate})
                  </span>
                ) : (
                  <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>
                    🔒 Progress: {item.progress}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}