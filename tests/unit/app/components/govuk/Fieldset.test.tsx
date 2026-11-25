import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Fieldset from "@/app/components/govuk/Fieldset";

describe("Fieldset", () => {
  it("renders a govuk fieldset", () => {
    render(<Fieldset />);
    const fieldset = document.querySelector("fieldset");
    expect(fieldset).not.toBeNull();
    expect(fieldset).toHaveClass("govuk-fieldset");
  });

  it("renders the legend text", () => {
    render(<Fieldset legend={{ text: "Your address" }} />);
    expect(screen.getByText("Your address").tagName).toBe("LEGEND");
  });

  it("wraps the legend in an h1 when it is the page heading", () => {
    render(<Fieldset legend={{ text: "Your address", isPageHeading: true }} />);
    const heading = screen.getByRole("heading", { level: 1, name: "Your address" });
    expect(heading).toHaveClass("govuk-fieldset__heading");
    expect(heading.parentElement?.tagName).toBe("LEGEND");
  });

  it("references extra description targets with aria-describedby", () => {
    render(<Fieldset describedBy="address-hint address-error" />);
    expect(document.querySelector("fieldset")).toHaveAttribute(
      "aria-describedby",
      "address-hint address-error",
    );
  });

  it("renders a custom role in place of the default fieldset one", () => {
    render(<Fieldset role="group" />);
    expect(document.querySelector("fieldset")).toHaveAttribute("role", "group");
  });

  it("appends custom classes to both the fieldset and the legend", () => {
    render(
      <Fieldset
        classes="app-fieldset--compact"
        legend={{ text: "Your address", classes: "app-legend--m" }}
      />,
    );
    expect(document.querySelector("fieldset")).toHaveClass(
      "govuk-fieldset",
      "app-fieldset--compact",
    );
    expect(screen.getByText("Your address")).toHaveClass(
      "govuk-fieldset__legend",
      "app-legend--m",
    );
  });
});
