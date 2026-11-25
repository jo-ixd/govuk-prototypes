import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Textarea from "@/app/components/govuk/Textarea";

describe("Textarea", () => {
  it("renders a labelled govuk textarea with five rows by default", () => {
    render(<Textarea name="more-detail" label={{ text: "Can you provide more detail?" }} />);
    const textarea = screen.getByLabelText("Can you provide more detail?");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveClass("govuk-textarea");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("supports a custom row count", () => {
    render(
      <Textarea name="more-detail" rows={8} label={{ text: "More detail" }} />,
    );
    expect(screen.getByLabelText("More detail")).toHaveAttribute("rows", "8");
  });

  it("wires hint and error into aria-describedby", () => {
    render(
      <Textarea
        name="more-detail"
        label={{ text: "More detail" }}
        hint={{ text: "Don’t include personal details." }}
        errorMessage={{ text: "Enter some detail" }}
      />,
    );
    const textarea = screen.getByLabelText("More detail");
    expect(textarea).toHaveAttribute("aria-describedby", "more-detail-hint more-detail-error");
    expect(textarea).toHaveClass("govuk-textarea--error");
    expect(textarea.parentElement).toHaveClass("govuk-form-group--error");
  });

  it("writes spellcheck and autocomplete as string attributes", () => {
    render(
      <Textarea
        name="more-detail"
        label={{ text: "More detail" }}
        spellcheck={false}
        autocomplete="street-address"
      />,
    );
    const textarea = screen.getByLabelText("More detail");
    expect(textarea).toHaveAttribute("spellcheck", "false");
    expect(textarea).toHaveAttribute("autocomplete", "street-address");
  });

  it("renders form group content before and after the textarea", () => {
    render(
      <Textarea
        name="more-detail"
        label={{ text: "More detail" }}
        formGroup={{
          beforeInput: { text: "Before" },
          afterInput: { text: "After" },
        }}
      />,
    );
    const formGroup = document.querySelector(".govuk-form-group");
    expect(formGroup?.textContent).toContain("Before");
    expect(formGroup?.textContent).toContain("After");
  });

  it("appends custom classes to the textarea", () => {
    render(
      <Textarea
        name="more-detail"
        label={{ text: "More detail" }}
        classes="app-textarea--tall"
      />,
    );
    expect(screen.getByLabelText("More detail")).toHaveClass(
      "govuk-textarea",
      "app-textarea--tall",
    );
  });
});
