"use client";

import { useState } from "react";
import DateInput from "@/app/components/govuk/DateInput";
import GovukPreview from "@/app/playground/_components/GovukPreview";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function DateInputPlayground() {
  const [legend, setLegend] = useState("What is your date of birth?");
  const [showHint, setShowHint] = useState(true);
  const [showError, setShowError] = useState(false);
  const [prefill, setPrefill] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Legend" value={legend} onChange={setLegend} />
          <ControlCheckbox
            label="Show hint"
            checked={showHint}
            onChange={setShowHint}
          />
          <ControlCheckbox
            label="Show error message"
            checked={showError}
            onChange={setShowError}
          />
          <ControlCheckbox
            label="Prefill values"
            checked={prefill}
            onChange={setPrefill}
          />
        </>
      }
      preview={
        <GovukPreview deps={[legend, showHint, showError, prefill]}>
          <DateInput
            id="playground-date-input"
            fieldset={{ legend: { text: legend } }}
            hint={showHint ? { text: "For example, 31 3 1980" } : null}
            errorMessage={
              showError ? { text: "Enter a complete date of birth" } : null
            }
            values={prefill ? { day: "31", month: "3", year: "1980" } : {}}
          />
        </GovukPreview>
      }
    />
  );
}
