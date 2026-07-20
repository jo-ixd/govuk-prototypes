import { type CommonProps, type TextOrHtml } from "./types";

interface AccordionItem {
  heading: TextOrHtml;
  summary?: TextOrHtml;
  content: TextOrHtml;
  expanded?: boolean;
}

export interface AccordionProps extends CommonProps {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  rememberExpanded?: boolean;
  items: AccordionItem[];
}

export default function Accordion({
  classes,
  attributes,
  id,
  headingLevel = 2,
  rememberExpanded,
  items,
}: AccordionProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div
      className={classes ? `govuk-accordion ${classes}` : "govuk-accordion"}
      data-module="govuk-accordion"
      id={id}
      data-remember-expanded={rememberExpanded}
      {...attributes}
    >
      {items.map((item, index) => (
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
              <span
                className="govuk-accordion__section-button"
                id={`${id}-heading-${index + 1}`}
              >
                {item.heading.html ?? item.heading.text}
              </span>
            </Heading>
            {item.summary && (
              <div
                className="govuk-accordion__section-summary govuk-body"
                id={`${id}-summary-${index + 1}`}
              >
                {item.summary.html ?? item.summary.text}
              </div>
            )}
          </div>
          <div
            id={`${id}-content-${index + 1}`}
            className="govuk-accordion__section-content"
          >
            {item.content.html ? (
              item.content.html
            ) : (
              <p className="govuk-body">{item.content.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
