import type { ReactNode } from "react";

export type TextOrHtml =
  | { text: string; html?: never }
  | { html: ReactNode; text?: never };

export type CommonProps = {
  classes?: string;
  attributes?: Record<string, string>;
}

export type CommonPropsTextOrHtml = CommonProps & TextOrHtml;
