import { QuestCard } from "./quest-card";

type Quest = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  xp: number;
  gold: number;
  current: number;
  total: number;
  completed?: boolean;
};

type QuestListProps = {
  quests?: Quest[];
  onCompleteQuest?: (questId: string) => void;
};

const defaultQuests: Quest[] = [
  {
    id: "1",
    title: "Complete DSA Assignment",
    description:
      "Finish today's data structures and algorithms assignment.",
    category: "Study",
    difficulty: "Medium",
    rarity: "Common",
    xp: 150,
    gold: 40,
    current: 2,
    total: 5,
  },
  {
    id: "2",
    title: "Morning Workout",
    description:
      "Complete your daily workout session and stay consistent.",
    category: "Fitness",
    difficulty: "Easy",
    rarity: "Common",
    xp: 80,
    gold: 20,
    current: 1,
    total: 1,
  },
  {
    id: "3",
    title: "Build Portfolio Project",
    description:
      "Work on your project and improve your development skills.",
    category: "Career",
    difficulty: "Hard",
    rarity: "Epic",
    xp: 300,
    gold: 100,
    current: 4,
    total: 10,
  },
];

export function QuestList({
  quests = defaultQuests,
  onCompleteQuest,
}: QuestListProps) {
  if (quests.length === 0) {
    return (
      <div
        className="ui-card"
        style={{
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "38px",
          }}
        >
          📜
        </div>

        <h3
          style={{
            margin: "14px 0 0",
            color: "var(--text)",
            fontSize: "16px",
            fontWeight: 900,
          }}
        >
          No Quests Found
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            lineHeight: 1.6,
          }}
        >
          Create a new quest and begin your next
          adventure.
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
          marginBottom: "16px",
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
            Active Adventures
          </p>

          <h2
            style={{
              margin: "5px 0 0",
              color: "var(--text)",
              fontSize: "19px",
              fontWeight: 900,
            }}
          >
            Your Quests
          </h2>
        </div>

        <span
          style={{
            padding: "7px 11px",
            borderRadius: "999px",
            background:
              "rgba(124, 58, 237, 0.1)",
            color: "var(--violet)",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          {quests.length} Quests
        </span>
      </div>

      {/* Quest Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            title={quest.title}
            description={quest.description}
            category={quest.category}
            difficulty={quest.difficulty}
            rarity={quest.rarity}
            xp={quest.xp}
            gold={quest.gold}
            current={quest.current}
            total={quest.total}
            completed={quest.completed}
            onComplete={() =>
              onCompleteQuest?.(quest.id)
            }
          />
        ))}
      </div>
    </section>
  );
}