"use client";

import { useState } from "react";
import Radios from "@/app/components/govuk/Radios";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function RadiosPlayground() {
  const [legend, setLegend] = useState("Have you changed your name?");
  const [showHint, setShowHint] = useState(true);
  const [showError, setShowError] = useState(false);
  const [inline, setInline] = useState(false);
  const [small, setSmall] = useState(false);

  const radioClasses = [
    inline ? "govuk-radios--inline" : null,
    small ? "govuk-radios--small" : null,
  ]
    .filter((value): value is string => value !== null)
    .join(" ");

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
          <ControlCheckbox label="Inline" checked={inline} onChange={setInline} />
          <ControlCheckbox label="Small" checked={small} onChange={setSmall} />
        </>
      }
      preview={
        <Radios
          name="playground-radios"
          fieldset={{ legend: { text: legend } }}
          hint={
            showHint
              ? {
                  text: "This includes changing your last name or spelling your name differently.",
                }
              : null
          }
          errorMessage={
            showError ? { text: "Please select an option" } : null
          }
          classes={radioClasses}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ]}
        />
      }
    />
  );
}
