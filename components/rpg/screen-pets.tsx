"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEffects } from "./sound-effects";
import { spawnCombatText } from "./floating-combat-text";

interface PetType {
  id: string;
  name: string;
  greeting: string[];
  color: string;
  badge: string;
  renderIcon: (isWaving: boolean) => React.ReactNode;
}

const PETS: PetType[] = [
  {
    id: "pikachu",
    name: "Pikachu",
    badge: "⚡ Electric",
    greeting: [
      "Pika-Pika! 👋 Keep crushing your quests!",
      "Pika-chuuu! ⚡ 100% Motivation!",
      "Hi Hero! You are doing amazing today! 🌟",
    ],
    color: "#f59e0b",
    renderIcon: (isWaving) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Ears */}
        <path d="M12 18 L6 4 L16 10 Z" fill="#FCD34D" />
        <path d="M6 4 L10 6 L12 10 Z" fill="#111827" />
        <path d="M44 18 L50 4 L40 10 Z" fill="#FCD34D" />
        <path d="M50 4 L46 6 L44 10 Z" fill="#111827" />

        {/* Tail (Lightning) */}
        <path
          d="M8 38 L2 34 L6 28 L12 32 Z"
          fill="#F59E0B"
          style={{ transformOrigin: "12px 34px", animation: "pet-tail-wag 0.8s ease infinite" }}
        />

        {/* Body */}
        <ellipse cx="28" cy="36" rx="16" ry="14" fill="#FCD34D" />

        {/* Head */}
        <circle cx="28" cy="24" r="14" fill="#FDE047" />

        {/* Cheeks */}
        <circle cx="18" cy="28" r="3.5" fill="#EF4444" />
        <circle cx="38" cy="28" r="3.5" fill="#EF4444" />

        {/* Eyes */}
        <circle cx="23" cy="22" r="2.2" fill="#111827" />
        <circle cx="23.8" cy="21.2" r="0.8" fill="#FFFFFF" />
        <circle cx="33" cy="22" r="2.2" fill="#111827" />
        <circle cx="33.8" cy="21.2" r="0.8" fill="#FFFFFF" />

        {/* Nose & Smile */}
        <circle cx="28" cy="25" r="0.8" fill="#111827" />
        <path d="M26 27 Q28 29 30 27" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Feet */}
        <ellipse cx="20" cy="48" rx="4" ry="2.5" fill="#F59E0B" />
        <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#F59E0B" />

        {/* Waving Paw */}
        {isWaving ? (
          <path
            d="M38 32 C42 26 46 24 45 20 C43 20 40 24 37 28"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            style={{ animation: "pet-paw-wave 0.4s ease infinite alternate" }}
          />
        ) : (
          <ellipse cx="38" cy="36" rx="3" ry="2.5" fill="#F59E0B" />
        )}
        <ellipse cx="18" cy="36" rx="3" ry="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: "eevee",
    name: "Eevee",
    badge: "🌟 Normal",
    greeting: [
      "Vee-Vee! 💖 Stay strong, Hero!",
      "Evolve your real-life skills today! ✨",
      "Hello! I am cheering for your level up! 🐾",
    ],
    color: "#d97706",
    renderIcon: (isWaving) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Big pointy ears */}
        <path d="M12 20 L4 6 L18 12 Z" fill="#B45309" />
        <path d="M10 16 L6 8 L14 12 Z" fill="#FDE68A" />
        <path d="M44 20 L52 6 L38 12 Z" fill="#B45309" />
        <path d="M46 16 L50 8 L42 12 Z" fill="#FDE68A" />

        {/* Bushy tail */}
        <ellipse
          cx="8"
          cy="36"
          rx="7"
          ry="11"
          fill="#D97706"
          style={{ transform: "rotate(-35deg)", animation: "pet-tail-wag 0.7s ease infinite" }}
        />
        <circle cx="5" cy="30" r="3.5" fill="#FEF3C7" />

        {/* Body */}
        <ellipse cx="28" cy="37" rx="14" ry="13" fill="#D97706" />

        {/* Fluffy Collar */}
        <ellipse cx="28" cy="32" rx="14" ry="6" fill="#FEF3C7" />
        <circle cx="22" cy="33" r="4" fill="#FEF3C7" />
        <circle cx="34" cy="33" r="4" fill="#FEF3C7" />
        <circle cx="28" cy="35" r="4.5" fill="#FEF3C7" />

        {/* Head */}
        <circle cx="28" cy="22" r="13" fill="#D97706" />

        {/* Eyes (big anime style) */}
        <ellipse cx="23" cy="20" rx="2.5" ry="3.5" fill="#451A03" />
        <circle cx="22.2" cy="18.5" r="1.1" fill="#FFFFFF" />
        <circle cx="23.5" cy="21.5" r="0.6" fill="#FFFFFF" />

        <ellipse cx="33" cy="20" rx="2.5" ry="3.5" fill="#451A03" />
        <circle cx="32.2" cy="18.5" r="1.1" fill="#FFFFFF" />
        <circle cx="33.5" cy="21.5" r="0.6" fill="#FFFFFF" />

        {/* Nose & Mouth */}
        <polygon points="27,24 29,24 28,25" fill="#451A03" />
        <path d="M26 26 Q28 27.5 30 26" stroke="#451A03" strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Paws */}
        <ellipse cx="22" cy="48" rx="3.5" ry="2" fill="#B45309" />
        <ellipse cx="34" cy="48" rx="3.5" ry="2" fill="#B45309" />

        {/* Waving Paw */}
        {isWaving && (
          <path
            d="M38 34 C43 28 46 25 45 22"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ animation: "pet-paw-wave 0.4s ease infinite alternate" }}
          />
        )}
      </svg>
    ),
  },
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    badge: "🍃 Grass",
    greeting: [
      "Bulba-Saur! 🍃 Remember to drink water & stretch!",
      "Grow stronger with every completed task! 🌱",
      "Saur-Saur! Plant seeds of greatness today! 🌿",
    ],
    color: "#10b981",
    renderIcon: (isWaving) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Bulb on back */}
        <path
          d="M28 14 C20 18 18 30 28 32 C38 30 36 18 28 14 Z"
          fill="#059669"
        />
        <path d="M28 14 L28 26" stroke="#047857" strokeWidth="1.2" />

        {/* Body */}
        <ellipse cx="28" cy="38" rx="17" ry="12" fill="#34D399" />

        {/* Spots */}
        <circle cx="21" cy="36" r="2.5" fill="#059669" opacity="0.6" />
        <circle cx="34" cy="39" r="2.8" fill="#059669" opacity="0.6" />

        {/* Head */}
        <ellipse cx="28" cy="27" rx="13" ry="10" fill="#34D399" />

        {/* Ears */}
        <polygon points="17,20 19,13 23,19" fill="#34D399" />
        <polygon points="39,20 37,13 33,19" fill="#34D399" />

        {/* Big triangular eyes */}
        <polygon points="21,23 25,23 23,28" fill="#DC2626" />
        <circle cx="22.5" cy="24.5" r="0.8" fill="#FFFFFF" />

        <polygon points="35,23 31,23 33,28" fill="#DC2626" />
        <circle cx="33.5" cy="24.5" r="0.8" fill="#FFFFFF" />

        {/* Smile */}
        <path d="M25 30 Q28 33 31 30" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* 4 Sturdy Feet */}
        <ellipse cx="16" cy="48" rx="3.5" ry="2.5" fill="#059669" />
        <ellipse cx="24" cy="49" rx="3.5" ry="2.5" fill="#059669" />
        <ellipse cx="32" cy="49" rx="3.5" ry="2.5" fill="#059669" />
        <ellipse cx="40" cy="48" rx="3.5" ry="2.5" fill="#059669" />

        {/* Waving Paw */}
        {isWaving && (
          <circle cx="39" cy="34" r="3" fill="#34D399" style={{ animation: "pet-paw-wave 0.35s ease infinite alternate" }} />
        )}
      </svg>
    ),
  },
  {
    id: "charmander",
    name: "Charmander",
    badge: "🔥 Fire",
    greeting: [
      "Char-Char! 🔥 Burn with boundless passion!",
      "Procrastination dragon doesn't stand a chance! ⚔️",
      "Hello Hero! Keep your fire burning bright! 💥",
    ],
    color: "#f97316",
    renderIcon: (isWaving) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Tail */}
        <path d="M12 40 C6 44 4 36 6 30" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Flame */}
        <circle cx="6" cy="28" r="4.5" fill="#EF4444" style={{ animation: "pet-flame 0.4s ease infinite alternate" }} />
        <circle cx="6" cy="28" r="2.5" fill="#FBBF24" />

        {/* Body */}
        <ellipse cx="28" cy="36" rx="14" ry="13" fill="#F97316" />
        {/* Belly */}
        <ellipse cx="28" cy="38" rx="9" ry="9" fill="#FEF08A" />

        {/* Head */}
        <ellipse cx="28" cy="23" rx="13" ry="11" fill="#F97316" />

        {/* Eyes */}
        <ellipse cx="23" cy="21" rx="2.2" ry="3.5" fill="#1E3A8A" />
        <circle cx="22.2" cy="19.5" r="1" fill="#FFFFFF" />

        <ellipse cx="33" cy="21" rx="2.2" ry="3.5" fill="#1E3A8A" />
        <circle cx="32.2" cy="19.5" r="1" fill="#FFFFFF" />

        {/* Cute open smile with tiny fangs */}
        <path d="M25 27 Q28 30 31 27 Z" fill="#991B1B" />
        <polygon points="26,27 27,27 26.5,28.5" fill="#FFFFFF" />
        <polygon points="29.5,27 30.5,27 30,28.5" fill="#FFFFFF" />

        {/* Feet */}
        <ellipse cx="20" cy="48" rx="4" ry="2.5" fill="#EA580C" />
        <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#EA580C" />

        {/* Waving Hand */}
        {isWaving ? (
          <path
            d="M38 32 C43 26 47 24 45 20"
            stroke="#F97316"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ animation: "pet-paw-wave 0.4s ease infinite alternate" }}
          />
        ) : (
          <circle cx="36" cy="36" r="3" fill="#EA580C" />
        )}
      </svg>
    ),
  },
  {
    id: "squirtle",
    name: "Squirtle",
    badge: "💧 Water",
    greeting: [
      "Squirtle-Squirtle! 💧 Stay calm, cool, and focused!",
      "Water washes away all distractions! 🌊",
      "Squad goals! Level up your discipline! 🛡️",
    ],
    color: "#38bdf8",
    renderIcon: (isWaving) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Tail (curly) */}
        <path
          d="M10 40 C6 42 4 36 8 32 C12 28 14 36 10 40 Z"
          fill="#38BDF8"
          style={{ animation: "pet-tail-wag 0.8s ease infinite" }}
        />

        {/* Shell */}
        <circle cx="28" cy="36" r="14" fill="#92400E" />
        <circle cx="28" cy="36" r="11" fill="#FEF08A" />

        {/* Head */}
        <circle cx="28" cy="22" r="13" fill="#7DD3FC" />

        {/* Eyes (reddish brown) */}
        <ellipse cx="23" cy="21" rx="2.5" ry="3.5" fill="#991B1B" />
        <circle cx="22.2" cy="19.5" r="1" fill="#FFFFFF" />

        <ellipse cx="33" cy="21" rx="2.5" ry="3.5" fill="#991B1B" />
        <circle cx="32.2" cy="19.5" r="1" fill="#FFFFFF" />

        {/* Cute smile */}
        <path d="M25 27 Q28 30 31 27" stroke="#0369A1" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Feet */}
        <ellipse cx="20" cy="48" rx="4" ry="2.5" fill="#38BDF8" />
        <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#38BDF8" />

        {/* Waving Paw */}
        {isWaving && (
          <path
            d="M38 32 C43 26 46 23 44 20"
            stroke="#7DD3FC"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ animation: "pet-paw-wave 0.4s ease infinite alternate" }}
          />
        )}
      </svg>
    ),
  },
];

