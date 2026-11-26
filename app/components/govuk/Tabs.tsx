import { useId } from "react";
import type { CommonProps, CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type TabsPanel = CommonPropsTextOrHtml;

export type TabsItem = {
  id?: string;
  label: string;
  attributes?: Record<string, string | number | boolean>;
  panel: TabsPanel;
};

export type TabsProps = CommonProps & {
  id?: string;
  idPrefix?: string;
  title?: string;
  items: TabsItem[];
};

export default function Tabs({
  id,
  idPrefix,
  title,
  items,
  classes,
  attributes,
}: TabsProps) {
  const generatedPrefix = useId();
  const prefix = idPrefix ?? generatedPrefix;

  return (
    <div
      id={id}
      className={govukClasses("govuk-tabs", classes)}
      data-module="govuk-tabs"
      {...attributes}
    >
      <h2 className="govuk-tabs__title">{title ?? "Contents"}</h2>
      {items.length > 0 && (
        <>
          <ul className="govuk-tabs__list">
            {items.map((item, index) => {
              const panelId = item.id ?? `${prefix}-${index + 1}`;
              return (
                <li
                  key={panelId}
                  className={
                    index === 0
                      ? "govuk-tabs__list-item govuk-tabs__list-item--selected"
                      : "govuk-tabs__list-item"
                  }
                >
                  <a
                    className="govuk-tabs__tab"
                    href={`#${panelId}`}
                    {...item.attributes}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          {items.map((item, index) => {
            const panelId = item.id ?? `${prefix}-${index + 1}`;
            return (
              <div
                key={panelId}
                id={panelId}
                className={
                  index === 0
                    ? "govuk-tabs__panel"
                    : "govuk-tabs__panel govuk-tabs__panel--hidden"
                }
                {...item.panel.attributes}
              >
                {item.panel.html ?? (
                  <p className="govuk-body">{item.panel.text}</p>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
