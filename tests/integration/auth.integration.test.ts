import { describe, expect, it, vi } from "vitest";

import {
  validateLoginInput,
  validateSignupInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
} from "@/features/auth/validations";

describe("Auth integration contract", () => {
  describe("signup flow", () => {
    it("accepts valid signup data", () => {
      const input = {
        email: "player@example.com",
        password: "StrongPassword123!",
        name: "Player One",
      };

      const result = validateSignupInput(input);

      expect(result).toEqual(input);
    });

    it("rejects invalid signup data", () => {
      expect(() =>
        validateSignupInput({
          email: "not-an-email",
          password: "123",
          name: "",
        }),
      ).toThrow();
    });
  });

  describe("login flow", () => {
    it("accepts valid login credentials", () => {
      const input = {
        email: "player@example.com",
        password: "StrongPassword123!",
      };

      const result = validateLoginInput(input);

      expect(result).toEqual(input);
    });

    it("rejects an invalid email", () => {
      expect(() =>
        validateLoginInput({
          email: "invalid",
          password: "password",
        }),
      ).toThrow();
    });

    it("rejects an empty password", () => {
      expect(() =>
        validateLoginInput({
          email: "player@example.com",
          password: "",
        }),
      ).toThrow();
    });
  });

  describe("password recovery flow", () => {
    it("accepts a valid recovery email", () => {
      const result = validateForgotPasswordInput({
        email: "player@example.com",
      });

      expect(result.email).toBe("player@example.com");
    });

    it("requires matching reset passwords", () => {
      expect(() =>
        validateResetPasswordInput({
          password: "StrongPassword123!",
          confirmPassword: "DifferentPassword123!",
        }),
      ).toThrow();
    });

    it("accepts matching reset passwords", () => {
      const input = {
        password: "StrongPassword123!",
        confirmPassword: "StrongPassword123!",
      };

      const result = validateResetPasswordInput(input);

      expect(result).toEqual(input);
    });
  });
});