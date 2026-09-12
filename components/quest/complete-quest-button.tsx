"use client";

type QuestDifficulty =
  | "easy"
  | "medium"
  | "hard"
  | "legendary";

type QuestRarity =
  | "common"
  | "rare"
  | "epic"
  | "legendary";

type QuestCardProps = {
  title?: string;
  description?: string;
  category?: string;
  difficulty?: QuestDifficulty;
  rarity?: QuestRarity;
  xp?: number;
  gold?: number;
  progress?: number;
  total?: number;
  completed?: boolean;
  onClick?: () => void;
};

const difficultyStyles: Record<
  QuestDifficulty,
  {
    label: string;
    color: string;
    background: string;
  }
> = {
  easy: {
    label: "Easy",
    color: "var(--emerald)",
    background: "rgba(16, 185, 129, 0.12)",
  },
  medium: {
    label: "Medium",
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
  hard: {
    label: "Hard",
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
  },
  legendary: {
    label: "Legendary",
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
};

const rarityStyles: Record<
  QuestRarity,
  {
    color: string;
    background: string;
  }
> = {
  common: {
    color: "var(--text-muted)",
    background: "rgba(148, 163, 184, 0.12)",
  },
  rare: {
    color: "var(--violet)",
    background: "rgba(124, 58, 237, 0.12)",
  },
  epic: {
    color: "var(--rose)",
    background: "rgba(244, 63, 94, 0.12)",
  },
  legendary: {
    color: "var(--gold)",
    background: "rgba(245, 158, 11, 0.12)",
  },
};

export function QuestCard({
  title = "Complete Daily Workout",
  description = "Finish your planned workout session and improve your physical strength.",
  category = "Health",
  difficulty = "medium",
  rarity = "rare",
  xp = 120,
  gold = 50,
  progress = 2,
  total = 5,
  completed = false,
  onClick,
}: QuestCardProps) {
  const difficultyStyle =
    difficultyStyles[difficulty];

  const rarityStyle =
    rarityStyles[rarity];

  const progressPercentage =
    total > 0
      ? Math.min(
          100,
          Math.round(
            (progress / total) * 100
          )
        )
      : 0;

  return (
    <article
      onClick={onClick}
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "20px",
        border: completed
          ? "1px solid rgba(16, 185, 129, 0.3)"
          : "1px solid var(--border)",
        background: "var(--surface)",
        cursor: onClick
          ? "pointer"
          : "default",
        transition:
          "transform 0.2s ease, border 0.2s ease",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "5px 9px",
                borderRadius: "999px",
                background:
                  difficultyStyle.background,
                color: difficultyStyle.color,
                fontSize: "9px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {difficultyStyle.label}
            </span>

            <span
              style={{
                padding: "5px 9px",
                borderRadius: "999px",
                background:
                  rarityStyle.background,
                color: rarityStyle.color,
                fontSize: "9px",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              ◆ {rarity}
            </span>
          </div>

          <h3
            style={{
              margin: "14px 0 0",
              color: "var(--text)",
              fontSize: "17px",
              fontWeight: 900,
            }}
          >
            {completed && "✓ "}
            {title}
          </h3>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-muted)",
              fontSize: "11px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            minWidth: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "13px",
            background: completed
              ? "rgba(16, 185, 129, 0.12)"
              : "rgba(124, 58, 237, 0.1)",
            fontSize: "19px",
          }}
        >
          {completed ? "🏆" : "⚔️"}
        </div>
      </div>

      {/* Category */}
      <div
        style={{
          marginTop: "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--text-muted)",
          fontSize: "10px",
          fontWeight: 700,
        }}
      >
        <span>📂</span>
        {category}
      </div>

      {/* Progress */}
      <div
        style={{
          marginTop: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            Quest Progress
          </span>

          <span
            style={{
              color: completed
                ? "var(--emerald)"
                : "var(--violet)",
              fontSize: "10px",
              fontWeight: 900,
            }}
          >
            {progress}/{total}
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "8px",
            overflow: "hidden",
            borderRadius: "999px",
            background: "var(--surface-light)",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              borderRadius: "999px",
              background: completed
                ? "var(--emerald)"
                : "var(--violet)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Rewards */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "18px",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "11px",
            borderRadius: "12px",
            background: "rgba(124, 58, 237, 0.08)",
            border:
              "1px solid rgba(124, 58, 237, 0.15)",
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            XP Reward
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--violet)",
              fontSize: "14px",
            }}
          >
            ✨ +{xp} XP
          </strong>
        </div>

        <div
          style={{
            flex: 1,
            padding: "11px",
            borderRadius: "12px",
            background:
              "rgba(245, 158, 11, 0.08)",
            border:
              "1px solid rgba(245, 158, 11, 0.15)",
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "8px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Gold Reward
          </span>

          <strong
            style={{
              display: "block",
              marginTop: "5px",
              color: "var(--gold)",
              fontSize: "14px",
            }}
          >
            🪙 +{gold}
          </strong>
        </div>
      </div>

      {/* Completed Status */}
      {completed && (
        <div
          style={{
            marginTop: "14px",
            padding: "10px",
            borderRadius: "11px",
            textAlign: "center",
            background:
              "rgba(16, 185, 129, 0.08)",
            color: "var(--emerald)",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          ✓ QUEST COMPLETED
        </div>
      )}
    </article>
  );
}