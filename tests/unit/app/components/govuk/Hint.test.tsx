import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hint from "@/app/components/govuk/Hint";

describe("Hint", () => {
  it("renders the text inside a govuk hint", () => {
    render(<Hint text="It’s on your National Insurance card." />);
    const hint = screen.getByText("It’s on your National Insurance card.");
    expect(hint.tagName).toBe("DIV");
    expect(hint).toHaveClass("govuk-hint");
  });

  it("renders the given id so fields can reference it", () => {
    render(<Hint text="Helpful" id="name-hint" />);
    expect(screen.getByText("Helpful")).toHaveAttribute("id", "name-hint");
  });

  it("appends custom classes after the govuk classes", () => {
    render(<Hint text="Helpful" classes="app-hint--muted" />);
    expect(screen.getByText("Helpful")).toHaveClass(
      "govuk-hint",
      "app-hint--muted",
    );
  });

  it("spreads extra attributes onto the hint", () => {
    render(<Hint text="Helpful" attributes={{ "data-testid": "hint" }} />);
    expect(screen.getByText("Helpful")).toHaveAttribute("data-testid", "hint");
  });
});
