"use client";

import {
  useTheme,
  type ThemeName,
} from "./theme-provider";

type ThemeOption = {
  id: ThemeName;
  name: string;
  icon: string;
  description: string;
};

const themes: ThemeOption[] = [
  {
    id: "dark",
    name: "Dark",
    icon: "🌙",
    description: "Classic dark RPG experience",
  },
  {
    id: "light",
    name: "Light",
    icon: "☀️",
    description: "Clean and bright interface",
  },
  {
    id: "midnight",
    name: "Midnight",
    icon: "🌌",
    description: "Deep blue night adventure",
  },
  {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    description: "Nature-inspired adventure theme",
  },
  {
    id: "royal",
    name: "Royal",
    icon: "👑",
    description: "Premium royal experience",
  },
];

type ThemeSwitcherProps = {
  compact?: boolean;
};

export function ThemeSwitcher({
  compact = false,
}: ThemeSwitcherProps) {
  const {
    theme,
    setTheme,
  } = useTheme();

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          flexWrap: "wrap",
        }}
      >
        {themes.map((themeOption) => {
          const isActive =
            theme === themeOption.id;

          return (
            <button
              key={themeOption.id}
              type="button"
              onClick={() =>
                setTheme(themeOption.id)
              }
              title={themeOption.name}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: isActive
                  ? "2px solid var(--violet)"
                  : "1px solid var(--border)",
                background: isActive
                  ? "rgba(124, 58, 237, 0.12)"
                  : "var(--surface-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                cursor: "pointer",
                transform: isActive
                  ? "scale(1.05)"
                  : "scale(1)",
                transition:
                  "all 0.2s ease",
              }}
            >
              {themeOption.icon}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            display: "block",
            color: "var(--text-muted)",
            fontSize: "9px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Appearance
        </span>

        <h3
          style={{
            margin: "6px 0 0",
            color: "var(--text)",
            fontSize: "19px",
            fontWeight: 900,
          }}
        >
          Choose Your Theme
        </h3>

        <p
          style={{
            margin: "7px 0 0",
            color: "var(--text-muted)",
            fontSize: "10px",
            lineHeight: 1.6,
          }}
        >
          Personalize your Life RPG adventure.
        </p>
      </div>

      {/* Theme Options */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {themes.map((themeOption) => {
          const isActive =
            theme === themeOption.id;

          return (
            <button
              key={themeOption.id}
              type="button"
              onClick={() =>
                setTheme(themeOption.id)
              }
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                border: isActive
                  ? "1px solid var(--violet)"
                  : "1px solid var(--border)",
                background: isActive
                  ? "rgba(124, 58, 237, 0.1)"
                  : "var(--surface-light)",
                color: "var(--text)",
                cursor: "pointer",
                textAlign: "left",
                transition:
                  "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent:
                    "space-between",
                  gap: "10px",
                }}
              >
                {/* Theme Icon */}
                <div
                  style={{
                    width: "43px",
                    height: "43px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: isActive
                      ? "rgba(124, 58, 237, 0.16)"
                      : "var(--surface)",
                    fontSize: "21px",
                  }}
                >
                  {themeOption.icon}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <span
                    style={{
                      width: "21px",
                      height: "21px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background:
                        "var(--violet)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>

              {/* Theme Info */}
              <div
                style={{
                  marginTop: "12px",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 900,
                    color: isActive
                      ? "var(--violet)"
                      : "var(--text)",
                  }}
                >
                  {themeOption.name}
                </strong>

                <span
                  style={{
                    display: "block",
                    marginTop: "5px",
                    color:
                      "var(--text-muted)",
                    fontSize: "9px",
                    lineHeight: 1.5,
                  }}
                >
                  {themeOption.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Theme */}
      <div
        style={{
          marginTop: "18px",
          padding: "13px 15px",
          borderRadius: "12px",
          background:
            "rgba(124, 58, 237, 0.08)",
          border:
            "1px solid rgba(124, 58, 237, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
          }}
        >
          {
            themes.find(
              (item) =>
                item.id === theme
            )?.icon
          }
        </span>

        <div>
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Active Theme
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "3px",
              color: "var(--violet)",
              fontSize: "12px",
              fontWeight: 900,
            }}
          >
            {
              themes.find(
                (item) =>
                  item.id === theme
              )?.name
            }
          </strong>
        </div>
      </div>
    </section>
  );
}