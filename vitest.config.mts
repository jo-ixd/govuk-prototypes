import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["tests/setup.ts"],
    // Component, helper and form tests are colocated as *.test.ts(x)
    // next to the files they cover. Playwright specs live in tests/e2e.
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "app/components/govuk/**",
        "app/playground/example-service/**/*.{ts,tsx}",
      ],
      exclude: ["app/playground/example-service/**/page.tsx"],
    },
  },
});
