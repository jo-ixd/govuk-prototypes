import { useId, type AriaRole, type ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type NotificationBannerProps = CommonProps & {
  text?: string;
  html?: ReactNode;
  titleText?: string;
  titleHtml?: ReactNode;
  titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: string;
  role?: AriaRole;
  titleId?: string;
  disableAutoFocus?: boolean;
};

export default function NotificationBanner({
  text,
  html,
  titleText,
  titleHtml,
  titleHeadingLevel,
  type,
  role,
  titleId,
  disableAutoFocus,
  classes,
  attributes,
}: NotificationBannerProps) {
  const generatedId = useId();
  const headingId = titleId ?? generatedId;
  const success = type === "success";
  const bannerRole: AriaRole = role ?? (success ? "alert" : "region");
  const title = titleHtml || titleText || (success ? "Success" : "Important");
  const Heading = `h${titleHeadingLevel ?? 2}` as const;

  return (
    <div
      className={govukClasses(
        success
          ? "govuk-notification-banner govuk-notification-banner--success"
          : "govuk-notification-banner",
        classes,
      )}
      role={bannerRole}
      aria-labelledby={headingId}
      data-module="govuk-notification-banner"
      {...(typeof disableAutoFocus === "boolean"
        ? { "data-disable-auto-focus": disableAutoFocus }
        : {})}
      {...attributes}
    >
      <div className="govuk-notification-banner__header">
        <Heading
          className="govuk-notification-banner__title"
          id={headingId}
        >
          {title}
        </Heading>
      </div>
      <div className="govuk-notification-banner__content">
        {html ?? (text ? (
          <p className="govuk-notification-banner__heading">{text}</p>
        ) : null)}
      </div>
    </div>
  );
}
