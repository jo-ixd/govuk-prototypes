import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type LabelProps = CommonPropsTextOrHtml & {
  htmlFor?: string;
  isPageHeading?: boolean;
};

export default function Label({
  classes,
  attributes,
  htmlFor,
  isPageHeading,
  text,
  html,
}: LabelProps) {
  const label = (
    <label
      className={govukClasses("govuk-label", classes)}
      htmlFor={htmlFor}
      {...attributes}
    >
      {html ?? text}
    </label>
  );

  if (isPageHeading) {
    return <h1 className="govuk-label-wrapper">{label}</h1>;
  }

  return label;
}
