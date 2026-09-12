export const LEVEL_CONFIG = {
  baseXp: 100,

  exponent: 1.6,

  maxLevel: 100,

  /**
   * XP required to reach a specific level.
   *
   * Formula:
   * XP = baseXp × level^exponent
   */
  xpForLevel(level: number): number {
    if (level <= 1) {
      return 0;
    }

    return Math.floor(
      this.baseXp * Math.pow(level - 1, this.exponent),
    );
  },

  /**
   * Total XP required to reach the next level.
   */
  xpForNextLevel(level: number): number {
    if (level >= this.maxLevel) {
      return 0;
    }

    return this.xpForLevel(level + 1);
  },

  /**
   * Returns the level corresponding to total XP.
   */
  levelFromXp(totalXp: number): number {
    if (totalXp <= 0) {
      return 1;
    }

    let level = 1;

    while (
      level < this.maxLevel &&
      totalXp >= this.xpForLevel(level + 1)
    ) {
      level += 1;
    }

    return level;
  },

  /**
   * XP already earned inside the current level.
   */
  currentLevelXp(totalXp: number): number {
    const level = this.levelFromXp(totalXp);
    const currentLevelBaseXp = this.xpForLevel(level);

    return Math.max(0, totalXp - currentLevelBaseXp);
  },

  /**
   * XP needed from the current level to reach the next level.
   */
  xpRemaining(totalXp: number): number {
    const level = this.levelFromXp(totalXp);

    if (level >= this.maxLevel) {
      return 0;
    }

    return Math.max(
      0,
      this.xpForNextLevel(level) - totalXp,
    );
  },

  /**
   * Progress percentage inside the current level.
   */
  progressPercentage(totalXp: number): number {
    const level = this.levelFromXp(totalXp);

    if (level >= this.maxLevel) {
      return 100;
    }

    const currentLevelXp = this.xpForLevel(level);
    const nextLevelXp = this.xpForNextLevel(level);

    const progressXp = totalXp - currentLevelXp;
    const requiredXp = nextLevelXp - currentLevelXp;

    if (requiredXp <= 0) {
      return 100;
    }

    return Math.min(
      100,
      Math.max(0, (progressXp / requiredXp) * 100),
    );
  },
} as const;

export type LevelConfig = typeof LEVEL_CONFIG;