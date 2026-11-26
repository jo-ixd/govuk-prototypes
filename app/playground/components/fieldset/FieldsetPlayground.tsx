"use client";

import { useState } from "react";
import Fieldset from "@/app/components/govuk/Fieldset";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function FieldsetPlayground() {
  const [legend, setLegend] = useState("What is your address?");
  const [size, setSize] = useState("xl");
  const [isPageHeading, setIsPageHeading] = useState(false);
  const [withHint, setWithHint] = useState(true);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Legend" value={legend} onChange={setLegend} />
          <ControlSelect
            label="Legend size"
            value={size}
            options={[
              { value: "none", label: "None" },
              { value: "xl", label: "Extra large" },
              { value: "l", label: "Large" },
              { value: "m", label: "Medium" },
              { value: "s", label: "Small" },
            ]}
            onChange={setSize}
          />
          <ControlCheckbox
            label="Legend as page heading"
            checked={isPageHeading}
            onChange={setIsPageHeading}
          />
          <ControlCheckbox
            label="Include hint and describedBy"
            checked={withHint}
            onChange={setWithHint}
          />
        </>
      }
      preview={
        <Fieldset
          describedBy={withHint ? "fieldset-playground-hint" : ""}
          legend={{
            text: legend,
            ...(size !== "none"
              ? { classes: `govuk-fieldset__legend--${size}` }
              : {}),
            isPageHeading,
          }}
        >
          {withHint ? (
            <p className="govuk-hint" id="fieldset-playground-hint">
              This hint is associated with the fieldset using aria-describedby.
            </p>
          ) : null}
          <p className="govuk-body">
            Form controls for the address would go inside the fieldset.
          </p>
        </Fieldset>
      }
    />
  );
}
