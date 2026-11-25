import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PasswordInput from "@/app/components/govuk/PasswordInput";

describe("PasswordInput", () => {
  it("renders a password field inside the module wrapper", () => {
    render(<PasswordInput name="password" label={{ text: "Password" }} />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveClass("govuk-password-input__input");
    const module = input.closest(".govuk-password-input");
    expect(module).not.toBeNull();
    expect(module).toHaveAttribute("data-module", "govuk-password-input");
  });

  it("defaults to the current-password autocomplete and no spellcheck", () => {
    render(<PasswordInput name="password" label={{ text: "Password" }} />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
    expect(input).toHaveAttribute("spellcheck", "false");
    expect(input).toHaveAttribute("autocapitalize", "none");
  });

  it("renders a hidden show password toggle for the module script", () => {
    render(<PasswordInput name="password" label={{ text: "Password" }} />);
    const toggle = document.querySelector<HTMLButtonElement>(
      ".govuk-password-input__toggle",
    );
    expect(toggle?.tagName).toBe("BUTTON");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("data-module", "govuk-button");
    expect(toggle).toHaveAttribute("aria-controls", "password");
    expect(toggle).toHaveAttribute("aria-label", "Show password");
    expect(toggle).toHaveAttribute("hidden");
  });

  it("supports custom toggle wording", () => {
    render(
      <PasswordInput
        name="password"
        label={{ text: "Password" }}
        showPasswordText="Reveal"
        showPasswordAriaLabelText="Reveal password"
      />,
    );
    const toggle = document.querySelector<HTMLButtonElement>(
      ".govuk-password-input__toggle",
    );
    expect(toggle).toHaveTextContent("Reveal");
    expect(toggle).toHaveAttribute("aria-label", "Reveal password");
  });

  it("keeps the hint and error wiring from the wrapped input", () => {
    render(
      <PasswordInput
        name="password"
        id="password-field"
        label={{ text: "Password" }}
        hint={{ text: "At least 12 characters." }}
        errorMessage={{ text: "Enter a password" }}
      />,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-describedby",
      "password-field-hint password-field-error",
    );
  });
});
