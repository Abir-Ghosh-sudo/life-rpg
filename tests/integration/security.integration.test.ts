import { describe, expect, it } from "vitest";

import {
  validateLoginInput,
  validateSignupInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateOAuthInput,
} from "@/features/auth/validations";

describe("Security integration", () => {
  describe("authentication input validation", () => {
    it("rejects malformed login credentials", () => {
      expect(() =>
        validateLoginInput({
          email: "not-an-email",
          password: "",
        }),
      ).toThrow();
    });

    it("rejects invalid signup data", () => {
      expect(() =>
        validateSignupInput({
          email: "attacker",
          password: "123",
          name: "",
        }),
      ).toThrow();
    });

    it("rejects empty password-reset input", () => {
      expect(() =>
        validateForgotPasswordInput({
          email: "",
        }),
      ).toThrow();
    });

    it("rejects mismatched password confirmation", () => {
      expect(() =>
        validateResetPasswordInput({
          password: "StrongPassword123!",
          confirmPassword: "DifferentPassword123!",
        }),
      ).toThrow();
    });
  });

  describe("OAuth validation", () => {
    it("accepts Google OAuth", () => {
      const result = validateOAuthInput({
        provider: "google",
      });

      expect(result.provider).toBe("google");
    });

    it("rejects unsupported OAuth providers", () => {
      expect(() =>
        validateOAuthInput({
          provider: "github",
        }),
      ).toThrow();
    });
  });

  describe("security boundaries", () => {
    it("does not allow arbitrary OAuth providers", () => {
      for (const provider of [
        "github",
        "facebook",
        "twitter",
        "admin",
      ]) {
        expect(() =>
          validateOAuthInput({
            provider,
          }),
        ).toThrow();
      }
    });

    it("requires a valid email for password recovery", () => {
      expect(() =>
        validateForgotPasswordInput({
          email: "malformed-email",
        }),
      ).toThrow();
    });

    it("requires a valid password during reset", () => {
      expect(() =>
        validateResetPasswordInput({
          password: "123",
          confirmPassword: "123",
        }),
      ).toThrow();
    });
  });
});