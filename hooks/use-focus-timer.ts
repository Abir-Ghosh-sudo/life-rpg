"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FocusTimerOptions {
  durationMinutes?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useFocusTimer(
  options: FocusTimerOptions = {},
) {
  const {
    durationMinutes = 25,
    autoStart = false,
    onComplete,
  } = options;

  const initialSeconds = Math.max(
    60,
    Math.floor(durationMinutes * 60),
  );

  const [remainingSeconds, setRemainingSeconds] =
    useState(initialSeconds);
  const [isRunning, setIsRunning] =
    useState(autoStart);
  const [isCompleted, setIsCompleted] =
    useState(false);

  const completedRef = useRef(false);

  const start = useCallback(() => {
    if (remainingSeconds > 0 && !isCompleted) {
      setIsRunning(true);
    }
  }, [remainingSeconds, isCompleted]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (minutes = durationMinutes) => {
      const seconds = Math.max(
        60,
        Math.floor(minutes * 60),
      );

      completedRef.current = false;
      setRemainingSeconds(seconds);
      setIsRunning(false);
      setIsCompleted(false);
    },
    [durationMinutes],
  );

  const complete = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;
    setRemainingSeconds(0);
    setIsRunning(false);
    setIsCompleted(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning || isCompleted) {
      return;
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          completedRef.current = true;
          setIsRunning(false);
          setIsCompleted(true);
          onComplete?.();

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, isCompleted, onComplete]);

  const minutes = Math.floor(
    remainingSeconds / 60,
  );

  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

  const totalSeconds = initialSeconds;

  const progress =
    totalSeconds > 0
      ? Math.min(
          100,
          Math.max(
            0,
            ((totalSeconds - remainingSeconds) /
              totalSeconds) *
              100,
          ),
        )
      : 0;

  return {
    remainingSeconds,
    formattedTime,
    progress,
    isRunning,
    isCompleted,
    start,
    pause,
    reset,
    complete,
  };
}