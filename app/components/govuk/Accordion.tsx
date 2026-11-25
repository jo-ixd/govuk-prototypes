import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type AccordionItem = {
  heading: TextOrHtml;
  summary?: TextOrHtml;
  content: TextOrHtml;
  expanded?: boolean;
};

export type AccordionProps = CommonProps & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  rememberExpanded?: boolean;
  hideAllSectionsText?: string;
  hideSectionText?: string;
  hideSectionAriaLabelText?: string;
  showAllSectionsText?: string;
  showSectionText?: string;
  showSectionAriaLabelText?: string;
  items: AccordionItem[];
};

// Renders translated text into `data-i18n.*` attributes, mirroring the
// govukI18nAttributes njk macro.
function i18nMessageAttributes(
  key: string,
  message?: string,
): Record<string, string> {
  return message ? { [`data-i18n.${key}`]: message } : {};
}

export default function Accordion({
  classes,
  attributes,
  headingLevel = 2,
  rememberExpanded,
  hideAllSectionsText,
  hideSectionText,
  hideSectionAriaLabelText,
  showAllSectionsText,
  showSectionText,
  showSectionAriaLabelText,
  items,
}: AccordionProps) {
  const Heading = `h${headingLevel}` as const;
  const id = useId();

  // Translation options are handed to JavaScript through `data-i18n.*`
  // attributes on the root element, in the same order as the njk template.
  const i18nAttributes: Record<string, string> = {
    ...i18nMessageAttributes("hide-all-sections", hideAllSectionsText),
    ...i18nMessageAttributes("hide-section", hideSectionText),
    ...i18nMessageAttributes(
      "hide-section-aria-label",
      hideSectionAriaLabelText,
    ),
    ...i18nMessageAttributes("show-all-sections", showAllSectionsText),
    ...i18nMessageAttributes("show-section", showSectionText),
    ...i18nMessageAttributes(
      "show-section-aria-label",
      showSectionAriaLabelText,
    ),
  };

  return (
    <div
      className={govukClasses("govuk-accordion", classes)}
      data-module="govuk-accordion"
      id={id}
      {...i18nAttributes}
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
            {(item.summary?.html ?? item.summary?.text) && (
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
            {item.content.html ?? (
              <p className="govuk-body">{item.content.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
