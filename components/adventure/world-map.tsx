import type { ReactNode } from "react";

type WorldMapProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function WorldMap({
  title = "Adventure Map",
  description = "Explore your journey and unlock new regions.",
  children,
}: WorldMapProps) {
  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Life RPG World
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
            {description}
          </p>
        </div>

        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            background: "rgba(79, 70, 229, 0.1)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
          }}
        >
          🗺️
        </div>
      </div>

      <div
        style={{
          position: "relative",
          minHeight: "400px",
          padding: "24px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, var(--surface-light), var(--surface))",
          border: "1px solid var(--border)",
        }}
      >
        {children}
      </div>
    </section>
  );
}