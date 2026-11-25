import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Table from "@/app/components/govuk/Table";
import Example from "@/app/playground/_components/Example";
import TablePlayground from "@/app/playground/components/table/TablePlayground";

export const metadata: Metadata = { title: "Table - GOV.UK Playground" };

const head = [
  { text: "Month you apply" },
  { text: "Rate for bicycles", format: "numeric" },
  { text: "Rate for vehicles", format: "numeric" },
];

const rows = [
  [
    { text: "January" },
    { text: "£85", format: "numeric" },
    { text: "£95", format: "numeric" },
  ],
  [
    { text: "February" },
    { text: "£75", format: "numeric" },
    { text: "£55", format: "numeric" },
  ],
  [
    { text: "March" },
    { text: "£165", format: "numeric" },
    { text: "£125", format: "numeric" },
  ],
];

export default function TablePage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Table</h1>
      <p className="govuk-body-l">
        Renders a table of rows and cells, with optional column headings, a
        caption and row headers.
      </p>

      <Example
        title="Table with a head"
        description="Column headings right-align numeric columns."
      >
        <Table head={head} rows={rows} />
      </Example>

      <Example
        title="Table with a head, caption and row headers"
        description="The caption describes the table, and firstCellIsHeader turns each row's first cell into a row header."
      >
        <Table
          caption="Caption 1: Months and rates"
          captionClasses="govuk-table__caption--m"
          firstCellIsHeader
          head={head}
          rows={rows}
        />
      </Example>

      <Example
        title="Table with row headers only"
        description="Row headers without column headings."
      >
        <Table firstCellIsHeader rows={rows} />
      </Example>

      <Example
        title="Table with small text"
        description="Use a smaller text size for tables with a lot of data."
      >
        <Table
          classes="govuk-table--small-text-until-tablet"
          head={head}
          rows={rows}
        />
      </Example>

      <TablePlayground />
    </>
  );
}
