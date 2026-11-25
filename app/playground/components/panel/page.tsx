import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Panel from "@/app/components/govuk/Panel";
import Example from "@/app/playground/_components/Example";
import PanelPlayground from "./PanelPlayground";

export const metadata: Metadata = {
  title: "Panel - GOV.UK Playground",
};

export default function PanelPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Panel</h1>
      <p className="govuk-body-l">
        Panels highlight the most important content on a page, typically a
        confirmation screen or an interruption asking the user to check
        something.
      </p>

      <Example title="Default" description="A confirmation panel with a title and body.">
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
      </Example>

      <Example
        title="Interruption panel"
        description="An interruption panel with a button and a link action."
      >
        <Panel
          classes="govuk-panel--interruption"
          titleText="Is your age correct?"
          html={
            <p className="govuk-body">
              You entered your age as <strong>109</strong>.
            </p>
          }
          actions={{
            items: [
              { text: "Yes, this is correct", type: "button" },
              { text: "No, change my age", href: "#" },
            ],
          }}
        />
      </Example>

      <Example
        title="Custom heading level"
        description="The panel title can be any heading level, here an h2."
      >
        <Panel
          titleText="Application complete"
          headingLevel={2}
          text="Your reference number: HDJ2123F"
        />
      </Example>

      <Example title="Title with no body text">
        <Panel titleText="Application complete" />
      </Example>

      <PanelPlayground />
    </>
  );
}
