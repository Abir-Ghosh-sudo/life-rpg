import { ItemCard } from "./item-card";

type ShopItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  price: number;
  icon?: string;
};

type ShopGridProps = {
  items?: ShopItem[];
  onPurchase?: (itemId: string) => void;
};

const defaultItems: ShopItem[] = [
  {
    id: "1",
    name: "Focus Potion",
    description:
      "Boost your focus and stay productive during difficult quests.",
    category: "Consumable",
    rarity: "Common",
    price: 50,
    icon: "🧪",
  },
  {
    id: "2",
    name: "XP Scroll",
    description:
      "Gain extra experience points for your next completed quest.",
    category: "Boost",
    rarity: "Rare",
    price: 120,
    icon: "📜",
  },
  {
    id: "3",
    name: "Warrior Armor",
    description:
      "A powerful armor set for your character collection.",
    category: "Armor",
    rarity: "Epic",
    price: 350,
    icon: "🛡️",
  },
  {
    id: "4",
    name: "Golden Crown",
    description:
      "A legendary cosmetic item for the greatest adventurers.",
    category: "Cosmetic",
    rarity: "Legendary",
    price: 1000,
    icon: "👑",
  },
];

export function ShopGrid({
  items = defaultItems,
  onPurchase,
}: ShopGridProps) {
  if (items.length === 0) {
    return (
      <div
        className="ui-card"
        style={{
          width: "100%",
          padding: "45px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "42px",
          }}
        >
          🏪
        </div>

        <h3
          style={{
            margin: "14px 0 0",
            color: "var(--text)",
            fontSize: "17px",
            fontWeight: 900,
          }}
        >
          Shop is Empty
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            lineHeight: 1.6,
          }}
        >
          New items will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <section
      style={{
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Merchant Inventory
          </p>

          <h2
            style={{
              margin: "5px 0 0",
              color: "var(--text)",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            Shop Items
          </h2>
        </div>

        <span
          style={{
            padding: "7px 11px",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.1)",
            color: "var(--violet)",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {items.length} Items
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            category={item.category}
            rarity={item.rarity}
            price={item.price}
            icon={item.icon}
            onPurchase={() =>
              onPurchase?.(item.id)
            }
          />
        ))}
      </div>
    </section>
  );
}