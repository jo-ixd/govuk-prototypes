import { expect, test } from "@playwright/test";

test.describe("govuk progressive enhancement", () => {
  test("the character count updates its message as you type", async ({
    page,
  }) => {
    await page.goto("/playground/components/character-count");

    const textarea = page.locator("#character-count-playground");
    await expect(textarea).toBeVisible();

    // govuk's script moves the original description out of the way and
    // creates a new visible count message next to it, scoped here to the
    // interactive example.
    const formGroup = page.locator(".govuk-character-count").filter({
      has: textarea,
    });
    const message = formGroup.locator(
      ".govuk-character-count__message:not(.govuk-visually-hidden)",
    );

    await textarea.fill("Hello");
    await expect(message).toHaveText("You have 5 characters remaining");
  });

  test("the character count warns when over the limit", async ({ page }) => {
    await page.goto("/playground/components/character-count");

    const textarea = page.locator("#character-count-playground");
    const formGroup = page.locator(".govuk-character-count").filter({
      has: textarea,
    });
    const message = formGroup.locator(
      ".govuk-character-count__message:not(.govuk-visually-hidden)",
    );

    await textarea.fill("This is far too long");
    await expect(message).toHaveText("You have 10 characters too many");
  });

  test("accordion sections collapse when their heading is clicked", async ({
    page,
  }) => {
    await page.goto("/playground/components/accordion");

    const firstSection = page.locator(".govuk-accordion__section").first();
    await expect(firstSection).toHaveClass(/govuk-accordion__section--expanded/);

    // govuk's script swaps the heading span for a button when it enhances the
    // accordion - wait for that before clicking, or the click lands on a
    // non-interactive span and the section never toggles
    await page.waitForFunction(() => {
      const button = document.querySelector(".govuk-accordion__section-button");
      return button !== null && button.tagName === "BUTTON";
    });

    await page
      .locator(".govuk-accordion__section-button")
      .first()
      .click();
    await expect(firstSection).not.toHaveClass(
      /govuk-accordion__section--expanded/,
    );
  });

  test("the accordion playground survives changing the heading level", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));

    await page.goto("/playground/components/accordion");

    // Wait for the initial enhancement, as the existing accordion test does -
    // the rebuilt preview has to be compared against enhanced markup
    await page.waitForFunction(() => {
      const button = document.querySelector(".govuk-accordion__section-button");
      return button !== null && button.tagName === "BUTTON";
    });

    // Changing the heading level rebuilds the playground preview from
    // scratch: React must never reconcile over the enhanced DOM (it throws
    // NotFoundError doing that), and the fresh markup must be enhanced again
    const preview = page.locator(".playground-preview");
    await page.getByLabel("Heading level").selectOption("3");

    await expect(
      preview.locator("h3.govuk-accordion__section-heading"),
    ).toHaveCount(2);
    await page.waitForFunction(() => {
      const button = document.querySelector(
        ".playground-preview .govuk-accordion__section-button",
      );
      return button !== null && button.tagName === "BUTTON";
    });

    // The rebuilt accordion still works: the first section starts expanded
    // and clicking its heading collapses it
    await preview.locator(".govuk-accordion__section-button").first().click();
    await expect(preview.locator(".govuk-accordion__section").first()).not.toHaveClass(
      /govuk-accordion__section--expanded/,
    );

    expect(pageErrors).toEqual([]);
  });

  test("the exit this page playground announces the current activated text", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));

    await page.goto("/playground/components/exit-this-page");

    const preview = page.locator(".playground-preview");

    // The indicator lights only exist once govuk's script has enhanced the
    // page-load markup
    await expect(
      preview.locator(".govuk-exit-this-page__indicator-light"),
    ).toHaveCount(3);

    // Point the redirect at a fragment so activating the exit leaves the
    // page - and its announcement - alive to be asserted against
    await page.getByLabel("Redirect URL").fill("#");
    await page.getByLabel("Activated text").fill("Tudalen ymadael");

    // govuk's ExitThisPage reads its announcement texts once, when the
    // script initialises - the playground rebuilds the preview from scratch
    // on every control change, so wait for the rebuilt button to be
    // enhanced again before clicking it
    await page.waitForFunction(() => {
      const root = document.querySelector(
        ".playground-preview .govuk-exit-this-page",
      );
      const button = document.querySelector(
        ".playground-preview .govuk-exit-this-page__button",
      );
      return (
        root !== null &&
        button !== null &&
        root.getAttribute("data-i18n.activated") === "Tudalen ymadael" &&
        button.getAttribute("href") === "#" &&
        button.querySelector(".govuk-exit-this-page__indicator") !== null
      );
    });

    await preview.locator(".govuk-exit-this-page__button").click();

    // The announcement overlay carries the custom text - without the
    // rebuild it would still read the init-time default, "Loading."
    await expect(page.locator(".govuk-exit-this-page-overlay")).toHaveText(
      "Tudalen ymadael",
    );

    expect(pageErrors).toEqual([]);
  });

  test("tabs switch to the selected panel", async ({ page }) => {
    await page.goto("/playground/components/tabs");

    const secondTab = page.locator(".govuk-tabs__tab").nth(1);
    await secondTab.click();

    await expect(page.locator(".govuk-tabs__list-item").nth(1)).toHaveClass(
      /govuk-tabs__list-item--selected/,
    );
    await expect(page.locator(".govuk-tabs__panel").nth(1)).toBeVisible();
    await expect(page.locator(".govuk-tabs__panel").first()).toBeHidden();
  });
});
