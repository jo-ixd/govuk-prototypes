import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "@/app/components/govuk/TaskList";

describe("TaskList", () => {
  it("renders each task with its name, hint and status tag", () => {
    render(
      <TaskList
        items={[
          {
            title: { text: "Check your details" },
            hint: { text: "They must match your passport." },
            status: { tag: { text: "Completed" } },
          },
          {
            title: { text: "Pay" },
            status: { text: "Cannot start yet" },
          },
        ]}
      />,
    );
    const list = document.querySelector("ul");
    expect(list).toHaveClass("govuk-task-list");
    expect(screen.getByText("Check your details").tagName).toBe("DIV");
    expect(screen.getByText("They must match your passport.")).toHaveClass(
      "govuk-task-list__hint",
    );
    expect(screen.getByText("Completed").tagName).toBe("STRONG");
    expect(screen.getByText("Cannot start yet")).toHaveClass(
      "govuk-task-list__status",
    );
  });

  it("marks items with links and describes them by their status", () => {
    render(
      <TaskList
        items={[
          {
            title: { text: "Check your details" },
            href: "/check",
            status: { tag: { text: "Completed" } },
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Check your details" });
    expect(link).toHaveAttribute("href", "/check");
    expect(link.parentElement?.parentElement).toHaveClass(
      "govuk-task-list__item--with-link",
    );
    expect(link).toHaveAttribute("aria-describedby", "task-list-1-status");
  });

  it("includes the hint id in the link description when a hint is present", () => {
    render(
      <TaskList
        items={[
          {
            title: { text: "Check your details" },
            href: "/check",
            hint: { text: "Hint text" },
            status: { tag: { text: "Completed" } },
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Check your details" })).toHaveAttribute(
      "aria-describedby",
      "task-list-1-hint task-list-1-status",
    );
  });

  it("supports a custom id prefix", () => {
    render(
      <TaskList
        idPrefix="permit-tasks"
        items={[{ title: { text: "Pay" }, status: { tag: { text: "Done" } } }]}
      />,
    );
    expect(document.querySelector(".govuk-task-list__status")).toHaveAttribute(
      "id",
      "permit-tasks-1-status",
    );
  });

  it("renders plain names for tasks without links", () => {
    render(
      <TaskList
        items={[{ title: { text: "Pay" }, status: { text: "Pending" } }]}
      />,
    );
    const name = screen.getByText("Pay");
    expect(name.tagName).toBe("DIV");
    expect(name.closest("a")).toBeNull();
    expect(
      document.querySelector(".govuk-task-list__item"),
    ).not.toHaveClass("govuk-task-list__item--with-link");
  });
});
