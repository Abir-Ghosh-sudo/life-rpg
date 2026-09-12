import type {
  Character,
  CharacterStats,
} from "@/types/character";
import type {
  Quest,
  QuestCompletion,
} from "@/types/quest";
import type {
  Achievement,
  UserAchievement,
} from "@/types/achievement";
import type {
  Boss,
  BossProgress,
} from "@/types/boss";
import type {
  World,
  Region,
  AdventureProgress,
} from "@/types/adventure";
import type {
  FocusSession,
} from "@/types/focus";
import type {
  Skill,
  UserSkill,
} from "@/types/skill";
import type {
  Theme,
  UserTheme,
} from "@/types/theme";
import type {
  Profile,
  UserProfile,
} from "@/types/profile";
import type {
  InventoryItem,
  Item,
} from "@/types/inventory";
import type {
  Wallet,
  WalletTransaction,
} from "@/types/shop";
import type {
  ActivityHistory,
} from "@/types/analytics";
import type {
  RandomEvent,
  UserEvent,
} from "@/types/event";
import type {
  Notification,
} from "@/types/notification";

export type TableDef<T> = {
  Row: T & Record<string, any>;
  Insert: Partial<T> & Record<string, any>;
  Update: Partial<T> & Record<string, any>;
  Relationships: any[];
};

export type Database = {
  public: {
    Tables: {
      profiles: TableDef<UserProfile>;
      characters: TableDef<Character>;
      character_stats: TableDef<CharacterStats>;
      quests: TableDef<Quest>;
      quest_completions: TableDef<QuestCompletion>;
      achievements: TableDef<Achievement>;
      user_achievements: TableDef<UserAchievement>;
      items: TableDef<Item>;
      inventory: TableDef<InventoryItem>;
      wallet: TableDef<Wallet>;
      wallet_transactions: TableDef<WalletTransaction>;
      bosses: TableDef<Boss>;
      boss_progress: TableDef<BossProgress>;
      worlds: TableDef<World>;
      regions: TableDef<Region>;
      adventure_progress: TableDef<AdventureProgress>;
      skills: TableDef<Skill>;
      user_skills: TableDef<UserSkill>;
      focus_sessions: TableDef<FocusSession>;
      activity_history: TableDef<ActivityHistory>;
      themes: TableDef<Theme>;
      user_themes: TableDef<UserTheme>;
      random_events: TableDef<RandomEvent>;
      user_events: TableDef<UserEvent>;
      notifications: TableDef<Notification>;
      [key: string]: TableDef<Record<string, any>>;
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type PublicDatabase = Database["public"];

export type TableName = keyof PublicDatabase["Tables"];

export type TableRow<T extends TableName> = PublicDatabase["Tables"][T]["Row"];

export type TableInsert<T extends TableName> = PublicDatabase["Tables"][T]["Insert"];

export type TableUpdate<T extends TableName> = PublicDatabase["Tables"][T]["Update"];