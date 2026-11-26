import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "National Insurance numbers - GOV.UK Patterns",
};

const NINO_CLASSES = "govuk-input--width-10 govuk-input--extra-letter-spacing";

export default function NationalInsuranceNumbersPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">National Insurance numbers</h1>
      <p className="govuk-body-l">
        Ask users to provide their National Insurance number. Never use
        National Insurance numbers to verify a user&rsquo;s identity.
      </p>

      <Example
        title="Ask for a National Insurance number"
        description="Use a single text input labelled 'National Insurance number' - write it out in full and never use abbreviations such as 'NINO'. The width and extra letter spacing classes make room for 13 characters and make the spaced pairs easier to read. autocapitalize means typed letters appear in upper case, but validation must still accept lower case letters, extra spaces and punctuation."
      >
        <Input
          id="national-insurance-number"
          name="nationalInsuranceNumber"
          label={{ text: "National Insurance number" }}
          hint={{
            text: "It’s on your National Insurance card, benefit letter, payslip or P60 – for example, ‘QQ 12 34 56 C’",
          }}
          classes={NINO_CLASSES}
          autoCapitalize="characters"
          spellCheck={false}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Error message"
        description="Let users enter upper and lower case letters, additional spaces and punctuation, and ignore any unwanted characters before validating. When the hint already shows an example number, the error message can refer to the correct format. Here the user has entered a number of digits only."
      >
        <Input
          id="national-insurance-number-error"
          name="nationalInsuranceNumber"
          label={{ text: "National Insurance number" }}
          hint={{
            text: "It’s on your National Insurance card, benefit letter, payslip or P60 – for example, ‘QQ 12 34 56 C’",
          }}
          classes={NINO_CLASSES}
          autoCapitalize="characters"
          spellCheck={false}
          defaultValue="12345678"
          errorMessage={{
            text: "Enter a National Insurance number in the correct format",
          }}
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
