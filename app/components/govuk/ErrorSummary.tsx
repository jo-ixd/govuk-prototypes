import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type ErrorSummaryListItem = TextOrHtml & {
  href?: string;
  attributes?: Record<string, string | number | boolean>;
  visuallyHiddenText?: string;
};

export type ErrorSummaryProps = CommonProps & {
  titleText?: string;
  titleHtml?: ReactNode;
  description?: TextOrHtml;
  errorList?: ErrorSummaryListItem[];
  disableAutoFocus?: boolean;
};

export default function ErrorSummary({
  classes,
  attributes,
  titleText = "There is a problem",
  titleHtml,
  description,
  errorList,
  disableAutoFocus,
}: ErrorSummaryProps) {
  return (
    <div
      className={govukClasses("govuk-error-summary", classes)}
      data-disable-auto-focus={disableAutoFocus}
      data-module="govuk-error-summary"
      {...attributes}
    >
      <div role="alert">
        <h2 className="govuk-error-summary__title">
          {titleHtml ?? titleText}
        </h2>
        <div className="govuk-error-summary__body">
          {description && <p>{description.html ?? description.text}</p>}
          {errorList && errorList.length > 0 && (
            <ul className="govuk-list govuk-error-summary__list">
              {errorList.map((item, index) => {
                const content = (
                  <>
                    {item.visuallyHiddenText && (
                      <span className="govuk-visually-hidden">
                        {item.visuallyHiddenText}:{" "}
                      </span>
                    )}
                    {item.html ?? item.text}
                  </>
                );
                return (
                  <li key={index}>
                    {item.href ? (
                      <a href={item.href} {...item.attributes}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
