import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SummaryList from "@/app/components/govuk/SummaryList";

describe("SummaryList", () => {
  it("renders each row as a key and value pair", () => {
    render(
      <SummaryList
        rows={[
          { key: { text: "Name" }, value: { text: "Jo Smith" } },
          { key: { text: "Date of birth" }, value: { text: "27 March 2007" } },
        ]}
      />,
    );
    const list = document.querySelector("dl");
    expect(list).toHaveClass("govuk-summary-list");
    expect(screen.getByText("Name").tagName).toBe("DT");
    expect(screen.getByText("Jo Smith").tagName).toBe("DD");
    expect(screen.getByText("Date of birth").tagName).toBe("DT");
  });

  it("renders a single action as a plain link", () => {
    render(
      <SummaryList
        rows={[
          {
            key: { text: "Name" },
            value: { text: "Jo Smith" },
            actions: {
              items: [
                {
                  text: "Change",
                  href: "/change",
                  visuallyHiddenText: "name",
                },
              ],
            },
          },
        ]}
      />,
    );
    const changeLink = document.querySelector<HTMLAnchorElement>(
      ".govuk-summary-list__actions a",
    );
    expect(changeLink).toHaveAttribute("href", "/change");
    expect(changeLink?.querySelector(".govuk-visually-hidden")?.textContent).toBe(
      " name",
    );
    expect(
      document.querySelector(".govuk-summary-list__actions ul"),
    ).toBeNull();
  });

  it("renders several actions as a list", () => {
    render(
      <SummaryList
        rows={[
          {
            key: { text: "Name" },
            value: { text: "Jo Smith" },
            actions: {
              items: [
                { text: "Change", href: "/change" },
                { text: "Remove", href: "/remove" },
              ],
            },
          },
        ]}
      />,
    );
    const actionsList = document.querySelector(
      ".govuk-summary-list__actions-list",
    );
    expect(actionsList?.querySelectorAll("li").length).toBe(2);
    expect(
      actionsList?.querySelector(".govuk-visually-hidden"),
    ).toBeNull();
  });

  it("flags rows without actions when another row has them", () => {
    render(
      <SummaryList
        rows={[
          { key: { text: "Name" }, value: { text: "Jo Smith" } },
          {
            key: { text: "Email" },
            value: { text: "jo@example.com" },
            actions: { items: [{ text: "Change", href: "/change" }] },
          },
        ]}
      />,
    );
    const rows = document.querySelectorAll(".govuk-summary-list__row");
    expect(rows[0]).toHaveClass("govuk-summary-list__row--no-actions");
    expect(rows[1]).not.toHaveClass("govuk-summary-list__row--no-actions");
  });

  it("wraps the list in a card with a title and card actions", () => {
    render(
      <SummaryList
        rows={[{ key: { text: "Name" }, value: { text: "Jo Smith" } }]}
        card={{
          title: { text: "Package 1" },
          actions: { items: [{ text: "Remove", href: "/remove" }] },
        }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Package 1" }),
    ).toHaveClass("govuk-summary-card__title");
    expect(document.querySelector(".govuk-summary-card__title-wrapper")).not.toBeNull();
    const removeLink = document.querySelector<HTMLAnchorElement>(
      ".govuk-summary-card__actions a",
    );
    expect(removeLink).toHaveAttribute("href", "/remove");
    expect(removeLink?.textContent).toContain("Remove");
    expect(
      removeLink?.querySelector(".govuk-visually-hidden")?.textContent,
    ).toContain("Package 1");
  });
});
