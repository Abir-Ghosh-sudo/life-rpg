type GoldDisplayProps = {
  amount: number;
  label?: string;
};

export function GoldDisplay({
  amount,
  label = "Gold",
}: GoldDisplayProps) {
  return (
    <div className="gold-display">
      <div className="gold-display-icon">
        🪙
      </div>

      <div className="gold-display-content">
        <span className="gold-display-amount">
          {amount.toLocaleString()}
        </span>

        <span className="gold-display-label">
          {label}
        </span>
      </div>
    </div>
  );
}