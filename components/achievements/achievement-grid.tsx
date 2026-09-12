import type { ReactNode } from "react";

type AchievementGridProps = {
  children: ReactNode;
};

export function AchievementGrid({
  children,
}: AchievementGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}