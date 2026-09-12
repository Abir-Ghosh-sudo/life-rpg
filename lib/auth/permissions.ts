import type { UserRole } from "@/types/auth";

export type Permission =
  | "profile:read"
  | "profile:update"
  | "character:read"
  | "character:update"
  | "quest:read"
  | "quest:create"
  | "quest:update"
  | "quest:complete"
  | "quest:cancel"
  | "inventory:read"
  | "inventory:update"
  | "shop:read"
  | "shop:purchase"
  | "achievement:read"
  | "skill:read"
  | "skill:unlock"
  | "boss:read"
  | "boss:attack"
  | "adventure:read"
  | "adventure:unlock"
  | "focus:read"
  | "focus:create"
  | "analytics:read"
  | "events:read"
  | "events:complete"
  | "theme:read"
  | "theme:equip"
  | "notifications:read"
  | "notifications:update"
  | "admin:all";

const USER_PERMISSIONS: readonly Permission[] = [
  "profile:read",
  "profile:update",

  "character:read",
  "character:update",

  "quest:read",
  "quest:create",
  "quest:update",
  "quest:complete",
  "quest:cancel",

  "inventory:read",
  "inventory:update",

  "shop:read",
  "shop:purchase",

  "achievement:read",

  "skill:read",
  "skill:unlock",

  "boss:read",
  "boss:attack",

  "adventure:read",
  "adventure:unlock",

  "focus:read",
  "focus:create",

  "analytics:read",

  "events:read",
  "events:complete",

  "theme:read",
  "theme:equip",

  "notifications:read",
  "notifications:update",
];

const ADMIN_PERMISSIONS: readonly Permission[] = [
  "admin:all",
  ...USER_PERMISSIONS,
];

const ROLE_PERMISSIONS: Record<
  UserRole,
  readonly Permission[]
> = {
  user: USER_PERMISSIONS,
  admin: ADMIN_PERMISSIONS,
};

export function hasPermission(
  role: UserRole,
  permission: Permission,
): boolean {
  return ROLE_PERMISSIONS[role].includes(
    permission,
  );
}

export function getPermissions(
  role: UserRole,
): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}

export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}

export function requirePermission(
  role: UserRole,
  permission: Permission,
): void {
  if (!hasPermission(role, permission)) {
    throw new Error("FORBIDDEN");
  }
}