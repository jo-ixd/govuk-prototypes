"use client";

import { useState } from "react";
import TaskList, {
  type TaskListItem,
  type TaskListStatus,
} from "@/app/components/govuk/TaskList";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const taskNames = [
  "Company Directors",
  "Registered company details",
  "Business plan",
  "Documentation",
];

const taskHints = [
  "Ensure all directors are listed and their details are current.",
  "Check the registered office address and SIC codes.",
  "Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.",
  "Upload the memorandum and articles of association.",
];

function buildStatus(statusKey: string): TaskListStatus {
  if (statusKey === "completed") return { text: "Completed" };
  if (statusKey === "cannot-start-yet") {
    return {
      text: "Cannot start yet",
      classes: "govuk-task-list__status--cannot-start-yet",
    };
  }
  if (statusKey === "not-started") {
    return { tag: { text: "Not started", classes: "govuk-tag--teal" } };
  }
  if (statusKey === "in-progress") {
    return { tag: { text: "In progress", classes: "govuk-tag--blue" } };
  }
  return { tag: { text: "Incomplete", classes: "govuk-tag--blue" } };
}

export default function TaskListPlayground() {
  const [taskCount, setTaskCount] = useState("3");
  const [statusKey, setStatusKey] = useState("incomplete");
  const [withHints, setWithHints] = useState(false);
  const [idPrefix, setIdPrefix] = useState("example-task-list");

  const items: TaskListItem[] = taskNames
    .slice(0, Number(taskCount))
    .map((name, index) => ({
      title: { text: name },
      href: "#",
      status: buildStatus(statusKey),
      ...(withHints ? { hint: { text: taskHints[index] } } : {}),
    }));

  return (
    <ControlPanel
      fields={
        <>
          <ControlSelect
            label="Number of tasks"
            value={taskCount}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            onChange={setTaskCount}
          />
          <ControlSelect
            label="Status"
            value={statusKey}
            options={[
              { value: "completed", label: "Completed" },
              { value: "incomplete", label: "Incomplete (blue tag)" },
              { value: "not-started", label: "Not started (teal tag)" },
              { value: "in-progress", label: "In progress (blue tag)" },
              { value: "cannot-start-yet", label: "Cannot start yet" },
            ]}
            onChange={setStatusKey}
          />
          <ControlCheckbox
            label="Show hints"
            checked={withHints}
            onChange={setWithHints}
          />
          <ControlText label="ID prefix" value={idPrefix} onChange={setIdPrefix} />
        </>
      }
      preview={<TaskList items={items} idPrefix={idPrefix} />}
    />
  );
}
