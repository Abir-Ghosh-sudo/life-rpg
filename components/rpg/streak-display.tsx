type StreakDisplayProps = {
  streak: number;
  label?: string;
};

export function StreakDisplay({
  streak,
  label = "Day Streak",
}: StreakDisplayProps) {
  return (
    <div className="streak-display">
      <div className="streak-display-icon">
        🔥
      </div>

      <div className="streak-display-content">
        <span className="streak-display-amount">
          {streak}
        </span>

        <span className="streak-display-label">
          {label}
        </span>
      </div>
    </div>
  );
}