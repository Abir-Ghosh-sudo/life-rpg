"use server";

import {
  signIn,
  signUp,
  signOut,
  sendPasswordReset,
  resetPassword,
  updatePassword,
  updateAuthProfile,
  signInWithGoogle,
} from "@/features/auth/service";

import {
  validateLoginInput,
  validateSignupInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateUpdatePasswordInput,
  validateUpdateAuthProfileInput,
  validateOAuthInput,
} from "@/features/auth/validations";

import type {
  AuthResult,
  ForgotPasswordInput,
  LoginInput,
  OAuthInput,
  ResetPasswordInput,
  SignupInput,
  UpdateAuthProfileInput,
  UpdatePasswordInput,
} from "@/features/auth/types";

export async function loginAction(
  input: LoginInput,
): Promise<AuthResult> {
  const validated = validateLoginInput(input);
  return signIn(validated);
}

export async function signupAction(
  input: SignupInput,
): Promise<AuthResult> {
  const validated = validateSignupInput(input);
  return signUp(validated);
}

export async function logoutAction(): Promise<AuthResult> {
  return signOut();
}

export async function forgotPasswordAction(
  input: ForgotPasswordInput,
): Promise<AuthResult> {
  const validated = validateForgotPasswordInput(input);

  return sendPasswordReset(
    validated,
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery`
      : undefined,
  );
}

export async function resetPasswordAction(
  input: ResetPasswordInput,
): Promise<AuthResult> {
  const validated = validateResetPasswordInput(input);
  return resetPassword(validated);
}

export async function updatePasswordAction(
  input: UpdatePasswordInput,
): Promise<AuthResult> {
  const validated = validateUpdatePasswordInput(input);
  return updatePassword(validated);
}

export async function updateAuthProfileAction(
  input: UpdateAuthProfileInput,
): Promise<AuthResult> {
  const validated = validateUpdateAuthProfileInput(input);
  return updateAuthProfile(validated);
}

export async function googleSignInAction(
  input: OAuthInput = { provider: "google" },
) {
  const validated = validateOAuthInput(input);
  return signInWithGoogle(validated);
}