import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Names - GOV.UK Patterns",
};

export default function NamesPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Names</h1>
      <p className="govuk-body-l">
        Make it as easy as possible for users to enter their name. Only ask for
        people&rsquo;s names if you need that information to deliver your
        service.
      </p>

      <Example
        title="Ask for a full name in a single field"
        description="A single field accommodates the broadest range of name types, including names that do not fit a first-name, last-name format. Set the autocomplete attribute to name so browsers can autofill, and turn spellcheck off so names are not marked as misspelled."
      >
        <Input
          id="full-name"
          name="fullName"
          label={{ text: "Full name" }}
          autoComplete="name"
          spellCheck={false}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Only split the name when you must process parts separately"
        description="Using multiple fields means there is more risk that a person's name will not fit the format you have chosen. If you must split names, label the fields 'First name' and 'Last name', or 'Given names' and 'Family name' for users from outside the UK."
      >
        <Input
          id="first-name"
          name="firstName"
          label={{ text: "First name" }}
          autoComplete="given-name"
          spellCheck={false}
        />
        <Input
          id="last-name"
          name="lastName"
          label={{ text: "Last name" }}
          autoComplete="family-name"
          spellCheck={false}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Error message"
        description="Have specific error messages for specific error states. Here the user has submitted the question without entering their name."
      >
        <Input
          id="full-name-error"
          name="fullName"
          label={{ text: "Full name" }}
          autoComplete="name"
          spellCheck={false}
          errorMessage={{ text: "Enter your full name" }}
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
