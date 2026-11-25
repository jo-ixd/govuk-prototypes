import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Details from "@/app/components/govuk/Details";
import Example from "@/app/playground/_components/Example";
import DetailsPlayground from "./DetailsPlayground";

export const metadata: Metadata = { title: "Details - GOV.UK Playground" };

export default function DetailsPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Details</h1>
      <p className="govuk-body-l">
        Lets users reveal additional content that is not essential to complete
        the task.
      </p>

      <Example
        title="Basic details with text"
        description="Clicking the summary reveals the hidden text."
      >
        <Details
          summaryText="Where to find your National Insurance number"
          text="Your National Insurance number is on your National Insurance card, or in official paperwork such as payslips or letters about benefits."
        />
      </Example>

      <Example
        title="Details open by default"
        description="Set open to show the content on page load."
      >
        <Details
          summaryText="Where to find your National Insurance number"
          text="Your National Insurance number is on your National Insurance card, or in official paperwork such as payslips or letters about benefits."
          open
        />
      </Example>

      <Example
        title="Details with HTML content"
        description="The revealed content can include links and other markup."
      >
        <Details
          summaryText="Where to find your National Insurance number"
          html={
            <p className="govuk-body">
              Your National Insurance number is on your National Insurance
              card, or in official paperwork such as payslips or letters about
              benefits.{" "}
              <a className="govuk-link" href="#">
                Contact HMRC
              </a>{" "}
              if you still cannot find it.
            </p>
          }
        />
      </Example>

      <DetailsPlayground />
    </>
  );
}
