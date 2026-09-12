"use client";

import { useEffect, useMemo, useState } from "react";

type ConfettiProps = {
  show?: boolean;
  pieces?: number;
  duration?: number;
  onComplete?: () => void;
};

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
};

export function Confetti({
  show = true,
  pieces = 70,
  duration = 3500,
  onComplete,
}: ConfettiProps) {
  const [visible, setVisible] = useState(show);

  const confettiPieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: pieces }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 1.8,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
  }, [pieces, show]);

  useEffect(() => {
    setVisible(show);

    if (!show) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [show, duration, onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {confettiPieces.map((piece) => (
        <span
          key={piece.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.65}px`,
            borderRadius: "2px",
            background: [
              "var(--violet)",
              "var(--gold)",
              "var(--emerald)",
              "var(--rose)",
              "var(--indigo)",
            ][piece.id % 5],
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confettiFall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}