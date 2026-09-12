"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface UseCountdownOptions {
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useCountdown(
  initialSeconds: number,
  options: UseCountdownOptions = {},
) {
  const { autoStart = false, onComplete } = options;

  const [seconds, setSeconds] = useState(
    Math.max(0, Math.floor(initialSeconds)),
  );
  const [isRunning, setIsRunning] = useState(autoStart);

  const reset = useCallback(
    (value = initialSeconds) => {
      setSeconds(Math.max(0, Math.floor(value)));
      setIsRunning(false);
    },
    [initialSeconds],
  );

  const start = useCallback(() => {
    if (seconds > 0) {
      setIsRunning(true);
    }
  }, [seconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const toggle = useCallback(() => {
    setIsRunning((running) => {
      if (!running && seconds <= 0) {
        return false;
      }

      return !running;
    });
  }, [seconds]);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning, seconds, onComplete]);

  const formatted = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }, [seconds]);

  return {
    seconds,
    formatted,
    isRunning,
    isComplete: seconds === 0,
    start,
    pause,
    toggle,
    reset,
  };
}