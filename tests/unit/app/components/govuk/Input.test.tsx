import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "@/app/components/govuk/Input";

describe("Input", () => {
  it("renders a labelled govuk input inside a form group", () => {
    render(<Input name="national-insurance-number" label={{ text: "What is your National Insurance number?" }} />);
    const input = screen.getByLabelText("What is your National Insurance number?");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveClass("govuk-input");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "national-insurance-number");
    expect(input.parentElement).toHaveClass("govuk-form-group");
  });

  it("derives the input id from the name and uses it for the label", () => {
    render(<Input name="full-name" label={{ text: "Full name" }} />);
    const input = screen.getByLabelText("Full name");
    expect(input).toHaveAttribute("id", "full-name");
  });

  it("uses an explicit id in preference to the name", () => {
    render(<Input name="full-name" id="name-input" label={{ text: "Full name" }} />);
    expect(screen.getByLabelText("Full name")).toHaveAttribute("id", "name-input");
  });

  it("wires the hint into aria-describedby", () => {
    render(
      <Input
        name="nino"
        label={{ text: "National Insurance number" }}
        hint={{ text: "It’s on your payslip." }}
      />,
    );
    const input = screen.getByLabelText("National Insurance number");
    expect(input).toHaveAttribute("aria-describedby", "nino-hint");
    expect(screen.getByText("It’s on your payslip.")).toHaveAttribute(
      "id",
      "nino-hint",
    );
  });

  it("wires the error message into aria-describedby and applies the error classes", () => {
    render(
      <Input
        name="nino"
        label={{ text: "National Insurance number" }}
        errorMessage={{ text: "Enter your National Insurance number" }}
      />,
    );
    const input = screen.getByLabelText("National Insurance number");
    expect(input).toHaveAttribute("aria-describedby", "nino-error");
    expect(input).toHaveClass("govuk-input--error");
    expect(input.parentElement).toHaveClass("govuk-form-group--error");
  });

  it("combines extra described targets, hint and error in order", () => {
    render(
      <Input
        name="nino"
        label={{ text: "National Insurance number" }}
        describedBy="details-panel"
        hint={{ text: "Hint text" }}
        errorMessage={{ text: "Error text" }}
      />,
    );
    expect(screen.getByLabelText("National Insurance number")).toHaveAttribute(
      "aria-describedby",
      "details-panel nino-hint nino-error",
    );
  });

  it("omits aria-describedby when there is nothing to describe", () => {
    render(<Input name="nino" label={{ text: "National Insurance number" }} />);
    expect(
      screen.getByLabelText("National Insurance number").hasAttribute("aria-describedby"),
    ).toBe(false);
  });

  it("renders prefix and suffix inside an input wrapper", () => {
    render(
      <Input
        name="amount"
        label={{ text: "Amount" }}
        prefix={{ text: "£" }}
        suffix={{ text: "per month" }}
      />,
    );
    const wrapper = document.querySelector(".govuk-input__wrapper");
    expect(wrapper).not.toBeNull();
    const prefix = document.querySelector(".govuk-input__prefix");
    const suffix = document.querySelector(".govuk-input__suffix");
    expect(prefix?.textContent).toBe("£");
    expect(prefix).toHaveAttribute("aria-hidden", "true");
    expect(suffix?.textContent).toBe("per month");
    expect(suffix).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render the wrapper when the affixes have no content", () => {
    render(
      <Input
        name="amount"
        label={{ text: "Amount" }}
        prefix={{ text: "" }}
        suffix={{ text: "" }}
      />,
    );
    expect(document.querySelector(".govuk-input__wrapper")).toBeNull();
  });

  it("renders content before and after the input from the form group", () => {
    render(
      <Input
        name="amount"
        label={{ text: "Amount" }}
        formGroup={{
          beforeInput: { text: "Before" },
          afterInput: { text: "After" },
        }}
      />,
    );
    const wrapper = document.querySelector(".govuk-input__wrapper");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.textContent).toContain("Before");
    expect(wrapper?.textContent).toContain("After");
  });

  it("writes spellcheck as a string attribute like the njk macros", () => {
    const { rerender } = render(
      <Input name="notes" label={{ text: "Notes" }} spellCheck />,
    );
    expect(screen.getByLabelText("Notes")).toHaveAttribute("spellcheck", "true");

    rerender(<Input name="notes" label={{ text: "Notes" }} spellCheck={false} />);
    expect(screen.getByLabelText("Notes")).toHaveAttribute("spellcheck", "false");
  });

  it("passes the less common input attributes straight through", () => {
    render(
      <Input
        name="email"
        label={{ text: "Email" }}
        autoComplete="email"
        autoCapitalize="none"
        pattern="[a-z]*"
        inputMode="email"
        placeholder="you@example.com"
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("autocapitalize", "none");
    expect(input).toHaveAttribute("pattern", "[a-z]*");
    expect(input).toHaveAttribute("inputmode", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
  });

  it("appends custom classes to the input", () => {
    render(
      <Input
        name="nino"
        label={{ text: "National Insurance number" }}
        classes="govuk-input--width-10"
      />,
    );
    expect(screen.getByLabelText("National Insurance number")).toHaveClass(
      "govuk-input",
      "govuk-input--width-10",
    );
  });

  it("spreads extra attributes onto the input", () => {
    render(
      <Input
        name="nino"
        label={{ text: "National Insurance number" }}
        attributes={{ "data-testid": "nino-field" }}
      />,
    );
    expect(screen.getByLabelText("National Insurance number")).toHaveAttribute(
      "data-testid",
      "nino-field",
    );
  });
});
