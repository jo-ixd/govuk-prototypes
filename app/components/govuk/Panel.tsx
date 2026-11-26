import type { ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type PanelAction = {
  text: string;
  type?: "button" | "submit";
  href?: string;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type PanelActions = {
  items?: PanelAction[];
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type PanelProps = CommonProps & {
  titleText?: string;
  titleHtml?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  text?: string;
  html?: ReactNode;
  actions?: PanelActions;
};

export default function Panel({
  titleText,
  titleHtml,
  headingLevel = 1,
  text,
  html,
  actions,
  classes,
  attributes,
}: PanelProps) {
  const Heading = `h${headingLevel}` as const;
  const isInterruption = Boolean(
    classes && classes.includes("govuk-panel--interruption"),
  );

  function renderAction(action: PanelAction, index: number) {
    if (action.href && action.type !== "button") {
      return (
        <a
          key={index}
          className={govukClasses("govuk-link govuk-link--inverse", action.classes)}
          href={action.href}
          {...action.attributes}
        >
          {action.text}
        </a>
      );
    }

    if (action.href) {
      return (
        <a
          key={index}
          href={action.href}
          role="button"
          draggable={false}
          className={govukClasses("govuk-button govuk-button--inverse", action.classes)}
          data-module="govuk-button"
          {...action.attributes}
        >
          {action.text}
        </a>
      );
    }

    return (
      <button
        key={index}
        type={action.type ?? "button"}
        className={govukClasses("govuk-button govuk-button--inverse", action.classes)}
        data-module="govuk-button"
        {...action.attributes}
      >
        {action.text}
      </button>
    );
  }

  return (
    <div
      className={govukClasses(
        isInterruption
          ? "govuk-panel"
          : "govuk-panel govuk-panel--confirmation",
        classes,
      )}
      {...attributes}
    >
      <Heading className="govuk-panel__title">{titleHtml ?? titleText}</Heading>
      {(html ?? text) && (
        <div className="govuk-panel__body">{html ?? text}</div>
      )}
      {isInterruption && actions ? (
        <div
          className={govukClasses("govuk-panel__actions", actions.classes)}
          {...actions.attributes}
        >
          {actions.items?.length ? (
            <div className="govuk-button-group">
              {actions.items.map((action, index) => renderAction(action, index))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
