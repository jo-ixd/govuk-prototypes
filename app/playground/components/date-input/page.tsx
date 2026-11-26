import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import DateInput from "@/app/components/govuk/DateInput";
import Example from "@/app/playground/_components/Example";
import DateInputPlayground from "@/app/playground/components/date-input/DateInputPlayground";

export const metadata: Metadata = { title: "Date input - GOV.UK Playground" };

export default function DateInputPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Date input</h1>
      <p className="govuk-body-l">
        Helps users enter a known date, such as a date of birth.
      </p>

      <Example
        title="Default date input"
        description="A date input with a legend and hint, wrapped in a fieldset with role group."
      >
        <DateInput
          id="dob"
          fieldset={{ legend: { text: "What is your date of birth?" } }}
          hint={{ text: "For example, 31 3 1980" }}
        />
      </Example>

      <Example
        title="Date input with default values"
        description="The values option prefills the day, month and year inputs."
      >
        <DateInput
          id="with-values"
          fieldset={{ legend: { text: "What is your date of birth?" } }}
          hint={{ text: "For example, 31 3 1980" }}
          values={{ day: "31", month: "3", year: "1980" }}
        />
      </Example>

      <Example
        title="Date input with an error message"
        description="With no item marked as erroring, every input gets the error border."
      >
        <DateInput
          id="dob-errors"
          fieldset={{ legend: { text: "What is your date of birth?" } }}
          hint={{ text: "For example, 31 3 1980" }}
          errorMessage={{ text: "Error message goes here" }}
        />
      </Example>

      <Example
        title="Date input with an error on a single field"
        description="Set error on one item, or use the day, month and year options, to highlight just that field."
      >
        <DateInput
          id="dob-year-error"
          fieldset={{ legend: { text: "What is your date of birth?" } }}
          hint={{ text: "For example, 31 3 1980" }}
          errorMessage={{ text: "Error message goes here" }}
          year={{ error: true }}
        />
      </Example>

      <Example
        title="Date input with autocomplete values"
        description="Items can set autocomplete attributes to help autofill, and namePrefix prefixes each input name."
      >
        <DateInput
          id="dob-with-autocomplete"
          namePrefix="dob-with-autocomplete"
          fieldset={{ legend: { text: "What is your date of birth?" } }}
          hint={{ text: "For example, 31 3 1980" }}
          items={[
            {
              name: "day",
              classes: "govuk-input--width-2",
              autoComplete: "bday-day",
            },
            {
              name: "month",
              classes: "govuk-input--width-2",
              autoComplete: "bday-month",
            },
            {
              name: "year",
              classes: "govuk-input--width-4",
              autoComplete: "bday-year",
            },
          ]}
        />
      </Example>

      <Example
        title="Date input with a custom pattern and input mode"
        description="Items can override the pattern and inputmode attributes."
      >
        <DateInput
          id="with-custom-inputmode"
          items={[{ name: "day", pattern: "[0-9X]*", inputMode: "text" }]}
        />
      </Example>

      <DateInputPlayground />
    </>
  );
}
