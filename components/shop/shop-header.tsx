type ShopHeaderProps = {
  title?: string;
  subtitle?: string;
  gold?: number;
  itemCount?: number;
};

export function ShopHeader({
  title = "Adventure Shop",
  subtitle = "Spend your gold and upgrade your journey.",
  gold = 1250,
  itemCount = 12,
}: ShopHeaderProps) {
  return (
    <section
      className="ui-card"
      style={{
        width: "100%",
        padding: "22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          top: "-90px",
          right: "-70px",
          background: "rgba(245, 158, 11, 0.08)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "13px",
                background: "rgba(245, 158, 11, 0.12)",
                fontSize: "21px",
              }}
            >
              🏪
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "var(--gold)",
                  fontSize: "9px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Merchant&apos;s Market
              </p>

              <h1
                style={{
                  margin: "4px 0 0",
                  color: "var(--text)",
                  fontSize: "23px",
                  fontWeight: 900,
                }}
              >
                {title}
              </h1>
            </div>
          </div>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "520px",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Right Side Stats */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* Gold */}
          <div
            style={{
              minWidth: "120px",
              padding: "12px 15px",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.08)",
              border:
                "1px solid rgba(245, 158, 11, 0.16)",
            }}
          >
            <span
              style={{
                display: "block",
                color: "var(--text-muted)",
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Your Gold
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--gold)",
                fontSize: "17px",
                fontWeight: 900,
              }}
            >
              🪙 {gold.toLocaleString()}
            </strong>
          </div>

          {/* Available Items */}
          <div
            style={{
              minWidth: "120px",
              padding: "12px 15px",
              borderRadius: "14px",
              background: "rgba(124, 58, 237, 0.08)",
              border:
                "1px solid rgba(124, 58, 237, 0.16)",
            }}
          >
            <span
              style={{
                display: "block",
                color: "var(--text-muted)",
                fontSize: "8px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Available
            </span>

            <strong
              style={{
                display: "block",
                marginTop: "5px",
                color: "var(--violet)",
                fontSize: "17px",
                fontWeight: 900,
              }}
            >
              📦 {itemCount} Items
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}