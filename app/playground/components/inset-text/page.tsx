import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import InsetText from "@/app/components/govuk/InsetText";
import WarningText from "@/app/components/govuk/WarningText";
import Example from "@/app/playground/_components/Example";
import InsetTextPlayground from "@/app/playground/components/inset-text/InsetTextPlayground";

export const metadata: Metadata = {
  title: "InsetText - GOV.UK Playground",
};

export default function InsetTextPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Inset text</h1>
      <p className="govuk-body-l">
        Inset text distinguishes content from surrounding copy, often used to
        highlight important information such as callouts and key facts.
      </p>

      <Example title="Default">
        <InsetText text="It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application." />
      </Example>

      <Example
        title="With HTML content"
        description="Rich content, including other components, can sit inside the inset text."
      >
        <InsetText
          html={
            <>
              <p className="govuk-body">
                It can take up to 8 weeks to register a lasting power of
                attorney if there are no mistakes in the application.
              </p>
              <WarningText text="You can be fined up to £5,000 if you don’t register." />
              <p className="govuk-body">
                It can take up to 8 weeks to register a lasting power of
                attorney if there are no mistakes in the application.
              </p>
            </>
          }
        />
      </Example>

      <InsetTextPlayground />
    </>
  );
}
