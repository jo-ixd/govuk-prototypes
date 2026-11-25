import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import Example from "@/app/playground/_components/Example";
import ErrorMessagePlayground from "./ErrorMessagePlayground";

export const metadata: Metadata = { title: "Error message - GOV.UK Playground" };

export default function ErrorMessagePage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Error message</h1>
      <p className="govuk-body-l">
        Describes what went wrong with a form field, and how to fix it.
      </p>

      <Example
        title="Default error message"
        description="Screen readers hear a hidden ‘Error:’ prefix before the message itself."
      >
        <ErrorMessage text="Enter your National Insurance number in the correct format, like QQ 12 34 56 C" />
      </Example>

      <Example
        title="Error message with a custom hidden prefix"
        description="Change the visually hidden prefix when the field needs a more specific one."
      >
        <ErrorMessage
          visuallyHiddenText="Date of birth error"
          text="Enter your date of birth"
        />
      </Example>

      <ErrorMessagePlayground />
    </>
  );
}
