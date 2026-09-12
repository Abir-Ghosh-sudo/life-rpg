"use client";

type ItemRarity =
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary";

type ItemPreviewProps = {
  name?: string;
  description?: string;
  category?: string;
  rarity?: ItemRarity;
  price?: number;
  icon?: string;
  effect?: string;
};

export function ItemPreview({
  name = "Focus Potion",
  description = "Boost your focus and stay productive during difficult quests.",
  category = "Consumable",
  rarity = "Common",
  price = 50,
  icon = "🧪",
  effect = "Increases focus power for your next quest.",
}: ItemPreviewProps) {
  const rarityColors: Record<
    ItemRarity,
    string
  > = {
    Common: "var(--text-muted)",
    Rare: "#3B82F6",
    Epic: "var(--violet)",
    Legendary: "var(--gold)",
  };

  const rarityColor =
    rarityColors[rarity];

  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          top: "-90px",
          right: "-70px",
          background: `${rarityColor}10`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns:
            "minmax(120px, 180px) 1fr",
          gap: "28px",
          alignItems: "center",
        }}
      >
        {/* Item Visual */}
        <div
          style={{
            minHeight: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            background: `${rarityColor}12`,
            border: `1px solid ${rarityColor}30`,
            fontSize: "72px",
          }}
        >
          {icon}
        </div>

        {/* Item Details */}
        <div>
          {/* Category */}
          <span
            style={{
              display: "inline-block",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {category}
          </span>

          {/* Title + Rarity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "7px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "var(--text)",
                fontSize: "24px",
                fontWeight: 900,
              }}
            >
              {name}
            </h2>

            <span
              style={{
                padding: "6px 10px",
                borderRadius: "999px",
                border: `1px solid ${rarityColor}`,
                color: rarityColor,
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              ✨ {rarity}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              margin: "12px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            {description}
          </p>

          {/* Effect */}
          <div
            style={{
              marginTop: "18px",
              padding: "14px",
              borderRadius: "13px",
              background: `${rarityColor}0D`,
              border: `1px solid ${rarityColor}20`,
            }}
          >
            <span
              style={{
                display: "block",
                color: rarityColor,
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Item Effect
            </span>

            <p
              style={{
                margin: "6px 0 0",
                color: "var(--text)",
                fontSize: "11px",
                lineHeight: 1.6,
                fontWeight: 700,
              }}
            >
              ⚡ {effect}
            </p>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "9px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Price
            </span>

            <strong
              style={{
                color: "var(--gold)",
                fontSize: "21px",
                fontWeight: 900,
              }}
            >
              🪙 {price.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}