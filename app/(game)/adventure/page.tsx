"use client";

import { useState } from "react";

const worldRegions = [
  {
    id: "1",
    name: "Starter Hamlet",
    tagline: "Where Every Legend Dawns",
    desc: "A humble sanctuary where novice adventurers master morning routines and initial goals.",
    icon: "🏡",
    status: "Explored",
    unlocked: true,
    levelReq: "Level 1",
    progress: "100%",
    perk: "+10% Baseline Task Motivation",
    color: "var(--emerald)",
  },
  {
    id: "2",
    name: "Forest of Deep Focus",
    tagline: "Canopy of Serene Concentration",
    desc: "Thick mystical woodland where digital distractions cannot penetrate. Ideal for sprint sessions.",
    icon: "🌲",
    status: "Exploring",
    unlocked: true,
    levelReq: "Level 3",
    progress: "65%",
    perk: "+20% Focus Session Rewards",
    color: "var(--violet)",
  },
  {
    id: "3",
    name: "Discipline Dungeon",
    tagline: "Caverns of Tested Willpower",
    desc: "Subterranean trials designed to forge unbreakable habits and resist tempting impulses.",
    icon: "🏰",
    status: "Locked",
    unlocked: false,
    levelReq: "Requires Level 6",
    progress: "0%",
    perk: "Unlocks Habit Stacking Ability",
    color: "var(--gold)",
  },
  {
    id: "4",
    name: "Dragon's Volcanic Peak",
    tagline: "The Caldera of Daily Bosses",
    desc: "A fiery mountain peak where giant dragons manifest from accumulated unfinished tasks.",
    icon: "🌋",
    status: "Locked",
    unlocked: false,
    levelReq: "Defeat 5 Daily Bosses",
    progress: "0%",
    perk: "Unlocks Legendary Weapon Crafting",
    color: "var(--rose)",
  },
];

export default function AdventurePage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "36px" }}>
        <div className="badge badge-violet" style={{ marginBottom: "8px" }}>
          🗺️ World of Ambition
        </div>
        <h1 className="page-title">World Map & Expeditions</h1>
        <p className="page-subtitle">
          Each territory mirrors your personal growth. Conquer real-life challenges to traverse new lands.
        </p>
      </div>

      {activeRegion && (
        <div style={{ padding: "16px 24px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "var(--radius-md)", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>🧭</span>
            <div>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>Now Exploring: {activeRegion}</span>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "10px" }}>Expedition in progress...</span>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => setActiveRegion(null)}>
            Close
          </button>
        </div>
      )}

      {/* Region Cards Grid */}
      <div className="grid-2">
        {worldRegions.map((region) => (
          <div
            key={region.id}
            className={`region-card ${region.unlocked ? "unlocked" : "locked"}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span className="region-emoji">{region.icon}</span>
              {region.unlocked ? (
                <span className="badge badge-emerald">
                  {region.status} ({region.progress})
                </span>
              ) : (
                <span className="badge badge-gray">🔒 Locked</span>
              )}
            </div>

            <h3 className="region-name">{region.name}</h3>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--violet-light)", marginBottom: "10px" }}>
              {region.tagline}
            </div>
            <p className="region-desc">{region.desc}</p>

            {/* Perk Pill */}
            <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "12px", color: "var(--cyan)", fontWeight: 600, marginBottom: "20px" }}>
              ✨ Realm Perk: {region.perk}
            </div>

            {/* Actions & requirement */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: 600 }}>
                {region.levelReq}
              </span>

              {region.unlocked ? (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => setActiveRegion(region.name)}
                >
                  ⚔️ Enter Expedition
                </button>
              ) : (
                <button type="button" className="btn btn-sm btn-ghost" disabled>
                  🔒 Locked
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}