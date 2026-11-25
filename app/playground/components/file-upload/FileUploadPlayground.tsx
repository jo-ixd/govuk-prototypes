"use client";

import { useState } from "react";
import FileUpload from "@/app/components/govuk/FileUpload";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function FileUploadPlayground() {
  const [labelText, setLabelText] = useState("Upload a file");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [enhanced, setEnhanced] = useState(true);
  const [multiple, setMultiple] = useState(false);

  return (
    <ControlPanel
      title="File upload playground"
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
            label="JavaScript enhancement"
            checked={enhanced}
            onChange={setEnhanced}
          />
          <ControlCheckbox
            label="Allow multiple files"
            checked={multiple}
            onChange={setMultiple}
          />
        </>
      }
      preview={
        <FileUpload
          key={`file-upload-playground-${enhanced ? "js" : "plain"}`}
          id="file-upload-playground"
          name="playground"
          label={{ text: labelText }}
          hint={hintText ? { text: hintText } : undefined}
          errorMessage={errorText ? { text: errorText } : undefined}
          javascript={enhanced}
          multiple={multiple}
        />
      }
    />
  );
}
