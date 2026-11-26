import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type WarningTextProps = CommonPropsTextOrHtml & {
  iconFallbackText?: string;
};

export default function WarningText({
  classes,
  attributes,
  iconFallbackText = "Warning",
  text,
  html,
}: WarningTextProps) {
  return (
    <div className={govukClasses("govuk-warning-text", classes)} {...attributes}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">{iconFallbackText}</span>
        {html ?? text}
      </strong>
    </div>
  );
}
