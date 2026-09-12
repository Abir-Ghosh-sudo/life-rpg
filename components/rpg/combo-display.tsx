type ComboDisplayProps = {
  combo: number;
  label?: string;
};

export function ComboDisplay({
  combo,
  label = "Combo",
}: ComboDisplayProps) {
  return (
    <div className="combo-display">
      <div className="combo-display-icon">⚡</div>

      <div className="combo-display-content">
        <span className="combo-display-amount">
          {combo}x
        </span>

        <span className="combo-display-label">
          {label}
        </span>
      </div>
    </div>
  );
}