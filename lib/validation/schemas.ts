import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  uuidSchema,
  nonEmptyStringSchema,
  positiveIntegerSchema,
  nonNegativeIntegerSchema,
  percentageSchema,
  paginationSchema,
} from "@/lib/validation/common";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,

    password: passwordSchema,

    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export const passwordResetSchema = z.object({
  email: emailSchema,
});

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,

    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export const createCharacterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(30),

  class: z.enum([
    "warrior",
    "mage",
    "ranger",
    "monk",
  ]),
});

export const updateCharacterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(30)
    .optional(),

  class: z
    .enum([
      "warrior",
      "mage",
      "ranger",
      "monk",
    ])
    .optional(),
});

export const createQuestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(100),

  description: z
    .string()
    .trim()
    .max(1000)
    .nullable()
    .optional(),

  category: z.enum([
    "coding",
    "study",
    "fitness",
    "health",
    "reading",
    "meditation",
    "work",
    "social",
    "personal",
    "creative",
    "other",
  ]),

  type: z
    .enum([
      "one_time",
      "daily",
      "weekly",
      "challenge",
      "chain",
    ])
    .optional(),

  difficulty: z.enum([
    "easy",
    "medium",
    "hard",
    "epic",
  ]),

  rarity: z
    .enum([
      "common",
      "uncommon",
      "rare",
      "epic",
      "legendary",
      "mythic",
    ])
    .optional(),

  attribute: z
    .enum([
      "strength",
      "intellect",
      "wisdom",
      "discipline",
      "charisma",
    ])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .nullable()
    .optional(),

  chainId: uuidSchema
    .nullable()
    .optional(),

  chainOrder: positiveIntegerSchema
    .nullable()
    .optional(),
});

export const updateQuestSchema =
  createQuestSchema.partial().extend({
    status: z
      .enum([
        "pending",
        "in_progress",
        "completed",
        "cancelled",
      ])
      .optional(),
  });

export const questIdSchema = z.object({
  questId: uuidSchema,
});

export const paginationParamsSchema =
  paginationSchema.extend({
    page: z
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(20),
  });

export const shopPurchaseSchema = z.object({
  shopItemId: uuidSchema,

  quantity: z
    .number()
    .int()
    .min(1)
    .max(99)
    .default(1),
});

export const bossAttackSchema = z.object({
  bossId: uuidSchema,

  damage: z
    .number()
    .int()
    .min(1)
    .max(500),
});

export const unlockWorldSchema = z.object({
  worldId: uuidSchema,
});

export const unlockRegionSchema = z.object({
  regionId: uuidSchema,
});

export const unlockSkillSchema = z.object({
  skillId: uuidSchema,
});

export const unlockThemeSchema = z.object({
  themeId: uuidSchema,
});

export const equipThemeSchema = z.object({
  themeId: uuidSchema,
});

export const startFocusSessionSchema = z.object({
  mode: z.enum([
    "pomodoro",
    "deep_work",
    "short_break",
    "long_break",
    "custom",
  ]),

  duration: z
    .number()
    .int()
    .min(1)
    .max(240),

  questId: uuidSchema
    .nullable()
    .optional(),
});

export const completeFocusSessionSchema =
  z.object({
    sessionId: uuidSchema,

    actualDuration: z
      .number()
      .int()
      .min(0)
      .max(240)
      .optional(),
  });

export const cancelFocusSessionSchema =
  z.object({
    sessionId: uuidSchema,
  });

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    )
    .nullable()
    .optional(),

  bio: z
    .string()
    .trim()
    .max(500)
    .nullable()
    .optional(),

  avatarUrl: z
    .string()
    .url()
    .nullable()
    .optional(),
});

export const preferencesSchema = z.object({
  soundEnabled: z
    .boolean()
    .optional(),

  notificationsEnabled: z
    .boolean()
    .optional(),

  reducedMotion: z
    .boolean()
    .optional(),

  theme: nonEmptyStringSchema
    .max(100)
    .optional(),

  timezone: nonEmptyStringSchema
    .max(100)
    .optional(),
});

export const analyticsQuerySchema = z.object({
  period: z
    .enum([
      "today",
      "week",
      "month",
      "year",
      "all_time",
    ])
    .optional(),

  from: z
    .string()
    .datetime()
    .optional(),

  to: z
    .string()
    .datetime()
    .optional(),
});

export const percentageInputSchema =
  percentageSchema;

export const quantitySchema =
  positiveIntegerSchema
    .min(1)
    .max(99);

export const amountSchema =
  nonNegativeIntegerSchema;

export const idSchema = uuidSchema;