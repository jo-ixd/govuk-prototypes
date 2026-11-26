import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import SkipLink from "@/app/components/govuk/SkipLink";
import Example from "@/app/playground/_components/Example";
import SkipLinkPlayground from "@/app/playground/components/skip-link/SkipLinkPlayground";

export const metadata: Metadata = {
  title: "Skip Link - GOV.UK Playground",
};

export default function SkipLinkPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Skip link</h1>
      <p className="govuk-body-l">
        The skip link lets keyboard and screen reader users jump straight to
        the main content, bypassing long navigation.
      </p>

      <Example
        title="Default"
        description="The skip link is visually hidden until it receives keyboard focus, so you must tab into the preview to see it appear. Activating it skips to this page's main content region, which has the id main-content."
      >
        <SkipLink text="Skip to main content" />
      </Example>

      <Example
        title="With custom text and href"
        description="Tab into the preview to see this skip link, which points at #custom."
      >
        <SkipLink text="Skip to custom content" href="#custom" />
        <p className="govuk-body" id="custom">
          The skip link jumps here, because this paragraph is the element with
          the id custom.
        </p>
      </Example>

      <SkipLinkPlayground />
    </>
  );
}
