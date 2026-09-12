"use client";

import { useState } from "react";
import { useGameState } from "@/lib/game/game-context";

export default function BossPage() {
  const { boss, character, attackBoss, claimBossReward } = useGameState();
  const [hitEffect, setHitEffect] = useState(false);
  const [lastDmg, setLastDmg] = useState<number | null>(null);

  const handleAttack = () => {
    if (boss.isDefeated) return;
    setHitEffect(true);
    const result = attackBoss();
    setLastDmg(result.damageDealt);
    setTimeout(() => setHitEffect(false), 500);
  };

  const hpPercent = Math.max(0, Math.min(100, Math.round((boss.hp / boss.maxHp) * 100)));

  return (
    <>
      <div className="page-header">
        <div className="badge badge-rose" style={{ marginBottom: "8px" }}>
          🐉 Daily Nemesis
        </div>
        <h1 className="page-title">{boss.name}</h1>
        <p className="page-subtitle">Complete real-life quests or strike directly to defeat today&apos;s boss before midnight.</p>
      </div>

      {/* Boss Hero Card */}
      <div
        className={`boss-card ${hitEffect ? "shake-impact" : ""}`}
        style={{
          marginBottom: "28px",
          position: "relative",
          boxShadow: hitEffect ? "0 0 60px rgba(244,63,94,0.6), 0 0 100px rgba(244,63,94,0.3)" : undefined,
          transition: "box-shadow 0.2s ease",
        }}
      >
        {hitEffect && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)",
              pointerEvents: "none",
              animation: "fadeIn 0.1s ease",
            }}
          />
        )}
        <div className="grid-2" style={{ alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div
              className="boss-emoji"
              style={{
                fontSize: "100px",
                display: "block",
                marginBottom: "16px",
                transform: hitEffect ? "scale(1.28) rotate(14deg)" : "scale(1)",
                transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
                filter: boss.isDefeated ? "grayscale(0.8) opacity(0.5)" : hitEffect ? "brightness(1.5) drop-shadow(0 0 35px #f43f5e)" : "drop-shadow(0 0 25px rgba(244,63,94,0.4))",
              }}
            >
              {boss.isDefeated ? "💀" : boss.emoji}
            </div>

            <div
              className="boss-name"
              style={{ fontSize: "28px", marginBottom: "8px" }}
            >
              {boss.name}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Level {boss.level} Boss · {boss.title}
            </div>

            {boss.isDefeated ? (
              <div className="badge badge-emerald" style={{ marginTop: "12px" }}>
                ✓ Vanquished for Today
              </div>
            ) : (
              <div className="badge badge-rose" style={{ marginTop: "12px" }}>
                ⚠️ Active Threat
              </div>
            )}
          </div>

          <div>
            {/* HP Bar */}
            <div style={{ marginBottom: "24px" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>Boss HP</span>
                <span style={{ fontSize: "18px", fontWeight: 800, color: boss.isDefeated ? "var(--emerald)" : "var(--rose)" }}>
                  {boss.hp} / {boss.maxHp} HP
                </span>
              </div>
              <div className="progress-track" style={{ height: "18px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${hpPercent}%`,
                    background: boss.isDefeated ? "var(--grad-emerald)" : "linear-gradient(90deg, var(--rose), #dc2626)",
                    boxShadow: boss.isDefeated ? "0 0 12px rgba(16,185,129,0.5)" : "0 0 12px rgba(244,63,94,0.5)",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "6px" }}>
                {boss.isDefeated ? "Boss defeated! Great job!" : `${boss.hp} damage remaining to vanquish!`}
              </div>
            </div>

            {/* Defeat Rewards */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "10px" }}>
                BOUNTY REWARDS
              </div>
              <div className="flex gap-3">
                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>✨</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--violet-light)", marginTop: "4px" }}>+300</div>
                  <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>XP Reward</div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>💰</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--gold)", marginTop: "4px" }}>+100</div>
                  <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Gold Reward</div>
                </div>

                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "12px 8px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>🏆</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--emerald)", marginTop: "4px" }}>Medal</div>
                  <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Dragon Slayer</div>
                </div>
              </div>
            </div>

            {/* Attack Button or Claim Button */}
            {boss.isDefeated ? (
              boss.rewardClaimed ? (
                <div style={{ padding: "14px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "var(--radius)", textAlign: "center", color: "var(--emerald)", fontWeight: 700 }}>
                  ✓ Bounty Claimed! Next boss spawns at midnight.
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-gold btn-lg w-full"
                  onClick={claimBossReward}
                >
                  🎉 Claim Boss Bounty (+300 XP, +100 Gold)
                </button>
              )
            ) : (
              <button
                type="button"
                className="btn btn-rose btn-lg w-full"
                onClick={handleAttack}
              >
                ⚔️ Strike with Hero Weapon! ({lastDmg ? `Last: -${lastDmg} HP` : "Strike Now"})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Combat Guide */}
      <div className="glass-card" style={{ marginBottom: "28px" }}>
        <div className="section-title">
          <span>⚔️</span> Quest Damage Multipliers
        </div>
        <div className="flex-col gap-3">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>💻</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>Epic Tasks (Hard Coding / Projects)</div>
                <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>Deals catastrophic damage to the beast</div>
              </div>
            </div>
            <span style={{ color: "var(--rose)", fontWeight: 800, fontSize: "16px" }}>-40 Boss HP</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>🏃</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>Fitness & Health Habits</div>
                <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>Boosts stamina and weakens dragon armor</div>
              </div>
            </div>
            <span style={{ color: "var(--rose)", fontWeight: 800, fontSize: "16px" }}>-15 Boss HP</span>
          </div>
        </div>
      </div>

      {/* Hero Battle Stats */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Your Attack Rating</div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--text)", marginTop: "2px" }}>
              🧙 {character.name} · ATK: {character.attributes.strength + 15} DMG
            </div>
          </div>
          <a href="/quests" className="btn btn-primary btn-sm">
            Complete Quests for Extra Damage →
          </a>
        </div>
      </div>
    </>
  );
}