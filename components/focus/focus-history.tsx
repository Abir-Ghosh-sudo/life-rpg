"use client";

type FocusHistoryItem = {
  id: string;
  title: string;
  category: string;
  duration: number;
  xpEarned: number;
  completedAt: string;
  status?: "completed" | "skipped";
};

type FocusHistoryProps = {
  sessions?: FocusHistoryItem[];
  title?: string;
  onViewAll?: () => void;
};

const defaultSessions: FocusHistoryItem[] = [
  {
    id: "1",
    title: "Deep Study Session",
    category: "Study",
    duration: 25,
    xpEarned: 120,
    completedAt: "Today, 10:30 AM",
    status: "completed",
  },
  {
    id: "2",
    title: "DSA Practice",
    category: "Coding",
    duration: 45,
    xpEarned: 220,
    completedAt: "Today, 8:15 AM",
    status: "completed",
  },
  {
    id: "3",
    title: "Project Development",
    category: "Development",
    duration: 60,
    xpEarned: 300,
    completedAt: "Yesterday, 7:00 PM",
    status: "completed",
  },
  {
    id: "4",
    title: "Quick Revision",
    category: "Study",
    duration: 15,
    xpEarned: 0,
    completedAt: "Yesterday, 4:30 PM",
    status: "skipped",
  },
];

export function FocusHistory({
  sessions = defaultSessions,
  title = "Focus History",
  onViewAll,
}: FocusHistoryProps) {
  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  );

  const totalMinutes = completedSessions.reduce(
    (total, session) => total + session.duration,
    0
  );

  const totalXp = completedSessions.reduce(
    (total, session) => total + session.xpEarned,
    0
  );

  return (
    <section
      className="ui-card"
      style={{
        padding: "22px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Your Journey
          </p>

          <h2
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface-light)",
            color: "var(--violet)",
            padding: "9px 13px",
            borderRadius: "10px",
            fontSize: "11px",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          View All →
        </button>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            padding: "13px",
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
            Sessions
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "var(--text)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            {completedSessions.length}
          </strong>
        </div>

        <div
          style={{
            padding: "13px",
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
            Focus Time
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "var(--text)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            {totalMinutes}m
          </strong>
        </div>

        <div
          style={{
            padding: "13px",
            borderRadius: "14px",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.18)",
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
            Total XP
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "var(--gold)",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            +{totalXp}
          </strong>
        </div>
      </div>

      {/* History List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {sessions.length === 0 ? (
          <div
            style={{
              padding: "30px 16px",
              textAlign: "center",
              borderRadius: "16px",
              background: "var(--surface-light)",
              border: "1px dashed var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
              }}
            >
              🎯
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              No focus sessions yet.
            </p>
          </div>
        ) : (
          sessions.map((session) => {
            const isCompleted =
              session.status === "completed";

            return (
              <div
                key={session.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "13px",
                  borderRadius: "15px",
                  background: "var(--surface-light)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    flexShrink: 0,
                    borderRadius: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "19px",
                    background: isCompleted
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                    border: isCompleted
                      ? "1px solid rgba(16, 185, 129, 0.2)"
                      : "1px solid rgba(245, 158, 11, 0.2)",
                  }}
                >
                  {isCompleted ? "🎯" : "⏭"}
                </div>

                {/* Session Info */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      color: "var(--text)",
                      fontSize: "13px",
                      fontWeight: 900,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {session.title}
                  </strong>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "var(--text-muted)",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    {session.category} • {session.completedAt}
                  </p>
                </div>

                {/* Stats */}
                <div
                  style={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      color: isCompleted
                        ? "var(--text)"
                        : "var(--text-muted)",
                      fontSize: "12px",
                      fontWeight: 900,
                    }}
                  >
                    {session.duration} min
                  </strong>

                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      color: isCompleted
                        ? "var(--gold)"
                        : "var(--text-muted)",
                      fontSize: "10px",
                      fontWeight: 800,
                    }}
                  >
                    {isCompleted
                      ? `+${session.xpEarned} XP`
                      : "Skipped"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}