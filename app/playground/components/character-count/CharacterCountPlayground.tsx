"use client";

import { useState } from "react";
import CharacterCount from "@/app/components/govuk/CharacterCount";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const MODE_OPTIONS = [
  { value: "characters", label: "Count characters (maxlength)" },
  { value: "words", label: "Count words (maxwords)" },
];

export default function CharacterCountPlayground() {
  const [labelText, setLabelText] = useState("Can you provide more detail?");
  const [mode, setMode] = useState("characters");
  const [limit, setLimit] = useState("10");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");

  const parsedLimit = Number.parseInt(limit, 10);
  const validLimit = Number.isNaN(parsedLimit) ? null : parsedLimit;

  return (
    <ControlPanel
      title="Character count playground"
      fields={
        <>
          <ControlText
            label="Label text"
            value={labelText}
            onChange={setLabelText}
          />
          <ControlSelect
            label="Count mode"
            value={mode}
            options={MODE_OPTIONS}
            onChange={setMode}
          />
          <ControlText label="Limit" value={limit} onChange={setLimit} />
          <ControlText label="Hint text" value={hintText} onChange={setHintText} />
          <ControlText
            label="Error message"
            value={errorText}
            onChange={setErrorText}
          />
        </>
      }
      preview={
        <CharacterCount
          id="character-count-playground"
          name="playground"
          {...(mode === "characters" && validLimit !== null ? { maxlength: validLimit } : {})}
          {...(mode === "words" && validLimit !== null ? { maxwords: validLimit } : {})}
          label={{ text: labelText }}
          {...(hintText ? { hint: { text: hintText } } : {})}
          {...(errorText ? { errorMessage: { text: errorText } } : {})}
        />
      }
    />
  );
}
