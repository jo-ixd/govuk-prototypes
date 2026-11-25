import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Panel from "@/app/components/govuk/Panel";

describe("Panel", () => {
  it("renders a confirmation panel with the title as an h1 by default", () => {
    render(<Panel titleText="Application complete" />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Application complete",
    });
    expect(heading).toHaveClass("govuk-panel__title");
    expect(heading.parentElement).toHaveClass(
      "govuk-panel",
      "govuk-panel--confirmation",
    );
  });

  it("supports a custom heading level", () => {
    render(<Panel titleText="Complete" headingLevel={2} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Complete" }),
    ).not.toBeNull();
  });

  it("renders the body text when given", () => {
    render(<Panel titleText="Complete" text="Your reference is ABC123" />);
    expect(
      screen.getByText("Your reference is ABC123"),
    ).toHaveClass("govuk-panel__body");
  });

  it("switches to the interruption variant when its classes say so", () => {
    render(
      <Panel
        titleText="Stay on this page"
        classes="govuk-panel--interruption"
        actions={{ items: [{ text: "Continue" }] }}
      />,
    );
    const panel = document.querySelector(".govuk-panel");
    expect(panel).toHaveClass("govuk-panel--interruption");
    expect(panel?.className).not.toContain("govuk-panel--confirmation");
  });

  it("renders interruption actions as buttons by default", () => {
    render(
      <Panel
        titleText="Stay on this page"
        classes="govuk-panel--interruption"
        actions={{ items: [{ text: "Continue" }, { text: "Cancel" }] }}
      />,
    );
    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton.tagName).toBe("BUTTON");
    expect(continueButton).toHaveAttribute("type", "button");
    expect(screen.getByRole("button", { name: "Cancel" })).not.toBeNull();
  });

  it("renders an action with an href as an inverse link", () => {
    render(
      <Panel
        titleText="Stay on this page"
        classes="govuk-panel--interruption"
        actions={{ items: [{ text: "Read more", href: "/more" }] }}
      />,
    );
    const link = screen.getByRole("link", { name: "Read more" });
    expect(link).toHaveAttribute("href", "/more");
    expect(link).toHaveClass("govuk-link", "govuk-link--inverse");
  });

  it("renders an action with an href and button type as a link with button semantics", () => {
    render(
      <Panel
        titleText="Stay on this page"
        classes="govuk-panel--interruption"
        actions={{ items: [{ text: "Go", href: "/go", type: "button" }] }}
      />,
    );
    const link = screen.getByRole("button", { name: "Go" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/go");
    expect(link).toHaveAttribute("data-module", "govuk-button");
  });

  it("ignores actions unless the interruption variant is used", () => {
    render(
      <Panel
        titleText="Complete"
        actions={{ items: [{ text: "Continue" }] }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Continue" })).toBeNull();
  });
});
