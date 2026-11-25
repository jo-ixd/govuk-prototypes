"use client";

import { useState } from "react";
import InsetText from "@/app/components/govuk/InsetText";
import {
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function InsetTextPlayground() {
  const [text, setText] = useState(
    "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  );
  const [id, setId] = useState("");
  const [classes, setClasses] = useState("");

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlText label="ID" value={id} onChange={setId} />
          <ControlText label="Classes" value={classes} onChange={setClasses} />
        </>
      }
      preview={
        <InsetText text={text} id={id || undefined} classes={classes} />
      }
    />
  );
}
