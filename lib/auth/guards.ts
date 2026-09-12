import { redirect } from "next/navigation";

import {
  getSessionUser,
  requireSessionUser,
} from "@/lib/auth/session";

export async function requireAuth() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireGuest() {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  return null;
}

export async function requireAuthOrThrow() {
  return requireSessionUser();
}