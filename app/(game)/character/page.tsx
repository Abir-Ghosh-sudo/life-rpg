"use client";

import { useGameState } from "@/lib/game/game-context";

export default function CharacterPage() {
  const { character, inventory } = useGameState();
  const { equipped } = inventory;

  const attributes = [
    { name: "Strength",    icon: "💪", value: character.attributes.strength, max: 50, color: "var(--rose)", desc: "Amplifies attack damage against the Daily Boss" },
    { name: "Intellect",   icon: "🧠", value: character.attributes.intellect, max: 50, color: "var(--blue)", desc: "Increases XP gained from study & technical trials" },
    { name: "Discipline",  icon: "🛡️", value: character.attributes.discipline, max: 50, color: "var(--gold)", desc: "Protects streaks and increases daily habit gold" },
    { name: "Vitality",    icon: "❤️", value: character.attributes.vitality, max: 50, color: "var(--emerald)", desc: "Increases max energy pool and restorative recovery" },
    { name: "Agility",     icon: "⚡", value: character.attributes.agility, max: 50, color: "var(--cyan)", desc: "Reduces task friction and accelerates sprint focus" },
  ];

  const slots: Array<"Weapon" | "Armor" | "Accessory"> = ["Weapon", "Armor", "Accessory"];
  const xpPercent = Math.min(100, Math.round((character.xp / character.maxXp) * 100));

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div className="page-header">
        <h1 className="page-title">🧙 Hero Sheet</h1>
        <p className="page-subtitle">Your character attributes grow automatically as you accomplish real-world quests.</p>
      </div>

      {/* Hero Overview Card */}
      <div className="glass-card card-glow-violet" style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap" }}>
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "var(--radius-xl)",
              background: "var(--grad-hero)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              boxShadow: "var(--shadow-violet)",
              flexShrink: 0,
              animation: "float 4s ease infinite",
            }}
          >
            🧙
          </div>

          <div style={{ flex: 1, minWidth: "240px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text)" }}>{character.name}</h2>
              <span className="badge badge-violet">Level {character.level} {character.heroClass}</span>
              <span className="badge badge-gold">🔥 {character.streak} Day Streak</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              {character.title} · Rank III Champion of Discipline
            </p>

            {/* XP Bar */}
            <div style={{ marginTop: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", color: "var(--text-muted)" }}>
                <span>XP Progress</span>
                <span style={{ color: "var(--violet-light)", fontWeight: 700 }}>
                  {character.xp} / {character.maxXp} XP ({xpPercent}%)
                </span>
              </div>
              <div className="progress-track" style={{ height: "10px" }}>
                <div className="progress-bar progress-bar-xp" style={{ width: `${xpPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Quick Vital Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "16px 20px",
              minWidth: "180px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>Gold Loot:</span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--gold-light)" }}>💰 {character.gold}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>Vital Energy:</span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--emerald)" }}>⚡ {character.energy}/{character.maxEnergy}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>Skill Points:</span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--cyan)" }}>💎 {character.skillPoints} SP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Attributes + Gear */}
      <div className="grid-2" style={{ alignItems: "start", marginBottom: "32px" }}>
        {/* Core Attributes */}
        <div className="glass-card">
          <div className="section-title">
            <span>📊</span> Core Attributes
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {attributes.map((a) => (
              <div key={a.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>{a.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>{a.name}</span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "14px", color: "var(--text)" }}>{a.value} / {a.max}</span>
                </div>
                <div className="progress-track" style={{ height: "6px" }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${(a.value / a.max) * 100}%`, background: a.color }}
                  />
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "3px" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipped Loadout */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div className="section-title" style={{ margin: 0 }}>
              <span>⚔️</span> Combat Loadout
            </div>
            <a href="/inventory" className="btn btn-sm btn-ghost">
              Manage Gear →
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {slots.map((slot) => {
              const item = equipped[slot];

              return (
                <div
                  key={slot}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-sm)", background: item ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                    {item ? item.icon : "🔒"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{slot}</div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: item ? "var(--text)" : "var(--text-dim)" }}>
                      {item ? item.name : "Empty"}
                    </div>
                  </div>
                  {item && (
                    <span className="badge badge-violet" style={{ fontSize: "11px" }}>{item.stat}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}