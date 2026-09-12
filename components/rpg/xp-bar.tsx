type XpBarProps = {
  currentXp: number;
  maxXp: number;
  level?: number;
  showLabel?: boolean;
};

export function XpBar({
  currentXp,
  maxXp,
  level,
  showLabel = true,
}: XpBarProps) {
  const percentage =
    maxXp > 0
      ? Math.min((currentXp / maxXp) * 100, 100)
      : 0;

  return (
    <div className="xp-bar">
      <div className="xp-bar-header">
        {level !== undefined ? (
          <span className="xp-bar-level">Level {level}</span>
        ) : null}

        {showLabel ? (
          <span className="xp-bar-text">
            {currentXp} / {maxXp} XP
          </span>
        ) : null}
      </div>

      <div
        className="xp-bar-track"
        role="progressbar"
        aria-valuenow={currentXp}
        aria-valuemin={0}
        aria-valuemax={maxXp}
      >
        <div
          className="xp-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}