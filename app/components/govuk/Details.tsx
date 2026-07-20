import { useId, type ReactNode } from "react";
import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type DetailsProps = CommonPropsTextOrHtml & {
  open?: boolean;
  summaryText?: string;
  summaryHtml?: ReactNode;
};

export default function Details({
  classes,
  attributes,
  open,
  summaryText,
  summaryHtml,
  text,
  html,
}: DetailsProps) {
  const id = useId();

  return (
    <details
      id={id}
      className={govukClasses("govuk-details", classes)}
      {...attributes}
      open={open}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {summaryHtml ?? summaryText}
        </span>
      </summary>
      <div className="govuk-details__text">{html ?? text}</div>
    </details>
  );
}
