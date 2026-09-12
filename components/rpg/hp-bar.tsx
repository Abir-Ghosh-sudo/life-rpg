type HpBarProps = {
  currentHp: number;
  maxHp: number;
  showLabel?: boolean;
};

export function HpBar({
  currentHp,
  maxHp,
  showLabel = true,
}: HpBarProps) {
  const percentage =
    maxHp > 0
      ? Math.min((currentHp / maxHp) * 100, 100)
      : 0;

  return (
    <div className="hp-bar">
      {showLabel ? (
        <div className="hp-bar-header">
          <span className="hp-bar-label">Health</span>

          <span className="hp-bar-text">
            {currentHp} / {maxHp} HP
          </span>
        </div>
      ) : null}

      <div
        className="hp-bar-track"
        role="progressbar"
        aria-valuenow={currentHp}
        aria-valuemin={0}
        aria-valuemax={maxHp}
      >
        <div
          className="hp-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}