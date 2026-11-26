import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import CharacterCount from "@/app/components/govuk/CharacterCount";
import Example from "@/app/playground/_components/Example";
import CharacterCountPlayground from "@/app/playground/components/character-count/CharacterCountPlayground";

export const metadata: Metadata = {
  title: "Character count - GOV.UK Playground",
};

export default function CharacterCountPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Character count</h1>
      <p className="govuk-body-l">
        Character counts tell users how much content they can enter in a
        textarea, counting either characters or words.
      </p>

      <Example
        title="Default"
        description="A textarea with a maximum of 10 characters, counted by the govuk-frontend JavaScript."
      >
        <CharacterCount
          name="more-detail"
          maxlength={10}
          label={{ text: "Can you provide more detail?" }}
        />
      </Example>

      <Example
        title="With hint"
        description="A hint below the label alongside the live count message."
      >
        <CharacterCount
          id="with-hint"
          name="with-hint"
          maxlength={10}
          label={{ text: "Can you provide more detail?" }}
          hint={{
            text: "Don't include personal or financial information, eg your National Insurance number or credit card details.",
          }}
        />
      </Example>

      <Example
        title="With hint and error"
        description="Hint and error combined; the count message is referenced first in aria-describedby."
      >
        <CharacterCount
          id="with-error"
          name="with-error"
          maxlength={10}
          label={{ text: "Can you provide more detail?" }}
          hint={{
            text: "Don't include personal or financial information, eg your National Insurance number or credit card details.",
          }}
          errorMessage={{ text: "Please provide more detail" }}
        />
      </Example>

      <Example
        title="With default value exceeding limit"
        description="The initial value is over the limit, so the JavaScript shows the over-limit message."
      >
        <CharacterCount
          id="exceeding-characters"
          name="exceeding"
          maxlength={10}
          defaultValue={"221B Baker Street\nLondon\nNW1 6XE\n"}
          label={{ text: "Full address" }}
          errorMessage={{
            text: "Please do not exceed the maximum allowed limit",
          }}
        />
      </Example>

      <Example
        title="With custom rows"
        description="The rows prop controls how many lines are visible."
      >
        <CharacterCount
          id="custom-rows"
          name="custom"
          rows={8}
          maxlength={10}
          label={{ text: "Full address" }}
        />
      </Example>

      <Example
        title="With word count"
        description="Counting words instead of characters with maxwords."
      >
        <CharacterCount
          id="word-count"
          name="word-count"
          maxwords={10}
          label={{ text: "Full address" }}
        />
      </Example>

      <Example
        title="With threshold"
        description="The count message only appears once 75% of the limit is used."
      >
        <CharacterCount
          id="with-threshold"
          name="with-threshold"
          maxlength={10}
          threshold={75}
          label={{ text: "Full address" }}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <CharacterCount
          id="textarea-with-page-heading"
          name="address"
          maxlength={10}
          label={{
            text: "Full address",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
        />
      </Example>

      <CharacterCountPlayground />
    </>
  );
}
