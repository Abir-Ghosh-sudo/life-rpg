import type { ReactNode } from "react";

type GameTooltipProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function GameTooltip({
  title,
  description,
  children,
}: GameTooltipProps) {
  return (
    <div className="game-tooltip-wrapper">
      {children}

      <div className="game-tooltip">
        <h4 className="game-tooltip-title">
          {title}
        </h4>

        <p className="game-tooltip-description">
          {description}
        </p>
      </div>
    </div>
  );
}