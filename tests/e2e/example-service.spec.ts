import { expect, test } from "@playwright/test";

test.describe("renew a parking permit journey", () => {
  test("validates, completes and confirms the journey", async ({ page }) => {
    await page.goto("/playground/example-service/name");

    // The name page rejects an empty answer with the GOV.UK error pattern.
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".govuk-error-summary")).toContainText(
      "There is a problem",
    );
    await expect(page.locator("#name-error")).toContainText("Enter your name");
    const focused = await page.evaluate(
      () => document.activeElement?.textContent ?? "",
    );
    expect(focused).toContain("There is a problem");

    await page.getByLabel("What is your name?").fill("Jo Smith");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/date-of-birth\?name=Jo%20Smith$/);

    // The date of birth page rejects a partial date.
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".govuk-error-summary")).toContainText(
      "Enter your date of birth",
    );
    await expect(page.locator("#date-of-birth-day")).toHaveClass(
      /govuk-input--error/,
    );

    await page.getByLabel("Day").fill("27");
    await page.getByLabel("Month").fill("3");
    await page.getByLabel("Year").fill("2007");
    await page.getByRole("button", { name: "Continue" }).click();

    // Check answers shows the answers, formatted and editable.
    await expect(page).toHaveURL(/\/check-answers/);
    await expect(
      page.getByRole("heading", {
        name: "Check your answers before sending your application",
      }),
    ).toBeVisible();
    await expect(page.locator(".govuk-summary-list")).toContainText("Jo Smith");
    await expect(page.locator(".govuk-summary-list")).toContainText(
      "27 March 2007",
    );

    // The name change link returns to the name page prefilled.
    await page.getByRole("link", { name: "Change name" }).click();
    await expect(page).toHaveURL(/\/name/);
    await expect(page.getByLabel("What is your name?")).toHaveValue("Jo Smith");

    // The date of birth survives the round trip and prefills its page.
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByLabel("Day")).toHaveValue("27");
    await expect(page.getByLabel("Month")).toHaveValue("3");
    await expect(page.getByLabel("Year")).toHaveValue("2007");

    // Sending the application shows the confirmation panel and reference.
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("button", { name: "Accept and send application" })
      .click();
    await expect(page).toHaveURL(/\/confirmation/);
    await expect(
      page.getByRole("heading", { name: "Application complete" }),
    ).toBeVisible();
    await expect(page.locator(".govuk-panel__body")).toContainText("Jo Smith");
    await expect(page.locator(".govuk-panel__body")).toContainText(
      "27 March 2007",
    );
    const reference = await page.locator(".govuk-panel__body strong").textContent();
    expect(reference).toMatch(/^APP-[A-Z0-9]{6}$/);
  });

  test("replays to the same reference number for the same answers", async ({
    request,
  }) => {
    const url =
      "/playground/example-service/confirmation?name=Jo%20Smith&dob=27-3-2007";
    const first = await request.get(url);
    const second = await request.get(url);
    const reference = (body: string | null) =>
      body?.match(/APP-[A-Z0-9]{6}/)?.[0] ?? null;

    expect(reference(await first.text())).toBe(reference(await second.text()));
  });
});
