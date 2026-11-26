import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type TagProps = CommonPropsTextOrHtml;

export default function Tag({
  classes,
  attributes,
  text,
  html,
}: TagProps) {
  return (
    <strong className={govukClasses("govuk-tag", classes)} {...attributes}>
      {html ?? text}
    </strong>
  );
}
