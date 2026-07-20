import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export interface SkipLinkProps extends CommonProps, TextOrHtml {
  href?: string;
}

export default function SkipLink({
  href = "#content",
  classes,
  attributes,
  id,
  text,
  html,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      id={id}
      className={govukClasses("govuk-skip-link", classes)}
      {...attributes}
      data-module="govuk-skip-link"
    >
      {html ?? text}
    </a>
  );
}
