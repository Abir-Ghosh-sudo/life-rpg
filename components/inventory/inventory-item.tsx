"use client";

type ItemCategory =
  | "weapon"
  | "armor"
  | "accessory"
  | "cosmetic"
  | "consumable";

type ItemRarity =
  | "common"
  | "rare"
  | "epic"
  | "legendary";

type InventoryItemProps = {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  category?: ItemCategory;
  rarity?: ItemRarity;
  quantity?: number;
  equipped?: boolean;
  onClick?: () => void;
};

const rarityStyles: Record<
  ItemRarity,
  {
    color: string;
    background: string;
    border: string;
  }
> = {
  common: {
    color: "var(--text-muted)",
    background: "rgba(148, 163, 184, 0.12)",
    border: "rgba(148, 163, 184, 0.25)",
  },

  rare: {
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
    border: "rgba(124, 58, 237, 0.3)",
  },

  epic: {
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
    border: "rgba(244, 63, 94, 0.3)",
  },

  legendary: {
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.35)",
  },
};

const categoryIcons: Record<
  ItemCategory,
  string
> = {
  weapon: "⚔️",
  armor: "🛡️",
  accessory: "💍",
  cosmetic: "👑",
  consumable: "🧪",
};

export function InventoryItem({
  name = "Focus Blade",
  description = "A powerful item that improves your productivity.",
  icon,
  category = "weapon",
  rarity = "epic",
  quantity = 1,
  equipped = false,
  onClick,
}: InventoryItemProps) {
  const rarityStyle =
    rarityStyles[rarity];

  const displayIcon =
    icon || categoryIcons[category];

  return (
    <article
      onClick={onClick}
      style={{
        position: "relative",
        width: "100%",
        padding: "16px",
        borderRadius: "18px",
        border: `1px solid ${rarityStyle.border}`,
        background: "var(--surface-light)",
        cursor: onClick
          ? "pointer"
          : "default",
        transition:
          "transform 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Equipped Badge */}
      {equipped && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "5px 8px",
            borderRadius: "999px",
            background:
              "rgba(16, 185, 129, 0.12)",
            border:
              "1px solid rgba(16, 185, 129, 0.2)",
            color: "var(--emerald)",
            fontSize: "8px",
            fontWeight: 900,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          ✓ Equipped
        </div>
      )}

      {/* Item Icon */}
      <div
        style={{
          width: "62px",
          height: "62px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "18px",
          background:
            rarityStyle.background,
          border: `1px solid ${rarityStyle.border}`,
          fontSize: "30px",
          marginBottom: "16px",
        }}
      >
        {displayIcon}
      </div>

      {/* Item Name */}
      <h3
        style={{
          margin: 0,
          color: "var(--text)",
          fontSize: "14px",
          fontWeight: 900,
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "7px 0 0",
          color: "var(--text-muted)",
          fontSize: "11px",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {/* Category */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {categoryIcons[category]}
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 800,
            textTransform: "capitalize",
          }}
        >
          {category}
        </span>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: "10px",
          marginTop: "16px",
          paddingTop: "13px",
          borderTop:
            "1px solid var(--border)",
        }}
      >
        {/* Rarity */}
        <span
          style={{
            padding: "5px 9px",
            borderRadius: "9px",
            background:
              rarityStyle.background,
            color: rarityStyle.color,
            border: `1px solid ${rarityStyle.border}`,
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {rarity}
        </span>

        {/* Quantity */}
        {quantity > 1 && (
          <span
            style={{
              padding: "5px 9px",
              borderRadius: "9px",
              background:
                "var(--surface)",
              color:
                "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 900,
            }}
          >
            × {quantity}
          </span>
        )}
      </div>
    </article>
  );
}