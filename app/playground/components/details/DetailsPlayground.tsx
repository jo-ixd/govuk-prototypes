"use client";

import { useState } from "react";
import Details from "@/app/components/govuk/Details";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function DetailsPlayground() {
  const [summaryText, setSummaryText] = useState("Where to find your National Insurance number");
  const [bodyText, setBodyText] = useState(
    "Your National Insurance number is on your National Insurance card, or in official paperwork such as payslips or letters about benefits.",
  );
  const [open, setOpen] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Summary text"
            value={summaryText}
            onChange={setSummaryText}
          />
          <ControlText label="Body text" value={bodyText} onChange={setBodyText} />
          <ControlCheckbox label="Open" checked={open} onChange={setOpen} />
        </>
      }
      preview={
        <Details
          summaryText={summaryText}
          text={bodyText}
          open={open}
        />
      }
    />
  );
}
