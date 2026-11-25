import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Tag from "@/app/components/govuk/Tag";
import Example from "@/app/playground/_components/Example";
import TagPlayground from "./TagPlayground";

const COLOUR_VARIANTS: { text: string; classes?: string }[] = [
  { text: "Alpha" },
  { text: "Grey", classes: "govuk-tag--grey" },
  { text: "Teal", classes: "govuk-tag--teal" },
  { text: "Green", classes: "govuk-tag--green" },
  { text: "Purple", classes: "govuk-tag--purple" },
  { text: "Magenta", classes: "govuk-tag--magenta" },
  { text: "Red", classes: "govuk-tag--red" },
  { text: "Orange", classes: "govuk-tag--orange" },
  { text: "Yellow", classes: "govuk-tag--yellow" },
];

export const metadata: Metadata = {
  title: "Tag - GOV.UK Playground",
};

export default function TagPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Tag</h1>
      <p className="govuk-body-l">
        Tags visually label content with a short piece of text, such as a
        status, and come in several colours.
      </p>

      <Example
        title="Colour variants"
        description="Colours are applied with modifier classes such as govuk-tag--grey."
      >
        <div className="govuk-grid-row">
          {COLOUR_VARIANTS.map((variant) => (
            <div
              key={variant.classes ?? "default"}
              className="govuk-grid-column-one-third"
            >
              <Tag text={variant.text} classes={variant.classes} />
            </div>
          ))}
        </div>
      </Example>

      <Example title="With HTML content" description="The tag content can be any markup, not just plain text.">
        <Tag html={<span>Alpha</span>} />
      </Example>

      <TagPlayground />
    </>
  );
}
