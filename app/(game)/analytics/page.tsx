export default function AnalyticsPage() {
  const weeklyDays = [
    { day: "Mon", xp: 120, height: "48%" },
    { day: "Tue", xp: 180, height: "72%" },
    { day: "Wed", xp: 250, height: "100%", isPeak: true },
    { day: "Thu", xp: 140, height: "56%" },
    { day: "Fri", xp: 200, height: "80%" },
    { day: "Sat", xp: 90,  height: "36%" },
    { day: "Sun", xp: 150, height: "60%" },
  ];

  const categories = [
    { name: "Career & Work", pct: 40, color: "var(--violet)", icon: "💼", quests: "8 completed" },
    { name: "Learning & Study", pct: 25, color: "var(--blue)", icon: "📚", quests: "5 completed" },
    { name: "Health & Fitness", pct: 20, color: "var(--emerald)", icon: "🏋️", quests: "4 completed" },
    { name: "Personal & Habits", pct: 15, color: "var(--gold)", icon: "🌱", quests: "3 completed" },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "36px" }}>
        <div className="badge badge-blue" style={{ marginBottom: "8px" }}>
          📊 Quest Analytics & Telemetry
        </div>
        <h1 className="page-title">Heroic Performance</h1>
        <p className="page-subtitle">
          Examine your real-life XP velocity, habit consistency, and category focus allocation.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid-4" style={{ marginBottom: "32px" }}>
        <div className="stat-card">
          <div className="stat-icon stat-icon-violet">✨</div>
          <div className="stat-body">
            <div className="stat-label">Weekly XP</div>
            <div className="stat-value stat-value-violet">1,130</div>
            <div className="stat-sub">+18% vs last week</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-gold">💰</div>
          <div className="stat-body">
            <div className="stat-label">Gold Looted</div>
            <div className="stat-value stat-value-gold">340 GP</div>
            <div className="stat-sub">From 20 quests</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-emerald">🎯</div>
          <div className="stat-body">
            <div className="stat-label">Quests Cleared</div>
            <div className="stat-value stat-value-emerald">20 / 22</div>
            <div className="stat-sub">91% success rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-rose">🔥</div>
          <div className="stat-body">
            <div className="stat-label">Current Streak</div>
            <div className="stat-value stat-value-rose">7 Days</div>
            <div className="stat-sub">Personal record: 14d</div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        {/* Weekly XP Bar Chart */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>
              Weekly XP Momentum
            </h2>
            <span className="badge badge-emerald">Peak: Wednesday (250 XP)</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "180px", padding: "10px 10px 0", borderBottom: "1px solid var(--border)", gap: "12px" }}>
            {weeklyDays.map((d) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: d.isPeak ? "var(--gold-light)" : "var(--text-dim)", marginBottom: "6px" }}>
                  {d.xp}
                </span>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "38px",
                    height: d.height,
                    background: d.isPeak ? "var(--grad-gold)" : "var(--grad-hero)",
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.4s ease",
                    boxShadow: d.isPeak ? "0 0 15px rgba(245,158,11,0.4)" : "none",
                  }}
                />
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px", fontWeight: 600 }}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "20px" }}>
            Discipline Distribution
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {categories.map((c) => (
              <div key={c.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{c.icon}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>{c.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>{c.quests}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)" }}>{c.pct}%</span>
                  </div>
                </div>

                <div className="ui-progress-track">
                  <div className="ui-progress-bar" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Milestone Banner */}
      <div className="glass-card card-glow-violet" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--violet-light)", textTransform: "uppercase", letterSpacing: "1px" }}>
            Next Level Milestone
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginTop: "4px" }}>
            Level 5: Master of Discipline
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
            Earn 380 more XP to unlock the Discipline Dungeon expedition and Level 5 perks.
          </p>
        </div>

        <a href="/quests" className="btn btn-primary">
          ⚔️ View Active Quests
        </a>
      </div>
    </div>
  );
}