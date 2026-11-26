"use client";

import { useState } from "react";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function ErrorMessagePlayground() {
  const [text, setText] = useState("Enter your name");
  const [showPrefix, setShowPrefix] = useState(true);

  return (
    <ControlPanel
      title="Error message playground"
      fields={
        <>
          <ControlText label="Error text" value={text} onChange={setText} />
          <ControlCheckbox
            label="Visually hidden 'Error:' prefix"
            checked={showPrefix}
            onChange={setShowPrefix}
          />
        </>
      }
      preview={
        <ErrorMessage text={text} visuallyHiddenText={showPrefix ? "Error" : null} />
      }
    />
  );
}
