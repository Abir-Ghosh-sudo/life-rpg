type ProgressProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
};

export function Progress({
  value,
  max = 100,
  label,
  showValue = true,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(
    Math.max((value / max) * 100, 0),
    100
  );

  return (
    <div className={`ui-progress ${className}`}>
      {(label || showValue) && (
        <div className="ui-progress-header">
          {label ? (
            <span className="ui-label">{label}</span>
          ) : (
            <span />
          )}

          {showValue ? (
            <span className="ui-progress-value">
              {Math.round(percentage)}%
            </span>
          ) : null}
        </div>
      )}

      <div className="ui-progress-track">
        <div
          className="ui-progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}