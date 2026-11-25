import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import WarningText from "@/app/components/govuk/WarningText";
import Example from "@/app/playground/_components/Example";
import WarningTextPlayground from "@/app/playground/components/warning-text/WarningTextPlayground";

export const metadata: Metadata = {
  title: "Warning Text - GOV.UK Playground",
};

export default function WarningTextPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Warning text</h1>
      <p className="govuk-body-l">
        Warning text warns users of something important they need to know
        before proceeding, marked with a bold exclamation icon.
      </p>

      <Example title="Default">
        <WarningText text="You can be fined up to £5,000 if you don’t register." />
      </Example>

      <Example
        title="With custom icon fallback text"
        description="The visually hidden text read out instead of the exclamation mark icon."
      >
        <WarningText
          iconFallbackText="Important"
          text="You can be fined up to £5,000 if you don’t register."
        />
      </Example>

      <Example title="With HTML content" description="The warning content can be any markup, not just plain text.">
        <WarningText html={<span>Some custom warning text</span>} />
      </Example>

      <WarningTextPlayground />
    </>
  );
}
