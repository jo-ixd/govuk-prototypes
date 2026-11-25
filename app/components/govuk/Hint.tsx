import type { CommonPropsTextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type HintProps = CommonPropsTextOrHtml & {
  id?: string;
};

export default function Hint({
  id,
  classes,
  attributes,
  text,
  html,
}: HintProps) {
  return (
    <div
      id={id}
      className={govukClasses("govuk-hint", classes)}
      {...attributes}
    >
      {html ?? text}
    </div>
  );
}
