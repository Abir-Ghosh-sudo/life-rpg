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

type ItemDetailsProps = {
  name?: string;
  description?: string;
  icon?: string;
  category?: ItemCategory;
  rarity?: ItemRarity;
  quantity?: number;
  equipped?: boolean;
  level?: number;
  power?: number;
  bonus?: string;
  onClose?: () => void;
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

export function ItemDetails({
  name = "Focus Blade",
  description = "A powerful weapon forged for warriors who want to defeat procrastination and stay focused on their goals.",
  icon,
  category = "weapon",
  rarity = "epic",
  quantity = 1,
  equipped = false,
  level = 12,
  power = 85,
  bonus = "+15% Focus XP",
  onClose,
}: ItemDetailsProps) {
  const rarityStyle =
    rarityStyles[rarity];

  const displayIcon =
    icon || categoryIcons[category];

  return (
    <section
      className="ui-card"
      style={{
        position: "relative",
        width: "100%",
        padding: "24px",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background */}
      <div
        style={{
          position: "absolute",
          top: "-70px",
          right: "-70px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            rarityStyle.background,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 2,
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background:
              "var(--surface-light)",
            color: "var(--text-muted)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      )}

      {/* Top */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-start",
          gap: "18px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "82px",
            height: "82px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "22px",
            background:
              rarityStyle.background,
            border: `1px solid ${rarityStyle.border}`,
            fontSize: "38px",
          }}
        >
          {displayIcon}
        </div>

        {/* Main Info */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            paddingRight: onClose
              ? "35px"
              : 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "5px 9px",
                borderRadius: "999px",
                background:
                  rarityStyle.background,
                color: rarityStyle.color,
                border: `1px solid ${rarityStyle.border}`,
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {rarity}
            </span>

            {equipped && (
              <span
                style={{
                  padding: "5px 9px",
                  borderRadius: "999px",
                  background:
                    "rgba(16, 185, 129, 0.12)",
                  color:
                    "var(--emerald)",
                  fontSize: "8px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
                ✓ Equipped
              </span>
            )}
          </div>

          <h2
            style={{
              margin: "10px 0 0",
              color: "var(--text)",
              fontSize: "23px",
              fontWeight: 900,
            }}
          >
            {name}
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {categoryIcons[category]} {category}
          </p>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "22px",
          padding: "16px",
          borderRadius: "15px",
          border: "1px solid var(--border)",
          background: "var(--surface-light)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
            fontSize: "12px",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "10px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Level
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--text)",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            {level}
          </strong>
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Power
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: rarityStyle.color,
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            {power}
          </strong>
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "var(--surface-light)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Quantity
          </p>

          <strong
            style={{
              display: "block",
              marginTop: "7px",
              color: "var(--text)",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            ×{quantity}
          </strong>
        </div>
      </div>

      {/* Bonus */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "16px",
          padding: "15px",
          borderRadius: "15px",
          background:
            "rgba(124, 58, 237, 0.08)",
          border:
            "1px solid rgba(124, 58, 237, 0.18)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
            fontSize: "9px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          Special Bonus
        </p>

        <strong
          style={{
            display: "block",
            marginTop: "7px",
            color: "var(--violet)",
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          ✨ {bonus}
        </strong>
      </div>
    </section>
  );
}