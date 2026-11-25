import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import TaskList from "@/app/components/govuk/TaskList";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Complete multiple tasks - GOV.UK Patterns",
};

export default function CompleteMultipleTasksPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Complete multiple tasks</h1>
      <p className="govuk-body-l">
        Help users understand the tasks involved in completing a transaction,
        the order they should complete tasks in, and when they&rsquo;ve
        completed tasks.
      </p>
      <p className="govuk-body">
        Only use this pattern for longer transactions involving multiple tasks
        that users may need to complete over a number of sessions. Try to
        simplify the transaction before you use it - if you can reduce the
        number of tasks or steps involved, you might not need one. Show the
        task list at the start of the transaction and at the start of each
        returning session.
      </p>

      <Example
        title="Task list"
        description="Group related actions into tasks and show each task's status. 'Completed' is plain black text with no background colour, so tasks that need attention stand out. 'In progress' and 'Not yet started' use coloured tags. Tasks the user cannot start yet, for example because another task must be completed first, are not linked."
      >
        <h1 className="govuk-heading-l">Renew a street trader licence</h1>
        <p className="govuk-body">
          You can leave and return to this application at any time. Your
          answers will be saved.
        </p>

        <TaskList
          idPrefix="renew-licence"
          items={[
            {
              title: { text: "Check you're eligible" },
              href: "#",
              status: { text: "Completed" },
            },
            {
              title: { text: "Your business details" },
              href: "#",
              status: {
                tag: { text: "In progress", classes: "govuk-tag--teal" },
              },
            },
            {
              title: { text: "Public liability insurance" },
              href: "#",
              status: {
                tag: { text: "Not yet started", classes: "govuk-tag--blue" },
              },
            },
            {
              title: { text: "List previous convictions" },
              href: "#",
              status: {
                tag: { text: "Not yet started", classes: "govuk-tag--blue" },
              },
            },
            {
              title: { text: "Choose your pitch" },
              hint: {
                text: "Available pitches will be announced on 1 April 2027",
              },
              status: {
                text: "Cannot start yet",
                classes: "govuk-task-list__status--cannot-start-yet",
              },
            },
          ]}
        />

        <div className="govuk-button-group">
          <Button text="Apply" />
        </div>
      </Example>
    </>
  );
}
