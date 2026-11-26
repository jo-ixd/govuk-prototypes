import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import DateInput from "@/app/components/govuk/DateInput";
import Fieldset from "@/app/components/govuk/Fieldset";
import Select from "@/app/components/govuk/Select";
import type { SelectItem } from "@/app/components/govuk/Select";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Dates - GOV.UK Patterns",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_ITEMS: SelectItem[] = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  text: String(i + 1),
}));

const MONTH_ITEMS: SelectItem[] = MONTHS.map((month, index) => ({
  value: String(index + 1),
  text: month,
}));

const YEAR_ITEMS: SelectItem[] = Array.from({ length: 116 }, (_, i) => ({
  value: String(2026 - i),
  text: String(2026 - i),
}));

export default function DatesPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Dates</h1>
      <p className="govuk-body-l">
        Help users enter or select a date. Ask for memorable dates like a date
        of birth using the date input component, and give an example date with
        a day of 13 or more and a month of 9 or less, like &lsquo;27 3 2024&rsquo;,
        so users can see they do not need leading zeroes.
      </p>

      <Example
        title="Ask for a memorable date"
        description="Use the date input component for memorable dates like dates of birth, or dates copied from documents like a passport."
      >
        <DateInput
          id="passport-issued"
          namePrefix="passport-issued"
          fieldset={{
            legend: {
              text: "When was your passport issued?",
              classes: "govuk-fieldset__legend--l",
            },
          }}
          hint={{ text: "For example, 27 3 2024" }}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask for a date range"
        description="When you need a period, such as a period of employment, ask for two dates. Make it clear whether the second date can be left blank."
      >
        <Fieldset
          legend={{
            text: "When were you employed by this employer?",
            classes: "govuk-fieldset__legend--l",
          }}
        >
          <DateInput
            id="employment-from"
            namePrefix="employment-from"
            fieldset={{
              legend: {
                text: "From",
                classes: "govuk-fieldset__legend--s",
              },
            }}
            hint={{ text: "For example, 27 3 2024" }}
          />
          <DateInput
            id="employment-to"
            namePrefix="employment-to"
            fieldset={{
              legend: {
                text: "To",
                classes: "govuk-fieldset__legend--s",
              },
            }}
            hint={{ text: "Leave blank if you are still employed" }}
          />
        </Fieldset>
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask for a date with a long range using selects"
        description="When the range of valid dates is very long, three select components for day, month and year can be easier to use than typing into a date input. Showing month names also avoids users having to remember the number of the month."
      >
        <Fieldset
          legend={{
            text: "What is your date of birth?",
            classes: "govuk-fieldset__legend--l",
          }}
        >
          <div className="govuk-date-input">
            <div className="govuk-date-input__item">
              <Select
                id="dob-select-day"
                name="dob-select-day"
                label={{
                  text: "Day",
                  classes: "govuk-date-input__label",
                }}
                classes="govuk-input--width-2"
                items={DAY_ITEMS}
              />
            </div>
            <div className="govuk-date-input__item">
              <Select
                id="dob-select-month"
                name="dob-select-month"
                label={{
                  text: "Month",
                  classes: "govuk-date-input__label",
                }}
                classes="govuk-input--width-10"
                items={MONTH_ITEMS}
              />
            </div>
            <div className="govuk-date-input__item">
              <Select
                id="dob-select-year"
                name="dob-select-year"
                label={{
                  text: "Year",
                  classes: "govuk-date-input__label",
                }}
                classes="govuk-input--width-4"
                items={YEAR_ITEMS}
              />
            </div>
          </div>
        </Fieldset>
        <Button text="Continue" />
      </Example>

      <Example
        title="Error message for a missing day"
        description="Have specific error messages for specific error states. The error message is shown for the whole question and the day input is styled with the error state, because the user did not enter a day."
      >
        <DateInput
          id="dob"
          namePrefix="dob"
          fieldset={{
            legend: {
              text: "What is your date of birth?",
              classes: "govuk-fieldset__legend--l",
            },
          }}
          hint={{ text: "For example, 31 3 1980" }}
          day={{ error: true }}
          errorMessage={{ text: "Date of birth must include a day" }}
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
