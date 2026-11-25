import type { ReactNode } from "react";
import type { CommonProps } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type BackLinkProps = CommonProps & {
  href?: string;
  text?: string;
  html?: ReactNode;
};

export default function BackLink({
  href = "#",
  classes,
  attributes,
  text,
  html,
}: BackLinkProps) {
  return (
    <a
      href={href}
      className={govukClasses("govuk-back-link", classes)}
      {...attributes}
    >
      {html ?? text ?? "Back"}
    </a>
  );
}
