import type {
  ID,
  ISODateString,
  Rarity,
} from "@/types/common";

export interface AnalyticsQuery {
  from?: ISODateString;
  to?: ISODateString;
  limit?: number;
}

export interface AnalyticsStats {
  totalXp: number;
  totalGold: number;
  totalQuests: number;
  completedQuests: number;
  focusMinutes: number;
  activeDays: number;
}

export interface AnalyticsOverview
  extends AnalyticsStats {
  completionRate: number;
  averageXpPerDay: number;
  averageGoldPerDay: number;
  averageQuestsPerDay: number;
  averageFocusMinutesPerDay: number;
}

export interface AnalyticsTrend {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  direction:
    | "up"
    | "down"
    | "flat";
}

export interface AnalyticsTrends {
  xp: AnalyticsTrend;
  gold: AnalyticsTrend;
  quests: AnalyticsTrend;
  focus: AnalyticsTrend;
  activity: AnalyticsTrend;
}

export interface DailyAnalytics {
  date: string;
  xp: number;
  gold: number;
  quests: number;
  completedQuests: number;
  activities: number;
  focusMinutes: number;
}

export interface WeeklyAnalytics {
  week: string;
  xp: number;
  gold: number;
  quests: number;
  completedQuests: number;
  activities: number;
  focusMinutes: number;
}

export interface MonthlyAnalytics {
  month: string;
  xp: number;
  gold: number;
  quests: number;
  completedQuests: number;
  activities: number;
  focusMinutes: number;
}

export interface CategoryAnalytics {
  category: string;
  count: number;
  xp: number;
  gold: number;
  completionRate?: number;
}

export interface DifficultyAnalytics {
  difficulty: string;
  count: number;
  completed: number;
  xp: number;
  gold: number;
  completionRate: number;
}

export interface RarityAnalytics {
  rarity: Rarity;
  count: number;
  completed: number;
  xp: number;
  gold: number;
}

export interface StreakAnalytics {
  current: number;
  longest: number;
  activeDays: number;
  averageGapDays: number;
}

export interface ProgressionAnalytics {
  currentLevel: number;
  totalXp: number;
  xpToNextLevel: number;
  levelProgress: number;
  levelsGained: number;
  totalGold: number;
}

export interface QuestAnalytics {
  total: number;
  completed: number;
  pending: number;
  cancelled: number;
  completionRate: number;
  averageXp: number;
  averageGold: number;
}

export interface FocusAnalytics {
  sessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalMinutes: number;
  completedMinutes: number;
  averageMinutes: number;
  completionRate: number;
}

export interface AnalyticsActivity {
  id: ID;
  entityType: string;
  action: string;
  description: string | null;
  xpEarned: number;
  goldEarned: number;
  createdAt: ISODateString;
  metadata?: Record<
    string,
    unknown
  > | null;
}

export interface AnalyticsDashboard {
  overview: AnalyticsOverview;
  trends: AnalyticsTrends;
  progression: ProgressionAnalytics;
  quests: QuestAnalytics;
  focus: FocusAnalytics;
  streak: StreakAnalytics;
  daily: DailyAnalytics[];
  categories: CategoryAnalytics[];
  recentActivity: AnalyticsActivity[];
}

export interface AnalyticsChartPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  date?: string;
}

export interface AnalyticsChartSeries {
  id: string;
  label: string;
  data: AnalyticsChartPoint[];
}

export interface AnalyticsExport {
  generatedAt: ISODateString;
  from: ISODateString;
  to: ISODateString;
  overview: AnalyticsOverview;
  daily: DailyAnalytics[];
  categories: CategoryAnalytics[];
}

export type AnalyticsPeriod =
  | "day"
  | "week"
  | "month";

export type AnalyticsMetric =
  | "xp"
  | "gold"
  | "quests"
  | "focus"
  | "activities"
  | "streak";

export type AnalyticsSort =
  | "date"
  | "xp"
  | "gold"
  | "quests"
  | "focus";