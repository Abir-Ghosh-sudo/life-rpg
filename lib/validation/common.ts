import { z } from "zod";

export const uuidSchema = z.string().uuid();

export const emailSchema = z
  .string()
  .trim()
  .email()
  .max(254)
  .transform((value) => value.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8)
  .max(128);

export const nonEmptyStringSchema = z
  .string()
  .trim()
  .min(1);

export const nonEmptyString = nonEmptyStringSchema;

export const positiveIntegerSchema = z
  .number()
  .int()
  .positive();

export const nonNegativeIntegerSchema = z
  .number()
  .int()
  .nonnegative();

export const percentageSchema = z
  .number()
  .min(0)
  .max(100);

export const positiveNumberSchema = z
  .number()
  .positive();

export const nonNegativeNumberSchema = z
  .number()
  .nonnegative();

export const dateSchema = z.coerce.date();

export const optionalDateSchema = z
  .union([
    z.coerce.date(),
    z.null(),
  ])
  .optional();

export const paginationSchema = z.object({
  page: z
    .number()
    .int()
    .min(1)
    .optional(),

  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),
});

export const sortDirectionSchema = z.enum([
  "asc",
  "desc",
]);

export function maxLengthSchema(max: number) {
  return z
    .string()
    .trim()
    .max(max);
}

export function minMaxLengthSchema(
  min: number,
  max: number,
) {
  return z
    .string()
    .trim()
    .min(min)
    .max(max);
}

export function enumSchema<T extends readonly string[]>(
  values: T,
) {
  return z.enum(values as unknown as [
    T[number],
    ...T[number][],
  ]);
}