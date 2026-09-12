import type {
  UUID,
  ISODateString,
  Nullable,
} from "@/types/common";

export type FocusSessionStatus =
  | "active"
  | "completed"
  | "cancelled"
  | "expired";

export type FocusSessionMode =
  | "pomodoro"
  | "deep_work"
  | "short_break"
  | "long_break"
  | "custom";

export type FocusSession = {
  id: UUID;

  userId: UUID;

  mode: FocusSessionMode;

  status: FocusSessionStatus;

  plannedDuration: number;

  actualDuration: number;

  startedAt: ISODateString;

  endedAt: Nullable<ISODateString>;

  xpEarned: number;

  goldEarned: number;

  questId: Nullable<UUID>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type StartFocusSessionInput = {
  mode: FocusSessionMode;

  duration: number;

  questId?: UUID | null;
};

export type CompleteFocusSessionInput = {
  sessionId: UUID;

  actualDuration?: number;
};

export type CancelFocusSessionInput = {
  sessionId: UUID;
};

export type FocusSessionResult = {
  session: FocusSession;

  xpEarned: number;

  goldEarned: number;

  totalFocusMinutes: number;
};

export type FocusTimerState = {
  sessionId: Nullable<UUID>;

  mode: FocusSessionMode;

  status: FocusSessionStatus;

  remainingSeconds: number;

  elapsedSeconds: number;

  totalSeconds: number;

  isRunning: boolean;

  isPaused: boolean;
};

export type FocusSettings = {
  defaultDuration: number;

  shortBreakDuration: number;

  longBreakDuration: number;

  sessionsUntilLongBreak: number;

  autoStartBreaks: boolean;

  autoStartFocus: boolean;

  soundEnabled: boolean;
};

export type UpdateFocusSettingsInput = Partial<FocusSettings>;

export type FocusStats = {
  totalSessions: number;

  completedSessions: number;

  cancelledSessions: number;

  totalMinutes: number;

  averageSessionMinutes: number;

  longestSessionMinutes: number;

  currentStreak: number;

  longestStreak: number;

  totalXpEarned: number;

  totalGoldEarned: number;
};

export type FocusHistoryEntry = {
  id: UUID;

  mode: FocusSessionMode;

  status: FocusSessionStatus;

  duration: number;

  xpEarned: number;

  goldEarned: number;

  startedAt: ISODateString;

  endedAt: Nullable<ISODateString>;

  questId: Nullable<UUID>;
};

export type FocusState = {
  activeSession: Nullable<FocusSession>;

  history: FocusHistoryEntry[];

  stats: FocusStats;

  settings: FocusSettings;

  isLoading: boolean;

  error: Nullable<string>;
};