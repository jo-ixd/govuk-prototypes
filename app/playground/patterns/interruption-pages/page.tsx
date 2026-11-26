import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Panel from "@/app/components/govuk/Panel";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Interruption pages - GOV.UK Patterns",
};

export default function InterruptionPagesPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Interruption pages</h1>
      <p className="govuk-body-l">
        Use interruption pages to pause the user&rsquo;s journey and give them
        important information.
      </p>
      <p className="govuk-body">
        Think carefully before you interrupt a user&rsquo;s journey, as it
        might get in the way of them completing their task. Interruptions get
        less effective the more often users see them, so use them sparingly.
        Use an interruption page to warn the user before they:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>do something unusual that&rsquo;s probably a mistake</li>
        <li>do something that cannot be undone (so you can ask &ldquo;Are you sure?&rdquo;)</li>
        <li>give an answer that conflicts with existing information</li>
      </ul>
      <p className="govuk-body">
        Do not use one unless there&rsquo;s evidence of a clear need to pause
        the user journey, and it&rsquo;s the only way to give the user
        information that they&rsquo;d otherwise miss.
      </p>

      <Example
        title="Interruption panel"
        description="All important information on the page is shown within an interruption panel, with a button the user must interact with to continue. Keep the information short and do not place other components or form elements inside the panel. Include a back link at the top of the page, and if it's helpful to jump back to another point in the journey, group that link alongside the continue button."
      >
        <BackLink text="Back" href="#" />
        <Panel
          classes="govuk-panel--interruption"
          titleText="Do you want to leave this application?"
          html={
            <p className="govuk-body">
              If you leave now your answers will not be saved. You&rsquo;ll
              need to start again from the beginning.
            </p>
          }
          actions={{
            items: [
              { text: "Continue", type: "button" },
              { text: "Leave", href: "#" },
            ],
          }}
        />
      </Example>
    </>
  );
}
