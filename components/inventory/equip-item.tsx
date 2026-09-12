"use client";

import { useState } from "react";

type ItemCategory =
  | "weapon"
  | "armor"
  | "accessory"
  | "cosmetic"
  | "consumable";

type EquipItemProps = {
  itemName?: string;
  itemIcon?: string;
  category?: ItemCategory;
  rarity?: string;
  initiallyEquipped?: boolean;
  disabled?: boolean;
  onEquipChange?: (equipped: boolean) => void;
};

const categoryLabels: Record<
  ItemCategory,
  string
> = {
  weapon: "Weapon",
  armor: "Armor",
  accessory: "Accessory",
  cosmetic: "Cosmetic",
  consumable: "Consumable",
};

export function EquipItem({
  itemName = "Focus Blade",
  itemIcon = "⚔️",
  category = "weapon",
  rarity = "Epic",
  initiallyEquipped = false,
  disabled = false,
  onEquipChange,
}: EquipItemProps) {
  const [equipped, setEquipped] =
    useState(initiallyEquipped);

  const handleEquip = () => {
    if (disabled) return;

    const newState = !equipped;

    setEquipped(newState);

    onEquipChange?.(newState);
  };

  const canEquip =
    category !== "consumable";

  if (!canEquip) {
    return (
      <div
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--surface-light)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
            fontSize: "11px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          🧪 Consumable items cannot be equipped.
        </p>
      </div>
    );
  }

  return (
    <section
      style={{
        width: "100%",
        padding: "18px",
        borderRadius: "18px",
        border: "1px solid var(--border)",
        background: "var(--surface-light)",
      }}
    >
      {/* Item Preview */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "13px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "15px",
            background:
              "rgba(124, 58, 237, 0.1)",
            fontSize: "24px",
          }}
        >
          {itemIcon}
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "var(--text)",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            {itemName}
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            {categoryLabels[category]} · {rarity}
          </p>
        </div>

        {/* Status */}
        <span
          style={{
            padding: "6px 9px",
            borderRadius: "999px",
            background: equipped
              ? "rgba(16, 185, 129, 0.12)"
              : "rgba(148, 163, 184, 0.1)",
            color: equipped
              ? "var(--emerald)"
              : "var(--text-muted)",
            fontSize: "8px",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {equipped
            ? "Equipped"
            : "Unequipped"}
        </span>
      </div>

      {/* Equip Button */}
      <button
        type="button"
        onClick={handleEquip}
        disabled={disabled}
        style={{
          width: "100%",
          minHeight: "46px",
          borderRadius: "13px",
          border: equipped
            ? "1px solid rgba(244, 63, 94, 0.3)"
            : "1px solid rgba(124, 58, 237, 0.35)",
          background: equipped
            ? "rgba(244, 63, 94, 0.1)"
            : "rgba(124, 58, 237, 0.14)",
          color: equipped
            ? "var(--rose)"
            : "var(--violet)",
          fontSize: "12px",
          fontWeight: 900,
          cursor: disabled
            ? "not-allowed"
            : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition:
            "transform 0.2s ease, opacity 0.2s ease",
        }}
      >
        {equipped
          ? "Unequip Item"
          : "⚔️ Equip Item"}
      </button>

      {/* Equipped Message */}
      {equipped && (
        <div
          style={{
            marginTop: "12px",
            padding: "11px 12px",
            borderRadius: "12px",
            background:
              "rgba(16, 185, 129, 0.08)",
            border:
              "1px solid rgba(16, 185, 129, 0.16)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--emerald)",
              fontSize: "10px",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            ✓ {itemName} is currently equipped.
          </p>
        </div>
      )}
    </section>
  );
}