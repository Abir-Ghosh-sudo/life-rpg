"use client";

type InventoryItemData = {
  id: string;
  name: string;
  icon: string;
  category: "weapon" | "armor" | "accessory" | "cosmetic" | "consumable";
  rarity: "common" | "rare" | "epic" | "legendary";
  quantity?: number;
  equipped?: boolean;
};

type InventoryGridProps = {
  items?: InventoryItemData[];
  onItemClick?: (item: InventoryItemData) => void;
};

const defaultItems: InventoryItemData[] = [
  {
    id: "1",
    name: "Focus Blade",
    icon: "⚔️",
    category: "weapon",
    rarity: "epic",
    equipped: true,
  },
  {
    id: "2",
    name: "Scholar Armor",
    icon: "🛡️",
    category: "armor",
    rarity: "rare",
    equipped: true,
  },
  {
    id: "3",
    name: "XP Ring",
    icon: "💍",
    category: "accessory",
    rarity: "epic",
    equipped: false,
  },
  {
    id: "4",
    name: "Energy Potion",
    icon: "🧪",
    category: "consumable",
    rarity: "common",
    quantity: 5,
  },
  {
    id: "5",
    name: "Golden Crown",
    icon: "👑",
    category: "cosmetic",
    rarity: "legendary",
    equipped: false,
  },
  {
    id: "6",
    name: "Productivity Scroll",
    icon: "📜",
    category: "consumable",
    rarity: "rare",
    quantity: 3,
  },
];

const rarityStyles = {
  common: {
    color: "var(--text-muted)",
    background: "rgba(148, 163, 184, 0.12)",
  },
  rare: {
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
  epic: {
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
  },
  legendary: {
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
};

export function InventoryGrid({
  items = defaultItems,
  onItemClick,
}: InventoryGridProps) {
  return (
    <section
      className="ui-card"
      style={{
        padding: "22px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Your Collection
          </p>

          <h2
            style={{
              margin: "6px 0 0",
              color: "var(--text)",
              fontSize: "21px",
              fontWeight: 900,
            }}
          >
            Inventory
          </h2>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: "var(--surface-light)",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          {items.length} Items
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div
          style={{
            padding: "45px 20px",
            textAlign: "center",
            borderRadius: "18px",
            border: "1px dashed var(--border)",
            background: "var(--surface-light)",
          }}
        >
          <div
            style={{
              fontSize: "40px",
            }}
          >
            🎒
          </div>

          <h3
            style={{
              margin: "12px 0 0",
              color: "var(--text)",
              fontSize: "16px",
              fontWeight: 900,
            }}
          >
            Your inventory is empty
          </h3>

          <p
            style={{
              margin: "7px 0 0",
              color: "var(--text-muted)",
              fontSize: "12px",
            }}
          >
            Complete quests and defeat bosses to collect items.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "14px",
          }}
        >
          {items.map((item) => {
            const rarity =
              rarityStyles[item.rarity];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onItemClick?.(item)
                }
                style={{
                  position: "relative",
                  minHeight: "180px",
                  padding: "16px",
                  borderRadius: "18px",
                  border: `1px solid ${rarity.color}33`,
                  background: "var(--surface-light)",
                  cursor: onItemClick
                    ? "pointer"
                    : "default",
                  textAlign: "left",
                  transition:
                    "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                {/* Equipped Badge */}
                {item.equipped && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "4px 7px",
                      borderRadius: "999px",
                      background:
                        "rgba(16, 185, 129, 0.12)",
                      color: "var(--emerald)",
                      fontSize: "8px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    Equipped
                  </span>
                )}

                {/* Icon */}
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "17px",
                    background: rarity.background,
                    fontSize: "28px",
                    marginBottom: "16px",
                  }}
                >
                  {item.icon}
                </div>

                {/* Name */}
                <h3
                  style={{
                    margin: 0,
                    color: "var(--text)",
                    fontSize: "13px",
                    fontWeight: 900,
                  }}
                >
                  {item.name}
                </h3>

                {/* Category */}
                <p
                  style={{
                    margin: "6px 0 0",
                    color: "var(--text-muted)",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {item.category}
                </p>

                {/* Bottom */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginTop: "13px",
                  }}
                >
                  <span
                    style={{
                      padding: "5px 8px",
                      borderRadius: "8px",
                      background: rarity.background,
                      color: rarity.color,
                      fontSize: "8px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.rarity}
                  </span>

                  {item.quantity !== undefined && (
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "10px",
                        fontWeight: 800,
                      }}
                    >
                      ×{item.quantity}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}