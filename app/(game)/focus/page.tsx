"use client";

import { useState, useEffect } from "react";
import { useGameState } from "@/lib/game/game-context";

export default function FocusPage() {
  const { character, todayFocusCount, completeFocusSession, history } = useGameState();

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      completeFocusSession(Math.round(initialSeconds / 60));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, initialSeconds, completeFocusSession]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
  };

  const handleFinishEarly = () => {
    const elapsedMinutes = Math.max(1, Math.round((initialSeconds - secondsLeft) / 60));
    setIsActive(false);
    setSecondsLeft(initialSeconds);
    completeFocusSession(elapsedMinutes);
  };

  const setPreset = (mins: number) => {
    setIsActive(false);
    setInitialSeconds(mins * 60);
    setSecondsLeft(mins * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = (initialSeconds - secondsLeft) / initialSeconds;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const focusHistory = history.filter((h) => h.category === "Focus");

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="badge badge-violet" style={{ marginBottom: "12px" }}>
          ⏱️ Deep Work Chamber
        </div>
        <h1 className="page-title">Focus Sanctuary</h1>
        <p className="page-subtitle">
          Channel your concentration. Complete 25-minute sprints to earn XP, collect Gold, and sharpen your discipline.
        </p>
      </div>

      {/* Main Focus Card */}
      <div className="glass-card card-glow-violet" style={{ padding: "48px 32px", textAlign: "center", marginBottom: "32px" }}>
        {/* SVG Circular Ring */}
        <div className={`focus-timer-ring ${isActive ? "active" : ""}`}>
          <svg className="focus-ring-svg" viewBox="0 0 240 240">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--violet)" />
                <stop offset="50%" stopColor="var(--indigo-light)" />
                <stop offset="100%" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <circle
              className="focus-ring-bg"
              cx="120"
              cy="120"
              r={radius}
            />
            <circle
              className="focus-ring-progress"
              cx="120"
              cy="120"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="focus-timer-display">
            <span className="focus-time">{timeFormatted}</span>
            <span className="focus-label">{isActive ? "⚡ Sprint Active" : "Paused"}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`btn btn-lg ${isActive ? "btn-gold" : "btn-primary"}`}
            onClick={toggleTimer}
            style={{ minWidth: "160px" }}
          >
            {isActive ? "⏸️ Pause Sprint" : "▶️ Start Focus Sprint"}
          </button>
          <button
            type="button"
            className="btn btn-lg btn-ghost"
            onClick={resetTimer}
          >
            🔄 Reset
          </button>
          {isActive && (
            <button
              type="button"
              className="btn btn-lg btn-emerald"
              onClick={handleFinishEarly}
            >
              ✓ Log Session
            </button>
          )}
        </div>

        {/* Quick presets */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "24px" }}>
          <button
            type="button"
            className={`btn btn-sm ${initialSeconds === 15 * 60 ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setPreset(15)}
          >
            15m Quick
          </button>
          <button
            type="button"
            className={`btn btn-sm ${initialSeconds === 25 * 60 ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setPreset(25)}
          >
            25m Standard
          </button>
          <button
            type="button"
            className={`btn btn-sm ${initialSeconds === 50 * 60 ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setPreset(50)}
          >
            50m Deep Dive
          </button>
        </div>
      </div>

      {/* Grid of info & stats */}
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        <div className="stat-card">
          <div className="stat-icon stat-icon-violet">✨</div>
          <div className="stat-body">
            <div className="stat-label">Session Bounty</div>
            <div className="stat-value stat-value-violet">+25 XP</div>
            <div className="stat-sub">And +5 Gold per sprint</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-emerald">🎯</div>
          <div className="stat-body">
            <div className="stat-label">Today's Sessions</div>
            <div className="stat-value stat-value-emerald">{todayFocusCount} Done</div>
            <div className="stat-sub">{todayFocusCount * 25} total minutes logged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-gold">🔥</div>
          <div className="stat-body">
            <div className="stat-label">Focus Streak</div>
            <div className="stat-value stat-value-gold">{character.streak} Days</div>
            <div className="stat-sub">Multiplier: +15% XP</div>
          </div>
        </div>
      </div>

      {/* Focus Chronicle */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div className="section-title" style={{ margin: 0 }}>
            <span>📜</span> Focus Chronicle
          </div>
          <a href="/history" className="btn btn-sm btn-ghost">
            View All History →
          </a>
        </div>

        {focusHistory.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", fontSize: "14px" }}>
            No sessions logged today yet. Launch your first sprint above!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {focusHistory.map((h) => (
              <div
                key={h.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>{h.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>{h.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                      Completed at {h.time} · {h.desc}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="badge badge-violet">+{h.xp} XP</span>
                  <span className="badge badge-gold">+{h.gold} Gold</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}