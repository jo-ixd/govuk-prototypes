import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CharacterCount from "@/app/components/govuk/CharacterCount";

describe("CharacterCount", () => {
  it("renders a textarea with the character count module wrapper", () => {
    render(
      <CharacterCount name="summary" label={{ text: "Summary" }} maxlength={100} />,
    );
    const textarea = screen.getByLabelText("Summary");
    expect(textarea).toHaveClass("govuk-js-character-count");
    expect(textarea.parentElement).toHaveClass("govuk-character-count");
    expect(textarea.parentElement).toHaveAttribute(
      "data-module",
      "govuk-character-count",
    );
    expect(textarea.parentElement).toHaveAttribute("data-maxlength", "100");
  });

  it("shows the character limit message and references it from the textarea", () => {
    render(
      <CharacterCount name="summary" label={{ text: "Summary" }} maxlength={100} />,
    );
    const message = screen.getByText("You can enter up to 100 characters");
    expect(message).toHaveAttribute("id", "summary-info");
    expect(message).toHaveClass("govuk-character-count__message");
    expect(screen.getByLabelText("Summary")).toHaveAttribute(
      "aria-describedby",
      "summary-info",
    );
  });

  it("counts words instead when a word limit is given", () => {
    render(
      <CharacterCount name="summary" label={{ text: "Summary" }} maxwords={50} />,
    );
    const formGroup = screen.getByLabelText("Summary").parentElement;
    expect(formGroup).toHaveAttribute("data-maxwords", "50");
    expect(formGroup?.hasAttribute("data-maxlength")).toBe(false);
    expect(screen.getByText("You can enter up to 50 words")).not.toBeNull();
  });

  it("only turns on the over limit threshold when one is given", () => {
    const { rerender } = render(
      <CharacterCount
        name="summary"
        label={{ text: "Summary" }}
        maxlength={100}
      />,
    );
    const formGroup = screen.getByLabelText("Summary").parentElement;
    expect(formGroup?.hasAttribute("data-threshold")).toBe(false);

    rerender(
      <CharacterCount
        name="summary"
        label={{ text: "Summary" }}
        maxlength={100}
        threshold={75}
      />,
    );
    expect(screen.getByLabelText("Summary").parentElement).toHaveAttribute(
      "data-threshold",
      "75",
    );
  });

  it("uses a custom count message description", () => {
    render(
      <CharacterCount
        name="summary"
        label={{ text: "Summary" }}
        maxlength={100}
        textareaDescriptionText="Up to %{count} characters allowed"
      />,
    );
    expect(
      screen.getByText("Up to 100 characters allowed"),
    ).not.toBeNull();
  });

  it("keeps the hint and error wiring from the wrapped textarea", () => {
    render(
      <CharacterCount
        name="summary"
        id="summary-field"
        label={{ text: "Summary" }}
        maxlength={100}
        hint={{ text: "Keep it short." }}
        errorMessage={{ text: "Enter a summary" }}
      />,
    );
    const textarea = screen.getByLabelText("Summary");
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      "summary-field-info summary-field-hint summary-field-error",
    );
  });
});
