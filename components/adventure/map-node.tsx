type MapNodeProps = {
  title: string;
  icon?: string;
  unlocked?: boolean;
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export function MapNode({
  title,
  icon = "📍",
  unlocked = false,
  completed = false,
  active = false,
  onClick,
}: MapNodeProps) {
  const background = completed
    ? "rgba(16, 185, 129, 0.12)"
    : active
      ? "rgba(79, 70, 229, 0.12)"
      : unlocked
        ? "var(--surface)"
        : "var(--surface-light)";

  const borderColor = completed
    ? "var(--emerald)"
    : active
      ? "var(--indigo)"
      : unlocked
        ? "var(--border)"
        : "var(--border)";

  return (
    <button
      type="button"
      onClick={unlocked ? onClick : undefined}
      disabled={!unlocked}
      title={title}
      style={{
        width: "100%",
        minHeight: "92px",
        padding: "14px",
        borderRadius: "16px",
        border: `2px solid ${borderColor}`,
        background,
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: unlocked ? "pointer" : "not-allowed",
        opacity: unlocked ? 1 : 0.6,
        boxShadow: active
          ? "0 8px 20px rgba(79, 70, 229, 0.15)"
          : "none",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(event) => {
        if (unlocked) {
          event.currentTarget.style.transform = "translateY(-3px)";
        }
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          fontSize: "28px",
          lineHeight: 1,
        }}
      >
        {completed ? "✓" : unlocked ? icon : "🔒"}
      </span>

      <span
        style={{
          fontSize: "13px",
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        {title}
      </span>

      {completed ? (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--emerald)",
          }}
        >
          Completed
        </span>
      ) : active ? (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--indigo)",
          }}
        >
          Current
        </span>
      ) : null}
    </button>
  );
}