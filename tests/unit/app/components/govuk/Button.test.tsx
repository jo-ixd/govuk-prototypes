import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "@/app/components/govuk/Button";

describe("Button", () => {
  it("renders a submit button with the govuk classes and module hook", () => {
    render(<Button text="Save and continue" />);
    const button = screen.getByRole("button", { name: "Save and continue" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveClass("govuk-button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("data-module", "govuk-button");
  });

  it("supports a custom type", () => {
    render(<Button text="Reset" type="reset" />);
    expect(screen.getByRole("button", { name: "Reset" })).toHaveAttribute(
      "type",
      "reset",
    );
  });

  it("renders as a link when an href is given", () => {
    render(<Button text="Start now" href="/next-page" />);
    const link = screen.getByRole("button", { name: "Start now" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/next-page");
    expect(link).toHaveAttribute("role", "button");
    expect(link).toHaveAttribute("draggable", "false");
    expect(link).toHaveAttribute("data-module", "govuk-button");
  });

  it("renders as an input element when the element prop says so", () => {
    render(<Button text="Save" element="input" name="save" />);
    const input = screen.getByRole("button", { name: "Save" });
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("type", "submit");
    expect(input).toHaveAttribute("name", "save");
    expect(input).toHaveAttribute("value", "Save");
  });

  it("marks the button as disabled for assistive technology too", () => {
    render(<Button text="Save" disabled />);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("flags the button for the double click guard", () => {
    render(<Button text="Pay" preventDoubleClick />);
    expect(screen.getByRole("button", { name: "Pay" })).toHaveAttribute(
      "data-prevent-double-click",
      "true",
    );
  });

  it("adds the start button styling and icon", () => {
    render(<Button text="Start now" isStartButton />);
    const button = screen.getByRole("button", { name: "Start now" });
    expect(button).toHaveClass("govuk-button", "govuk-button--start");
    const icon = button.querySelector(".govuk-button__start-icon");
    expect(icon?.tagName.toLowerCase()).toBe("svg");
  });

  it("wraps html content in a span for start buttons so the icon lines up", () => {
    render(
      <Button
        html={<span className="bold">Start now</span>}
        isStartButton
      />,
    );
    const button = screen.getByRole("button");
    const content = button.querySelector("span");
    expect(content?.textContent).toBe("Start now");
  });

  it("appends custom classes and attributes", () => {
    render(
      <Button
        text="Save"
        classes="app-button--danger"
        attributes={{ "data-testid": "save-button" }}
      />,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("govuk-button", "app-button--danger");
    expect(button).toHaveAttribute("data-testid", "save-button");
  });
});
