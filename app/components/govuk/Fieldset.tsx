import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type FieldsetLegend = TextOrHtml & {
  classes?: string;
  isPageHeading?: boolean;
};

export type FieldsetProps = CommonProps & {
  describedBy?: string;
  legend?: FieldsetLegend;
  role?: string;
  children?: ReactNode;
};

export default function Fieldset({
  describedBy,
  legend,
  role,
  classes,
  attributes,
  children,
}: FieldsetProps) {
  const legendContent = legend ? legend.html ?? legend.text : null;

  return (
    <fieldset
      className={govukClasses("govuk-fieldset", classes)}
      role={role}
      {...(describedBy ? { "aria-describedby": describedBy } : {})}
      {...attributes}
    >
      {legend && legendContent ? (
        <legend
          className={govukClasses("govuk-fieldset__legend", legend.classes)}
        >
          {legend.isPageHeading ? (
            <h1 className="govuk-fieldset__heading">{legendContent}</h1>
          ) : (
            legendContent
          )}
        </legend>
      ) : null}
      {children}
    </fieldset>
  );
}
