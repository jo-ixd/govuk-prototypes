import type { AriaRole, ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type CookieBannerAction = {
  text: string;
  type?: "button" | "submit";
  href?: string;
  name?: string;
  value?: string;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type CookieBannerMessage = {
  headingText?: string;
  headingHtml?: ReactNode;
  text?: string;
  html?: ReactNode;
  actions?: CookieBannerAction[];
  hidden?: boolean;
  role?: AriaRole;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type CookieBannerProps = CommonProps & {
  ariaLabel?: string;
  hidden?: boolean;
  messages: CookieBannerMessage[];
};

export default function CookieBanner({
  ariaLabel,
  hidden,
  messages,
  classes,
  attributes,
}: CookieBannerProps) {
  return (
    <div
      className={govukClasses("govuk-cookie-banner", classes)}
      data-nosnippet
      role="region"
      aria-label={ariaLabel ?? "Cookie banner"}
      hidden={hidden}
      {...attributes}
    >
      {messages.map((message, messageIndex) => (
        <div
          key={messageIndex}
          className={govukClasses(
            "govuk-cookie-banner__message",
            message.classes
              ? `${message.classes} govuk-width-container`
              : "govuk-width-container",
          )}
          role={message.role}
          hidden={message.hidden}
          {...message.attributes}
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              {(message.headingHtml ?? message.headingText) && (
                <h2 className="govuk-cookie-banner__heading govuk-heading-m">
                  {message.headingHtml ?? message.headingText}
                </h2>
              )}
              <div className="govuk-cookie-banner__content">
                {message.html ?? (message.text ? (
                  <p className="govuk-body">{message.text}</p>
                ) : null)}
              </div>
            </div>
          </div>
          {/* The njk renders the button group whenever the actions option is
              set, even when it is empty. */}
          {message.actions && (
            <div className="govuk-button-group">
              {message.actions.map((action, actionIndex) => {
                // Actions with an href render as links, unless they are
                // explicitly styled as buttons with type "button".
                if (action.href && action.type !== "button") {
                  return (
                    <a
                      key={actionIndex}
                      className={govukClasses("govuk-link", action.classes)}
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
                      key={actionIndex}
                      className={govukClasses("govuk-button", action.classes)}
                      href={action.href}
                      role="button"
                      draggable={false}
                      data-module="govuk-button"
                      {...action.attributes}
                    >
                      {action.text}
                    </a>
                  );
                }
                return (
                  <button
                    key={actionIndex}
                    type={action.type || "button"}
                    className={govukClasses("govuk-button", action.classes)}
                    data-module="govuk-button"
                    name={action.name}
                    value={action.value}
                    {...action.attributes}
                  >
                    {action.text}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
