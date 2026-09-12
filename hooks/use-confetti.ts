"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  rotationSpeed: number;
  size: number;
}

interface ConfettiOptions {
  count?: number;
  duration?: number;
}

export function useConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fire = useCallback(
    (options: ConfettiOptions = {}) => {
      const count = options.count ?? 80;
      const duration = options.duration ?? 3000;

      const nextParticles: ConfettiParticle[] = Array.from(
        { length: count },
        (_, index) => ({
          id: Date.now() + index,
          x: 50 + (Math.random() - 0.5) * 20,
          y: 45 + (Math.random() - 0.5) * 10,
          rotation: Math.random() * 360,
          velocityX: (Math.random() - 0.5) * 14,
          velocityY: -(Math.random() * 10 + 7),
          gravity: 0.25 + Math.random() * 0.15,
          rotationSpeed: (Math.random() - 0.5) * 15,
          size: 5 + Math.random() * 7,
        }),
      );

      setParticles(nextParticles);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setParticles([]);
        timeoutRef.current = null;
      }, duration);
    },
    [],
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setParticles([]);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    particles,
    fire,
    clear,
    isActive: particles.length > 0,
  };
}