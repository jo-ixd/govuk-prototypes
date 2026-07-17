import { type CommonProps, type TextOrHtml } from "./types";

export type SkipLinkProps = CommonProps &
  TextOrHtml & {
    href?: string;
  };

export default function SkipLink({ href = "#content", classes, attributes, id, ...rest }: SkipLinkProps) {
  return (
    <a
      href={href}
      id={id}
      className={classes ? `govuk-skip-link ${classes}` : "govuk-skip-link"}
      {...attributes}
      data-module="govuk-skip-link"
    >
      {"html" in rest ? rest.html : rest.text}
    </a>
  );
}
