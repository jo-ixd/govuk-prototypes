import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Label from "@/app/components/govuk/Label";

describe("Label", () => {
  it("renders the text inside a govuk label", () => {
    render(<Label text="National Insurance number" />);
    const label = screen.getByText("National Insurance number");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("govuk-label");
  });

  it("associates the label with a control id", () => {
    render(<Label text="Full name" htmlFor="full-name" />);
    expect(screen.getByText("Full name")).toHaveAttribute("for", "full-name");
  });

  it("wraps the label in an h1 when it is the page heading", () => {
    render(<Label text="Full name" isPageHeading />);
    const heading = screen.getByRole("heading", { level: 1, name: "Full name" });
    expect(heading).toHaveClass("govuk-label-wrapper");
    expect(heading.textContent).toBe("Full name");
  });

  it("renders custom html content in place of text", () => {
    render(<Label html={<strong>Full name</strong>} />);
    const label = screen.getByText("Full name").closest("label");
    expect(label).not.toBeNull();
    expect(label?.querySelector("strong")).not.toBeNull();
  });

  it("appends custom classes after the govuk classes", () => {
    render(<Label text="Full name" classes="app-label--bold" />);
    expect(screen.getByText("Full name")).toHaveClass(
      "govuk-label",
      "app-label--bold",
    );
  });

  it("spreads extra attributes onto the label", () => {
    render(<Label text="Full name" attributes={{ "data-testid": "name-label" }} />);
    expect(screen.getByText("Full name")).toHaveAttribute(
      "data-testid",
      "name-label",
    );
  });
});
