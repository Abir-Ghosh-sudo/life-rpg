"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SOUND_CONFIG } from "@/config/sounds";

type SoundKey = keyof typeof SOUND_CONFIG.effects;

interface AudioSettings {
  enabled: boolean;
  volume: number;
}

export function useSound() {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const [settings, setSettings] = useState<AudioSettings>({
    enabled: true,
    volume: 0.7,
  });

  const getSoundPath = useCallback(
    (sound: SoundKey): string | null => {
      const effect = SOUND_CONFIG.effects[sound];

      if (!effect || typeof effect !== "object") {
        return null;
      }

      if ("enabled" in effect && effect.enabled === false) {
        return null;
      }

      if ("src" in effect && typeof effect.src === "string") {
        return effect.src;
      }

      return null;
    },
    [],
  );

  const play = useCallback(
    (sound: SoundKey) => {
      if (!settings.enabled) return;

      const path = getSoundPath(sound);

      if (!path) return;

      let audio = audioCache.current.get(path);

      if (!audio) {
        audio = new Audio(path);
        audio.preload = "auto";
        audioCache.current.set(path, audio);
      }

      audio.volume = Math.max(0, Math.min(1, settings.volume));
      audio.currentTime = 0;

      void audio.play().catch(() => {
        // Browsers may block audio until the user interacts with the page.
      });
    },
    [getSoundPath, settings.enabled, settings.volume],
  );

  const setEnabled = useCallback((enabled: boolean) => {
    setSettings((current) => ({
      ...current,
      enabled,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setSettings((current) => ({
      ...current,
      volume: Math.max(0, Math.min(1, volume)),
    }));
  }, []);

  const toggle = useCallback(() => {
    setSettings((current) => ({
      ...current,
      enabled: !current.enabled,
    }));
  }, []);

  useEffect(() => {
    return () => {
      audioCache.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });

      audioCache.current.clear();
    };
  }, []);

  return {
    play,
    enabled: settings.enabled,
    volume: settings.volume,
    setEnabled,
    setVolume,
    toggle,
  };
}