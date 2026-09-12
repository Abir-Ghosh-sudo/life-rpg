import type {
  ID,
  ISODateString,
} from "@/types/common";

export type RandomEventType =
  | "bonus"
  | "challenge"
  | "encounter"
  | "reward"
  | "hazard"
  | "mystery"
  | "streak"
  | "energy"
  | "xp"
  | "gold";

export type UserEventStatus =
  | "pending"
  | "active"
  | "claimed"
  | "dismissed"
  | "expired";

export interface RandomEvent {
  id: ID;
  name: string;
  description: string;
  type: RandomEventType | string;
  probability: number;
  minXpReward: number;
  maxXpReward: number;
  minGoldReward: number;
  maxGoldReward: number;
  energyChange: number;
  hpChange: number;
  durationHours: number | null;
  isPositive: boolean;
  isActive: boolean;
  metadata?: Record<
    string,
    unknown
  > | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface UserEvent {
  id: ID;
  userId: ID;
  eventId: ID;
  status: UserEventStatus | string;
  xpReward: number;
  goldReward: number;
  energyChange: number;
  hpChange: number;
  expiresAt: ISODateString | null;
  claimedAt: ISODateString | null;
  dismissedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  metadata?: Record<
    string,
    unknown
  > | null;
}

export interface GenerateRandomEventInput {
  force?: boolean;
}

export interface ClaimRandomEventInput {
  eventId: ID;
}

export interface DismissRandomEventInput {
  eventId: ID;
}

export interface EventIdInput {
  eventId: ID;
}

export interface EventQueryOptions {
  status?: UserEventStatus;
  type?: RandomEventType;
  activeOnly?: boolean;
  limit?: number;
  offset?: number;
}

export interface EventReward {
  xp: number;
  gold: number;
  energy: number;
  hp: number;
}

export interface EventRewardPreview {
  minXp: number;
  maxXp: number;
  minGold: number;
  maxGold: number;
  energyChange: number;
  hpChange: number;
}

export interface EventInstance {
  id: ID;
  definition: RandomEvent;
  status: UserEventStatus;
  reward: EventReward;
  expiresAt: ISODateString | null;
  createdAt: ISODateString;
}

export interface EventResult {
  success: boolean;
  message?: string;
  event?: UserEvent;
  reward?: EventReward;
}

export interface GenerateEventResult {
  success: boolean;
  event: EventInstance | null;
  generated: boolean;
  message?: string;
}

export interface EventListResult {
  events: UserEvent[];
  total: number;
  hasMore: boolean;
}

export interface EventSummary {
  total: number;
  active: number;
  claimed: number;
  dismissed: number;
  expired: number;
  totalXp: number;
  totalGold: number;
}

export interface EventProgress {
  eventId: ID;
  status: UserEventStatus;
  remainingSeconds: number;
  remainingMinutes: number;
  isExpired: boolean;
  canClaim: boolean;
}

export interface EventActionResult {
  success: boolean;
  message?: string;
  eventId?: ID;
  reward?: EventReward;
}