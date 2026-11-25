import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import Select from "@/app/components/govuk/Select";
import type { SelectItem } from "@/app/components/govuk/Select";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Phone numbers - GOV.UK Patterns",
};

const COUNTRY_CODE_ITEMS: SelectItem[] = [
  { value: "+44", text: "United Kingdom (+44)" },
  { value: "+1", text: "United States (+1)" },
  { value: "+31", text: "Netherlands (+31)" },
  { value: "+33", text: "France (+33)" },
  { value: "+49", text: "Germany (+49)" },
  { value: "+353", text: "Ireland (+353)" },
  { value: "+91", text: "India (+91)" },
];

export default function PhoneNumbersPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Phone numbers</h1>
      <p className="govuk-body-l">
        Only collect phone numbers if you genuinely need them. Not everyone has
        or can use a phone, so make sure you give users a choice about how they
        can be contacted. Let users enter phone numbers in whatever format is
        familiar to them, including additional spaces, hyphens and brackets.
      </p>

      <Example
        title="Ask for a UK mobile number"
        description="Use the form label or hint text to tell users what type of phone number you need. Example numbers come from Ofcom's reserved ranges for use in media, so they cannot belong to a real user."
      >
        <Input
          id="uk-mobile-number"
          name="ukMobileNumber"
          type="tel"
          label={{ text: "UK mobile number" }}
          hint={{ text: "For example, 07700 900982" }}
          classes="govuk-input--width-20"
          autocomplete="tel"
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask for a UK landline number"
        description="Set the type attribute to tel so devices show the right keyboard, and autocomplete to tel so browsers can autofill the number if the user has entered it previously."
      >
        <Input
          id="uk-phone-number"
          name="ukPhoneNumber"
          type="tel"
          label={{ text: "UK phone number" }}
          hint={{ text: "For example, 01632 960 001" }}
          classes="govuk-input--width-20"
          autocomplete="tel"
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask for an international phone number"
        description="Tell users to include the country code if you accept numbers from outside the UK but want to keep a single input."
      >
        <Input
          id="international-phone-number"
          name="internationalPhoneNumber"
          type="tel"
          label={{ text: "Phone number" }}
          hint={{ text: "For international numbers include the country code" }}
          classes="govuk-input--width-20"
          autocomplete="tel"
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask for the country code separately"
        description="If users find it hard to enter the country code, you can ask for it separately with a select component. This example puts the two fields in a row by reusing the date input layout classes."
      >
        <div className="govuk-date-input">
          <div className="govuk-date-input__item">
            <Select
              id="country-code"
              name="countryCode"
              label={{ text: "Country" }}
              items={COUNTRY_CODE_ITEMS}
            />
          </div>
          <div className="govuk-date-input__item">
            <Input
              id="international-number"
              name="internationalNumber"
              type="tel"
              label={{ text: "Phone number" }}
              hint={{ text: "Do not include the country code" }}
              classes="govuk-input--width-20"
              autocomplete="tel"
            />
          </div>
        </div>
        <Button text="Continue" />
      </Example>

      <Example
        title="Error message"
        description="Have specific error messages for specific error states. Here the user has submitted the question without entering a phone number. If there is no example in the hint, say 'Enter a phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'."
      >
        <Input
          id="uk-phone-number-error"
          name="ukPhoneNumber"
          type="tel"
          label={{ text: "UK phone number" }}
          classes="govuk-input--width-20"
          autocomplete="tel"
          errorMessage={{ text: "Enter a UK phone number" }}
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
