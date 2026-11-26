import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DateInput from "@/app/components/govuk/DateInput";

describe("DateInput", () => {
  it("renders day, month and year inputs by default", () => {
    render(<DateInput id="dob" />);
    expect(screen.getByLabelText("Day")).toHaveAttribute("name", "day");
    expect(screen.getByLabelText("Month")).toHaveAttribute("name", "month");
    expect(screen.getByLabelText("Year")).toHaveAttribute("name", "year");
    expect(screen.getByLabelText("Day")).toHaveAttribute("id", "dob-day");
    expect(screen.getByLabelText("Year")).toHaveAttribute("id", "dob-year");
  });

  it("uses the expected widths for each part", () => {
    render(<DateInput id="dob" />);
    expect(screen.getByLabelText("Day")).toHaveClass("govuk-input--width-2");
    expect(screen.getByLabelText("Month")).toHaveClass("govuk-input--width-2");
    expect(screen.getByLabelText("Year")).toHaveClass("govuk-input--width-4");
  });

  it("prefixes input names when a name prefix is given", () => {
    render(<DateInput id="dob" namePrefix="dob" />);
    expect(screen.getByLabelText("Day")).toHaveAttribute("name", "dob-day");
    expect(screen.getByLabelText("Month")).toHaveAttribute("name", "dob-month");
    expect(screen.getByLabelText("Year")).toHaveAttribute("name", "dob-year");
  });

  it("prefills each part from the values prop", () => {
    render(<DateInput id="dob" values={{ day: "27", month: "3", year: "2007" }} />);
    expect(screen.getByLabelText("Day")).toHaveValue("27");
    expect(screen.getByLabelText("Month")).toHaveValue("3");
    expect(screen.getByLabelText("Year")).toHaveValue("2007");
  });

  it("accepts explicit items for each part", () => {
    render(
      <DateInput
        id="dob"
        day={{ name: "day", autoComplete: "bday-day" }}
        month={{ name: "month", autoComplete: "bday-month" }}
        year={{ name: "year", autoComplete: "bday-year" }}
      />,
    );
    expect(screen.getByLabelText("Day")).toHaveAttribute("autocomplete", "bday-day");
    expect(screen.getByLabelText("Year")).toHaveAttribute("autocomplete", "bday-year");
  });

  it("wraps the parts in a fieldset with the legend as the page heading", () => {
    render(
      <DateInput
        id="dob"
        fieldset={{
          legend: {
            text: "What is your date of birth?",
            isPageHeading: true,
            classes: "govuk-fieldset__legend--l",
          },
        }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "What is your date of birth?" }),
    ).not.toBeNull();
  });

  it("describes the fieldset with the hint and error ids", () => {
    render(
      <DateInput
        id="dob"
        fieldset={{ describedBy: "extra", legend: { text: "Date of birth" } }}
        hint={{ text: "For example, 27 3 2007" }}
        errorMessage={{ text: "Enter your date of birth" }}
      />,
    );
    expect(document.querySelector("fieldset")).toHaveAttribute(
      "aria-describedby",
      "extra dob-hint dob-error",
    );
  });

  it("marks every part as erroneous when the group has an error", () => {
    render(<DateInput id="dob" errorMessage={{ text: "Enter your date of birth" }} />);
    expect(screen.getByLabelText("Day")).toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Month")).toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Year")).toHaveClass("govuk-input--error");
    expect(document.querySelector(".govuk-form-group")).toHaveClass(
      "govuk-form-group--error",
    );
  });

  it("only marks the part flagged with its own error state", () => {
    render(
      <DateInput
        id="dob"
        items={[
          { name: "day", error: true },
          { name: "month" },
          { name: "year" },
        ]}
      />,
    );
    expect(screen.getByLabelText("Day")).toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Month")).not.toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Year")).not.toHaveClass("govuk-input--error");
  });
});
