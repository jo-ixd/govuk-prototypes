import type { ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type PhaseBannerTag = {
  text?: string;
  html?: ReactNode;
  classes?: string;
};

export type PhaseBannerProps = CommonProps & {
  tag: PhaseBannerTag;
  text?: string;
  html?: ReactNode;
};

export default function PhaseBanner({
  tag,
  text,
  html,
  classes,
  attributes,
}: PhaseBannerProps) {
  return (
    <div
      className={govukClasses("govuk-phase-banner govuk-width-container", classes)}
      {...attributes}
    >
      <p className="govuk-phase-banner__content">
        <strong
          className={govukClasses(
            "govuk-tag govuk-phase-banner__content__tag",
            tag.classes,
          )}
        >
          {tag.html ?? tag.text}
        </strong>
        <span className="govuk-phase-banner__text">{html ?? text}</span>
      </p>
    </div>
  );
}
