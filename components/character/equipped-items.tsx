type EquippedItem = {
  id: string;
  name: string;
  type: string;
  icon: string;
  rarity: string;
  bonus: string;
};

type EquippedItemsProps = {
  items?: EquippedItem[];
};

export function EquippedItems({
  items = [
    {
      id: "weapon",
      name: "Focus Blade",
      type: "Main Weapon",
      icon: "⚔️",
      rarity: "Epic",
      bonus: "+12 Focus",
    },
    {
      id: "armor",
      name: "Scholar Armor",
      type: "Armor",
      icon: "🛡️",
      rarity: "Rare",
      bonus: "+10 Intelligence",
    },
    {
      id: "ring",
      name: "Ring of Discipline",
      type: "Accessory",
      icon: "💍",
      rarity: "Legendary",
      bonus: "+15 Consistency",
    },
    {
      id: "amulet",
      name: "Creative Amulet",
      type: "Amulet",
      icon: "🔮",
      rarity: "Epic",
      bonus: "+10 Creativity",
    },
  ],
}: EquippedItemsProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "var(--gold)";
      case "epic":
        return "var(--violet)";
      case "rare":
        return "var(--indigo)";
      default:
        return "var(--text-muted)";
    }
  };

  return (
    <section className="ui-card">
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
              color: "var(--violet)",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Character Loadout
          </p>

          <h2
            style={{
              margin: "7px 0 0",
              color: "var(--text)",
              fontSize: "24px",
              fontWeight: 900,
            }}
          >
            Equipped Items
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            Your currently equipped items and bonuses.
          </p>
        </div>

        <div
          style={{
            padding: "9px 13px",
            borderRadius: "999px",
            background: "rgba(79, 70, 229, 0.08)",
            color: "var(--indigo)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          🎒 {items.length} Equipped
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {items.map((item) => {
          const rarityColor = getRarityColor(item.rarity);

          return (
            <div
              key={item.id}
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "var(--surface-light)",
                border: `1px solid ${rarityColor}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    background: `${rarityColor}18`,
                  }}
                >
                  {item.icon}
                </div>

                <span
                  style={{
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: `${rarityColor}18`,
                    color: rarityColor,
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {item.rarity}
                </span>
              </div>

              <p
                style={{
                  margin: "16px 0 0",
                  color: "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {item.type}
              </p>

              <h3
                style={{
                  margin: "6px 0 0",
                  color: "var(--text)",
                  fontSize: "17px",
                  fontWeight: 800,
                }}
              >
                {item.name}
              </h3>

              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.08)",
                  color: "var(--emerald)",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                ✨ {item.bonus}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "rgba(79, 70, 229, 0.06)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "13px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        ⚡ Equipped items provide permanent bonuses to your character stats.
      </div>
    </section>
  );
}