"use client";

type QuestFiltersProps = {
  activeCategory?: string;
  activeDifficulty?: string;
  activeStatus?: string;

  onCategoryChange?: (
    category: string
  ) => void;

  onDifficultyChange?: (
    difficulty: string
  ) => void;

  onStatusChange?: (
    status: string
  ) => void;
};

const categories = [
  "All",
  "Study",
  "Health",
  "Fitness",
  "Career",
  "Personal",
];

const difficulties = [
  "All",
  "Easy",
  "Medium",
  "Hard",
  "Legendary",
];

const statuses = [
  "All",
  "Active",
  "Completed",
];

export function QuestFilters({
  activeCategory = "All",
  activeDifficulty = "All",
  activeStatus = "All",
  onCategoryChange,
  onDifficultyChange,
  onStatusChange,
}: QuestFiltersProps) {
  return (
    <div
      className="ui-card"
      style={{
        width: "100%",
        padding: "18px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
          }}
        >
          🔎
        </span>

        <div>
          <h3
            style={{
              margin: 0,
              color: "var(--text)",
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            Filter Quests
          </h3>

          <p
            style={{
              margin: "3px 0 0",
              color: "var(--text-muted)",
              fontSize: "10px",
            }}
          >
            Find the quests you want to focus on.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "12px",
        }}
      >
        {/* Category */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Category
          </label>

          <select
            value={activeCategory}
            onChange={(event) =>
              onCategoryChange?.(
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "11px 12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              outline: "none",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Difficulty
          </label>

          <select
            value={activeDifficulty}
            onChange={(event) =>
              onDifficultyChange?.(
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "11px 12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              outline: "none",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            {difficulties.map(
              (difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                >
                  {difficulty}
                </option>
              )
            )}
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Status
          </label>

          <select
            value={activeStatus}
            onChange={(event) =>
              onStatusChange?.(
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "11px 12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              outline: "none",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}