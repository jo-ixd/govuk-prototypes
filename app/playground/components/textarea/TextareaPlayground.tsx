"use client";

import { useState } from "react";
import Textarea from "@/app/components/govuk/Textarea";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const ROW_OPTIONS = [
  { value: "3", label: "3 rows" },
  { value: "5", label: "5 rows (default)" },
  { value: "8", label: "8 rows" },
  { value: "10", label: "10 rows" },
];

export default function TextareaPlayground() {
  const [labelText, setLabelText] = useState("Can you provide more detail?");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [rows, setRows] = useState("5");
  const [disabled, setDisabled] = useState(false);

  return (
    <ControlPanel
      title="Textarea playground"
      fields={
        <>
          <ControlText
            label="Label text"
            value={labelText}
            onChange={setLabelText}
          />
          <ControlText label="Hint text" value={hintText} onChange={setHintText} />
          <ControlText
            label="Error message"
            value={errorText}
            onChange={setErrorText}
          />
          <ControlSelect
            label="Rows"
            value={rows}
            options={ROW_OPTIONS}
            onChange={setRows}
          />
          <ControlCheckbox
            label="Disabled"
            checked={disabled}
            onChange={setDisabled}
          />
        </>
      }
      preview={
        <Textarea
          id="textarea-playground"
          name="playground"
          label={{ text: labelText }}
          hint={hintText ? { text: hintText } : undefined}
          errorMessage={errorText ? { text: errorText } : undefined}
          rows={Number.parseInt(rows, 10)}
          disabled={disabled}
        />
      }
    />
  );
}
