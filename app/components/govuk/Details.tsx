import { type CommonProps, type TextOrHtml } from "./types";

export interface DetailsProps extends CommonProps, TextOrHtml {
  open?: boolean;
  summaryText?: string;
  summaryHtml?: React.ReactNode;
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
      className={classes ? `govuk-details ${classes}` : "govuk-details"}
      {...attributes}
      open={open}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {summaryHtml ?? summaryText ?? ""}
        </span>
      </summary>
      <div className="govuk-details__text">{html ?? text ?? ""}</div>
    </details>
  );
}
