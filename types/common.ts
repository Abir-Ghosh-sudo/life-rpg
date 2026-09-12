export type UUID = string;

export type ISODateString = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = UUID;

export type SuccessResponse<T = undefined> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type ActionResponse<T = undefined> =
  | SuccessResponse<T>
  | ErrorResponse;

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type SortDirection = "asc" | "desc";

export type SortParams = {
  field: string;
  direction: SortDirection;
};

export type DateRange = {
  from: ISODateString;
  to: ISODateString;
};

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "cancelled";

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export type Difficulty =
  | "easy"
  | "medium"
  | "hard"
  | "epic";

export type Attribute =
  | "strength"
  | "intellect"
  | "wisdom"
  | "discipline"
  | "charisma";

export type RewardType =
  | "xp"
  | "gold"
  | "item"
  | "attribute"
  | "energy"
  | "achievement"
  | "title"
  | "skill";

export type EntityType =
  | "quest"
  | "achievement"
  | "item"
  | "boss"
  | "skill"
  | "world"
  | "region"
  | "event"
  | "focus_session";

export type Timestamped = {
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type SoftDeletable = {
  deletedAt: Nullable<ISODateString>;
};