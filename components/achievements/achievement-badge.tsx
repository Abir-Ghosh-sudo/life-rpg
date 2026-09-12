type AchievementBadgeProps = {
  label: string;
  unlocked?: boolean;
  size?: "small" | "medium" | "large";
};

export function AchievementBadge({
  label,
  unlocked = false,
  size = "medium",
}: AchievementBadgeProps) {
  const sizes = {
    small: {
      width: "48px",
      height: "48px",
      fontSize: "20px",
    },
    medium: {
      width: "64px",
      height: "64px",
      fontSize: "28px",
    },
    large: {
      width: "88px",
      height: "88px",
      fontSize: "38px",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      title={label}
      style={{
        width: currentSize.width,
        height: currentSize.height,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: currentSize.fontSize,
        background: unlocked
          ? "rgba(245, 158, 11, 0.15)"
          : "var(--surface-light)",
        border: unlocked
          ? "2px solid var(--gold)"
          : "1px solid var(--border)",
        boxShadow: unlocked
          ? "0 6px 18px rgba(245, 158, 11, 0.2)"
          : "none",
        filter: unlocked ? "none" : "grayscale(1)",
        transition: "0.2s ease",
        cursor: "default",
      }}
    >
      {unlocked ? "🏆" : "🔒"}
    </div>
  );
}