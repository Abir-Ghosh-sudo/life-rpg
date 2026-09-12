"use client";

import { useState } from "react";
import { useGameState } from "@/lib/game/game-context";

const shopCatalog = [
  {
    id: "sp-1",
    name: "Focus Potion",
    desc: "A brewed elixir that immediately restores 20 energy points and sharpens clarity.",
    price: 50,
    icon: "🧪",
    rarity: "Common",
    rarityClass: "badge-blue",
    perk: "+20 Energy Restored",
    type: "Consumable" as const,
    category: "Potions",
  },
  {
    id: "sp-2",
    name: "Consistency Shield",
    desc: "Forged from daily perseverance. Protects your streak from breaking for 1 missed day.",
    price: 150,
    icon: "🛡️",
    rarity: "Rare",
    rarityClass: "badge-violet",
    perk: "+20 Resilience & Streak Guard",
    stat: "+20 Resilience",
    type: "Armor" as const,
    category: "Equipment",
  },
  {
    id: "sp-3",
    name: "Golden Hourglass",
    desc: "An enchanted relic that grants bonus XP rewards on all pomodoro focus sprints.",
    price: 200,
    icon: "⏳",
    rarity: "Epic",
    rarityClass: "badge-gold",
    perk: "+25% Focus Session XP",
    stat: "+25% Focus XP",
    type: "Accessory" as const,
    category: "Artifacts",
  },
  {
    id: "sp-4",
    name: "Blade of Discipline",
    desc: "Honed by relentless habit repetition. Deals massive bonus strike against the Daily Boss.",
    price: 320,
    icon: "⚔️",
    rarity: "Legendary",
    rarityClass: "badge-rose",
    perk: "+50 Daily Boss DMG",
    stat: "+50 Boss DMG",
    type: "Weapon" as const,
    category: "Equipment",
  },
  {
    id: "sp-5",
    name: "Elixir of Vitality",
    desc: "Revitalizes physical endurance after grueling workout quests.",
    price: 75,
    icon: "🍷",
    rarity: "Common",
    rarityClass: "badge-blue",
    perk: "+15 Physical Recovery",
    type: "Consumable" as const,
    category: "Potions",
  },
  {
    id: "sp-6",
    name: "Tome of Deep Wisdom",
    desc: "Ancient scrolls that amplify knowledge gained from study and reading quests.",
    price: 180,
    icon: "📖",
    rarity: "Rare",
    rarityClass: "badge-violet",
    perk: "+20% Study Quest XP",
    stat: "+20% Study XP",
    type: "Accessory" as const,
    category: "Artifacts",
  },
];

export default function ShopPage() {
  const { character, buyItem } = useGameState();
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" ? shopCatalog : shopCatalog.filter((i) => i.category === filter);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
        <div>
          <div className="badge badge-gold" style={{ marginBottom: "8px" }}>
            🛒 Grand Bazaar
          </div>
          <h1 className="page-title">Hero&apos;s Merchant</h1>
          <p className="page-subtitle">
            Exchange your earned quest loot for artifacts, elixirs, and legendary combat gear.
          </p>
        </div>

        {/* Gold & Inventory link */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div className="stat-card" style={{ padding: "12px 20px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <span style={{ fontSize: "24px" }}>💰</span>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Available Gold</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--gold-light)" }}>{character.gold} GP</div>
            </div>
          </div>
          <a href="/inventory" className="btn btn-outline-violet">
            🎒 Inventory →
          </a>
        </div>
      </div>

      {/* Category filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", overflowX: "auto", paddingBottom: "4px" }}>
        {["All", "Potions", "Equipment", "Artifacts"].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm ${filter === cat ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid-3">
        {filteredItems.map((item) => {
          const canAfford = character.gold >= item.price;

          return (
            <div key={item.id} className="shop-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="shop-item-icon">
                  {item.icon}
                </div>
                <span className={`badge ${item.rarityClass}`}>
                  {item.rarity}
                </span>
              </div>

              <div>
                <h3 className="shop-item-name">{item.name}</h3>
                <p className="shop-item-desc" style={{ marginTop: "6px" }}>{item.desc}</p>
              </div>

              {/* Perk highlight */}
              <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "12px", color: "var(--cyan)", fontWeight: 600 }}>
                ⚡ {item.perk}
              </div>

              {/* Price & Buy action */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                <div className="shop-item-price">
                  <span>💰</span>
                  <span>{item.price} GP</span>
                </div>

                <button
                  type="button"
                  className={`btn btn-sm ${canAfford ? "btn-gold" : "btn-ghost"}`}
                  disabled={!canAfford}
                  onClick={() => buyItem(item)}
                >
                  {canAfford ? "Buy Item" : "Need Gold"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}