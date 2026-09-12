"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeName =
  | "dark"
  | "light"
  | "midnight"
  | "forest"
  | "royal";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemeName;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] =
    useState<ThemeName>(defaultTheme);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "life-rpg-theme"
      ) as ThemeName | null;

    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "life-rpg-theme",
      theme
    );
  }, [theme]);

  const setTheme = (
    selectedTheme: ThemeName
  ) => {
    setThemeState(selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}