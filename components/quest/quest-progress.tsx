type QuestProgressProps = {
  current?: number;
  total?: number;
  label?: string;
  showNumbers?: boolean;
  height?: number;
};

export function QuestProgress({
  current = 0,
  total = 1,
  label = "Quest Progress",
  showNumbers = true,
  height = 10,
}: QuestProgressProps) {
  const safeTotal = total > 0 ? total : 1;

  const safeCurrent = Math.min(
    Math.max(current, 0),
    safeTotal
  );

  const percentage = Math.round(
    (safeCurrent / safeTotal) * 100
  );

  const isCompleted =
    safeCurrent >= safeTotal;

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <div>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            {label}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {showNumbers && (
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              {safeCurrent}/{safeTotal}
            </span>
          )}

          <span
            style={{
              color: isCompleted
                ? "var(--emerald)"
                : "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
            }}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: "100%",
          height: `${height}px`,
          overflow: "hidden",
          borderRadius: "999px",
          background: "var(--surface-light)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Progress Fill */}
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background: isCompleted
              ? "var(--emerald)"
              : "var(--violet)",
            transition:
              "width 0.35s ease",
          }}
        />
      </div>

      {/* Completion Status */}
      {isCompleted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            marginTop: "9px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
            }}
          >
            ✓
          </span>

          <span
            style={{
              color: "var(--emerald)",
              fontSize: "10px",
              fontWeight: 900,
            }}
          >
            Quest Completed!
          </span>
        </div>
      )}
    </div>
  );
}