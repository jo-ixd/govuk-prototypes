"use client";

import { useState } from "react";
import Label from "@/app/components/govuk/Label";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function LabelPlayground() {
  const [text, setText] = useState("What is your address?");
  const [isPageHeading, setIsPageHeading] = useState(false);
  const [bold, setBold] = useState(false);

  return (
    <ControlPanel
      title="Label playground"
      fields={
        <>
          <ControlText label="Label text" value={text} onChange={setText} />
          <ControlCheckbox
            label="Is page heading"
            checked={isPageHeading}
            onChange={setIsPageHeading}
          />
          <ControlCheckbox
            label="Bold (govuk-label--s)"
            checked={bold}
            onChange={setBold}
          />
        </>
      }
      preview={
        <Label
          text={text}
          isPageHeading={isPageHeading}
          classes={bold ? "govuk-label--s" : ""}
        />
      }
    />
  );
}
