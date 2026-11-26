import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Example from "@/app/playground/_components/Example";
import BackLinkPlayground from "@/app/playground/components/back-link/BackLinkPlayground";

export const metadata: Metadata = {
  title: "Back link - GOV.UK Playground",
};

export default function BackLinkPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Back link</h1>
      <p className="govuk-body-l">
        The back link helps users go back one step in a transaction, without
        relying on the browser back button.
      </p>

      <Example title="Default" description="Defaults to the text Back with an href of #.">
        <BackLink />
      </Example>

      <Example title="With custom text and href">
        <BackLink text="Back to results" href="/results" />
      </Example>

      <Example
        title="Inverse"
        description="Back links that appear on dark backgrounds."
        demoClasses="playground-example__demo--dark"
      >
        <BackLink classes="govuk-back-link--inverse" />
      </Example>

      <BackLinkPlayground />
    </>
  );
}
