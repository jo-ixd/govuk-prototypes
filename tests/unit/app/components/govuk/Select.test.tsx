import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "@/app/components/govuk/Select";

const items = [
  { text: "Newest first", value: "published" },
  { text: "Oldest first", value: "created-desc" },
  null,
  { text: "Unavailable", value: "none", disabled: true },
];

describe("Select", () => {
  it("renders a labelled govuk select with its items", () => {
    render(
      <Select name="sort" items={items} label={{ text: "Sort by" }} />,
    );
    const select = screen.getByLabelText("Sort by");
    expect(select.tagName).toBe("SELECT");
    expect(select).toHaveClass("govuk-select");
    expect(screen.getAllByRole("option").length).toBe(3);
  });

  it("selects the item flagged as selected", () => {
    render(
      <Select
        name="sort"
        items={[
          { text: "Newest first", value: "published" },
          { text: "Oldest first", value: "created", selected: true },
        ]}
        label={{ text: "Sort by" }}
      />,
    );
    expect(screen.getByLabelText("Sort by")).toHaveValue("created");
  });

  it("selects the item matching the top level value when no flag is set", () => {
    render(
      <Select
        name="sort"
        items={items}
        value="created-desc"
        label={{ text: "Sort by" }}
      />,
    );
    expect(screen.getByLabelText("Sort by")).toHaveValue("created-desc");
  });

  it("falls back to the first item when nothing matches", () => {
    render(
      <Select name="sort" items={items} label={{ text: "Sort by" }} />,
    );
    expect(screen.getByLabelText("Sort by")).toHaveValue("published");
  });

  it("marks disabled items as disabled", () => {
    render(
      <Select name="sort" items={items} label={{ text: "Sort by" }} />,
    );
    expect(screen.getByRole("option", { name: "Unavailable" })).toBeDisabled();
  });

  it("wires hint and error into aria-describedby and applies error classes", () => {
    render(
      <Select
        name="sort"
        items={items}
        label={{ text: "Sort by" }}
        hint={{ text: "Choose how to order results." }}
        errorMessage={{ text: "Select how to sort" }}
      />,
    );
    const select = screen.getByLabelText("Sort by");
    expect(select).toHaveAttribute("aria-describedby", "sort-hint sort-error");
    expect(select).toHaveClass("govuk-select--error");
    expect(select.parentElement).toHaveClass("govuk-form-group--error");
  });
});
