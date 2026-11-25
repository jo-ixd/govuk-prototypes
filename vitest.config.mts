import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["tests/setup.ts"],
    // Unit tests live under tests/unit, mirroring the app directory they
    // cover. Playwright specs live in tests/e2e.
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: ".artifacts/coverage",
      include: [
        "app/components/govuk/**",
        "app/playground/example-service/**/*.{ts,tsx}",
      ],
      exclude: ["app/playground/example-service/**/page.tsx"],
    },
  },
});
