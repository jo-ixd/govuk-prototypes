import type { ReactNode } from "react";

export interface TextOrHtml {
  text: string | null;
  html?: ReactNode;
}

export interface CommonProps {
  classes?: string;
  attributes?: Record<string, string>;
  id?: string;
}
