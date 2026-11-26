import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Example from "@/app/playground/_components/Example";
import Hint from "@/app/components/govuk/Hint";
import HintPlayground from "@/app/playground/components/hint/HintPlayground";

export const metadata: Metadata = { title: "Hint - GOV.UK Playground" };

export default function HintPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Hint</h1>
      <p className="govuk-body-l">
        Extra help text that makes a form field easier to understand.
      </p>

      <Example
        title="Default hint"
        description="Hints are usually placed between the label and the field, and are wired up with aria-describedby."
      >
        <Hint text="It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’." />
      </Example>

      <Example title="Hint with an id" description="Give hints an id so a field can describe itself with it.">
        <Hint id="hint-example-id" text="For example, 07700 900462" />
      </Example>

      <HintPlayground />
    </>
  );
}
