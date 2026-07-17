import type { ReactNode } from "react";

export type TextOrHtml = { text: string; html?: never } | { html: ReactNode; text?: never };

export interface CommonProps {
  classes?: string;
  attributes?: Record<string, string>;
  id?: string;
}
