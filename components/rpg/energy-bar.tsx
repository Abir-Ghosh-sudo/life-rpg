type EnergyBarProps = {
  currentEnergy: number;
  maxEnergy: number;
  showLabel?: boolean;
};

export function EnergyBar({
  currentEnergy,
  maxEnergy,
  showLabel = true,
}: EnergyBarProps) {
  const percentage =
    maxEnergy > 0
      ? Math.min((currentEnergy / maxEnergy) * 100, 100)
      : 0;

  return (
    <div className="energy-bar">
      {showLabel ? (
        <div className="energy-bar-header">
          <span className="energy-bar-label">Energy</span>

          <span className="energy-bar-text">
            {currentEnergy} / {maxEnergy}
          </span>
        </div>
      ) : null}

      <div
        className="energy-bar-track"
        role="progressbar"
        aria-valuenow={currentEnergy}
        aria-valuemin={0}
        aria-valuemax={maxEnergy}
      >
        <div
          className="energy-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}