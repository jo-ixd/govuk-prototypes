import { type CommonProps, type TextOrHtml } from "./types";

export type DetailsProps = CommonProps & {
  open?: boolean;
} & (
    | { summaryText: string; summaryHtml?: never }
    | { summaryHtml: React.ReactNode; summaryText?: never }
  ) &
  TextOrHtml;

export default function Details(props: DetailsProps) {
  const { classes, attributes, id, open } = props;
  const summary = "summaryHtml" in props ? props.summaryHtml : props.summaryText;

  return (
    <details
      id={id}
      className={classes ? `govuk-details ${classes}` : "govuk-details"}
      {...attributes}
      open={open}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{"html" in props ? props.html : props.text}</div>
    </details>
  );
}
