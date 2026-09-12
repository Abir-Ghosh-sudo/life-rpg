"use client";

import {
  type ThemeName,
} from "./theme-provider";

type ThemePreviewProps = {
  theme?: ThemeName;
  name?: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
};

const themeStyles: Record<
  ThemeName,
  {
    background: string;
    surface: string;
    accent: string;
    text: string;
    muted: string;
  }
> = {
  dark: {
    background: "#0B0F19",
    surface: "#151B2B",
    accent: "#7C3AED",
    text: "#F8FAFC",
    muted: "#94A3B8",
  },

  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    accent: "#7C3AED",
    text: "#0F172A",
    muted: "#64748B",
  },

  midnight: {
    background: "#020617",
    surface: "#0F172A",
    accent: "#2563EB",
    text: "#E2E8F0",
    muted: "#94A3B8",
  },

  forest: {
    background: "#071A12",
    surface: "#10281D",
    accent: "#22C55E",
    text: "#ECFDF5",
    muted: "#86A69A",
  },

  royal: {
    background: "#160B2D",
    surface: "#251342",
    accent: "#D4AF37",
    text: "#FFF7D6",
    muted: "#B9A98A",
  },
};

export function ThemePreview({
  theme = "dark",
  name = "Dark",
  icon = "🌙",
  active = false,
  onClick,
}: ThemePreviewProps) {
  const colors =
    themeStyles[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "15px",
        border: active
          ? "2px solid var(--violet)"
          : "1px solid var(--border)",
        background: "var(--surface-light)",
        cursor: onClick
          ? "pointer"
          : "default",
        textAlign: "left",
        transition: "all 0.2s ease",
      }}
    >
      {/* Mini UI Preview */}
      <div
        style={{
          width: "100%",
          height: "145px",
          borderRadius: "11px",
          background:
            colors.background,
          padding: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Mini Topbar */}
        <div
          style={{
            height: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "35%",
              height: "6px",
              borderRadius: "999px",
              background:
                colors.surface,
            }}
          />

          <div
            style={{
              width: "16px",
              height: "6px",
              borderRadius: "999px",
              background:
                colors.accent,
            }}
          />
        </div>

        {/* Mini Layout */}
        <div
          style={{
            display: "flex",
            gap: "7px",
            height: "105px",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "25%",
              borderRadius: "7px",
              background:
                colors.surface,
              padding: "7px 5px",
            }}
          >
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    width:
                      item === 1
                        ? "85%"
                        : "65%",
                    height: "5px",
                    marginBottom: "8px",
                    borderRadius:
                      "999px",
                    background:
                      item === 1
                        ? colors.accent
                        : colors.muted,
                    opacity:
                      item === 1
                        ? 1
                        : 0.45,
                  }}
                />
              )
            )}
          </div>

          {/* Main Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection:
                "column",
              gap: "7px",
            }}
          >
            {/* Header */}
            <div
              style={{
                width: "50%",
                height: "8px",
                borderRadius:
                  "999px",
                background:
                  colors.text,
                opacity: 0.8,
              }}
            />

            {/* Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "6px",
                flex: 1,
              }}
            >
              {[1, 2, 3, 4].map(
                (card) => (
                  <div
                    key={card}
                    style={{
                      borderRadius:
                        "7px",
                      background:
                        colors.surface,
                      padding: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "55%",
                        height: "5px",
                        borderRadius:
                          "999px",
                        background:
                          card === 1
                            ? colors.accent
                            : colors.text,
                        opacity:
                          card === 1
                            ? 1
                            : 0.5,
                      }}
                    />

                    <div
                      style={{
                        width: "75%",
                        height: "4px",
                        borderRadius:
                          "999px",
                        background:
                          colors.muted,
                        opacity: 0.35,
                        marginTop: "7px",
                      }}
                    />

                    <div
                      style={{
                        width: "45%",
                        height: "4px",
                        borderRadius:
                          "999px",
                        background:
                          colors.muted,
                        opacity: 0.25,
                        marginTop: "5px",
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Active Badge */}
        {active && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                colors.accent,
              color: "white",
              fontSize: "11px",
              fontWeight: 900,
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            ✓
          </div>
        )}
      </div>

      {/* Theme Information */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: "10px",
          marginTop: "11px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
            }}
          >
            {icon}
          </span>

          <strong
            style={{
              color: active
                ? "var(--violet)"
                : "var(--text)",
              fontSize: "12px",
              fontWeight: 900,
            }}
          >
            {name}
          </strong>
        </div>

        {/* Color Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {[
            colors.background,
            colors.surface,
            colors.accent,
          ].map(
            (color, index) => (
              <span
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius:
                    "50%",
                  background: color,
                  border:
                    "1px solid rgba(255,255,255,0.15)",
                }}
              />
            )
          )}
        </div>
      </div>
    </button>
  );
}