import { useId, type ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type ServiceNavigationItem = {
  text?: string;
  html?: ReactNode;
  href?: string;
  current?: boolean;
  active?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type ServiceNavigationProps = CommonProps & {
  ariaLabel?: string;
  menuButtonText?: string;
  menuButtonLabel?: string;
  navigationLabel?: string;
  navigationId?: string;
  navigationClasses?: string;
  collapseNavigationOnMobile?: boolean;
  serviceName?: string;
  serviceUrl?: string;
  navigation?: ServiceNavigationItem[];
  children?: ReactNode;
};

export default function ServiceNavigation({
  ariaLabel,
  menuButtonText,
  menuButtonLabel,
  navigationLabel,
  navigationId,
  navigationClasses,
  collapseNavigationOnMobile,
  serviceName,
  serviceUrl,
  navigation,
  children,
  classes,
  attributes,
}: ServiceNavigationProps) {
  const generatedId = useId();
  const id = navigationId ?? generatedId;
  const menuText = menuButtonText ?? "Menu";
  const items = (navigation ?? []).filter(Boolean);
  const collapseNavigation = collapseNavigationOnMobile ?? items.length > 1;
  const menuButtonAriaLabel =
    menuButtonLabel && menuButtonLabel !== menuText ? menuButtonLabel : "";
  const hasNavigation = items.length > 0 || Boolean(children);

  const inner = (
    <div className="govuk-width-container">
      <div className="govuk-service-navigation__container">
        {serviceName && (
          <span className="govuk-service-navigation__service-name">
            {serviceUrl ? (
              <a
                href={serviceUrl}
                className="govuk-service-navigation__link"
              >
                {serviceName}
              </a>
            ) : (
              <span className="govuk-service-navigation__text">
                {serviceName}
              </span>
            )}
          </span>
        )}
        {hasNavigation && (
          <nav
            aria-label={navigationLabel ?? menuText}
            className={govukClasses(
              "govuk-service-navigation__wrapper",
              navigationClasses,
            )}
          >
            {collapseNavigation && (
              <button
                type="button"
                className="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
                aria-controls={id}
                {...(menuButtonAriaLabel
                  ? { "aria-label": menuButtonAriaLabel }
                  : {})}
                hidden
                aria-hidden="true"
              >
                {menuText}
              </button>
            )}
            <ul className="govuk-service-navigation__list" id={id}>
              {children
                ? children
                : items.map((item, index) => {
                    const isActive = item.active || item.current;
                    const ariaCurrent: "page" | "true" = item.current
                      ? "page"
                      : "true";
                    const content = item.html ?? item.text;
                    const itemClasses = govukClasses(
                      "govuk-service-navigation__item",
                      isActive ? "govuk-service-navigation__item--active" : "",
                    );

                    return (
                      <li key={index} className={itemClasses}>
                        {item.href ? (
                          <a
                            className="govuk-service-navigation__link"
                            href={item.href}
                            {...(isActive
                              ? { "aria-current": ariaCurrent }
                              : {})}
                            {...item.attributes}
                          >
                            {isActive ? (
                              <strong className="govuk-service-navigation__active-fallback">
                                {content}
                              </strong>
                            ) : (
                              content
                            )}
                          </a>
                        ) : (item.html ?? item.text) ? (
                          <span
                            className="govuk-service-navigation__text"
                            {...(isActive
                              ? { "aria-current": ariaCurrent }
                              : {})}
                          >
                            {isActive ? (
                              <strong className="govuk-service-navigation__active-fallback">
                                {content}
                              </strong>
                            ) : (
                              content
                            )}
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );

  // If a service name is included, we use a <section> element with an
  // aria-label to create a containing landmark region. Otherwise, the <nav>
  // in the inner content can do the job just fine by itself.
  if (serviceName) {
    return (
      <section
        aria-label={ariaLabel ?? "Service information"}
        className={govukClasses("govuk-service-navigation", classes)}
        data-module="govuk-service-navigation"
        {...attributes}
      >
        {inner}
      </section>
    );
  }

  return (
    <div
      className={govukClasses("govuk-service-navigation", classes)}
      data-module="govuk-service-navigation"
      {...attributes}
    >
      {inner}
    </div>
  );
}
