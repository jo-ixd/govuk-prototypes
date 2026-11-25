import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import ExitThisPage from "@/app/components/govuk/ExitThisPage";
import Example from "@/app/playground/_components/Example";
import ExitThisPagePlayground from "./ExitThisPagePlayground";

export const metadata: Metadata = {
  title: "ExitThisPage - GOV.UK Playground",
};

export default function ExitThisPagePage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Exit this page</h1>
      <p className="govuk-body-l">
        Use the exit this page component to let users quickly leave a service
        and go to another website, including via three presses of the Shift key.
      </p>

      <Example
        title="Default"
        description="Redirects to an external website by default; screen reader users hear 'Emergency' before the button text."
      >
        <ExitThisPage />
      </Example>

      <Example
        title="Custom redirect URL"
        description="The redirect target can point anywhere, including another page in your service."
      >
        <ExitThisPage redirectUrl="/playground" />
      </Example>

      <Example
        title="Custom text"
        description="The button text can be changed while keeping the styled link button."
      >
        <ExitThisPage text="Leave this service" redirectUrl="/playground" />
      </Example>

      <Example
        title="Translated"
        description="The button text and the screen reader announcements can be translated."
      >
        <ExitThisPage
          text="Gadael y dudalen"
          activatedText="Tudalen ymadael"
          timedOutText="Wedi'i amseru"
          pressTwoMoreTimesText="Pwyswch 'Shift' 2 gwaith arall"
          pressOneMoreTimeText="Pwyswch 'Shift' 1 mwy o amser"
        />
      </Example>

      <ExitThisPagePlayground />
    </>
  );
}
