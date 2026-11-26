import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type InsetTextProps = CommonPropsTextOrHtml & {
  id?: string;
};

export default function InsetText({
  id,
  classes,
  attributes,
  text,
  html,
}: InsetTextProps) {
  return (
    <div
      id={id}
      className={govukClasses("govuk-inset-text", classes)}
      {...attributes}
    >
      {html ?? text}
    </div>
  );
}
