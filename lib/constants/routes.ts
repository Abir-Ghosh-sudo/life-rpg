export const ROUTES = {
  home: "/",

  auth: {
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    callback: "/auth/callback",
  },

  game: {
    dashboard: "/dashboard",
    quests: "/quests",
    character: "/character",
    adventure: "/adventure",
    boss: "/boss",
    shop: "/shop",
    inventory: "/inventory",
    achievements: "/achievements",
    skillTree: "/skill-tree",
    history: "/history",
    analytics: "/analytics",
    focus: "/focus",
    settings: "/settings",
  },

  api: {
    health: "/api/health",
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.auth.login,
  ROUTES.auth.signup,
  ROUTES.auth.forgotPassword,
  ROUTES.auth.resetPassword,
  ROUTES.auth.callback,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.game.dashboard,
  ROUTES.game.quests,
  ROUTES.game.character,
  ROUTES.game.adventure,
  ROUTES.game.boss,
  ROUTES.game.shop,
  ROUTES.game.inventory,
  ROUTES.game.achievements,
  ROUTES.game.skillTree,
  ROUTES.game.history,
  ROUTES.game.analytics,
  ROUTES.game.focus,
  ROUTES.game.settings,
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
export type ProtectedRoute = (typeof PROTECTED_ROUTES)[number];

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}