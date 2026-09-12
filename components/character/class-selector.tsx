type CharacterClass = {
  id: string;
  name: string;
  icon: string;
  description: string;
  specialty: string;
  color: string;
};

type ClassSelectorProps = {
  selectedClass?: string;
  onSelect?: (classId: string) => void;
};

export function ClassSelector({
  selectedClass = "adventurer",
  onSelect,
}: ClassSelectorProps) {
  const classes: CharacterClass[] = [
    {
      id: "adventurer",
      name: "Adventurer",
      icon: "⚔️",
      description:
        "A balanced character ready to take on any challenge.",
      specialty: "Balanced Growth",
      color: "var(--indigo)",
    },
    {
      id: "scholar",
      name: "Scholar",
      icon: "📚",
      description:
        "Focused on learning, knowledge, and intellectual growth.",
      specialty: "Knowledge Mastery",
      color: "var(--violet)",
    },
    {
      id: "warrior",
      name: "Warrior",
      icon: "🛡️",
      description:
        "Strong, disciplined, and ready to defeat difficult goals.",
      specialty: "Strength & Discipline",
      color: "var(--rose)",
    },
    {
      id: "creator",
      name: "Creator",
      icon: "✨",
      description:
        "Uses imagination and creativity to build amazing things.",
      specialty: "Creative Power",
      color: "var(--gold)",
    },
  ];

  return (
    <section className="ui-card">
      <div>
        <p
          style={{
            margin: 0,
            color: "var(--violet)",
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Choose Your Path
        </p>

        <h2
          style={{
            margin: "7px 0 0",
            color: "var(--text)",
            fontSize: "24px",
            fontWeight: 900,
          }}
        >
          Select Character Class
        </h2>

        <p
          style={{
            margin: "8px 0 0",
            color: "var(--text-muted)",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Choose the class that best matches your personal journey.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {classes.map((characterClass) => {
          const isSelected =
            selectedClass === characterClass.id;

          return (
            <button
              key={characterClass.id}
              type="button"
              onClick={() => onSelect?.(characterClass.id)}
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "18px",
                textAlign: "left",
                cursor: "pointer",
                background: isSelected
                  ? "rgba(79, 70, 229, 0.08)"
                  : "var(--surface-light)",
                border: isSelected
                  ? `2px solid ${characterClass.color}`
                  : "1px solid var(--border)",
                boxShadow: isSelected
                  ? "0 10px 25px rgba(79, 70, 229, 0.12)"
                  : "none",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "27px",
                    background: `${characterClass.color}18`,
                  }}
                >
                  {characterClass.icon}
                </div>

                {isSelected && (
                  <span
                    style={{
                      padding: "5px 9px",
                      borderRadius: "999px",
                      background: `${characterClass.color}18`,
                      color: characterClass.color,
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    ✓ Selected
                  </span>
                )}
              </div>

              <h3
                style={{
                  margin: "16px 0 0",
                  color: "var(--text)",
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                {characterClass.name}
              </h3>

              <p
                style={{
                  margin: "8px 0 0",
                  color: "var(--text-muted)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {characterClass.description}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "var(--text-muted)",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  SPECIALTY
                </p>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: characterClass.color,
                    fontSize: "13px",
                    fontWeight: 800,
                  }}
                >
                  ✨ {characterClass.specialty}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}