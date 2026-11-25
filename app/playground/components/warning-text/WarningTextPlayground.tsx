"use client";

import { useState } from "react";
import WarningText from "@/app/components/govuk/WarningText";
import {
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function WarningTextPlayground() {
  const [text, setText] = useState(
    "You can be fined up to £5,000 if you don’t register.",
  );
  const [iconFallbackText, setIconFallbackText] = useState("Warning");
  const [classes, setClasses] = useState("");

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlText
            label="Icon fallback text"
            value={iconFallbackText}
            onChange={setIconFallbackText}
          />
          <ControlText label="Classes" value={classes} onChange={setClasses} />
        </>
      }
      preview={
        <WarningText
          text={text}
          iconFallbackText={iconFallbackText}
          classes={classes}
        />
      }
    />
  );
}
