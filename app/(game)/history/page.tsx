"use client";

import { useState } from "react";

const historyEvents = [
  {
    id: "1",
    timeframe: "Today",
    title: "Focus Sprint: System Architecture",
    category: "Focus",
    icon: "🧘",
    desc: "25-minute uninterrupted deep work sprint concluded.",
    time: "3:45 PM",
    xp: 25,
    gold: 5,
    badgeColor: "badge-violet",
  },
  {
    id: "2",
    timeframe: "Today",
    title: "Quest Completed: Morning Workout",
    category: "Quests",
    icon: "💪",
    desc: "Crushed 45 minutes of strength training and core work.",
    time: "8:15 AM",
    xp: 75,
    gold: 25,
    badgeColor: "badge-emerald",
  },
  {
    id: "3",
    timeframe: "Yesterday",
    title: "Daily Boss Defeated: Ignis the Procrastinator",
    category: "Boss",
    icon: "🐉",
    desc: "Dealt 300 damage by completing all 3 daily prime quests.",
    time: "9:30 PM",
    xp: 200,
    gold: 100,
    badgeColor: "badge-rose",
  },
  {
    id: "4",
    timeframe: "Yesterday",
    title: "Quest Completed: Read 20 Pages of Tech Literature",
    category: "Quests",
    icon: "📖",
    desc: "Read Chapter 4 of System Design Interview guide.",
    time: "2:10 PM",
    xp: 40,
    gold: 15,
    badgeColor: "badge-emerald",
  },
  {
    id: "5",
    timeframe: "Earlier This Week",
    title: "Achievement Unlocked: Early Bird",
    category: "Achievements",
    icon: "🏆",
    desc: "Finished a focus session before 9:00 AM.",
    time: "Sep 10, 2026",
    xp: 75,
    gold: 25,
    badgeColor: "badge-gold",
  },
  {
    id: "6",
    timeframe: "Earlier This Week",
    title: "Level Up! Reached Level 4",
    category: "Milestone",
    icon: "⭐",
    desc: "Unlocked new talent point and upgraded health pool.",
    time: "Sep 9, 2026",
    xp: 100,
    gold: 50,
    badgeColor: "badge-violet",
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? historyEvents : historyEvents.filter((e) => e.category === filter);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "36px" }}>
        <div className="badge badge-violet" style={{ marginBottom: "8px" }}>
          📜 Hero&apos;s Chronicle
        </div>
        <h1 className="page-title">Activity Timeline</h1>
        <p className="page-subtitle">
          A permanent record of every trial faced, quest vanquished, and focus sprint mastered.
        </p>
      </div>

      {/* Filter Chips */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", overflowX: "auto" }}>
        {["All", "Quests", "Focus", "Boss", "Achievements"].map((tab) => (
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

      {/* Timeline List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-card"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", padding: "20px 24px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                {item.icon}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{item.title}</h3>
                  <span className={`badge ${item.badgeColor}`} style={{ fontSize: "10px" }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "3px" }}>{item.desc}</p>
                <span style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "4px", display: "inline-block" }}>
                  🕒 {item.timeframe} · {item.time}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <span className="badge badge-violet">+{item.xp} XP</span>
              <span className="badge badge-gold">+{item.gold} GP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}