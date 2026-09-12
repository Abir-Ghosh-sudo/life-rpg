"use client";

import { useGameState } from "@/lib/game/game-context";
import { usePathname } from "next/navigation";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { character } = useGameState();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard",   icon: "🏠", label: "Dashboard" },
    { href: "/quests",      icon: "⚔️", label: "Quests" },
    { href: "/character",   icon: "🧙", label: "Character" },
    { href: "/adventure",   icon: "🗺️", label: "Adventure" },
    { href: "/boss",        icon: "🐉", label: "Daily Boss" },
    { href: "/focus",       icon: "🎯", label: "Focus Mode" },
  ];

  const resourceItems = [
    { href: "/shop",        icon: "🛒", label: "Shop" },
    { href: "/inventory",   icon: "🎒", label: "Inventory" },
    { href: "/skill-tree",  icon: "🌟", label: "Skill Tree" },
    { href: "/achievements",icon: "🏆", label: "Achievements" },
    { href: "/analytics",   icon: "📊", label: "Analytics" },
    { href: "/history",     icon: "📜", label: "History" },
    { href: "/settings",    icon: "⚙️", label: "Settings" },
  ];

  const xpPercent = Math.min(100, Math.round((character.xp / character.maxXp) * 100));

  return (
    <div className="app-shell" suppressHydrationWarning>
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <a href="/dashboard" className="sidebar-logo">
            <div className="sidebar-logo-icon">⚔️</div>
            <div>
              <div className="sidebar-logo-text">Life RPG</div>
              <div className="sidebar-subtitle">Real-Life Mastery</div>
            </div>
          </a>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="sidebar-section-label" style={{ marginTop: "8px" }}>Resources</div>
          {resourceItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-stats" suppressHydrationWarning>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                🧙 {character.name}
              </span>
              <span className="badge badge-violet" suppressHydrationWarning style={{ fontSize: "10px", padding: "2px 6px" }}>
                Lvl {character.level}
              </span>
            </div>

            <div className="sidebar-xp-bar">
              <div className="sidebar-xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>{character.xp} XP</span>
              <span style={{ fontSize: "11px", color: "var(--text-dim)" }}>{character.maxXp} XP</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
              <span title="Gold Coins" style={{ fontSize: "12px", fontWeight: 700, color: "var(--gold-light)" }}>
                💰 {character.gold}
              </span>
              <span title="Energy" style={{ fontSize: "12px", fontWeight: 700, color: "var(--emerald)" }}>
                ⚡ {character.energy}/{character.maxEnergy}
              </span>
              <span title="Daily Streak" style={{ fontSize: "12px", fontWeight: 700, color: "var(--rose)" }}>
                🔥 {character.streak}d
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 6px var(--emerald)", display: "inline-block" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--emerald)" }}>Backend Live</span>
              </div>
              <a
                href="/settings"
                title="Settings & Reset"
                style={{ fontSize: "11px", color: "var(--text-dim)", textDecoration: "none" }}
              >
                ⚙️ Reset
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}