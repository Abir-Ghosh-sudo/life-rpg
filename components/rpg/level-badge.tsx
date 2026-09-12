type LevelBadgeProps = {
  level: number;
  size?: "small" | "medium" | "large";
};

export function LevelBadge({
  level,
  size = "medium",
}: LevelBadgeProps) {
  return (
    <div
      className={`level-badge level-badge-${size}`}
      aria-label={`Level ${level}`}
    >
      <span className="level-badge-label">LVL</span>

      <span className="level-badge-number">
        {level}
      </span>
    </div>
  );
}