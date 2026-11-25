import type { ReactNode } from "react";
import { govukClasses } from "@/app/components/govuk/utils";

export type PageProps = {
  beforeContent?: ReactNode;
  children: ReactNode;
  width?: "two-thirds" | "full";
  mainClasses?: string;
  mainId?: string;
};

const WIDTH_CLASSES: { "two-thirds": string | null; full: string | null } = {
  "two-thirds": "govuk-grid-column-two-thirds",
  full: null,
};

export default function Page({
  beforeContent,
  children,
  width = "two-thirds",
  mainClasses,
  mainId = "main-content",
}: PageProps) {
  const columnClass = WIDTH_CLASSES[width];

  return (
    <div className="govuk-width-container">
      <main
        className={govukClasses("govuk-main-wrapper govuk-main-wrapper--l", mainClasses)}
        id={mainId}
        role="main"
      >
        {beforeContent}
        {columnClass === null ? (
          children
        ) : (
          <div className="govuk-grid-row">
            <div className={columnClass}>{children}</div>
          </div>
        )}
      </main>
    </div>
  );
}
