import { type CommonProps, type TextOrHtml } from "./types";

type AccordionItem = {
  heading: { text: string; html?: never } | { html: React.ReactNode; text?: never };
  summary?: { text: string; html?: never } | { html: React.ReactNode; text?: never };
  expanded?: boolean;
} & TextOrHtml;

export type AccordionProps = CommonProps & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  rememberExpanded?: boolean;
  items: AccordionItem[];
};

export default function Accordion(props: AccordionProps) {
  const { classes, attributes, id, headingLevel = 2, rememberExpanded, items } = props;
  const Heading = `h${headingLevel}` as const;

  return (
    <div
      className={classes ? `govuk-accordion ${classes}` : "govuk-accordion"}
      data-module="govuk-accordion"
      id={id}
      data-remember-expanded={rememberExpanded}
      {...attributes}
    >
      {items.map((item, index) => {
        const heading = "html" in item.heading ? item.heading.html : item.heading.text;
        const content = "html" in item ? item.html : item.text;

        return (
          <div
            key={index}
            className={
              item.expanded
                ? "govuk-accordion__section govuk-accordion__section--expanded"
                : "govuk-accordion__section"
            }
          >
            <div className="govuk-accordion__section-header">
              <Heading className="govuk-accordion__section-heading">
                <span className="govuk-accordion__section-button" id={`${id}-heading-${index + 1}`}>
                  {heading}
                </span>
              </Heading>
              {item.summary && (
                <div
                  className="govuk-accordion__section-summary govuk-body"
                  id={`${id}-summary-${index + 1}`}
                >
                  {"html" in item.summary ? item.summary.html : item.summary.text}
                </div>
              )}
            </div>
            <div id={`${id}-content-${index + 1}`} className="govuk-accordion__section-content">
              {"html" in item ? content : <p className="govuk-body">{content}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
