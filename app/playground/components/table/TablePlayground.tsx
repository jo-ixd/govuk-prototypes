"use client";

import { useState } from "react";
import Table, { type TableCell } from "@/app/components/govuk/Table";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

const months = [
  ["January", "£85", "£95"],
  ["February", "£75", "£55"],
  ["March", "£165", "£125"],
] as const;

function cell(text: string, numeric: boolean) {
  return numeric ? { text, format: "numeric" } : { text };
}

export default function TablePlayground() {
  const [caption, setCaption] = useState("Months and rates");
  const [showHead, setShowHead] = useState(true);
  const [numeric, setNumeric] = useState(true);
  const [firstCellIsHeader, setFirstCellIsHeader] = useState(false);

  const head: TableCell[] = [
    cell("Month you apply", false),
    cell("Rate for bicycles", numeric),
    cell("Rate for vehicles", numeric),
  ];
  const rows = months.map(
    ([month, bicycles, vehicles]): TableCell[] => [
      cell(month, false),
      cell(bicycles, numeric),
      cell(vehicles, numeric),
    ],
  );

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Caption" value={caption} onChange={setCaption} />
          <ControlCheckbox
            label="Show column headings"
            checked={showHead}
            onChange={setShowHead}
          />
          <ControlCheckbox
            label="Right-align numeric columns"
            checked={numeric}
            onChange={setNumeric}
          />
          <ControlCheckbox
            label="First cell is a row header"
            checked={firstCellIsHeader}
            onChange={setFirstCellIsHeader}
          />
        </>
      }
      preview={
        <Table
          caption={caption}
          captionClasses="govuk-table__caption--m"
          {...(showHead ? { head } : {})}
          firstCellIsHeader={firstCellIsHeader}
          rows={rows}
        />
      }
    />
  );
}
