"use client";

import { useEffect, useRef } from "react";

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function HomePage() {
  return (
    <main className="hero-section" style={{ background: "var(--bg)", flexDirection: "column", gap: 0, paddingTop: "60px", paddingBottom: "60px" }}>
      {/* Cosmic background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Animated particles */}
      {[
        { top: "12%", left: "8%", w: 3, h: 3, color: "rgba(144,97,249,0.8)", delay: "0s", dur: "4s" },
        { top: "25%", left: "92%", w: 2, h: 2, color: "rgba(245,158,11,0.7)", delay: "1s", dur: "5s" },
        { top: "65%", left: "5%", w: 2, h: 2, color: "rgba(6,182,212,0.7)", delay: "2s", dur: "6s" },
        { top: "75%", left: "88%", w: 3, h: 3, color: "rgba(244,63,94,0.6)", delay: "0.5s", dur: "4.5s" },
        { top: "45%", left: "95%", w: 2, h: 2, color: "rgba(144,97,249,0.5)", delay: "1.5s", dur: "7s" },
        { top: "90%", left: "20%", w: 2, h: 2, color: "rgba(16,185,129,0.6)", delay: "3s", dur: "5.5s" },
        { top: "5%", left: "55%", w: 2, h: 2, color: "rgba(251,191,36,0.5)", delay: "2.5s", dur: "6.5s" },
        { top: "82%", left: "60%", w: 3, h: 3, color: "rgba(144,97,249,0.6)", delay: "4s", dur: "4s" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.w,
            height: p.h,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.w * 4}px ${p.color}`,
            animation: `star-twinkle ${p.dur} ${p.delay} ease infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", width: "100%", textAlign: "center" }}>
        {/* Animated badge */}
        <div className="hero-badge" style={{ animation: "fadeDown 0.6s var(--ease) both" }}>
          <span style={{ animation: "float-subtle 2.5s ease infinite" }}>⚔️</span>
          <span>The Ultimate Real-Life RPG Experience</span>
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--emerald)", marginLeft: 4,
              boxShadow: "0 0 8px var(--emerald)",
              animation: "pulse-scale 2s ease infinite",
              display: "inline-block",
            }}
          />
          <span style={{ color: "var(--emerald)", fontWeight: 700 }}>LIVE</span>
        </div>

        {/* Epic title */}
        <h1
          className="hero-title"
          style={{ animation: "fadeUp 0.7s 0.1s var(--ease) both" }}
        >
          Turn Your Life Into
          <br />
          <span
            className="hero-title-gradient"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: "-2px" }}
          >
            An Epic Quest
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{ animation: "fadeUp 0.7s 0.2s var(--ease) both" }}
        >
          Level up daily habits, defeat procrastination bosses, collect rare
          loot, and forge the ultimate version of yourself. Your adventure
          begins with a single quest.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-actions"
          style={{ animation: "fadeUp 0.7s 0.3s var(--ease) both" }}
        >
          <a
            href="/signup"
            className="btn btn-primary btn-xl btn-cta-pulse"
            style={{ gap: "12px" }}
          >
            <span style={{ fontSize: "22px" }}>⚔️</span>
            Begin Your Journey
          </a>
          <a
            href="/login"
            className="btn btn-ghost btn-lg"
          >
            Already a Hero? Log In →
          </a>
        </div>

        {/* Features */}
        <div
          className="hero-features"
          style={{ animation: "fadeUp 0.7s 0.4s var(--ease) both", marginBottom: "56px" }}
        >
          {[
            { dot: "var(--violet-pale)", label: "Complete Epic Quests" },
            { dot: "var(--gold-light)",  label: "Earn XP & Gold" },
            { dot: "var(--rose-light)",  label: "Slay Daily Bosses" },
            { dot: "var(--emerald-light)", label: "Unlock Achievements" },
          ].map((f) => (
            <div key={f.label} className="hero-feature">
              <div
                className="hero-feature-dot"
                style={{ background: f.dot, boxShadow: `0 0 10px ${f.dot}` }}
              />
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Floating hero card */}
        <div
          className="glass-card card-glow-violet"
          style={{
            maxWidth: "420px",
            margin: "0 auto 32px",
            animation: "fadeUp 0.7s 0.5s var(--ease) both, float 5s 1.2s ease infinite",
            textAlign: "left",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              top: 0, left: "-100%", right: 0, bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
              animation: "shimmer 3s ease infinite",
              backgroundSize: "200% 100%",
              pointerEvents: "none",
            }}
          />

          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: "var(--grad-hero)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
                boxShadow: "0 0 30px rgba(124,58,237,0.5)",
                animation: "pulse-glow 3s ease infinite",
              }}
            >
              🧙
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>The Pathfinder</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Arcane Mage · Level 7</div>
            </div>
            <div className="badge badge-gold" style={{ marginLeft: "auto", animation: "pulse-gold 3s ease infinite" }}>
              🔥 12 Day Streak
            </div>
          </div>

          {/* XP Bar */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                Experience
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--violet-pale)" }}>
                720 / 1000 XP
              </span>
            </div>
            <div className="progress-track" style={{ height: 10 }}>
              <div className="progress-bar progress-bar-xp" style={{ width: "72%" }} />
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1px solid var(--border)",
            }}
          >
            {[
              { icon: "✨", label: "XP", val: "720", col: "var(--violet-pale)" },
              { icon: "💰", label: "Gold", val: "340", col: "var(--gold-light)" },
              { icon: "⚡", label: "Energy", val: "90%", col: "var(--emerald-light)" },
              { icon: "🏆", label: "Quests", val: "47", col: "var(--cyan)" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ flex: 1, textAlign: "center", padding: "0 8px" }}
              >
                <div style={{ fontSize: 18 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: s.col, marginTop: 2, textShadow: `0 0 15px ${s.col}` }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glowing feature cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            animation: "fadeUp 0.7s 0.65s var(--ease) both",
          }}
        >
          {[
            {
              icon: "⚔️",
              title: "Daily Quests",
              desc: "Complete real-life challenges and earn XP rewards",
              col: "rgba(124,58,237,0.15)",
              border: "rgba(124,58,237,0.3)",
              glow: "rgba(124,58,237,0.2)",
            },
            {
              icon: "🐉",
              title: "Boss Battles",
              desc: "Slay procrastination demons with focus streaks",
              col: "rgba(244,63,94,0.12)",
              border: "rgba(244,63,94,0.25)",
              glow: "rgba(244,63,94,0.15)",
            },
            {
              icon: "🏆",
              title: "Achievements",
              desc: "Unlock legendary titles and rare collectibles",
              col: "rgba(245,158,11,0.12)",
              border: "rgba(245,158,11,0.25)",
              glow: "rgba(245,158,11,0.12)",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              style={{
                background: c.col,
                border: `1px solid ${c.border}`,
                borderRadius: "var(--radius-md)",
                padding: "20px 18px",
                textAlign: "left",
                transition: "all 0.3s var(--ease)",
                cursor: "default",
                animationDelay: `${0.65 + i * 0.08}s`,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${c.glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}