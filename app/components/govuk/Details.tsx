import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export interface DetailsProps extends CommonProps, TextOrHtml {
  open?: boolean;
  summaryText?: string;
  summaryHtml?: ReactNode;
}

export default function Details({
  classes,
  attributes,
  id,
  open,
  summaryText,
  summaryHtml,
  text,
  html,
}: DetailsProps) {
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
