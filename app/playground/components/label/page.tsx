import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Example from "@/app/playground/_components/Example";
import Label from "@/app/components/govuk/Label";
import LabelPlayground from "@/app/playground/components/label/LabelPlayground";

export const metadata: Metadata = { title: "Label - GOV.UK Playground" };

export default function LabelPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Label</h1>
      <p className="govuk-body-l">
        The question a form field answers, visually tied to the field it
        belongs to.
      </p>

      <Example title="Label with a text input" description="Labels are tied to a field with the htmlFor prop.">
        <Label text="National Insurance number" htmlFor="label-example-ni" />
        <input
          className="govuk-input"
          id="label-example-ni"
          name="national-insurance-number"
          type="text"
        />
      </Example>

      <Example title="Label as a page heading" description="On question pages the label is usually the page heading.">
        <Label text="What is your National Insurance number?" isPageHeading />
      </Example>

      <Example title="Small label" description="Extra context sometimes needs a smaller, bold label above the main one.">
        <Label
          text="Full company name"
          classes="govuk-label--s"
          htmlFor="label-example-company"
        />
        <input
          className="govuk-input"
          id="label-example-company"
          name="company-name"
          type="text"
        />
      </Example>

      <LabelPlayground />
    </>
  );
}
