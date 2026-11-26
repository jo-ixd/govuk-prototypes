import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import TaskList from "@/app/components/govuk/TaskList";
import Example from "@/app/playground/_components/Example";
import TaskListPlayground from "@/app/playground/components/task-list/TaskListPlayground";

export const metadata: Metadata = { title: "Task list - GOV.UK Playground" };

export default function TaskListPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Task list</h1>
      <p className="govuk-body-l">
        Shows the tasks a user needs to complete, with their status, as used in
        task lists based on a single session.
      </p>

      <Example
        title="Task list"
        description="Tasks link to each section, with plain text or tag statuses."
      >
        <TaskList
          items={[
            {
              title: { text: "Company Directors" },
              href: "#",
              status: { text: "Completed" },
            },
            {
              title: { text: "Registered company details" },
              href: "#",
              status: {
                tag: { text: "Incomplete", classes: "govuk-tag--blue" },
              },
            },
            {
              title: { text: "Business plan" },
              href: "#",
              status: {
                tag: { text: "Incomplete", classes: "govuk-tag--blue" },
              },
            },
          ]}
        />
      </Example>

      <Example
        title="Task list with hints and additional states"
        description="Tasks can have hint text, and statuses can use text with a modifier class."
      >
        <TaskList
          items={[
            {
              title: { text: "Company Directors" },
              href: "#",
              status: { text: "Completed" },
            },
            {
              title: { text: "Registered company details" },
              href: "#",
              status: {
                tag: { text: "Not started", classes: "govuk-tag--teal" },
              },
            },
            {
              title: { text: "Business plan" },
              href: "#",
              hint: {
                text: "Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.",
              },
              status: {
                tag: { text: "Review", classes: "govuk-tag--magenta" },
              },
            },
            {
              title: { text: "Documentation" },
              href: "#",
              status: {
                tag: { text: "In progress", classes: "govuk-tag--blue" },
              },
            },
            {
              title: { text: "Charitable status" },
              href: "#",
              status: { tag: { text: "Error", classes: "govuk-tag--red" } },
            },
            {
              title: { text: "Payment" },
              href: "#",
              hint: { text: "It will cost between £15 and £75" },
              status: {
                text: "Cannot start yet",
                classes: "govuk-task-list__status--cannot-start-yet",
              },
            },
          ]}
        />
      </Example>

      <Example
        title="Task list without links"
        description="Tasks without an href render as plain text instead of links."
      >
        <TaskList
          items={[
            {
              title: { text: "Company Directors" },
              href: "#",
              status: { text: "Completed" },
            },
            {
              title: { text: "Registered company details" },
              status: {
                tag: { text: "Incomplete", classes: "govuk-tag--blue" },
              },
            },
          ]}
        />
      </Example>

      <TaskListPlayground />
    </>
  );
}
