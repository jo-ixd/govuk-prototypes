import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Textarea from "@/app/components/govuk/Textarea";
import Example from "@/app/playground/_components/Example";
import TextareaPlayground from "@/app/playground/components/textarea/TextareaPlayground";

export const metadata: Metadata = {
  title: "Textarea - GOV.UK Playground",
};

export default function TextareaPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Textarea</h1>
      <p className="govuk-body-l">
        Textareas allow users to enter multiple lines of text.
      </p>

      <Example title="Default" description="A textarea with a label, five rows tall.">
        <Textarea label={{ text: "Can you provide more detail?" }} name="more-detail" />
      </Example>

      <Example
        title="With hint"
        description="A hint below the label, linked with aria-describedby."
      >
        <Textarea
          id="more-detail"
          name="with-hint"
          label={{ text: "Can you provide more detail?" }}
          hint={{
            text: "Don't include personal or financial information, eg your National Insurance number or credit card details.",
          }}
        />
      </Example>

      <Example
        title="With error message"
        description="An error message displayed above the textarea, which gets the error style."
      >
        <Textarea
          id="no-ni-reason"
          name="with-error"
          label={{ text: "Why can’t you provide a National Insurance number?" }}
          errorMessage={{ text: "You must provide an explanation" }}
        />
      </Example>

      <Example
        title="With default value"
        description="Pre-filled with an initial value spread over several lines."
      >
        <Textarea
          id="full-address"
          name="with-default-value"
          label={{ text: "Full address" }}
          defaultValue={"221B Baker Street\nLondon\nNW1 6XE\n"}
        />
      </Example>

      <Example
        title="With custom rows"
        description="The rows prop controls how many lines are visible."
      >
        <Textarea
          id="full-address-rows"
          name="custom-rows"
          rows={8}
          label={{ text: "Full address" }}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <Textarea
          id="textarea-with-page-heading"
          name="address"
          label={{
            text: "Full address",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
        />
      </Example>

      <TextareaPlayground />
    </>
  );
}
