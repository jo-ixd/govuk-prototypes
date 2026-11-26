import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import InsetText from "@/app/components/govuk/InsetText";
import Radios from "@/app/components/govuk/Radios";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Bank details - GOV.UK Patterns",
};

export default function BankDetailsPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Bank details</h1>
      <p className="govuk-body-l">
        Help users provide their bank or building society account details so
        you can pay them. Only ask for bank details securely within your
        service.
      </p>

      <Example
        title="Bank or building society account details"
        description="A security message sits above the form so users read it before entering their details. Use one input for the sort code and one for the account number, with extra letter spacing to make digits easier to read back, and do not ask users for their account type."
      >
        <InsetText text="This service keeps your details safe. Do not enter your bank password or PIN." />
        <h2 className="govuk-heading-l">
          Bank or building society account details
        </h2>
        <Input
          id="name-on-the-account"
          name="nameOnTheAccount"
          label={{ text: "Name on the account" }}
          autoComplete="name"
          spellCheck={false}
        />
        <Input
          id="sort-code"
          name="sortCode"
          label={{ text: "Sort code" }}
          hint={{ text: "Must be 6 digits long, like 30-56-77" }}
          classes="govuk-input--width-5 govuk-input--extra-letter-spacing"
          inputMode="numeric"
          spellCheck={false}
        />
        <Input
          id="account-number"
          name="accountNumber"
          label={{ text: "Account number" }}
          hint={{ text: "Must be between 6 and 8 digits long" }}
          classes="govuk-input--width-10 govuk-input--extra-letter-spacing"
          inputMode="numeric"
          spellCheck={false}
        />
        <Input
          id="roll-number"
          name="rollNumber"
          label={{ text: "Building society roll number (if you have one)" }}
          hint={{ text: "You can find it on your card, statement or passbook" }}
          classes="govuk-input--width-10 govuk-input--extra-letter-spacing"
          spellCheck={false}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Sort code error"
        description="Let users enter their sort code in whatever format is familiar to them, allowing additional spaces, hyphens and dashes, then validate it as a single input."
      >
        <Input
          id="sort-code-error"
          name="sortCodeError"
          label={{ text: "Sort code" }}
          hint={{ text: "Must be 6 digits long" }}
          classes="govuk-input--width-5 govuk-input--extra-letter-spacing"
          defaultValue="12"
          inputMode="numeric"
          spellCheck={false}
          errorMessage={{ text: "Enter a valid sort code like 309430" }}
        />
      </Example>

      <Example
        title="Branching question"
        description="Not everyone has a bank account or wants to share their account details online. Let users choose to get paid by an alternative method if your service supports one."
      >
        <Radios
          name="methodOfPayment"
          fieldset={{
            legend: {
              text: "How do you want to be paid?",
              classes: "govuk-fieldset__legend--l",
            },
          }}
          items={[
            {
              value: "bank-account-or-building-society",
              text: "UK bank or building society account",
            },
            {
              value: "non-uk-bank-account",
              text: "Non-UK bank account",
            },
            {
              value: "cheque",
              text: "Cheque",
            },
            {
              value: "none",
              text: "None of the above",
              hint: { text: "We'll contact you to arrange payment" },
            },
          ]}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="International bank account details"
        description="Non-UK bank accounts need different fields to sort code and account number – usually a BIC code (also known as ‘SWIFT code’) and IBAN. Only show the fields that relate to the country the user selects."
      >
        <Input
          id="bic-code"
          name="bicCode"
          label={{ text: "BIC or SWIFT code" }}
          hint={{
            text: "Must be between 8 and 11 characters long – you can ask your bank or check your bank statement",
          }}
          classes="govuk-input--width-10 govuk-input--extra-letter-spacing"
          spellCheck={false}
        />
        <Input
          id="iban"
          name="iban"
          label={{ text: "IBAN" }}
          hint={{ text: "You can ask your bank or check your bank statement" }}
          classes="govuk-input--extra-letter-spacing"
          spellCheck={false}
        />
      </Example>
    </>
  );
}
