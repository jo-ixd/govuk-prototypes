import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type SkipLinkProps = CommonPropsTextOrHtml & {
  href?: string;
};

// Matches the GOV.UK template: the link targets the id given to the main
// content region, which every layout and the Page component set to
// "main-content".
export default function SkipLink({
  href = "#main-content",
  classes,
  attributes,
  text,
  html,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={govukClasses("govuk-skip-link", classes)}
      {...attributes}
      data-module="govuk-skip-link"
    >
      {html ?? text}
    </a>
  );
}
