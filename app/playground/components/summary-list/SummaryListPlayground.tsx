"use client";

import { useState } from "react";
import SummaryList, {
  type SummaryListRow,
} from "@/app/components/govuk/SummaryList";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const rowsData: { row: SummaryListRow; hiddenText: string }[] = [
  {
    row: {
      key: { text: "Name" },
      value: { text: "Firstname Lastname" },
    },
    hiddenText: "name",
  },
  {
    row: {
      key: { text: "Date of birth" },
      value: { text: "13/08/1980" },
    },
    hiddenText: "date of birth",
  },
  {
    row: {
      key: { text: "Contact information" },
      value: {
        html: (
          <>
            <p className="govuk-body">email@email.com</p>
            <p className="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
      },
    },
    hiddenText: "contact information",
  },
  {
    row: {
      key: { text: "National Insurance number" },
      value: { text: "QQ 12 34 56 C" },
    },
    hiddenText: "National Insurance number",
  },
];

export default function SummaryListPlayground() {
  const [rowCount, setRowCount] = useState("3");
  const [withActions, setWithActions] = useState(true);
  const [cardTitle, setCardTitle] = useState("");
  const [noBorder, setNoBorder] = useState(false);

  const rows: SummaryListRow[] = rowsData
    .slice(0, Number(rowCount))
    .map(({ row, hiddenText }) =>
      withActions
        ? {
            ...row,
            actions: {
              items: [
                { href: "#", text: "Change", visuallyHiddenText: hiddenText },
              ],
            },
          }
        : row,
    );

  return (
    <ControlPanel
      fields={
        <>
          <ControlSelect
            label="Rows"
            value={rowCount}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            onChange={setRowCount}
          />
          <ControlCheckbox
            label="Show actions"
            checked={withActions}
            onChange={setWithActions}
          />
          <ControlText
            label="Card title (blank for no card)"
            value={cardTitle}
            onChange={setCardTitle}
          />
          <ControlCheckbox
            label="No border"
            checked={noBorder}
            onChange={setNoBorder}
          />
        </>
      }
      preview={
        <SummaryList
          rows={rows}
          {...(noBorder ? { classes: "govuk-summary-list--no-border" } : {})}
          {...(cardTitle ? { card: { title: { text: cardTitle } } } : {})}
        />
      }
    />
  );
}
