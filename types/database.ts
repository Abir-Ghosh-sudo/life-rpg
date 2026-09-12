import type {
  Achievement,
  UserAchievement,
} from "@/types/achievement";
import type {
  AdventureProgress,
  Region,
  World,
} from "@/types/adventure";
import type {
  Boss,
  BossProgress,
} from "@/types/boss";
import type {
  Character,
  CharacterStats,
} from "@/types/character";
import type {
  FocusSession,
} from "@/types/focus";
import type {
  Quest,
  QuestCompletion,
} from "@/types/quest";
import type {
  Skill,
  UserSkill,
} from "@/types/skill";
import type {
  Theme,
  UserTheme,
} from "@/types/theme";
import type {
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

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Partial<UserProfile>;
        Update: Partial<UserProfile>;
      };

      characters: {
        Row: Character;
        Insert: Partial<Character>;
        Update: Partial<Character>;
      };

      character_stats: {
        Row: CharacterStats;
        Insert: Partial<CharacterStats>;
        Update: Partial<CharacterStats>;
      };

      quests: {
        Row: Quest;
        Insert: Partial<Quest>;
        Update: Partial<Quest>;
      };

      quest_completions: {
        Row: QuestCompletion;
        Insert: Partial<QuestCompletion>;
        Update: Partial<QuestCompletion>;
      };

      achievements: {
        Row: Achievement;
        Insert: Partial<Achievement>;
        Update: Partial<Achievement>;
      };

      user_achievements: {
        Row: UserAchievement;
        Insert: Partial<UserAchievement>;
        Update: Partial<UserAchievement>;
      };

      items: {
        Row: Item;
        Insert: Partial<Item>;
        Update: Partial<Item>;
      };

      inventory: {
        Row: InventoryItem;
        Insert: Partial<InventoryItem>;
        Update: Partial<InventoryItem>;
      };

      wallet: {
        Row: Wallet;
        Insert: Partial<Wallet>;
        Update: Partial<Wallet>;
      };

      wallet_transactions: {
        Row: WalletTransaction;
        Insert: Partial<WalletTransaction>;
        Update: Partial<WalletTransaction>;
      };

      bosses: {
        Row: Boss;
        Insert: Partial<Boss>;
        Update: Partial<Boss>;
      };

      boss_progress: {
        Row: BossProgress;
        Insert: Partial<BossProgress>;
        Update: Partial<BossProgress>;
      };

      worlds: {
        Row: World;
        Insert: Partial<World>;
        Update: Partial<World>;
      };

      regions: {
        Row: Region;
        Insert: Partial<Region>;
        Update: Partial<Region>;
      };

      adventure_progress: {
        Row: AdventureProgress;
        Insert: Partial<AdventureProgress>;
        Update: Partial<AdventureProgress>;
      };

      skills: {
        Row: Skill;
        Insert: Partial<Skill>;
        Update: Partial<Skill>;
      };

      user_skills: {
        Row: UserSkill;
        Insert: Partial<UserSkill>;
        Update: Partial<UserSkill>;
      };

      focus_sessions: {
        Row: FocusSession;
        Insert: Partial<FocusSession>;
        Update: Partial<FocusSession>;
      };

      activity_history: {
        Row: ActivityHistory;
        Insert: Partial<ActivityHistory>;
        Update: Partial<ActivityHistory>;
      };

      themes: {
        Row: Theme;
        Insert: Partial<Theme>;
        Update: Partial<Theme>;
      };

      user_themes: {
        Row: UserTheme;
        Insert: Partial<UserTheme>;
        Update: Partial<UserTheme>;
      };

      random_events: {
        Row: RandomEvent;
        Insert: Partial<RandomEvent>;
        Update: Partial<RandomEvent>;
      };

      user_events: {
        Row: UserEvent;
        Insert: Partial<UserEvent>;
        Update: Partial<UserEvent>;
      };

      notifications: {
        Row: Notification;
        Insert: Partial<Notification>;
        Update: Partial<Notification>;
      };
    };

    Views: Record<string, never>;

    Functions: Record<string, never>;

    Enums: Record<string, never>;

    CompositeTypes: Record<string, never>;
  };
};

export type PublicDatabase =
  Database["public"];

export type TableName =
  keyof PublicDatabase["Tables"];

export type TableRow<
  T extends TableName,
> =
  PublicDatabase["Tables"][T]["Row"];

export type TableInsert<
  T extends TableName,
> =
  PublicDatabase["Tables"][T]["Insert"];

export type TableUpdate<
  T extends TableName,
> =
  PublicDatabase["Tables"][T]["Update"];