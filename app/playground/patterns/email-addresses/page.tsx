import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import Radios from "@/app/components/govuk/Radios";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Email addresses - GOV.UK Patterns",
};

export default function EmailAddressesPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Email addresses</h1>
      <p className="govuk-body-l">
        When asking users for their email address, make it clear why you are
        asking, make sure the field works for all of your users and help users
        to enter a valid email address. Make the field wide enough for at least
        30 characters, which lets most users see their entire email address.
      </p>

      <Example
        title="Ask for an email address"
        description="Tell users what the email address will be used for, so users feel confident you will not abuse it and can choose which address to give. Set the type attribute to email, turn spellcheck off, and set autocomplete to email so browsers can autofill."
      >
        <Input
          id="email"
          name="email"
          type="email"
          label={{ text: "Email address" }}
          hint={{ text: "We’ll only use this to send you a receipt" }}
          autoComplete="email"
          spellCheck={false}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Ask users to confirm their email address"
        description="Some services ask users to repeat their email address - only do this if your user research shows it to be effective. This example reveals an email field when the user selects 'Yes', using the radios component's conditional content."
      >
        <Radios
          idPrefix="confirm-email"
          name="confirmEmail"
          fieldset={{
            legend: {
              text: "Do you want to confirm your email address?",
              classes: "govuk-fieldset__legend--l",
            },
          }}
          items={[
            {
              value: "yes",
              text: "Yes",
              checked: true,
              conditional: {
                html: (
                  <Input
                    id="confirm-email-address"
                    name="confirmEmailAddress"
                    type="email"
                    label={{ text: "Email address" }}
                    hint={{
                      text: "We’ll only use this to send you a confirmation",
                    }}
                    autoComplete="email"
                    spellCheck={false}
                  />
                ),
              },
            },
            { value: "no", text: "No" },
          ]}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Error message"
        description="Have specific error messages for specific error states. Here the user has entered text that is not an email address, and the invalid answer is kept in the field so the user can see what they entered and change it."
      >
        <Input
          id="email-error"
          name="email"
          type="email"
          label={{ text: "Email address" }}
          hint={{ text: "We’ll only use this to send you a receipt" }}
          defaultValue="Not an email address"
          autoComplete="email"
          spellCheck={false}
          errorMessage={{
            text: "Enter an email address in the correct format, like name@example.com",
          }}
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
