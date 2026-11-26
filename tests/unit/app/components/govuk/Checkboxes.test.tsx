import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkboxes from "@/app/components/govuk/Checkboxes";

const items = [
  { text: "Email", value: "email" },
  { text: "Phone", value: "phone" },
  { text: "Text message", value: "text", disabled: true },
];

describe("Checkboxes", () => {
  it("renders each item as a labelled checkbox inside the govuk module wrapper", () => {
    render(<Checkboxes name="contact" items={items} />);
    const email = screen.getByLabelText("Email");
    expect(email).toHaveAttribute("type", "checkbox");
    expect(email).toHaveAttribute("name", "contact");
    expect(email).toHaveAttribute("id", "contact");
    expect(screen.getByLabelText("Phone")).toHaveAttribute("id", "contact-2");
    expect(document.querySelector(".govuk-checkboxes")).toHaveAttribute(
      "data-module",
      "govuk-checkboxes",
    );
  });

  it("checks every item whose value is listed", () => {
    render(<Checkboxes name="contact" items={items} values={["email", "text"]} />);
    expect(screen.getByLabelText("Email")).toBeChecked();
    expect(screen.getByLabelText("Phone")).not.toBeChecked();
    expect(screen.getByLabelText("Text message")).toBeChecked();
  });

  it("checks items flagged individually", () => {
    render(
      <Checkboxes
        name="contact"
        items={[{ text: "Email", value: "email", checked: true }]}
      />,
    );
    expect(screen.getByLabelText("Email")).toBeChecked();
  });

  it("marks disabled items as disabled", () => {
    render(<Checkboxes name="contact" items={items} />);
    expect(screen.getByLabelText("Text message")).toBeDisabled();
  });

  it("renders a divider between options", () => {
    render(
      <Checkboxes
        name="contact"
        items={[{ text: "Email", value: "email" }, { divider: "or" }]}
      />,
    );
    const divider = document.querySelector(".govuk-checkboxes__divider");
    expect(divider?.textContent).toBe("or");
  });

  it("hides a conditional reveal until its checkbox is checked", () => {
    render(
      <Checkboxes
        name="contact"
        items={[
          { text: "Phone", value: "phone", conditional: { text: "Your number" } },
        ]}
      />,
    );
    const conditional = document.querySelector(".govuk-checkboxes__conditional");
    expect(conditional).toHaveClass("govuk-checkboxes__conditional--hidden");
    expect(screen.getByLabelText("Phone")).toHaveAttribute(
      "data-aria-controls",
      "conditional-contact",
    );
  });

  it("passes the behaviour flag through to the module script", () => {
    render(
      <Checkboxes
        name="contact"
        items={[{ text: "Select all", value: "all", behaviour: "exclusive" }]}
      />,
    );
    expect(screen.getByLabelText("Select all")).toHaveAttribute(
      "data-behaviour",
      "exclusive",
    );
  });

  it("without a fieldset, describes each input with the group hint and error", () => {
    render(
      <Checkboxes
        name="contact"
        items={items}
        hint={{ text: "Hint text" }}
        errorMessage={{ text: "Error text" }}
      />,
    );
    const email = screen.getByLabelText("Email");
    expect(email).toHaveAttribute("aria-describedby", "contact-hint contact-error");
    expect(screen.getByText("Hint text")).toHaveAttribute("id", "contact-hint");
    expect(screen.getByText("Error text")).toHaveAttribute("id", "contact-error");
  });

  it("describes the fieldset with the hint and error when one is given", () => {
    render(
      <Checkboxes
        name="contact"
        items={items}
        fieldset={{ legend: { text: "How do you want to be contacted?" } }}
        hint={{ text: "Hint text" }}
        errorMessage={{ text: "Error text" }}
      />,
    );
    expect(document.querySelector("fieldset")).toHaveAttribute(
      "aria-describedby",
      "contact-hint contact-error",
    );
    expect(screen.getByLabelText("Email").hasAttribute("aria-describedby")).toBe(
      false,
    );
  });
});
