import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import Example from "@/app/playground/_components/Example";
import ErrorSummaryPlayground from "@/app/playground/components/error-summary/ErrorSummaryPlayground";

export const metadata: Metadata = {
  title: "ErrorSummary - GOV.UK Playground",
};

export default function ErrorSummaryPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Error summary</h1>
      <p className="govuk-body-l">
        Use the error summary component to show a list of errors a user needs to
        fix at the top of the page, with links to the relevant fields.
      </p>

      <Example
        title="Default"
        description="A summary with links pointing to the fields with errors."
      >
        <ErrorSummary
          errorList={[
            {
              text: "The date your passport was issued must be in the past",
              href: "#content",
            },
            {
              text: "Enter a postcode, like AA1 1AA",
              href: "#content",
            },
          ]}
        />
      </Example>

      <Example
        title="Without links"
        description="Errors without a relevant field to link to can be plain text."
      >
        <ErrorSummary
          errorList={[{ text: "Invalid username or password" }]}
        />
      </Example>

      <Example
        title="Mixed with and without links"
        description="Some errors can link to fields, others can be plain text."
      >
        <ErrorSummary
          errorList={[
            { text: "Invalid username or password" },
            {
              text: "Agree to the terms of service to log in",
              href: "#content",
            },
          ]}
        />
      </Example>

      <Example
        title="With description only"
        description="A summary describing the problem without an error list."
      >
        <ErrorSummary description={{ text: "The file couldn't be loaded. Try again later." }} />
      </Example>

      <Example
        title="With everything"
        description="A description followed by a list of linked and unlinked errors."
      >
        <ErrorSummary
          description={{ text: "Please fix the errors below." }}
          errorList={[
            { text: "Invalid username or password" },
            {
              text: "Agree to the terms of service to log in",
              href: "#content",
            },
          ]}
        />
      </Example>

      <Example
        title="HTML title, description and errors"
        description="Titles, descriptions and error items can contain formatted content."
      >
        <ErrorSummary
          titleHtml={
            <>
              Alert, <em>alert</em>
            </>
          }
          description={{
            html: (
              <>
                See <span>errors</span> below
              </>
            ),
          }}
          errorList={[
            {
              html: (
                <>
                  The date your passport was issued <b>must</b> be in the past
                </>
              ),
              href: "#content",
            },
          ]}
        />
      </Example>

      <Example
        title="Autofocus disabled"
        description="The summary will not take focus when the page loads."
      >
        <ErrorSummary
          disableAutoFocus
          errorList={[
            { text: "Invalid username or password", href: "#content" },
          ]}
        />
      </Example>

      <ErrorSummaryPlayground />
    </>
  );
}
