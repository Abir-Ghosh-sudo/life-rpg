"use client";

import { useGameState, InventoryItem } from "@/lib/game/game-context";

export default function InventoryPage() {
  const { inventory, equipItem, unequipItem, useConsumable } = useGameState();
  const { equipped, bag } = inventory;

  const slots: Array<"Weapon" | "Armor" | "Accessory"> = ["Weapon", "Armor", "Accessory"];

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: "8px" }}>
            🎒 Equipment & Knapsack
          </div>
          <h1 className="page-title">Hero&apos;s Inventory</h1>
          <p className="page-subtitle">
            Manage your active battle gear slots, consumable restorative elixirs, and quest artifacts.
          </p>
        </div>

        <a href="/shop" className="btn btn-primary">
          🛒 Visit Shop →
        </a>
      </div>

      {/* Equipped Gear Section */}
      <div style={{ marginBottom: "36px" }}>
        <h2 className="section-title">
          <span>⚔️</span> Active Gear Slots
        </h2>

        <div className="grid-3">
          {slots.map((slot) => {
            const item = equipped[slot];

            return (
              <div key={slot} className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "var(--radius-md)", background: item ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.02)", border: `1px solid ${item ? "rgba(124,58,237,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                  {item ? item.icon : "🔒"}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>
                    {slot} Slot
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: item ? "var(--text)" : "var(--text-dim)", marginTop: "2px" }}>
                    {item ? item.name : "Empty Slot"}
                  </div>
                  {item && (
                    <div style={{ fontSize: "12px", color: "var(--cyan)", fontWeight: 600, marginTop: "2px" }}>
                      {item.stat}
                    </div>
                  )}
                </div>

                {item && (
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => unequipItem(slot)}
                    title="Unequip"
                  >
                    Unequip
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bag Items Section */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            <span>📦</span> Knapsack Storage
          </h2>
          <span style={{ fontSize: "13px", color: "var(--text-dim)" }}>
            Carrying: {bag.length} / 20 items
          </span>
        </div>

        {bag.length === 0 ? (
          <div className="glass-card" style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎒</div>
            <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Your knapsack is empty</h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
              Visit the Grand Bazaar to purchase restorative potions, shields, and enchanted relics.
            </p>
            <a href="/shop" className="btn btn-primary btn-sm" style={{ marginTop: "16px" }}>
              Browse Shop Catalog
            </a>
          </div>
        ) : (
          <div className="grid-2">
            {bag.map((item) => (
              <div key={item.id} className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", position: "relative" }}>
                    {item.icon}
                    {item.qty > 1 && (
                      <span style={{ position: "absolute", bottom: "-4px", right: "-4px", background: "var(--violet)", color: "white", borderRadius: "var(--radius-full)", fontSize: "10px", fontWeight: 800, padding: "1px 5px" }}>
                        x{item.qty}
                      </span>
                    )}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{item.name}</h3>
                      <span className="badge badge-gray" style={{ fontSize: "10px" }}>{item.type}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>{item.desc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn btn-sm ${item.type === "Consumable" ? "btn-emerald" : "btn-ghost"}`}
                  onClick={() => (item.type === "Consumable" ? useConsumable(item) : equipItem(item))}
                >
                  {item.type === "Consumable" ? "Use (1)" : "Equip"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}