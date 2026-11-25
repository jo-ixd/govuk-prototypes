import { defineConfig, devices } from "@playwright/test";

const port = 3311;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "tests/e2e",
  outputDir: ".artifacts/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : [["html", { outputFolder: ".artifacts/playwright-report" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- --port 3311",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 420_000,
  },
});
