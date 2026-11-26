"use client";

import { useState } from "react";
import Checkboxes from "@/app/components/govuk/Checkboxes";
import GovukPreview from "@/app/playground/_components/GovukPreview";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function CheckboxesPlayground() {
  const [legend, setLegend] = useState(
    "Which types of waste do you transport regularly?",
  );
  const [showHint, setShowHint] = useState(true);
  const [showError, setShowError] = useState(false);
  const [small, setSmall] = useState(false);
  const [preChecked, setPreChecked] = useState(false);

  const checkboxClasses = small ? "govuk-checkboxes--small" : "";

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
          <ControlCheckbox label="Small" checked={small} onChange={setSmall} />
          <ControlCheckbox
            label="Pre-check first item"
            checked={preChecked}
            onChange={setPreChecked}
          />
        </>
      }
      preview={
        <GovukPreview deps={[legend, showHint, showError, small, preChecked]}>
          <Checkboxes
            name="playground-checkboxes"
            fieldset={{ legend: { text: legend } }}
            hint={showHint ? { text: "Select all that apply" } : null}
            errorMessage={
              showError ? { text: "Please select an option" } : null
            }
            classes={checkboxClasses}
            values={preChecked ? ["waste-animal"] : []}
            items={[
              {
                value: "waste-animal",
                text: "Waste from animal carcasses",
              },
              { value: "waste-mines", text: "Waste from mines or quarries" },
              {
                value: "waste-farm",
                text: "Farm or agricultural waste",
              },
              { divider: "or" },
              { value: "none", text: "None of these", behaviour: "exclusive" },
            ]}
          />
        </GovukPreview>
      }
    />
  );
}
