import { type CommonProps, type TextOrHtml } from "./types";

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
      className={classes ? `govuk-skip-link ${classes}` : "govuk-skip-link"}
      {...attributes}
      data-module="govuk-skip-link"
    >
      {html ?? text}
    </a>
  );
}
