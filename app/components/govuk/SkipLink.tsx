import { useId } from "react";
import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type SkipLinkProps = CommonPropsTextOrHtml & {
  href?: string;
};

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
