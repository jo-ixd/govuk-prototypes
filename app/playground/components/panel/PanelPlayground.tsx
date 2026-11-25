"use client";

import { useState } from "react";
import Panel from "@/app/components/govuk/Panel";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const HEADING_LEVELS = [
  { value: "1", label: "h1" },
  { value: "2", label: "h2" },
  { value: "3", label: "h3" },
  { value: "4", label: "h4" },
  { value: "5", label: "h5" },
  { value: "6", label: "h6" },
];

const VARIANTS = [
  { value: "", label: "Confirmation (default)" },
  { value: "govuk-panel--interruption", label: "Interruption" },
];

export default function PanelPlayground() {
  const [titleText, setTitleText] = useState("Application complete");
  const [text, setText] = useState("Your reference number is HDJ2123F");
  const [headingLevelValue, setHeadingLevelValue] = useState("1");
  const [variant, setVariant] = useState("");

  const isInterruption = variant === "govuk-panel--interruption";
  const headingLevel = Number(headingLevelValue) as 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Title" value={titleText} onChange={setTitleText} />
          <ControlText label="Body text" value={text} onChange={setText} />
          <ControlSelect
            label="Heading level"
            value={headingLevelValue}
            options={HEADING_LEVELS}
            onChange={setHeadingLevelValue}
          />
          <ControlSelect
            label="Variant"
            value={variant}
            options={VARIANTS}
            onChange={setVariant}
          />
        </>
      }
      preview={
        <Panel
          titleText={titleText}
          headingLevel={headingLevel}
          text={text}
          classes={variant}
          actions={
            isInterruption
              ? {
                  items: [
                    { text: "Yes, this is correct", type: "button" },
                    { text: "No, change my age", href: "#" },
                  ],
                }
              : undefined
          }
        />
      }
    />
  );
}
