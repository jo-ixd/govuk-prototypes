import type { ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type PaginationItem = {
  number?: string | number;
  visuallyHiddenText?: string;
  href?: string;
  current?: boolean;
  ellipsis?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type PaginationLink = {
  text?: string;
  html?: ReactNode;
  labelText?: string;
  href: string;
  attributes?: Record<string, string | number | boolean>;
};

export type PaginationProps = CommonProps & {
  items?: PaginationItem[];
  previous?: PaginationLink;
  next?: PaginationLink;
  landmarkLabel?: string;
};

const ARROW_PREV = (
  <svg
    className="govuk-pagination__icon govuk-pagination__icon--prev"
    xmlns="http://www.w3.org/2000/svg"
    height="13"
    width="15"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 15 13"
  >
    <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
  </svg>
);

const ARROW_NEXT = (
  <svg
    className="govuk-pagination__icon govuk-pagination__icon--next"
    xmlns="http://www.w3.org/2000/svg"
    height="13"
    width="15"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 15 13"
  >
    <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
  </svg>
);

export default function Pagination({
  items,
  previous,
  next,
  landmarkLabel = "Pagination",
  classes,
  attributes,
}: PaginationProps) {
  const blockLevel = !items && Boolean(previous || next);

  function arrowLink(link: PaginationLink, type: "prev" | "next") {
    const arrow = type === "prev" ? ARROW_PREV : ARROW_NEXT;
    const defaultTitle =
      type === "prev" ? (
        <>
          Previous<span className="govuk-visually-hidden"> page</span>
        </>
      ) : (
        <>
          Next<span className="govuk-visually-hidden"> page</span>
        </>
      );

    return (
      <div className={`govuk-pagination__${type}`}>
        <a
          className="govuk-link govuk-pagination__link"
          href={link.href}
          rel={type}
          {...link.attributes}
        >
          {(blockLevel || type === "prev") && arrow}
          <span
            className={
              blockLevel && !link.labelText
                ? "govuk-pagination__link-title govuk-pagination__link-title--decorated"
                : "govuk-pagination__link-title"
            }
          >
            {link.html ?? link.text ?? defaultTitle}
          </span>
          {Boolean(link.labelText && blockLevel) && (
            <>
              <span className="govuk-visually-hidden">:</span>
              <span className="govuk-pagination__link-label">
                {link.labelText}
              </span>
            </>
          )}
          {!blockLevel && type === "next" && arrow}
        </a>
      </div>
    );
  }

  return (
    <nav
      className={govukClasses(
        blockLevel
          ? "govuk-pagination govuk-pagination--block"
          : "govuk-pagination",
        classes,
      )}
      aria-label={landmarkLabel}
      {...attributes}
    >
      {previous && previous.href ? arrowLink(previous, "prev") : null}

      {items ? (
        <ul className="govuk-pagination__list">
          {items.map((item, index) =>
            Object.keys(item).length ? (
              <li
                key={index}
                className={`govuk-pagination__item${item.current ? " govuk-pagination__item--current" : ""}${item.ellipsis ? " govuk-pagination__item--ellipsis" : ""}`}
              >
                {item.ellipsis ? (
                  "\u22EF"
                ) : (
                  <a
                    className="govuk-link govuk-pagination__link"
                    href={item.href}
                    aria-label={item.visuallyHiddenText ?? `Page ${item.number}`}
                    aria-current={item.current ? "page" : null}
                    {...item.attributes}
                  >
                    {item.number}
                  </a>
                )}
              </li>
            ) : null,
          )}
        </ul>
      ) : null}

      {next && next.href ? arrowLink(next, "next") : null}
    </nav>
  );
}
