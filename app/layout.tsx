import type { ReactNode } from "react";
import "./globals.css";
import { GameStateProvider } from "@/lib/game/game-context";
import { MysticParticles } from "@/components/rpg/mystic-particles";
import { FloatingCombatText } from "@/components/rpg/floating-combat-text";
import { ScreenPets } from "@/components/rpg/screen-pets";

export const metadata = {
  title: "Life RPG — Level Up Your Real Life",
  description: "Turn your real-life goals into epic quests. Complete tasks, earn XP, and become the hero of your own story.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="page-bg" />
        <MysticParticles />
        <FloatingCombatText />
        <ScreenPets />
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}