import type { ReactNode } from "react";

type AchievementShowcaseProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export function AchievementShowcase({
  title = "Achievement Showcase",
  subtitle = "Your proudest accomplishments",
  children,
}: AchievementShowcaseProps) {
  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, var(--surface) 0%, var(--surface-light) 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--gold)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            ✦ Hall of Fame
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {title}
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            minWidth: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          🏆
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
        }}
      >
        {children}
      </div>
    </section>
  );
}