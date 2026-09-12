import type {
  FocusSession,
  FocusSessionStatus,
} from "@/types/focus";
import type {
  ID,
  ISODateString,
  PaginationMeta,
} from "@/types/common";

export interface StartFocusSessionInput {
  durationMinutes: number;
}

export interface CompleteFocusSessionInput {
  sessionId: ID;
}

export interface CancelFocusSessionInput {
  sessionId: ID;
}

export interface FocusSessionIdInput {
  sessionId: ID;
}

export interface FocusQueryOptions {
  page?: number;
  pageSize?: number;
  status?: FocusSessionStatus;
  from?: ISODateString;
  to?: ISODateString;
  completedOnly?: boolean;
}

export interface FocusSessionListResult {
  sessions: FocusSession[];
  pagination?: PaginationMeta;
}

export interface FocusSessionResult {
  session: FocusSession;
}

export interface FocusStats {
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalMinutes: number;
  completedMinutes: number;
  totalXp: number;
  totalGold: number;
  averageSessionMinutes: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
}

export interface TodayFocusStats {
  sessions: number;
  completedSessions: number;
  minutes: number;
  xp: number;
  gold: number;
}

export interface FocusSessionProgress {
  sessionId: ID;
  durationMinutes: number;
  completedMinutes: number;
  remainingMinutes: number;
  progressPercentage: number;
  isComplete: boolean;
  isActive: boolean;
}

export interface FocusReward {
  xp: number;
  gold: number;
}

export interface FocusSessionSummary {
  id: ID;
  durationMinutes: number;
  completedMinutes: number;
  status: FocusSessionStatus;
  xpEarned: number;
  goldEarned: number;
  startedAt: ISODateString;
  completedAt: ISODateString | null;
}

export interface FocusActionResult {
  success: boolean;
  message?: string;
  session?: FocusSession;
  reward?: FocusReward;
}

export interface FocusTimerSnapshot {
  sessionId: ID;
  startedAt: ISODateString;
  durationSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  progressPercentage: number;
  isComplete: boolean;
}

export type FocusStatus = FocusSessionStatus;

export type {
  FocusSession,
  FocusSessionStatus,
};