"use client";

import { useState } from "react";

type ItemRarity =
  | "Common"
  | "Rare"
  | "Epic"
  | "Legendary";

type PurchaseModalProps = {
  open?: boolean;
  itemName?: string;
  itemIcon?: string;
  itemRarity?: ItemRarity;
  price?: number;
  userGold?: number;
  onClose?: () => void;
  onConfirm?: () => void;
};

export function PurchaseModal({
  open = false,
  itemName = "Focus Potion",
  itemIcon = "🧪",
  itemRarity = "Common",
  price = 50,
  userGold = 1250,
  onClose,
  onConfirm,
}: PurchaseModalProps) {
  const [purchased, setPurchased] =
    useState(false);

  if (!open) {
    return null;
  }

  const canAfford = userGold >= price;

  const remainingGold = userGold - price;

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
    rarityColors[itemRarity];

  const handleConfirm = () => {
    if (!canAfford || purchased) return;

    setPurchased(true);

    onConfirm?.();
  };

  const handleClose = () => {
    setPurchased(false);

    onClose?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background:
          "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "24px",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "34px",
            height: "34px",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            background:
              "var(--surface-light)",
            color: "var(--text)",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {purchased ? (
          /* Success State */
          <div
            style={{
              padding: "20px 0 5px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "76px",
                height: "76px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background:
                  "rgba(16, 185, 129, 0.12)",
                fontSize: "38px",
              }}
            >
              🎉
            </div>

            <h2
              style={{
                margin: "18px 0 0",
                color: "var(--text)",
                fontSize: "22px",
                fontWeight: 900,
              }}
            >
              Purchase Complete!
            </h2>

            <p
              style={{
                margin: "9px 0 0",
                color: "var(--text-muted)",
                fontSize: "11px",
                lineHeight: 1.6,
              }}
            >
              {itemName} has been added to
              your inventory.
            </p>

            <button
              type="button"
              onClick={handleClose}
              style={{
                width: "100%",
                minHeight: "45px",
                marginTop: "24px",
                border: "none",
                borderRadius: "12px",
                background: "var(--emerald)",
                color: "white",
                fontSize: "11px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Awesome!
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                paddingRight: "40px",
              }}
            >
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "9px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Confirm Purchase
              </span>

              <h2
                style={{
                  margin: "7px 0 0",
                  color: "var(--text)",
                  fontSize: "22px",
                  fontWeight: 900,
                }}
              >
                Buy this item?
              </h2>
            </div>

            {/* Item */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "22px",
                padding: "16px",
                borderRadius: "15px",
                background:
                  "var(--surface-light)",
                border:
                  "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  flexShrink: 0,
                  background: `${rarityColor}15`,
                  border: `1px solid ${rarityColor}30`,
                  fontSize: "29px",
                }}
              >
                {itemIcon}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "var(--text)",
                    fontSize: "15px",
                    fontWeight: 900,
                  }}
                >
                  {itemName}
                </h3>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    color: rarityColor,
                    fontSize: "9px",
                    fontWeight: 900,
                  }}
                >
                  ✨ {itemRarity}
                </span>
              </div>
            </div>

            {/* Payment Summary */}
            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                borderRadius: "14px",
                background:
                  "rgba(245, 158, 11, 0.06)",
                border:
                  "1px solid rgba(245, 158, 11, 0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  Your Gold
                </span>

                <strong
                  style={{
                    color: "var(--gold)",
                    fontSize: "11px",
                    fontWeight: 900,
                  }}
                >
                  🪙 {userGold.toLocaleString()}
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  Item Price
                </span>

                <strong
                  style={{
                    color: "var(--danger)",
                    fontSize: "11px",
                    fontWeight: 900,
                  }}
                >
                  - 🪙 {price.toLocaleString()}
                </strong>
              </div>

              <div
                style={{
                  height: "1px",
                  background:
                    "var(--border)",
                  margin: "12px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span
                  style={{
                    color: "var(--text)",
                    fontSize: "11px",
                    fontWeight: 900,
                  }}
                >
                  Remaining Gold
                </span>

                <strong
                  style={{
                    color: canAfford
                      ? "var(--emerald)"
                      : "var(--danger)",
                    fontSize: "13px",
                    fontWeight: 900,
                  }}
                >
                  🪙{" "}
                  {canAfford
                    ? remainingGold.toLocaleString()
                    : "Not Enough"}
                </strong>
              </div>
            </div>

            {/* Warning */}
            {!canAfford && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "11px 13px",
                  borderRadius: "11px",
                  background:
                    "rgba(239, 68, 68, 0.08)",
                  color: "var(--danger)",
                  fontSize: "10px",
                  fontWeight: 800,
                }}
              >
                ⚠️ You don't have enough gold
                to purchase this item.
              </div>
            )}

            {/* Actions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1.5fr",
                gap: "10px",
                marginTop: "22px",
              }}
            >
              <button
                type="button"
                onClick={handleClose}
                style={{
                  minHeight: "45px",
                  border:
                    "1px solid var(--border)",
                  borderRadius: "12px",
                  background:
                    "var(--surface-light)",
                  color: "var(--text)",
                  fontSize: "11px",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!canAfford}
                onClick={handleConfirm}
                style={{
                  minHeight: "45px",
                  border: "none",
                  borderRadius: "12px",
                  background: canAfford
                    ? "var(--violet)"
                    : "var(--surface-light)",
                  color: canAfford
                    ? "white"
                    : "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: 900,
                  cursor: canAfford
                    ? "pointer"
                    : "not-allowed",
                  opacity: canAfford ? 1 : 0.7,
                }}
              >
                🪙 Confirm Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}