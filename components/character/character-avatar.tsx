type CharacterAvatarProps = {
  name?: string;
  level?: number;
  avatar?: string;
  size?: number;
  online?: boolean;
};

export function CharacterAvatar({
  name = "Adventurer",
  level = 1,
  avatar = "🧙‍♂️",
  size = 120,
  online = true,
}: CharacterAvatarProps) {
  const avatarSize = Math.max(size, 64);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${avatarSize}px`,
          height: `${avatarSize}px`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${avatarSize * 0.48}px`,
          background:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(124, 58, 237, 0.08))",
          border: "3px solid var(--indigo)",
          boxShadow: "0 12px 30px rgba(79, 70, 229, 0.18)",
        }}
      >
        {avatar}

        <div
          style={{
            position: "absolute",
            bottom: "2px",
            right: "2px",
            width: `${Math.max(18, avatarSize * 0.2)}px`,
            height: `${Math.max(18, avatarSize * 0.2)}px`,
            borderRadius: "50%",
            background: online
              ? "var(--emerald)"
              : "var(--text-muted)",
            border: "3px solid var(--surface)",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "var(--text)",
            fontSize: "18px",
            fontWeight: 800,
          }}
        >
          {name}
        </h3>

        <span
          style={{
            display: "inline-block",
            marginTop: "6px",
            padding: "5px 10px",
            borderRadius: "999px",
            background: "rgba(245, 158, 11, 0.1)",
            color: "var(--gold)",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          Level {level}
        </span>
      </div>
    </div>
  );
}