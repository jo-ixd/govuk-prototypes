import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Input from "@/app/components/govuk/Input";
import Example from "@/app/playground/_components/Example";
import InputPlayground from "./InputPlayground";

export const metadata: Metadata = {
  title: "Text input - GOV.UK Playground",
};

export default function InputPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Text input</h1>
      <p className="govuk-body-l">
        Text inputs allow users to enter a single line of text.
      </p>

      <Example title="Default" description="A single line text input with a label.">
        <Input label={{ text: "National Insurance number" }} name="test-name" />
      </Example>

      <Example
        title="With hint text"
        description="A hint below the label, linked with aria-describedby."
      >
        <Input
          id="input-with-hint-text"
          name="test-name-2"
          label={{ text: "National insurance number" }}
          hint={{
            text: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
          }}
        />
      </Example>

      <Example
        title="With error message"
        description="An error message displayed above the input, which gets the error style."
      >
        <Input
          id="input-with-error-message"
          name="test-name-3"
          label={{ text: "National Insurance number" }}
          errorMessage={{
            text: "Enter a National Insurance number in the correct format",
          }}
        />
      </Example>

      <Example
        title="With error and hint"
        description="Hint and error combined; both are referenced from aria-describedby."
      >
        <Input
          id="with-error-hint"
          name="with-error-hint"
          label={{ text: "National insurance number" }}
          hint={{
            text: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
          }}
          errorMessage={{
            text: "Enter a National Insurance number in the correct format",
          }}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <Input
          id="input-with-page-heading"
          name="test-name"
          label={{
            text: "National Insurance number",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
        />
      </Example>

      <Example
        title="With width-2 class"
        description="A narrower input for short values like a two-digit number."
      >
        <Input
          id="input-width-2"
          name="test-width-2"
          classes="govuk-input--width-2"
          label={{ text: "National insurance number" }}
          hint={{
            text: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
          }}
        />
      </Example>

      <Example
        title="With prefix and suffix"
        description="Prefix and suffix content wrapped around the input."
      >
        <Input
          id="input-with-prefix-suffix"
          name="cost"
          label={{ text: "Cost per item, in pounds" }}
          prefix={{ text: "£" }}
          suffix={{ text: "per item" }}
        />
      </Example>

      <Example
        title="With prefix and suffix and error"
        description="The error state styles the input inside the prefix and suffix wrapper."
      >
        <Input
          id="input-with-prefix-suffix-error"
          name="cost"
          label={{ text: "Cost per item, in pounds" }}
          prefix={{ text: "£" }}
          suffix={{ text: "per item" }}
          errorMessage={{ text: "Error message goes here" }}
        />
      </Example>

      <InputPlayground />
    </>
  );
}
