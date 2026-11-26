import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";
import Radios from "@/app/components/govuk/Radios";
import Example from "@/app/playground/_components/Example";
import QuestionPageDemo from "@/app/playground/patterns/question-pages/QuestionPageDemo";

export const metadata: Metadata = {
  title: "Question pages - GOV.UK Patterns",
};

export default function QuestionPagesPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Question pages</h1>
      <p className="govuk-body-l">
        This pattern explains when to use question pages and what elements they
        need to include. Start with one question per page so users can focus on
        the specific question and its answer.
      </p>

      <Example
        title="Question page with a label as the page heading"
        description="A text input question page. Setting the label as the page heading means screen reader users only hear the question once. Every question page needs a back link, a page heading and a Continue button (labelled 'Continue', not 'Next', and aligned to the left)."
      >
        <BackLink text="Back" href="#" />
        <form noValidate>
          <Input
            id="postcode"
            name="postcode"
            label={{
              text: "What is your home postcode?",
              isPageHeading: true,
              classes: "govuk-label--l",
            }}
            classes="govuk-input--width-10"
            autoComplete="postal-code"
          />
          <Button text="Continue" />
        </form>
      </Example>

      <Example
        title="Question page with a legend as the page heading"
        description="A radios question page. The legend is set as the page heading and a single short hint sentence (with no full stop) helps users answer. Use hint text for information that helps the majority of users - for longer explanations, use a statement heading with body text instead."
      >
        <BackLink text="Back" href="#" />
        <form noValidate>
          {/* The working demo below repeats this question, so the static
              example needs its own id prefix to keep every id unique. */}
          <Radios
            name="where-do-you-live"
            idPrefix="where-do-you-live-example"
            fieldset={{
              legend: {
                text: "Where do you live?",
                isPageHeading: true,
                classes: "govuk-fieldset__legend--l",
              },
            }}
            hint={{
              text: "If you live in more than one country, select the one you live in most of the time",
            }}
            items={[
              { value: "england", text: "England" },
              { value: "scotland", text: "Scotland" },
              { value: "wales", text: "Wales" },
              { value: "northern-ireland", text: "Northern Ireland" },
            ]}
          />
          <Button text="Continue" />
        </form>
      </Example>

      <Example
        title="Working question page with validation"
        description="A complete question page. Submitting without selecting an answer shows an error summary (with keyboard focus moved to it) and an error message next to the radios. A valid answer shows a success notification banner."
      >
        <QuestionPageDemo />
      </Example>
    </>
  );
}
