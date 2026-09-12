import type {
  Achievement,
  UserAchievement,
} from "@/types/achievement";

export interface AchievementIdInput {
  achievementId: string;
}

export interface AchievementQueryOptions {
  includeSecret?: boolean;
  includeInactive?: boolean;
  unlockedOnly?: boolean;
}

export interface AchievementWithProgress {
  achievement: Achievement;
  progress: UserAchievement | null;
  unlocked: boolean;
}

export interface AchievementSummary {
  total: number;
  unlocked: number;
  locked: number;
  completionPercentage: number;
}

export interface AchievementProgressUpdate {
  achievementId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
  unlocked: boolean;
}

export interface AchievementUnlockResult {
  success: boolean;
  achievement?: Achievement;
  userAchievement?: UserAchievement;
  message: string;
}

export interface AchievementEvaluationResult {
  evaluated: number;
  newlyUnlocked: Achievement[];
  progress: AchievementProgressUpdate[];
}