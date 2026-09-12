"use client";

import React, { useEffect, useState } from "react";

export interface CombatTextEvent {
  id: string;
  text: string;
  type: "xp" | "gold" | "dmg" | "crit" | "heal" | "lvl";
  x: number;
  y: number;
}

export function FloatingCombatText() {
  const [events, setEvents] = useState<CombatTextEvent[]>([]);

  useEffect(() => {
    const handleSpawn = (e: CustomEvent<Omit<CombatTextEvent, "id">>) => {
      const newEvent: CombatTextEvent = {
        ...e.detail,
        id: `fct-${Date.now()}-${Math.random()}`,
      };
      setEvents((prev) => [...prev, newEvent]);

      setTimeout(() => {
        setEvents((prev) => prev.filter((item) => item.id !== newEvent.id));
      }, 1200);
    };

    window.addEventListener("spawn-combat-text" as unknown as keyof WindowEventMap, handleSpawn as unknown as EventListener);
    return () => {
      window.removeEventListener("spawn-combat-text" as unknown as keyof WindowEventMap, handleSpawn as unknown as EventListener);
    };
  }, []);

  if (events.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
      {events.map((ev) => {
        let color = "var(--text)";
        let shadow = "0 0 10px rgba(255,255,255,0.5)";
        let fontSize = "16px";
        let prefix = "";

        if (ev.type === "xp") {
          color = "#c084fc";
          shadow = "0 0 16px rgba(192,132,252,0.8)";
          prefix = "✨ ";
        } else if (ev.type === "gold") {
          color = "#fbbf24";
          shadow = "0 0 16px rgba(251,191,36,0.8)";
          prefix = "💰 ";
        } else if (ev.type === "dmg") {
          color = "#f43f5e";
          shadow = "0 0 16px rgba(244,63,94,0.8)";
          fontSize = "18px";
          prefix = "⚔️ ";
        } else if (ev.type === "crit") {
          color = "#ff2255";
          shadow = "0 0 24px rgba(255,34,85,1)";
          fontSize = "22px";
          prefix = "💥 CRIT! ";
        } else if (ev.type === "heal") {
          color = "#34d399";
          shadow = "0 0 16px rgba(52,211,153,0.8)";
          prefix = "💚 ";
        } else if (ev.type === "lvl") {
          color = "#38bdf8";
          shadow = "0 0 24px rgba(56,189,248,1)";
          fontSize = "24px";
          prefix = "🎉 ";
        }

        return (
          <div
            key={ev.id}
            style={{
              position: "absolute",
              left: ev.x,
              top: ev.y,
              transform: "translate(-50%, -50%)",
              color,
              fontFamily: "'Cinzel', sans-serif",
              fontWeight: 900,
              fontSize,
              textShadow: `${shadow}, 0 2px 4px rgba(0,0,0,0.8)`,
              animation: "fct-float 1.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
              whiteSpace: "nowrap",
            }}
          >
            {prefix}{ev.text}
          </div>
        );
      })}
    </div>
  );
}

export function spawnCombatText(text: string, type: CombatTextEvent["type"], x?: number, y?: number) {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("spawn-combat-text", {
    detail: {
      text,
      type,
      x: x ?? window.innerWidth / 2 + (Math.random() * 80 - 40),
      y: y ?? window.innerHeight / 2 + (Math.random() * 60 - 30),
    },
  });
  window.dispatchEvent(event);
}
