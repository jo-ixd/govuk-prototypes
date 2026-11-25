import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Table from "@/app/components/govuk/Table";
import Example from "@/app/playground/_components/Example";
import CookiesPreferencesForm from "./CookiesPreferencesForm";

export const metadata: Metadata = {
  title: "Cookies page - GOV.UK Patterns",
};

const ESSENTIAL_COOKIE_ROWS = [
  [
    { text: "session_cookie" },
    { text: "Used to keep you signed in" },
    { text: "20 hours" },
  ],
  [
    { text: "cookie_policy" },
    { text: "Saves your cookie consent settings" },
    { text: "1 year" },
  ],
];

const ANALYTICS_COOKIE_ROWS = [
  [
    { text: "_ga" },
    {
      text: "Used by Google Analytics to distinguish users and measure how the service is used",
    },
    { text: "2 years" },
  ],
  [
    { text: "_gid" },
    { text: "Used by Google Analytics to identify users for 24 hours after their last visit" },
    { text: "24 hours" },
  ],
];

export default function CookiesPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Cookies page</h1>
      <p className="govuk-body-l">
        Tell users about the cookies you&rsquo;re setting on their device and
        let them accept or reject different types of non-essential cookies.
      </p>

      <Example
        title="List the cookies your service uses"
        description="Audit and categorise your cookies, then list them individually on the cookies page under the relevant category. For each cookie, give the name, a brief description of what it does, who sets it (for third party cookies) and when it expires. Link to this page from the footer and the cookie banner."
      >
        <h1 className="govuk-heading-l">Cookies</h1>
        <p className="govuk-body">
          Cookies are small files saved on your phone, tablet or computer when
          you visit a website.
        </p>
        <p className="govuk-body">
          We use cookies to make this site work and collect information about
          how you use our service.
        </p>

        <h2 className="govuk-heading-m">Essential cookies</h2>
        <p className="govuk-body">
          Essential cookies keep your information secure while you use this
          service. We do not need to ask permission to use them.
        </p>
        <Table
          caption="Essential cookies we use"
          captionClasses="govuk-table__caption--s"
          head={[
            { text: "Name" },
            { text: "Purpose" },
            { text: "Expires" },
          ]}
          rows={ESSENTIAL_COOKIE_ROWS}
        />

        <h2 className="govuk-heading-m">Analytics cookies</h2>
        <p className="govuk-body">
          Analytics cookies help us understand how people use the service, so
          we can improve it. We will only set them if you accept them.
        </p>
        <Table
          caption="Analytics cookies we use"
          captionClasses="govuk-table__caption--s"
          head={[
            { text: "Name" },
            { text: "Purpose" },
            { text: "Expires" },
          ]}
          rows={ANALYTICS_COOKIE_ROWS}
        />
      </Example>

      <Example
        title="Let users accept or reject cookies"
        description="Use radios and a button to let users accept or reject non-essential cookies. Load the page with the radios set to 'no' on the user's first visit, or with any preferences they've already set. When they save, confirm with a green notification banner so they can get back to the page they were looking at - in this demo the banner is shown using client-side state, without leaving the page."
      >
        <CookiesPreferencesForm />
      </Example>
    </>
  );
}
