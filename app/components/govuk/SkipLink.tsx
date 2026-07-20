import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";
import { useId } from "react";

export interface SkipLinkProps extends CommonProps, TextOrHtml {
  href?: string;
}

export default function SkipLink({
  href = "#content",
  classes,
  attributes,
  text,
  html,
}: SkipLinkProps) {
  const id = useId();

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
