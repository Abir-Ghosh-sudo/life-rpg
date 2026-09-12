import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd()),
    },
  },

  test: {
    globals: true,
    environment: "node",

    include: [
      "tests/unit/**/*.test.ts",
      "tests/integration/**/*.test.ts",
    ],

    exclude: [
      "node_modules",
      ".next",
      "tests/e2e/**",
    ],

    passWithNoTests: true,

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/**",
        ".next/**",
        "tests/**",
        "**/*.d.ts",
        "**/index.ts",
      ],
    },
  },
});