import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import Input from "@/app/components/govuk/Input";
import Example from "@/app/playground/_components/Example";
import ValidationDemo from "@/app/playground/patterns/validation/ValidationDemo";

export const metadata: Metadata = {
  title: "Recover from validation errors - GOV.UK Patterns",
};

export default function ValidationPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Recover from validation errors</h1>
      <p className="govuk-body-l">
        Check the information the user gives you to make sure it&apos;s valid.
        If there&apos;s a validation error, tell the user what&apos;s gone
        wrong and how to fix it.
      </p>

      <Example
        title="What an errored question page looks like"
        description="The page is shown again with the fields as the user filled them in, an error summary at the top of the page (with keyboard focus moved to it) and error messages next to the fields with errors. The page <title> also has 'Error: ' added to the beginning, so screen readers read it out as soon as possible."
      >
        <ErrorSummary
          titleText="There is a problem"
          errorList={[{ text: "Enter your full name", href: "#errored-name" }]}
        />
        <Input
          id="errored-name"
          name="errored-name"
          label={{ text: "Full name" }}
          defaultValue="Sarah"
          errorMessage={{ text: "Enter your full name" }}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Working form with validation"
        description="Validate only when the user tries to continue - not as they move between fields - and turn off HTML5 validation with novalidate. Try submitting the form empty, then with an invalid email address. Each error is described once in the error summary and again next to its field, and the user's answers are kept so they can be edited rather than re-entered. On success the errors clear and a success notification banner confirms the details."
      >
        <ValidationDemo />
      </Example>
    </>
  );
}
