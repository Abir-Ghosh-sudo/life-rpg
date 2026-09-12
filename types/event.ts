import type {
  UUID,
  ISODateString,
  Nullable,
  Rarity,
  RewardType,
} from "@/types/common";

export type RandomEventType =
  | "bonus_xp"
  | "bonus_gold"
  | "energy_boost"
  | "streak_boost"
  | "combo_boost"
  | "item_drop"
  | "challenge"
  | "mystery"
  | "special";

export type RandomEventStatus =
  | "available"
  | "active"
  | "completed"
  | "expired"
  | "declined";

export type RandomEvent = {
  id: UUID;

  name: string;
  description: string;

  type: RandomEventType;

  rarity: Rarity;

  icon: string;

  durationMinutes: number;

  xpReward: number;
  goldReward: number;

  energyReward: number;

  status: RandomEventStatus;

  startsAt: ISODateString;
  expiresAt: ISODateString;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UserEvent = {
  id: UUID;

  userId: UUID;
  eventId: UUID;

  status: RandomEventStatus;

  progress: number;

  target: number;

  rewardClaimed: boolean;

  startedAt: Nullable<ISODateString>;
  completedAt: Nullable<ISODateString>;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type RandomEventWithProgress = RandomEvent & {
  progress: Nullable<UserEvent>;
};

export type StartEventInput = {
  eventId: UUID;
};

export type CompleteEventInput = {
  eventId: UUID;
};

export type DeclineEventInput = {
  eventId: UUID;
};

export type EventReward = {
  type: RewardType;

  amount?: number;

  itemId?: UUID;

  titleId?: UUID;

  skillId?: UUID;
};

export type EventCompletionResult = {
  event: RandomEvent;

  userEvent: UserEvent;

  rewards: EventReward[];

  completedAt: ISODateString;
};

export type EventGeneratorContext = {
  userId: UUID;

  level: number;

  currentStreak: number;

  currentCombo: number;

  currentEnergy: number;

  completedQuestsToday: number;
};

export type EventState = {
  activeEvent: Nullable<RandomEventWithProgress>;

  availableEvents: RandomEventWithProgress[];

  isLoading: boolean;

  error: Nullable<string>;
};