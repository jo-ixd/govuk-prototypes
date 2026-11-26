import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import CookieBanner from "@/app/components/govuk/CookieBanner";
import Example from "@/app/playground/_components/Example";
import CookieBannerPlayground from "@/app/playground/components/cookie-banner/CookieBannerPlayground";

export const metadata: Metadata = {
  title: "CookieBanner - GOV.UK Playground",
};

export default function CookieBannerPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Cookie banner</h1>
      <p className="govuk-body-l">
        A banner for telling users about the cookies your service uses and
        letting them accept or reject them.
      </p>
      <Example
        title="Default"
        description="A cookie message with accept, reject and preferences actions."
      >
        <CookieBanner
          messages={[
            {
              headingText: "Cookies on this government service",
              text: "We use analytics cookies to help understand how users use our service.",
              actions: [
                {
                  text: "Accept analytics cookies",
                  type: "submit",
                  name: "cookies",
                  value: "accept",
                },
                {
                  text: "Reject analytics cookies",
                  type: "submit",
                  name: "cookies",
                  value: "reject",
                },
                {
                  text: "View cookie preferences",
                  href: "/cookie-preferences",
                },
              ],
            },
          ]}
        />
      </Example>
      <Example
        title="Accepted confirmation banner"
        description="A confirmation message with role alert and a button to hide it."
      >
        <CookieBanner
          messages={[
            {
              text: "Your cookie preferences have been saved. You have accepted cookies.",
              role: "alert",
              actions: [{ text: "Hide cookie message", type: "button" }],
            },
          ]}
        />
      </Example>
      <Example
        title="Rejected confirmation banner"
        description="The confirmation message shown after cookies are rejected."
      >
        <CookieBanner
          messages={[
            {
              text: "Your cookie preferences have been saved. You have rejected cookies.",
              role: "alert",
              actions: [{ text: "Hide cookie message", type: "button" }],
            },
          ]}
        />
      </Example>
      <Example
        title="With HTML"
        description="Headings and content can be passed as rich React content."
      >
        <CookieBanner
          messages={[
            {
              headingHtml: (
                <>
                  Cookies on <span>my service</span>
                </>
              ),
              html: (
                <>
                  <p className="govuk-body">
                    We use cookies in <span>our service</span>.
                  </p>
                  <p className="govuk-body">
                    We’d like to use analytics cookies so we can understand how
                    you use the Design System and make improvements.
                  </p>
                </>
              ),
              actions: [
                {
                  text: "Accept analytics cookies",
                  type: "submit",
                  name: "cookies",
                  value: "accept",
                },
                {
                  text: "Reject analytics cookies",
                  type: "submit",
                  name: "cookies",
                  value: "reject",
                },
                {
                  text: "View cookie preferences",
                  href: "/cookie-preferences",
                },
              ],
            },
          ]}
        />
      </Example>
      <CookieBannerPlayground />
    </>
  );
}
