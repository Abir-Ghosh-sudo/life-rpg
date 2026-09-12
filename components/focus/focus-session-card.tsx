"use client";

type FocusSessionCardProps = {
  title?: string;
  duration?: number;
  completedMinutes?: number;
  category?: string;
  xpEarned?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  startedAt?: string;
  onClick?: () => void;
};

export function FocusSessionCard({
  title = "Deep Study Session",
  duration = 25,
  completedMinutes = 0,
  category = "Study",
  xpEarned = 0,
  isActive = false,
  isCompleted = false,
  startedAt = "Not started",
  onClick,
}: FocusSessionCardProps) {
  const progress =
    duration > 0
      ? Math.min(
          100,
          Math.round((completedMinutes / duration) * 100)
        )
      : 0;

  const remainingMinutes = Math.max(
    0,
    duration - completedMinutes
  );

  const statusText = isCompleted
    ? "Completed"
    : isActive
      ? "In Progress"
      : "Ready";

  const statusColor = isCompleted
    ? "var(--emerald)"
    : isActive
      ? "var(--violet)"
      : "var(--text-muted)";

  const statusBackground = isCompleted
    ? "rgba(16, 185, 129, 0.1)"
    : isActive
      ? "rgba(124, 58, 237, 0.1)"
      : "var(--surface-light)";

  return (
    <article
      className="ui-card"
      onClick={onClick}
      style={{
        padding: "20px",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minWidth: 0,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "23px",
              background: isCompleted
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(124, 58, 237, 0.1)",
              border: isCompleted
                ? "1px solid rgba(16, 185, 129, 0.22)"
                : "1px solid rgba(124, 58, 237, 0.22)",
            }}
          >
            🎯
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "16px",
                fontWeight: 900,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {category} • {duration} min session
            </p>
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            flexShrink: 0,
            padding: "7px 10px",
            borderRadius: "999px",
            background: statusBackground,
            border: "1px solid var(--border)",
            color: statusColor,
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {isCompleted
            ? "✓ "
            : isActive
              ? "● "
              : "○ "}
          {statusText}
        </div>
      </div>

      {/* Progress */}
      <div
        style={{
          marginTop: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "9px",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
            }}
          >
            Session Progress
          </span>

          <span
            style={{
              color: isCompleted
                ? "var(--emerald)"
                : "var(--violet)",
              fontSize: "11px",
              fontWeight: 900,
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "10px",
            overflow: "hidden",
            borderRadius: "999px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "999px",
              background: isCompleted
                ? "var(--emerald)"
                : "var(--violet)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* Completed */}
        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Focused
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            {completedMinutes}m
          </strong>
        </div>

        {/* Remaining */}
        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Remaining
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            {remainingMinutes}m
          </strong>
        </div>

        {/* XP */}
        <div
          style={{
            padding: "12px",
            borderRadius: "14px",
            background: "rgba(245, 158, 11, 0.08)",
            border:
              "1px solid rgba(245, 158, 11, 0.18)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            XP Earned
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--gold)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            +{xpEarned}
          </strong>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          🕒 {startedAt}
        </span>

        <span
          style={{
            color: isCompleted
              ? "var(--emerald)"
              : isActive
                ? "var(--violet)"
                : "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 900,
          }}
        >
          {isCompleted
            ? "Session Finished"
            : isActive
              ? "Keep Going →"
              : "Start Session →"}
        </span>
      </div>
    </article>
  );
}