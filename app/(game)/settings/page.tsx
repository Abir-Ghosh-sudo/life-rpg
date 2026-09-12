"use client";

import { useState } from "react";
import { useGameState } from "@/lib/game/game-context";

export default function SettingsPage() {
  const { character, user, logoutUser, showNotification, resetGame, isBackendConnected } = useGameState();

  const [reminders, setReminders] = useState(true);
  const [bossAlerts, setBossAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [bgMusic, setBgMusic] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSave = () => {
    setSaved(true);
    showNotification("⚙️ Preferences saved successfully!");
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetGame = async () => {
    setIsResetting(true);
    await resetGame();
    setIsResetting(false);
    setConfirmReset(false);
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "36px" }}>
        <div className="badge badge-gray" style={{ marginBottom: "8px" }}>
          ⚙️ Heroic Preferences
        </div>
        <h1 className="page-title">Realm Settings</h1>
        <p className="page-subtitle">
          Tune your notifications, customize profile parameters, and configure backend state synchronizations.
        </p>
      </div>

      {saved && (
        <div style={{ padding: "12px 20px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "var(--radius)", color: "var(--emerald)", fontWeight: 700, marginBottom: "24px", animation: "fadeUp 0.3s ease" }}>
          ✓ Settings saved successfully!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Backend Connectivity Card */}
        <div className="glass-card card-glow-violet">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              <span>🔌</span> Backend Server Connection
            </h2>
            <span className={`badge ${isBackendConnected ? "badge-emerald" : "badge-gold"}`}>
              {isBackendConnected ? "● Live Connected" : "○ Syncing / Local Fallback"}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
            The frontend is actively connected to the server API backend at <code>/api/game/state</code> with automatic bidirectional state persistence and server storage.
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>
              Data Store: <strong>Server JSON Storage (data/gamestate.json)</strong>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card">
          <h2 className="section-title">
            <span>🧙</span> Character Profile
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius-lg)", background: "var(--grad-hero)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", boxShadow: "var(--shadow-violet)" }}>
              🧙
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>{character.name}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Level {character.level} Adventurer · {character.heroClass}</div>
              <span className="badge badge-violet" style={{ marginTop: "6px" }}>Title: {character.title}</span>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Hero Handle</label>
              <input type="text" defaultValue={character.name} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Registered Email</label>
              <input type="email" defaultValue={user?.email || "hero@realm.com"} className="form-input" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card">
          <h2 className="section-title">
            <span>🔔</span> Quest & Battle Alerts
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Morning Quest Dispatch</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Receive a daily summary of scheduled quests at 8:00 AM</div>
              </div>
              <input
                type="checkbox"
                checked={reminders}
                onChange={(e) => setReminders(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--violet)" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Daily Boss Warning</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Alert when the boss battle window has 2 hours remaining</div>
              </div>
              <input
                type="checkbox"
                checked={bossAlerts}
                onChange={(e) => setBossAlerts(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--violet)" }}
              />
            </div>
          </div>
        </div>

        {/* Sound Immersion */}
        <div className="glass-card">
          <h2 className="section-title">
            <span>🎵</span> Audio & Immersion
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Quest Fanfare & SFX</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Play celebratory sound chimes on task completion</div>
              </div>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--violet)" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>Focus Chamber Ambience</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Subtle lo-fi white noise generator during timer sessions</div>
              </div>
              <input
                type="checkbox"
                checked={bgMusic}
                onChange={(e) => setBgMusic(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--violet)" }}
              />
            </div>
          </div>
        </div>

        {/* Save button & Account */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            💾 Save Preferences
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={logoutUser}
          >
            🚪 Log Out of Realm
          </button>
        </div>

        {/* Danger Zone */}
        <div className="glass-card" style={{ border: "1px solid rgba(244,63,94,0.25)", background: "rgba(244,63,94,0.03)" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--rose)", marginBottom: "12px" }}>
            ⚠️ Danger Zone
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
            Resetting your character restores the game to a fresh Level 1 state on both client and backend server. All XP, gold, quests, and boss records will be reset.
          </p>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {!confirmReset ? (
              <button
                type="button"
                className="btn btn-sm btn-rose"
                disabled={isResetting}
                onClick={() => setConfirmReset(true)}
              >
                🔄 Reset Game to Level 1
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-rose"
                  disabled={isResetting}
                  onClick={handleResetGame}
                  style={{ animation: "pulse-scale 1.5s ease infinite" }}
                >
                  {isResetting ? "Resetting Realm..." : "⚠️ Confirm Reset Realm to Level 1 Now"}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  disabled={isResetting}
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}