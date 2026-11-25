import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Panel from "@/app/components/govuk/Panel";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Page not found pages - GOV.UK Patterns",
};

export default function PageNotFoundPagesPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Page not found pages</h1>
      <p className="govuk-body-l">
        A page not found tells someone we cannot find the page they were trying
        to view. They are also known as 404 pages.
      </p>
      <p className="govuk-body">
        Use one if someone selects a link or button that takes them to a page
        that does not exist, or types or copies a web address for a page that
        does not exist. Content should be clear and concise and not blame the
        user. Do not use breadcrumbs, technical jargon like 404 or bad request,
        informal or humorous words like oops, or red text to warn people.
      </p>

      <Example
        title="Standard page not found"
        description="Use 'Page not found' as the H1, with contact information if it exists and helps meet a user need. Include 'Page not found - service name - GOV.UK' as the page title. This playground's app-level custom not-found page is coming; this shows the in-service version of the pattern."
      >
        <h1 className="govuk-heading-l">Page not found</h1>
        <p className="govuk-body">
          If you typed the web address, check it is correct.
        </p>
        <p className="govuk-body">
          If you pasted the web address, check you copied the entire address.
        </p>
        <p className="govuk-body">
          If the web address is correct or you selected a link or button,{" "}
          <a className="govuk-link" href="#">
            contact the Parking Permit Helpline
          </a>{" "}
          if you need to speak to someone about your parking permit.
        </p>
      </Example>

      <Example
        title="Panel variant with links home"
        description="A composed variant that uses a panel to carry the guidance, followed by a paragraph and links to help the user get back on track. The app-level custom not-found page for the whole playground is coming separately."
      >
        <Panel
          classes="govuk-panel--interruption"
          titleText="Page not found"
          text="We cannot find the page you were looking for. If you typed the web address, check it is correct. If you pasted it, check you copied the entire address."
        />
        <p className="govuk-body">
          If the web address is correct or you selected a link or button,{" "}
          <a className="govuk-link" href="#">
            contact the Parking Permit Helpline
          </a>{" "}
          if you need to speak to someone about your parking permit.
        </p>
        <div className="govuk-button-group">
          <Button element="a" href="/playground" text="Go to the homepage" />
        </div>
      </Example>
    </>
  );
}
