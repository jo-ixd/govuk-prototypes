import type { ReactNode } from "react";
import type { CommonProps, CommonPropsTextOrHtml, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type TaskListTitle = TextOrHtml & {
  classes?: string;
};

export type TaskListTag = CommonPropsTextOrHtml;

export type TaskListStatus = CommonProps & {
  tag?: TaskListTag;
  text?: string;
  html?: ReactNode;
};

export type TaskListItem = CommonProps & {
  title: TaskListTitle;
  href?: string;
  hint?: TextOrHtml;
  status: TaskListStatus;
};

export type TaskListProps = CommonProps & {
  items: TaskListItem[];
  idPrefix?: string;
};

export default function TaskList({
  items,
  idPrefix = "task-list",
  classes,
  attributes,
}: TaskListProps) {
  return (
    <ul
      className={govukClasses("govuk-task-list", classes)}
      {...attributes}
    >
      {items.map((item, index) => {
        const hintId = `${idPrefix}-${index + 1}-hint`;
        const statusId = `${idPrefix}-${index + 1}-status`;
        return (
          <li
            key={index}
            className={govukClasses(
              item.href
                ? "govuk-task-list__item govuk-task-list__item--with-link"
                : "govuk-task-list__item",
              item.classes,
            )}
          >
            <div className="govuk-task-list__name-and-hint">
              {item.href ? (
                <a
                  className={govukClasses(
                    "govuk-link govuk-task-list__link",
                    item.title.classes,
                  )}
                  href={item.href}
                  aria-describedby={item.hint ? `${hintId} ${statusId}` : statusId}
                >
                  {item.title.html ?? item.title.text}
                </a>
              ) : (
                <div className={item.title.classes}>
                  {item.title.html ?? item.title.text}
                </div>
              )}
              {item.hint && (
                <div id={hintId} className="govuk-task-list__hint">
                  {item.hint.html ?? item.hint.text}
                </div>
              )}
            </div>
            <div
              className={govukClasses("govuk-task-list__status", item.status.classes)}
              id={statusId}
            >
              {item.status.tag ? (
                <strong
                  className={govukClasses("govuk-tag", item.status.tag.classes)}
                  {...item.status.tag.attributes}
                >
                  {item.status.tag.html ?? item.status.tag.text}
                </strong>
              ) : (
                item.status.html ?? item.status.text
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
