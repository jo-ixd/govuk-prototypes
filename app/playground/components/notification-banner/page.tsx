import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Example from "@/app/playground/_components/Example";
import NotificationBannerPlayground from "@/app/playground/components/notification-banner/NotificationBannerPlayground";

export const metadata: Metadata = {
  title: "NotificationBanner - GOV.UK Playground",
};

export default function NotificationBannerPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Notification banner</h1>
      <p className="govuk-body-l">
        A banner to tell the user about something they need to know, such as a
        successful action or that a page has been withdrawn.
      </p>
      <Example
        title="Default"
        description="A regional landmark with the default title 'Important'."
      >
        <NotificationBanner text="This publication was withdrawn on 7 March 2014." />
      </Example>
      <Example
        title="With type as success"
        description="A success banner gets role alert, the title 'Success' and autofocus on page load."
      >
        <NotificationBanner
          type="success"
          text="Email sent to example@email.com"
        />
      </Example>
      <Example
        title="With HTML content"
        description="Pass rich content to control the layout of the banner body."
      >
        <NotificationBanner
          html={
            <>
              <h3 className="govuk-notification-banner__heading">
                Check if you need to apply the reverse charge to this
                application
              </h3>
              <p className="govuk-body">
                You will have to apply the{" "}
                <a href="#" className="govuk-notification-banner__link">
                  reverse charge
                </a>{" "}
                if the applicant supplies any of these services:
              </p>
              <ul className="govuk-list govuk-list--bullet govuk-list--spaced">
                <li>
                  constructing, altering, repairing, extending, demolishing or
                  dismantling buildings or structures (whether permanent or
                  not), including offshore installation services
                </li>
                <li>
                  constructing, altering, repairing, extending, demolishing of
                  any works forming, or planned to form, part of the land,
                  including (in particular) walls, roadworks, power lines,
                  electronic communications equipment, aircraft runways,
                  railways, inland waterways, docks and harbours
                </li>
              </ul>
            </>
          }
        />
      </Example>
      <Example
        title="With a long heading"
        description="Long banner text wraps as normal."
      >
        <NotificationBanner text="You have 9 days left to send your application. Your application will be withdrawn if you do not send it by 18 November 2026." />
      </Example>
      <NotificationBannerPlayground />
    </>
  );
}
