"use client";

import { FormEvent, useState } from "react";

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

type QuestFormData = {
  title: string;
  description: string;
  category: string;
  difficulty: QuestDifficulty;
  rarity: QuestRarity;
  xp: number;
  gold: number;
  total: number;
};

type QuestFormProps = {
  onSubmit?: (quest: QuestFormData) => void;
};

const categories = [
  "Study",
  "Health",
  "Fitness",
  "Career",
  "Personal",
  "Productivity",
];

export function QuestForm({
  onSubmit,
}: QuestFormProps) {
  const [formData, setFormData] =
    useState<QuestFormData>({
      title: "",
      description: "",
      category: "Study",
      difficulty: "easy",
      rarity: "common",
      xp: 50,
      gold: 20,
      total: 1,
    });

  const handleChange = (
    field: keyof QuestFormData,
    value: string | number
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onSubmit?.(formData);

    setFormData({
      title: "",
      description: "",
      category: "Study",
      difficulty: "easy",
      rarity: "common",
      xp: 50,
      gold: 20,
      total: 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ui-card"
      style={{
        width: "100%",
        padding: "22px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "22px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--violet)",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Quest Creator
        </p>

        <h2
          style={{
            margin: "7px 0 0",
            color: "var(--text)",
            fontSize: "20px",
            fontWeight: 900,
          }}
        >
          Create New Quest
        </h2>

        <p
          style={{
            margin: "7px 0 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            lineHeight: 1.6,
          }}
        >
          Turn your real-life goal into an RPG quest.
        </p>
      </div>

      {/* Title */}
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Quest Title
        </label>

        <input
          type="text"
          value={formData.title}
          onChange={(event) =>
            handleChange(
              "title",
              event.target.value
            )
          }
          placeholder="e.g. Complete Java Assignment"
          style={{
            width: "100%",
            padding: "13px 14px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            outline: "none",
            background: "var(--surface-light)",
            color: "var(--text)",
            fontSize: "12px",
          }}
        />
      </div>

      {/* Description */}
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Description
        </label>

        <textarea
          value={formData.description}
          onChange={(event) =>
            handleChange(
              "description",
              event.target.value
            )
          }
          placeholder="What do you need to complete?"
          rows={4}
          style={{
            width: "100%",
            padding: "13px 14px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            outline: "none",
            resize: "vertical",
            background: "var(--surface-light)",
            color: "var(--text)",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Category */}
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "var(--text-muted)",
            fontSize: "10px",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Category
        </label>

        <select
          value={formData.category}
          onChange={(event) =>
            handleChange(
              "category",
              event.target.value
            )
          }
          style={{
            width: "100%",
            padding: "13px 14px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            outline: "none",
            background: "var(--surface-light)",
            color: "var(--text)",
            fontSize: "12px",
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

      {/* Difficulty + Rarity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Difficulty
          </label>

          <select
            value={formData.difficulty}
            onChange={(event) =>
              handleChange(
                "difficulty",
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "11px",
            }}
          >
            <option value="easy">
              Easy
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="hard">
              Hard
            </option>

            <option value="legendary">
              Legendary
            </option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Rarity
          </label>

          <select
            value={formData.rarity}
            onChange={(event) =>
              handleChange(
                "rarity",
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "11px",
            }}
          >
            <option value="common">
              Common
            </option>

            <option value="rare">
              Rare
            </option>

            <option value="epic">
              Epic
            </option>

            <option value="legendary">
              Legendary
            </option>
          </select>
        </div>
      </div>

      {/* Rewards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            XP
          </label>

          <input
            type="number"
            min="0"
            value={formData.xp}
            onChange={(event) =>
              handleChange(
                "xp",
                Number(event.target.value)
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "12px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Gold
          </label>

          <input
            type="number"
            min="0"
            value={formData.gold}
            onChange={(event) =>
              handleChange(
                "gold",
                Number(event.target.value)
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "12px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "var(--text-muted)",
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Target
          </label>

          <input
            type="number"
            min="1"
            value={formData.total}
            onChange={(event) =>
              handleChange(
                "total",
                Number(event.target.value)
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "11px",
              border: "1px solid var(--border)",
              background:
                "var(--surface-light)",
              color: "var(--text)",
              fontSize: "12px",
            }}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        style={{
          width: "100%",
          minHeight: "48px",
          border: "none",
          borderRadius: "14px",
          background: "var(--violet)",
          color: "white",
          fontSize: "12px",
          fontWeight: 900,
          cursor: "pointer",
        }}
      >
        ⚔️ Create Quest
      </button>
    </form>
  );
}