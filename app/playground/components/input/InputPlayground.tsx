"use client";

import { useState } from "react";
import Input from "@/app/components/govuk/Input";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const WIDTH_OPTIONS = [
  { value: "", label: "Default" },
  { value: "govuk-input--width-2", label: "2 characters" },
  { value: "govuk-input--width-3", label: "3 characters" },
  { value: "govuk-input--width-4", label: "4 characters" },
  { value: "govuk-input--width-5", label: "5 characters" },
  { value: "govuk-input--width-10", label: "10 characters" },
  { value: "govuk-input--width-20", label: "20 characters" },
  { value: "govuk-input--width-30", label: "30 characters" },
];

export default function InputPlayground() {
  const [labelText, setLabelText] = useState("National Insurance number");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [prefixText, setPrefixText] = useState("");
  const [suffixText, setSuffixText] = useState("");
  const [widthClass, setWidthClass] = useState("");
  const [disabled, setDisabled] = useState(false);

  return (
    <ControlPanel
      title="Input playground"
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
          <ControlText
            label="Prefix"
            value={prefixText}
            onChange={setPrefixText}
          />
          <ControlText
            label="Suffix"
            value={suffixText}
            onChange={setSuffixText}
          />
          <ControlSelect
            label="Width"
            value={widthClass}
            options={WIDTH_OPTIONS}
            onChange={setWidthClass}
          />
          <ControlCheckbox
            label="Disabled"
            checked={disabled}
            onChange={setDisabled}
          />
        </>
      }
      preview={
        <Input
          id="input-playground"
          name="playground"
          label={{ text: labelText }}
          {...(hintText ? { hint: { text: hintText } } : {})}
          {...(errorText ? { errorMessage: { text: errorText } } : {})}
          {...(prefixText ? { prefix: { text: prefixText } } : {})}
          {...(suffixText ? { suffix: { text: suffixText } } : {})}
          {...(widthClass ? { classes: widthClass } : {})}
          disabled={disabled}
        />
      }
    />
  );
}
