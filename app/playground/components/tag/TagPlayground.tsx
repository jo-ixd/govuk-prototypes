"use client";

import { useState } from "react";
import Tag from "@/app/components/govuk/Tag";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const COLOUR_OPTIONS = [
  { value: "", label: "Default" },
  { value: "govuk-tag--grey", label: "Grey" },
  { value: "govuk-tag--teal", label: "Teal" },
  { value: "govuk-tag--green", label: "Green" },
  { value: "govuk-tag--purple", label: "Purple" },
  { value: "govuk-tag--magenta", label: "Magenta" },
  { value: "govuk-tag--red", label: "Red" },
  { value: "govuk-tag--orange", label: "Orange" },
  { value: "govuk-tag--yellow", label: "Yellow" },
];

export default function TagPlayground() {
  const [text, setText] = useState("Alpha");
  const [colour, setColour] = useState("");
  const [id, setId] = useState("");

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlSelect
            label="Colour"
            value={colour}
            options={COLOUR_OPTIONS}
            onChange={setColour}
          />
          <ControlText
            label="ID (via attributes)"
            value={id}
            onChange={setId}
          />
        </>
      }
      preview={<Tag text={text} classes={colour} attributes={id ? { id } : {}} />}
    />
  );
}
