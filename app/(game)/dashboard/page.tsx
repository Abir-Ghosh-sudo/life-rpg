"use client";

import { useGameState } from "@/lib/game/game-context";

export default function DashboardPage() {
  const { character, boss, activeQuests, completeQuest, attackBoss } = useGameState();

  const xpPercent = Math.min(100, Math.round((character.xp / character.maxXp) * 100));
  const bossHpPercent = Math.max(0, Math.min(100, Math.round((boss.hp / boss.maxHp) * 100)));

  const stats = [
    {
      icon: "✨",
      label: "Experience",
      value: `${character.xp}`,
      sub: `/ ${character.maxXp} XP · Level ${character.level}`,
      cls: "stat-icon-violet",
      valCls: "stat-value-violet",
    },
    {
      icon: "💰",
      label: "Gold Loot",
      value: `${character.gold}`,
      sub: "Available in shop",
      cls: "stat-icon-gold",
      valCls: "stat-value-gold",
    },
    {
      icon: "🔥",
      label: "Daily Streak",
      value: `${character.streak} Days`,
      sub: "+15% XP multiplier",
      cls: "stat-icon-rose",
      valCls: "stat-value-rose",
    },
    {
      icon: "⚡",
      label: "Energy Vitality",
      value: `${character.energy}`,
      sub: `/ ${character.maxEnergy} max energy`,
      cls: "stat-icon-emerald",
      valCls: "stat-value-emerald",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 className="page-title">Welcome back, {character.name}!</h1>
            <p className="page-subtitle">
              Level {character.level} {character.heroClass} · {character.title}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="/quests" className="btn btn-primary btn-sm">
              ⚔️ View Quests
            </a>
            <a href="/focus" className="btn btn-outline-violet btn-sm">
              🎯 Focus Chamber
            </a>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid-4 stagger" style={{ marginBottom: "28px" }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="stat-body">
              <div className="stat-label">{s.label}</div>
              <div className={`stat-value ${s.valCls}`}>{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: XP + Daily Boss */}
      <div className="grid-2" style={{ marginBottom: "28px", alignItems: "start" }}>
        {/* XP Progress Card */}
        <div className="glass-card card-glow-violet">
          <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>
                HERO PROGRESSION
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text)", marginTop: "2px" }}>
                Level {character.level} Adventurer
              </div>
            </div>
            <span className="badge badge-violet">{xpPercent}% to Level {character.level + 1}</span>
          </div>

          <div className="progress-track" style={{ height: "12px", marginBottom: "8px" }}>
            <div className="progress-bar progress-bar-xp" style={{ width: `${xpPercent}%` }} />
          </div>

          <div className="flex justify-between text-sm" style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
            <span>{character.xp} XP</span>
            <span>{character.maxXp - character.xp} XP needed to ascend</span>
            <span>{character.maxXp} XP</span>
          </div>

          <div style={{ display: "flex", gap: "12px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: 600 }}>AVAILABLE POINTS</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--violet-light)" }}>💎 {character.skillPoints} SP</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: 600 }}>HERO CLASS</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--cyan)" }}>🧙 {character.heroClass}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: 600 }}>STREAK RANK</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--rose)" }}>🔥 Rank III</div>
            </div>
          </div>
        </div>

        {/* Daily Boss Card */}
        <div className="boss-card">
          <div className="flex items-center gap-4" style={{ marginBottom: "16px" }}>
            <span className="boss-emoji" style={{ fontSize: "48px" }}>
              {boss.isDefeated ? "💀" : boss.emoji}
            </span>
            <div style={{ flex: 1 }}>
              <div className="badge badge-rose" style={{ marginBottom: "4px" }}>
                {boss.isDefeated ? "✓ Defeated" : "Daily Nemesis"}
              </div>
              <div className="boss-name" style={{ fontSize: "18px" }}>{boss.name}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Level {boss.level} · {boss.title}</div>
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div className="flex justify-between" style={{ fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
              <span style={{ color: "var(--text)" }}>Boss Vitality</span>
              <span style={{ color: boss.isDefeated ? "var(--emerald)" : "var(--rose)" }}>{boss.hp} / {boss.maxHp} HP</span>
            </div>
            <div className="progress-track" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${bossHpPercent}%`,
                  background: boss.isDefeated ? "var(--grad-emerald)" : "var(--grad-rose)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              {boss.isDefeated ? "Bounty unlocked in sanctuary" : "Bounty: +300 XP, +100 Gold"}
            </span>
            <a href="/boss" className="btn btn-rose btn-sm">
              {boss.isDefeated ? "View Sanctuary →" : "⚔️ Attack Boss →"}
            </a>
          </div>
        </div>
      </div>

      {/* Active Quests Preview */}
      <div className="glass-card" style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div className="section-title" style={{ margin: 0 }}>
            <span>⚔️</span> Today&apos;s Active Quests ({activeQuests.length})
          </div>
          <a href="/quests" className="btn btn-sm btn-ghost">
            View All Quests →
          </a>
        </div>

        {activeQuests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)" }}>
            No active quests right now. Click &quot;View All Quests&quot; to accept more!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {activeQuests.slice(0, 3).map((q) => (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: "22px" }}>{q.emoji}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--text)" }}>{q.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>{q.desc}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span className="badge badge-violet">+{q.xp} XP</span>
                    <span className="badge badge-gold">+{q.gold} GP</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-emerald"
                    onClick={() => completeQuest(q.id)}
                  >
                    ✓ Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}