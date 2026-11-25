import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type BreadcrumbsItem = TextOrHtml & {
  href?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type BreadcrumbsProps = CommonProps & {
  items: BreadcrumbsItem[];
  collapseOnMobile?: boolean;
  labelText?: string;
};

export default function Breadcrumbs({
  items,
  collapseOnMobile,
  labelText = "Breadcrumb",
  classes,
  attributes,
}: BreadcrumbsProps) {
  return (
    <nav
      className={govukClasses(
        collapseOnMobile
          ? "govuk-breadcrumbs govuk-breadcrumbs--collapse-on-mobile"
          : "govuk-breadcrumbs",
        classes,
      )}
      aria-label={labelText}
      {...attributes}
    >
      <ol className="govuk-breadcrumbs__list">
        {items.map((item, index) =>
          item.href ? (
            <li key={index} className="govuk-breadcrumbs__list-item">
              <a
                className="govuk-breadcrumbs__link"
                href={item.href}
                {...item.attributes}
              >
                {item.html ?? item.text}
              </a>
            </li>
          ) : (
            <li
              key={index}
              className="govuk-breadcrumbs__list-item"
              aria-current="page"
            >
              {item.html ?? item.text}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
