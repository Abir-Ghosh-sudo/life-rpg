type PriceDisplayProps = {
  price?: number;
  originalPrice?: number;
  currencyIcon?: string;
  size?: "small" | "medium" | "large";
  showDiscount?: boolean;
};

export function PriceDisplay({
  price = 50,
  originalPrice,
  currencyIcon = "🪙",
  size = "medium",
  showDiscount = true,
}: PriceDisplayProps) {
  const sizeMap = {
    small: {
      price: "14px",
      original: "9px",
      discount: "8px",
    },
    medium: {
      price: "18px",
      original: "11px",
      discount: "9px",
    },
    large: {
      price: "24px",
      original: "13px",
      discount: "10px",
    },
  };

  const currentSize = sizeMap[size];

  const hasDiscount =
    originalPrice !== undefined &&
    originalPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((originalPrice - price) /
          originalPrice) *
          100
      )
    : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      {/* Current Price */}
      <strong
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          color: "var(--gold)",
          fontSize: currentSize.price,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        <span>{currencyIcon}</span>

        <span>
          {price.toLocaleString()}
        </span>
      </strong>

      {/* Original Price */}
      {hasDiscount && (
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: currentSize.original,
            fontWeight: 700,
            textDecoration: "line-through",
            opacity: 0.75,
          }}
        >
          {currencyIcon}{" "}
          {originalPrice?.toLocaleString()}
        </span>
      )}

      {/* Discount Badge */}
      {hasDiscount && showDiscount && (
        <span
          style={{
            padding: "4px 7px",
            borderRadius: "999px",
            background:
              "rgba(16, 185, 129, 0.12)",
            border:
              "1px solid rgba(16, 185, 129, 0.2)",
            color: "var(--emerald)",
            fontSize: currentSize.discount,
            fontWeight: 900,
            whiteSpace: "nowrap",
          }}
        >
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
}