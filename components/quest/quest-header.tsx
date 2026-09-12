"use client";

type QuestHeaderProps = {
  title?: string;
  subtitle?: string;
  totalQuests?: number;
  completedQuests?: number;
  onCreateQuest?: () => void;
};

export function QuestHeader({
  title = "Quest Board",
  subtitle = "Turn your real-life goals into epic adventures.",
  totalQuests = 12,
  completedQuests = 5,
  onCreateQuest,
}: QuestHeaderProps) {
  const progressPercentage =
    totalQuests > 0
      ? Math.round(
          (completedQuests / totalQuests) * 100
        )
      : 0;

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "18px",
              background:
                "rgba(124, 58, 237, 0.12)",
              border:
                "1px solid rgba(124, 58, 237, 0.2)",
              fontSize: "27px",
              flexShrink: 0,
            }}
          >
            ⚔️
          </div>

          {/* Title */}
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--violet)",
                fontSize: "10px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Your Adventure
            </p>

            <h1
              style={{
                margin: "7px 0 0",
                color: "var(--text)",
                fontSize: "26px",
                fontWeight: 900,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: "7px 0 0",
                color: "var(--text-muted)",
                fontSize: "12px",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Create Button */}
        <button
          type="button"
          onClick={onCreateQuest}
          style={{
            minHeight: "46px",
            padding: "0 18px",
            border: "none",
            borderRadius: "14px",
            background: "var(--violet)",
            color: "white",
            fontSize: "11px",
            fontWeight: 900,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          + Create Quest
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        {/* Total */}
        <div
          style={{
            padding: "15px",
            borderRadius: "15px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Total Quests
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--text)",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            {totalQuests}
          </strong>
        </div>

        {/* Completed */}
        <div
          style={{
            padding: "15px",
            borderRadius: "15px",
            background:
              "rgba(16, 185, 129, 0.08)",
            border:
              "1px solid rgba(16, 185, 129, 0.15)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Completed
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--emerald)",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            {completedQuests}
          </strong>
        </div>

        {/* Remaining */}
        <div
          style={{
            padding: "15px",
            borderRadius: "15px",
            background:
              "rgba(245, 158, 11, 0.08)",
            border:
              "1px solid rgba(245, 158, 11, 0.15)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Remaining
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--gold)",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            {Math.max(
              totalQuests - completedQuests,
              0
            )}
          </strong>
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
            alignItems: "center",
            marginBottom: "9px",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            Quest Completion Progress
          </span>

          <span
            style={{
              color: "var(--violet)",
              fontSize: "11px",
              fontWeight: 900,
            }}
          >
            {progressPercentage}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            overflow: "hidden",
            borderRadius: "999px",
            background: "var(--surface-light)",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              borderRadius: "999px",
              background: "var(--violet)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}