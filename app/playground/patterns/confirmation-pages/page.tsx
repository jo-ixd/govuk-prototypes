import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Panel from "@/app/components/govuk/Panel";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Confirmation pages - GOV.UK Patterns",
};

export default function ConfirmationPagesPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Confirmation pages</h1>
      <p className="govuk-body-l">
        Use this pattern to let users know they&apos;ve completed a
        transaction. Confirmation pages reassure users and help them understand
        what to expect next.
      </p>

      <Example
        title="Confirmation panel with what happens next"
        description="A green confirmation panel with the reference number in the panel body, followed by details of what happens next and when, contact details for the service, and a link to the feedback page. Avoid putting links or buttons inside the green panel itself - they will not be accessible without changing the panel or focus state styles to meet a minimum contrast ratio of 3:1."
      >
        <Panel
          titleText="Application complete"
          html={
            <>
              Your reference number
              <br />
              <strong>HDJ2123F</strong>
            </>
          }
        />
        <p className="govuk-body">We have sent you a confirmation email.</p>

        <h2 className="govuk-heading-m">What happens next</h2>
        <ol className="govuk-list govuk-list--number">
          <li>
            We have sent your application to Hackney Electoral Register Office.
          </li>
          <li>
            They will contact you either to confirm your registration, or to
            ask for more information.
          </li>
          <li>
            Contact the register office on 020 8356 3000 if your details change
            before you hear from them.
          </li>
        </ol>

        <p className="govuk-body">
          <a href="#" className="govuk-link">
            What did you think of this service?
          </a>{" "}
          (takes 30 seconds)
        </p>
      </Example>

      <Example
        title="Notification banner success variant"
        description="Use the success notification banner to confirm an action at the top of a page, for example when a user returns to a page within a service after completing a step. The banner uses role='alert' and normally receives keyboard focus when the page loads - autoFocus is disabled here so the example does not steal focus from the rest of this documentation page."
      >
        <NotificationBanner
          type="success"
          titleText="Application complete"
          disableAutoFocus
          html={
            <p className="govuk-notification-banner__heading">
              Your application has been submitted. Your reference number is{" "}
              <strong>HDJ2123F</strong> and we have sent you a confirmation
              email.
            </p>
          }
        />
      </Example>
    </>
  );
}
