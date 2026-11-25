import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import PhaseBanner from "@/app/components/govuk/PhaseBanner";
import Example from "@/app/playground/_components/Example";
import PhaseBannerPlayground from "./PhaseBannerPlayground";

export const metadata: Metadata = {
  title: "PhaseBanner - GOV.UK Playground",
};

export default function PhaseBannerPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Phase banner</h1>
      <p className="govuk-body-l">
        A banner to show that your service is in a private or public beta, or
        another development phase.
      </p>
      <Example
        title="Default"
        description="An alpha tag with a feedback link in the banner text."
      >
        <PhaseBanner
          tag={{ text: "Alpha" }}
          html={
            <>
              This is a new service – your{" "}
              <a href="#" className="govuk-link">
                feedback
              </a>{" "}
              will help us to improve it.
            </>
          }
        />
      </Example>
      <Example
        title="With tag HTML"
        description="The tag content can be rich HTML, and the banner text can be plain text."
      >
        <PhaseBanner
          tag={{ html: <em>Alpha</em> }}
          text="This is a new service – your feedback will help us to improve it"
        />
      </Example>
      <Example
        title="With tag classes"
        description="Tag modifier classes change the colour of the phase tag."
      >
        <PhaseBanner
          tag={{ text: "Alpha", classes: "govuk-tag--grey" }}
          text="This is a new service – your feedback will help us to improve it"
        />
      </Example>
      <PhaseBannerPlayground />
    </>
  );
}
