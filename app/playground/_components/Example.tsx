import type { ReactNode } from "react";
import { govukClasses } from "@/app/components/govuk/utils";

export type ExampleProps = {
  title: string;
  description?: string;
  children: ReactNode;
  demoClasses?: string;
};

export default function Example({
  title,
  description,
  children,
  demoClasses,
}: ExampleProps) {
  return (
    <section className="playground-example">
      <h3 className="govuk-heading-s">{title}</h3>
      {description && (
        <p className="govuk-body-s playground-example__description">{description}</p>
      )}
      <div className={govukClasses("playground-example__demo", demoClasses)}>
        {children}
      </div>
    </section>
  );
}
