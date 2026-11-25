"use client";

import { useState } from "react";
import Select from "@/app/components/govuk/Select";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function SelectPlayground() {
  const [labelText, setLabelText] = useState("Label text goes here");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [preselectSecond, setPreselectSecond] = useState(false);
  const [disableLast, setDisableLast] = useState(false);

  return (
    <ControlPanel
      title="Select playground"
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
          <ControlCheckbox
            label="Preselect option 2"
            checked={preselectSecond}
            onChange={setPreselectSecond}
          />
          <ControlCheckbox
            label="Disable option 3"
            checked={disableLast}
            onChange={setDisableLast}
          />
        </>
      }
      preview={
        <Select
          key={`select-playground-${preselectSecond ? "second" : "first"}`}
          id="select-playground"
          name="playground"
          label={{ text: labelText }}
          hint={hintText ? { text: hintText } : undefined}
          errorMessage={errorText ? { text: errorText } : undefined}
          items={[
            { value: "1", text: "GOV.UK frontend option 1" },
            {
              value: "2",
              text: "GOV.UK frontend option 2",
              selected: preselectSecond,
            },
            {
              value: "3",
              text: "GOV.UK frontend option 3",
              disabled: disableLast,
            },
          ]}
        />
      }
    />
  );
}
