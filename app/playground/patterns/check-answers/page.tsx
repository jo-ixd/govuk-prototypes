import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import SummaryList from "@/app/components/govuk/SummaryList";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Check answers - GOV.UK Patterns",
};

const changeAction = (thing: string) => ({
  items: [{ href: "#", text: "Change", visuallyHiddenText: thing }],
});

export default function CheckAnswersPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Check answers</h1>
      <p className="govuk-body-l">
        Let users check their answers before submitting information to a
        service. Show a single check answers page immediately before the
        confirmation screen for small to medium-sized transactions.
      </p>
      <p className="govuk-body-s">
        There is a live working version of this pattern in the{" "}
        <Link href="/playground/example-service/check-answers">
          example service
        </Link>
        .
      </p>

      <Example
        title="Check your answers before sending your application"
        description="The page title tells users what they need to do, the content is broken up into sections, and each row has a 'Change' link with hidden text describing what it changes. Optional questions the user skipped are shown as 'Not provided' - the customer reference row has no Change link because there is nothing to change. The submit button clearly states the action it performs."
      >
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h1 className="govuk-heading-l">
            Check your answers before sending your application
          </h1>

          <h2 className="govuk-heading-m">Personal details</h2>
          <SummaryList
            classes="govuk-!-margin-bottom-9"
            rows={[
              {
                key: { text: "Name" },
                value: { text: "Sarah Phillips" },
                actions: changeAction("name"),
              },
              {
                key: { text: "Date of birth" },
                value: { text: "5 January 1978" },
                actions: changeAction("date of birth"),
              },
              {
                key: { text: "Customer reference" },
                value: { text: "Not provided" },
              },
              {
                key: { text: "Address" },
                value: {
                  html: (
                    <>
                      72 Guild Street
                      <br />
                      London
                      <br />
                      SE23 6FH
                    </>
                  ),
                },
                actions: changeAction("address"),
              },
              {
                key: { text: "Contact details" },
                value: {
                  html: (
                    <>
                      <p className="govuk-body">07700 900457</p>
                      <p className="govuk-body">sarah.phillips@example.com</p>
                    </>
                  ),
                },
                actions: changeAction("contact details"),
              },
            ]}
          />

          <h2 className="govuk-heading-m">Application details</h2>
          <SummaryList
            classes="govuk-!-margin-bottom-9"
            rows={[
              {
                key: { text: "Previous application number" },
                value: { text: "502135326" },
                actions: changeAction("previous application number"),
              },
              {
                key: { text: "Licence type" },
                value: { text: "For personal use" },
                actions: changeAction("licence type"),
              },
              {
                key: { text: "Licence period" },
                value: { text: "Valid for 6 months" },
                actions: changeAction("licence period"),
              },
            ]}
          />

          <h2 className="govuk-heading-m">Now send your application</h2>
          <p className="govuk-body">
            By submitting this application you are confirming that, to the best
            of your knowledge, the details you are providing are correct.
          </p>
          <form noValidate>
            <input type="hidden" name="answers-checked" value="true" />
            <Button text="Accept and send" type="button" />
          </form>
        </div>
      </Example>

      <Example
        title="Summary card variant"
        description="Use summary cards when users need to check multiple things of the same type, for example a series of interview appointments. Each card repeats the section heading, so screen reader users hear which appointment a 'Change' link belongs to."
      >
        <SummaryList
          rows={[
            {
              key: { text: "Date" },
              value: { text: "14 July 2021" },
              actions: changeAction("date"),
            },
            {
              key: { text: "Time" },
              value: { text: "2:15pm" },
              actions: changeAction("time"),
            },
            {
              key: { text: "Interviewer" },
              value: { text: "Fiona Johns" },
              actions: changeAction("interviewer"),
            },
          ]}
          card={{
            title: { text: "Interview appointment" },
            actions: changeAction("interview appointment"),
          }}
        />
      </Example>
    </>
  );
}
