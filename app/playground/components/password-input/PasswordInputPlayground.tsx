"use client";

import { useState } from "react";
import PasswordInput from "@/app/components/govuk/PasswordInput";
import {
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function PasswordInputPlayground() {
  const [labelText, setLabelText] = useState("Password");
  const [hintText, setHintText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showText, setShowText] = useState("");
  const [hideText, setHideText] = useState("");

  return (
    <ControlPanel
      title="Password input playground"
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
            label="Show button text"
            value={showText}
            onChange={setShowText}
          />
          <ControlText
            label="Hide button text"
            value={hideText}
            onChange={setHideText}
          />
        </>
      }
      preview={
        <PasswordInput
          id="password-input-playground"
          name="playground"
          label={{ text: labelText }}
          {...(hintText ? { hint: { text: hintText } } : {})}
          {...(errorText ? { errorMessage: { text: errorText } } : {})}
          {...(showText ? { showPasswordText: showText } : {})}
          {...(hideText ? { hidePasswordText: hideText } : {})}
        />
      }
    />
  );
}
