import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Select from "@/app/components/govuk/Select";
import Example from "@/app/playground/_components/Example";
import SelectPlayground from "@/app/playground/components/select/SelectPlayground";

export const metadata: Metadata = {
  title: "Select - GOV.UK Playground",
};

export default function SelectPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Select</h1>
      <p className="govuk-body-l">
        Selects let users choose an option from a drop-down list.
      </p>

      <Example
        title="Default"
        description="A select with a pre-selected option and a disabled option."
      >
        <Select
          name="select-1"
          label={{ text: "Label text goes here" }}
          items={[
            { value: "1", text: "GOV.UK frontend option 1" },
            { value: "2", text: "GOV.UK frontend option 2", selected: true },
            { value: "3", text: "GOV.UK frontend option 3", disabled: true },
          ]}
        />
      </Example>

      <Example
        title="With hint text and error message"
        description="Hint and error combined; both are referenced from aria-describedby."
      >
        <Select
          id="select-2"
          name="select-2"
          label={{ text: "Label text goes here" }}
          hint={{ text: "Hint text goes here" }}
          errorMessage={{ text: "Error message goes here" }}
          items={[
            { value: "1", text: "GOV.UK frontend option 1" },
            { value: "2", text: "GOV.UK frontend option 2" },
            { value: "3", text: "GOV.UK frontend option 3" },
          ]}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <Select
          id="select-3"
          name="select-3"
          label={{
            text: "Label text goes here",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
          items={[
            { value: "1", text: "GOV.UK frontend option 1" },
            { value: "2", text: "GOV.UK frontend option 2", selected: true },
            { value: "3", text: "GOV.UK frontend option 3", disabled: true },
          ]}
        />
      </Example>

      <Example
        title="With full width override"
        description="A utility class makes the select fill its container."
      >
        <Select
          id="select-1-full"
          name="select-full-width"
          classes="govuk-!-width-full"
          label={{ text: "Label text goes here" }}
          items={[
            { value: "1", text: "GOV.UK frontend option 1" },
            { value: "2", text: "GOV.UK frontend option 2", selected: true },
            { value: "3", text: "GOV.UK frontend option 3", disabled: true },
          ]}
        />
      </Example>

      <SelectPlayground />
    </>
  );
}
