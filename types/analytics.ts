import type {
  UUID,
  ISODateString,
  Nullable,
} from "@/types/common";

export type AnalyticsPeriod =
  | "today"
  | "week"
  | "month"
  | "year"
  | "all_time";

export type QuestAnalytics = {
  totalQuests: number;

  completedQuests: number;

  pendingQuests: number;

  cancelledQuests: number;

  completionRate: number;

  averageXpPerQuest: number;

  averageGoldPerQuest: number;
};

export type QuestCategoryAnalytics = {
  category: string;

  total: number;

  completed: number;

  completionRate: number;

  xpEarned: number;
};

export type DailyActivity = {
  date: ISODateString;

  questsCompleted: number;

  xpEarned: number;

  goldEarned: number;

  focusMinutes: number;

  streak: number;
};

export type XpAnalytics = {
  totalXp: number;

  xpEarned: number;

  averageXpPerDay: number;

  highestXpDay: number;

  currentLevel: number;

  xpToNextLevel: number;

  levelProgress: number;
};

export type StreakAnalytics = {
  currentStreak: number;

  longestStreak: number;

  averageStreak: number;

  streakDays: number;

  protectedStreaks: number;
};

export type FocusAnalytics = {
  totalSessions: number;

  totalMinutes: number;

  averageSessionMinutes: number;

  longestSessionMinutes: number;

  completedSessions: number;

  completionRate: number;
};

export type EconomyAnalytics = {
  currentGold: number;

  totalGoldEarned: number;

  totalGoldSpent: number;

  totalPurchases: number;

  averagePurchaseValue: number;
};

export type ProgressionAnalytics = {
  currentLevel: number;

  totalXp: number;

  xpEarned: number;

  levelsGained: number;

  attributesGained: number;

  achievementsUnlocked: number;

  skillsUnlocked: number;

  worldsUnlocked: number;
};

export type AnalyticsSummary = {
  period: AnalyticsPeriod;

  startDate: ISODateString;

  endDate: ISODateString;

  quests: QuestAnalytics;

  xp: XpAnalytics;

  streak: StreakAnalytics;

  focus: FocusAnalytics;

  economy: EconomyAnalytics;

  progression: ProgressionAnalytics;
};

export type AnalyticsChartPoint = {
  date: ISODateString;

  value: number;

  label?: string;
};

export type AnalyticsChart = {
  id: string;

  title: string;

  data: AnalyticsChartPoint[];

  unit: "xp" | "gold" | "quests" | "minutes" | "streak" | "level";
};

export type AttributeAnalytics = {
  strength: number;

  intellect: number;

  wisdom: number;

  discipline: number;

  charisma: number;
};

export type AnalyticsDashboard = {
  summary: AnalyticsSummary;

  dailyActivity: DailyActivity[];

  categoryBreakdown: QuestCategoryAnalytics[];

  attributes: AttributeAnalytics;

  charts: AnalyticsChart[];
};

export type AnalyticsQuery = {
  period?: AnalyticsPeriod;

  from?: ISODateString;

  to?: ISODateString;
};

export type AnalyticsState = {
  dashboard: Nullable<AnalyticsDashboard>;

  isLoading: boolean;

  error: Nullable<string>;
};

export type AnalyticsComparison = {
  current: number;

  previous: number;

  difference: number;

  percentageChange: number;

  trend: "up" | "down" | "neutral";
};

export type UserAnalytics = {
  userId: UUID;

  summary: AnalyticsSummary;

  generatedAt: ISODateString;
};