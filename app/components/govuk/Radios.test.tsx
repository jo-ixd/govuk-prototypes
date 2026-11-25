import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Radios from "@/app/components/govuk/Radios";

const items = [
  { text: "Yes", value: "yes" },
  { text: "No", value: "no" },
];

describe("Radios", () => {
  it("renders each item as a labelled radio inside the govuk module wrapper", () => {
    render(<Radios name="contact" items={items} />);
    const yes = screen.getByLabelText("Yes");
    const no = screen.getByLabelText("No");
    expect(yes).toHaveAttribute("type", "radio");
    expect(yes).toHaveAttribute("name", "contact");
    expect(yes).toHaveAttribute("id", "contact");
    expect(no).toHaveAttribute("id", "contact-2");
    expect(document.querySelector(".govuk-radios")).toHaveAttribute(
      "data-module",
      "govuk-radios",
    );
  });

  it("checks the item matching the value", () => {
    render(<Radios name="contact" items={items} value="no" />);
    expect(screen.getByLabelText("Yes")).not.toBeChecked();
    expect(screen.getByLabelText("No")).toBeChecked();
  });

  it("renders a divider between options", () => {
    render(
      <Radios
        name="contact"
        items={[{ text: "Yes", value: "yes" }, { divider: "or" }, { text: "No", value: "no" }]}
      />,
    );
    const divider = document.querySelector(".govuk-radios__divider");
    expect(divider?.textContent).toBe("or");
  });

  it("hides a conditional reveal until its radio is checked", () => {
    render(
      <Radios
        name="contact"
        items={[
          { text: "Yes", value: "yes", conditional: { text: "Tell us how" } },
          { text: "No", value: "no" },
        ]}
      />,
    );
    const yes = screen.getByLabelText("Yes");
    const conditional = document.querySelector(".govuk-radios__conditional");
    expect(conditional).toHaveClass("govuk-radios__conditional--hidden");
    expect(yes).toHaveAttribute("data-aria-controls", "conditional-contact");
  });

  it("shows a conditional reveal for an initially checked radio", () => {
    render(
      <Radios
        name="contact"
        value="yes"
        items={[
          { text: "Yes", value: "yes", conditional: { text: "Tell us how" } },
          { text: "No", value: "no" },
        ]}
      />,
    );
    const conditional = document.querySelector(".govuk-radios__conditional");
    expect(conditional).not.toHaveClass("govuk-radios__conditional--hidden");
  });

  it("wraps the group in a fieldset with the legend as the page heading", () => {
    render(
      <Radios
        name="contact"
        items={items}
        fieldset={{
          legend: {
            text: "How would you like to be contacted?",
            isPageHeading: true,
            classes: "govuk-fieldset__legend--l",
          },
        }}
      />,
    );
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "How would you like to be contacted?",
    });
    expect(heading).toHaveClass("govuk-fieldset__heading");
  });

  it("describes the fieldset with extra targets, the hint and the error", () => {
    render(
      <Radios
        name="contact"
        items={items}
        fieldset={{ describedBy: "extra-target", legend: { text: "Contact" } }}
        hint={{ text: "Hint text" }}
        errorMessage={{ text: "Error text" }}
      />,
    );
    const fieldset = document.querySelector("fieldset");
    expect(fieldset).toHaveAttribute(
      "aria-describedby",
      "extra-target contact-hint contact-error",
    );
  });

  it("renders item hints and references them from the radio", () => {
    render(
      <Radios
        name="contact"
        items={[{ text: "Email", value: "email", hint: { text: "We’ll only use this to reply." } }]}
      />,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-describedby",
      "contact-item-hint",
    );
    expect(
      screen.getByText("We’ll only use this to reply.").className,
    ).toContain("govuk-radios__hint");
  });

  it("applies error classes to the form group", () => {
    render(
      <Radios name="contact" items={items} errorMessage={{ text: "Select an option" }} />,
    );
    expect(document.querySelector(".govuk-form-group")).toHaveClass(
      "govuk-form-group--error",
    );
  });
});
