import { expect, test } from "@playwright/test";

// One skip link comes from the root layout, so every page - the home page,
// playground pages built on the nested layout, and the 404 page - must have
// exactly one, and it must actually skip to the main content region.
const routes = [
  "/",
  "/playground",
  "/playground/example-service",
  "/this-page-does-not-exist",
];

test.describe("skip link", () => {
  for (const route of routes) {
    test(`skips to the main content on ${route}`, async ({ page }) => {
      await page.goto(route);

      const skipLink = page.locator(".govuk-skip-link");
      await expect(skipLink).toHaveCount(1);
      await expect(skipLink).toHaveAttribute("href", "#main-content");

      // the target the link promises actually exists on the page
      await expect(page.locator("main#main-content")).toBeAttached();

      // the skip link is the first tab stop: it sits before the header and
      // any page content in the body
      await page.keyboard.press("Tab");
      await expect(skipLink).toBeFocused();

      // activating it moves to the main content region
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/#main-content$/);
    });
  }

  test("every skip link on the component playground page has a target", async ({
    page,
  }) => {
    await page.goto("/playground/components/skip-link");

    // the page's own skip link plus the demo links must all point at real
    // elements, so each one jumps somewhere when used
    const linksWithoutTargets = await page
      .locator(".govuk-skip-link")
      .evaluateAll((links) =>
        links.filter(
          (link) =>
            document.getElementById(
              decodeURIComponent((link as HTMLAnchorElement).hash.slice(1)),
            ) === null,
        ),
      );
    expect(linksWithoutTargets).toEqual([]);
  });
});
