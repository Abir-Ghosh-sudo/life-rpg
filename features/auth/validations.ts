import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  nonEmptyString,
} from "@/lib/validation/common";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: nonEmptyString.max(100, "Name is too long."),
  })
  .superRefine((data, ctx) => {
    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must be at least 8 characters.",
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const updatePasswordSchema = resetPasswordSchema;

export const updateAuthProfileSchema = z.object({
  name: nonEmptyString
    .max(100, "Name is too long.")
    .optional(),
  avatarUrl: z
    .string()
    .url("Invalid avatar URL.")
    .nullable()
    .optional(),
});

export const oauthSchema = z.object({
  provider: z.literal("google"),
  redirectTo: z.string().url().optional(),
});

export function validateLoginInput(input: unknown) {
  return loginSchema.parse(input);
}

export function validateSignupInput(input: unknown) {
  return signupSchema.parse(input);
}

export function validateForgotPasswordInput(input: unknown) {
  return forgotPasswordSchema.parse(input);
}

export function validateResetPasswordInput(input: unknown) {
  return resetPasswordSchema.parse(input);
}

export function validateUpdatePasswordInput(input: unknown) {
  return updatePasswordSchema.parse(input);
}

export function validateUpdateAuthProfileInput(input: unknown) {
  return updateAuthProfileSchema.parse(input);
}

export function validateOAuthInput(input: unknown) {
  return oauthSchema.parse(input);
}