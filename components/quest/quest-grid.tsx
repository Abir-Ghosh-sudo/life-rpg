"use client";

import { ReactNode } from "react";

type QuestListProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  emptyMessage?: string;
  count?: number;
};

export function QuestList({
  title = "Your Quests",
  subtitle = "Complete quests to earn XP, gold, and rewards.",
  children,
  emptyMessage = "No quests available right now.",
  count,
}: QuestListProps) {
  const hasQuests = Boolean(children);

  return (
    <section
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
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
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Quest Journal
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

          <p
            style={{
              margin: "7px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {typeof count === "number" && (
          <div
            style={{
              minWidth: "42px",
              height: "42px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "13px",
              background: "rgba(124, 58, 237, 0.1)",
              border:
                "1px solid rgba(124, 58, 237, 0.2)",
              color: "var(--violet)",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            {count}
          </div>
        )}
      </div>

      {/* Quest List */}
      {hasQuests ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{
            minHeight: "180px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            border: "1px dashed var(--border)",
            background: "var(--surface-light)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background:
                "rgba(124, 58, 237, 0.1)",
              fontSize: "26px",
            }}
          >
            📜
          </div>

          <h3
            style={{
              margin: "14px 0 0",
              color: "var(--text)",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            Quest Journal Empty
          </h3>

          <p
            style={{
              maxWidth: "280px",
              margin: "7px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.6,
            }}
          >
            {emptyMessage}
          </p>
        </div>
      )}
    </section>
  );
}