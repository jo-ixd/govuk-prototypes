import { useId } from "react";
import Button from "@/app/components/govuk/Button";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type ExitThisPageProps = CommonProps &
  Partial<TextOrHtml> & {
    id?: string;
    redirectUrl?: string;
    activatedText?: string;
    timedOutText?: string;
    pressTwoMoreTimesText?: string;
    pressOneMoreTimeText?: string;
  };

const defaultRedirectUrl = "https://www.bbc.co.uk/weather";

export default function ExitThisPage({
  id,
  classes,
  attributes,
  text,
  html,
  redirectUrl,
  activatedText,
  timedOutText,
  pressTwoMoreTimesText,
  pressOneMoreTimeText,
}: ExitThisPageProps) {
  const autoId = useId();

  const i18nAttributes: Record<string, string> = {};
  if (activatedText) i18nAttributes["data-i18n.activated"] = activatedText;
  if (timedOutText) i18nAttributes["data-i18n.timed-out"] = timedOutText;
  if (pressTwoMoreTimesText)
    i18nAttributes["data-i18n.press-two-more-times"] = pressTwoMoreTimesText;
  if (pressOneMoreTimeText)
    i18nAttributes["data-i18n.press-one-more-time"] = pressOneMoreTimeText;

  const content: TextOrHtml = html
    ? { html }
    : text
      ? { text }
      : {
          html: (
            <>
              <span className="govuk-visually-hidden">Emergency</span> Exit this
              page
            </>
          ),
        };

  return (
    <div
      id={id ?? autoId}
      className={govukClasses("govuk-exit-this-page", classes)}
      data-module="govuk-exit-this-page"
      {...i18nAttributes}
      {...attributes}
    >
      <Button
        href={redirectUrl || defaultRedirectUrl}
        classes="govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button"
        attributes={{ rel: "nofollow noreferrer" }}
        {...content}
      />
    </div>
  );
}
