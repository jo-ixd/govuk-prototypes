import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";

describe("ErrorSummary", () => {
  it("announces itself as an alert region", () => {
    render(<ErrorSummary />);
    expect(screen.getByRole("alert")).not.toBeNull();
  });

  it("carries the module hook for the govuk enhancement script", () => {
    render(<ErrorSummary />);
    const banner = document.querySelector(".govuk-error-summary");
    expect(banner).not.toBeNull();
    expect(banner).toHaveAttribute("data-module", "govuk-error-summary");
  });

  it("shows the default title", () => {
    render(<ErrorSummary />);
    expect(
      screen.getByRole("heading", { level: 2, name: "There is a problem" }),
    ).not.toBeNull();
  });

  it("shows a custom title", () => {
    render(<ErrorSummary titleText="Fix the following" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Fix the following" }),
    ).not.toBeNull();
  });

  it("lists each error as a link to the field", () => {
    render(
      <ErrorSummary
        errorList={[
          { text: "Enter your name", href: "#name", visuallyHiddenText: "Error" },
          { text: "Enter your date of birth", href: "#dob" },
        ]}
      />,
    );
    const nameLink = screen.getByRole("link", { name: /Error:\s*Enter your name/ });
    expect(nameLink).toHaveAttribute("href", "#name");

    const dobLink = screen.getByRole("link", {
      name: "Enter your date of birth",
    });
    expect(dobLink).toHaveAttribute("href", "#dob");
  });

  it("prefixes each link with a visually hidden Error label", () => {
    render(
      <ErrorSummary
        errorList={[
          { text: "Enter your name", href: "#name", visuallyHiddenText: "Error" },
        ]}
      />,
    );
    const hidden = document.querySelector(
      ".govuk-error-summary .govuk-visually-hidden",
    );
    expect(hidden?.textContent).toBe("Error: ");
  });

  it("renders list items without links when no href is given", () => {
    render(<ErrorSummary errorList={[{ text: "Service unavailable" }]} />);
    expect(screen.getByText("Service unavailable").closest("a")).toBeNull();
  });

  it("shows a description above the list", () => {
    render(
      <ErrorSummary description={{ text: "Please correct the errors and try again." }} />,
    );
    expect(
      screen.getByText("Please correct the errors and try again.").tagName,
    ).toBe("P");
  });

  it("lets pages opt out of the auto focus behaviour", () => {
    render(<ErrorSummary disableAutoFocus />);
    expect(document.querySelector(".govuk-error-summary")).toHaveAttribute(
      "data-disable-auto-focus",
      "true",
    );
  });
});
