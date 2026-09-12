type UnlockAnimationProps = {
  title?: string;
  message?: string;
  visible?: boolean;
  onContinue?: () => void;
};

export function UnlockAnimation({
  title = "Region Unlocked!",
  message = "A new part of your adventure is now available.",
  visible = true,
  onContinue,
}: UnlockAnimationProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "24px",
        borderRadius: "20px",
        textAlign: "center",
        background:
          "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(245, 158, 11, 0.12))",
        border: "1px solid var(--gold)",
        boxShadow: "0 12px 30px rgba(79, 70, 229, 0.12)",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          margin: "0 auto",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          background: "rgba(245, 158, 11, 0.15)",
          border: "2px solid var(--gold)",
        }}
      >
        🔓
      </div>

      <p
        style={{
          margin: "16px 0 0",
          color: "var(--gold)",
          fontSize: "13px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        New Adventure
      </p>

      <h2
        style={{
          margin: "8px 0 0",
          color: "var(--text)",
          fontSize: "24px",
          fontWeight: 800,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: "10px auto 0",
          maxWidth: "480px",
          color: "var(--text-muted)",
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>

      <button
        type="button"
        className="ui-button ui-button-reward"
        onClick={onContinue}
        style={{
          marginTop: "20px",
        }}
      >
        Continue Adventure →
      </button>
    </div>
  );
}