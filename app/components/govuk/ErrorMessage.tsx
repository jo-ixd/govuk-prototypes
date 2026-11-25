import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type ErrorMessageProps = CommonPropsTextOrHtml & {
  id?: string;
  visuallyHiddenText?: string | null;
};

export default function ErrorMessage({
  id,
  classes,
  attributes,
  visuallyHiddenText = "Error",
  text,
  html,
}: ErrorMessageProps) {
  return (
    <p
      id={id}
      className={govukClasses("govuk-error-message", classes)}
      {...attributes}
    >
      {visuallyHiddenText === null ? null : (
        <span className="govuk-visually-hidden">{visuallyHiddenText}: </span>
      )}
      {html ?? text}
    </p>
  );
}
