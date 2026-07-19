import { type CommonProps, type TextOrHtml } from "./types";

export interface DetailsProps extends CommonProps, TextOrHtml {
  open?: boolean;
  summaryText: string | null;
  summaryHtml?: React.ReactNode;
}

export default function Details(props: DetailsProps) {
  const { classes, attributes, id, open, summaryText, summaryHtml, text, html } = props;

  return (
    <details
      id={id}
      className={classes ? `govuk-details ${classes}` : "govuk-details"}
      {...attributes}
      open={open}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {summaryHtml ? summaryHtml : summaryText}
        </span>
      </summary>
      <div className="govuk-details__text">{html ? html : text}</div>
    </details>
  );
}
