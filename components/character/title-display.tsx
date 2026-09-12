type TitleDisplayProps = {
  title?: string;
  subtitle?: string;
  icon?: string;
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  unlocked?: boolean;
};

export function TitleDisplay({
  title = "Rising Hero",
  subtitle = "Earned through dedication and continuous progress.",
  icon = "👑",
  rarity = "Epic",
  unlocked = true,
}: TitleDisplayProps) {
  const rarityStyles = {
    Common: {
      color: "var(--text-muted)",
      background: "var(--surface-light)",
    },
    Rare: {
      color: "var(--indigo)",
      background: "rgba(79, 70, 229, 0.1)",
    },
    Epic: {
      color: "var(--violet)",
      background: "rgba(124, 58, 237, 0.1)",
    },
    Legendary: {
      color: "var(--gold)",
      background: "rgba(245, 158, 11, 0.1)",
    },
  };

  const style = rarityStyles[rarity];

  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        overflow: "hidden",
        opacity: unlocked ? 1 : 0.7,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          top: "-80px",
          right: "-60px",
          background: unlocked
            ? style.background
            : "var(--surface-light)",
          filter: "blur(10px)",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Character Title
            </p>

            <h2
              style={{
                margin: "7px 0 0",
                color: "var(--text)",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              Title Display
            </h2>
          </div>

          <span
            style={{
              padding: "6px 11px",
              borderRadius: "999px",
              background: unlocked
                ? style.background
                : "var(--surface-light)",
              color: unlocked
                ? style.color
                : "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {unlocked ? rarity : "Locked"}
          </span>
        </div>

        <div
          style={{
            marginTop: "24px",
            padding: "24px",
            borderRadius: "20px",
            background: unlocked
              ? `linear-gradient(135deg, ${style.background}, var(--surface-light))`
              : "var(--surface-light)",
            border: `1px solid ${
              unlocked ? style.color : "var(--border)"
            }`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              background: unlocked
                ? style.background
                : "var(--surface)",
              filter: unlocked ? "none" : "grayscale(1)",
            }}
          >
            {unlocked ? icon : "🔒"}
          </div>

          <h3
            style={{
              margin: "18px 0 0",
              color: unlocked ? style.color : "var(--text-muted)",
              fontSize: "26px",
              fontWeight: 900,
            }}
          >
            {unlocked ? title : "Unknown Title"}
          </h3>

          <p
            style={{
              margin: "9px auto 0",
              maxWidth: "420px",
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            {unlocked
              ? subtitle
              : "Continue your journey to unlock this character title."}
          </p>
        </div>

        <div
          style={{
            marginTop: "18px",
            padding: "14px 16px",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              STATUS
            </p>

            <p
              style={{
                margin: "5px 0 0",
                color: unlocked
                  ? "var(--emerald)"
                  : "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              {unlocked
                ? "✓ Title Equipped"
                : "🔒 Title Locked"}
            </p>
          </div>

          <span
            style={{
              color: unlocked
                ? style.color
                : "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            {unlocked ? `🏅 ${rarity}` : "Keep progressing"}
          </span>
        </div>
      </div>
    </section>
  );
}