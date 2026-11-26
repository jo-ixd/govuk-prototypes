import { existsSync, readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";

function discoverRoutes(parent: string): string[] {
  return readdirSync(parent, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(`${parent}/${entry.name}/page.tsx`),
    )
    .map((entry) => `${parent}/${entry.name}`.replace(/^app/, ""));
}

const componentRoutes = discoverRoutes("app/playground/components");
const patternRoutes = discoverRoutes("app/playground/patterns");
const serviceRoutes = discoverRoutes("app/playground/example-service");

const allRoutes = [
  "/",
  "/playground",
  ...componentRoutes,
  ...patternRoutes,
  ...serviceRoutes,
];

if (componentRoutes.length !== 36) {
  throw new Error(
    `expected 36 playground component routes, found ${componentRoutes.length}`,
  );
}

test.describe("route inventory", () => {
  for (const route of allRoutes) {
    test(`${route} renders with govuk markup`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("[class*='govuk-']").first()).toBeVisible();
    });
  }
});
