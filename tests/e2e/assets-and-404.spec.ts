import { expect, test } from "@playwright/test";

const assets = [
  "/assets/manifest.json",
  "/assets/images/govuk-crest.svg",
  "/assets/images/favicon.svg",
  "/assets/images/govuk-icon-192.png",
  "/assets/fonts/bold-b542beb274-v2.woff2",
];

test.describe("static assets and error pages", () => {
  test("govuk fonts, images and manifest are served", async ({ request }) => {
    for (const asset of assets) {
      const response = await request.get(asset);
      expect(response.status(), asset).toBe(200);
    }
  });

  test("unknown pages render the govuk styled 404", async ({ page }) => {
    const response = await page.goto("/no-such-page-in-this-prototype");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    // The "Back to the playground" call to action is a link rendered with
    // button semantics, so it carries the button role with an href.
    await expect(
      page.getByRole("button", { name: "Back to the playground" }),
    ).toHaveAttribute("href", "/playground");
  });
});