export function ScreenPets() {
  const [petIndex, setPetIndex] = useState(0);
  const [positionX, setPositionX] = useState(-80); // starts off-screen left
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isPaused, setIsPaused] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [enabled, setEnabled] = useState(true);

  const pausePointsRef = useRef<number[]>([25, 55, 80]); // percentages where pet stops to say hi
  const currentPet = PETS[petIndex];

  // Walking loop
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setPositionX((prevX) => {
        if (isPaused) return prevX;

        const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
        const step = 2.2; // walking speed in pixels

        if (direction === "right") {
          const nextX = prevX + step;
          const pct = (nextX / screenW) * 100;

          // Check if pet hits a pause point to wave and say hi
          const shouldPause = pausePointsRef.current.some(
            (p) => Math.abs(pct - p) < 0.6
          );

          if (shouldPause && !isPaused) {
            triggerHiAnimation();
          }

          // Walked off right side -> switch to next pet and come from left
          if (nextX > screenW + 80) {
            setPetIndex((idx) => (idx + 1) % PETS.length);
            return -80;
          }
          return nextX;
        }

        return prevX;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction, isPaused, enabled]);

  // Trigger Hi / Hello animation
  const triggerHiAnimation = () => {
    setIsPaused(true);
    setIsWaving(true);

    const randomGreeting =
      currentPet.greeting[Math.floor(Math.random() * currentPet.greeting.length)];
    setSpeechText(randomGreeting);

    soundEffects.playGoldClink();

    // Add cute floating hearts
    setHearts((prev) => [
      ...prev,
      { id: Date.now(), x: 28, y: -20 },
      { id: Date.now() + 1, x: 42, y: -30 },
    ]);

    // Resume walking after 3.2 seconds
    setTimeout(() => {
      setSpeechText(null);
      setIsWaving(false);
      setIsPaused(false);
    }, 3200);
  };

  // User click on pet -> joy reaction!
  const handlePetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHiAnimation();
    soundEffects.playQuestComplete();
    spawnCombatText(`💖 ${currentPet.name} loves you!`, "xp", positionX + 28, window.innerHeight - 80);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "visible",
      }}
    >
      {/* The Walking Pet Container */}
      <div
        style={{
          position: "absolute",
          left: `${positionX}px`,
          bottom: 4,
          pointerEvents: "auto",
          cursor: "pointer",
          transition: "transform 0.1s ease",
          transform: isWaving ? "scale(1.15) translateY(-6px)" : isPaused ? "scale(1)" : "translateY(0)",
        }}
        onClick={handlePetClick}
        title={`Click on ${currentPet.name} to say Hi!`}
      >
        {/* Cute Speech Bubble when stopping to say Hi */}
        {speechText && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15, 23, 42, 0.95)",
              border: `1.5px solid ${currentPet.color}`,
              borderRadius: "16px",
              padding: "8px 14px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#f8fafc",
              boxShadow: `0 4px 25px ${currentPet.color}40, 0 8px 30px rgba(0,0,0,0.6)`,
              whiteSpace: "nowrap",
              animation: "fct-float 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{speechText}</span>
            {/* Speech bubble pointy arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: `7px solid ${currentPet.color}`,
              }}
            />
          </div>
        )}

        {/* Floating Hearts when waving */}
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              left: `${h.x}px`,
              top: `${h.y}px`,
              fontSize: "16px",
              animation: "fct-float 1.2s ease forwards",
              pointerEvents: "none",
            }}
          >
            💖
          </span>
        ))}

        {/* Pet Avatar with walking bob */}
        <div
          style={{
            animation: !isPaused ? "pet-walk-bob 0.4s ease infinite alternate" : undefined,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
          }}
        >
          {currentPet.renderIcon(isWaving)}
        </div>

        {/* Pet Name Tag */}
        <div
          style={{
            textAlign: "center",
            fontSize: "10px",
            fontWeight: 800,
            color: currentPet.color,
            textShadow: `0 0 8px ${currentPet.color}80, 0 1px 3px rgba(0,0,0,0.8)`,
            marginTop: "-6px",
            letterSpacing: "0.5px",
          }}
        >
          {currentPet.name}
        </div>
      </div>
    </div>
  );
}
