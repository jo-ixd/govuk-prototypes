import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "@/app/components/govuk/Table";

describe("Table", () => {
  it("renders a govuk table with body cells", () => {
    render(
      <Table
        rows={[
          [{ text: "January" }, { text: "£85" }],
          [{ text: "February" }, { text: "£75" }],
        ]}
      />,
    );
    const table = document.querySelector("table");
    expect(table).toHaveClass("govuk-table");
    expect(screen.getByText("January").tagName).toBe("TD");
    expect(document.querySelectorAll(".govuk-table__body tr").length).toBe(2);
  });

  it("renders a caption and a header row", () => {
    render(
      <Table
        caption="Months and costs"
        head={[{ text: "Month" }, { text: "Cost" }]}
        rows={[[{ text: "January" }, { text: "£85" }]]}
      />,
    );
    expect(screen.getByText("Months and costs")).toHaveClass(
      "govuk-table__caption",
    );
    const headerCells = document.querySelectorAll("thead th");
    expect(headerCells.length).toBe(2);
    expect(headerCells[0]).toHaveAttribute("scope", "col");
  });

  it("renders the first cell as a row header when asked", () => {
    render(
      <Table
        firstCellIsHeader
        rows={[[{ text: "January" }, { text: "£85" }]]}
      />,
    );
    const firstCell = screen.getByText("January");
    expect(firstCell.tagName).toBe("TH");
    expect(firstCell).toHaveAttribute("scope", "row");
    expect(screen.getByText("£85").tagName).toBe("TD");
  });

  it("applies numeric formatting classes to cells", () => {
    render(
      <Table
        head={[{ text: "Month" }, { text: "Cost", format: "numeric" }]}
        rows={[[{ text: "January" }, { text: "£85", format: "numeric" }]]}
      />,
    );
    expect(screen.getByText("Cost")).toHaveClass("govuk-table__header--numeric");
    expect(screen.getByText("£85")).toHaveClass("govuk-table__cell--numeric");
  });

  it("supports column and row spanning cells", () => {
    render(
      <Table
        rows={[[{ text: "Wide", colspan: 2 }, { text: "Tall", rowspan: 2 }]]}
      />,
    );
    expect(screen.getByText("Wide")).toHaveAttribute("colspan", "2");
    expect(screen.getByText("Tall")).toHaveAttribute("rowspan", "2");
  });
});
