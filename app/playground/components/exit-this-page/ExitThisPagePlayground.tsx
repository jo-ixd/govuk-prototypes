"use client";

import { useState } from "react";
import ExitThisPage from "@/app/components/govuk/ExitThisPage";
import {
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function ExitThisPagePlayground() {
  const [text, setText] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/playground");
  const [activatedText, setActivatedText] = useState("");
  const [timedOutText, setTimedOutText] = useState("");

  return (
    <ControlPanel
      title="Exit this page playground"
      fields={
        <>
          <ControlText
            label="Text"
            value={text}
            onChange={(value) => setText(value)}
          />
          <ControlText
            label="Redirect URL"
            value={redirectUrl}
            onChange={(value) => setRedirectUrl(value)}
          />
          <ControlText
            label="Activated text"
            value={activatedText}
            onChange={(value) => setActivatedText(value)}
          />
          <ControlText
            label="Timed out text"
            value={timedOutText}
            onChange={(value) => setTimedOutText(value)}
          />
        </>
      }
      preview={
        <ExitThisPage
          {...(text ? { text } : {})}
          redirectUrl={redirectUrl}
          activatedText={activatedText}
          timedOutText={timedOutText}
        />
      }
    />
  );
}
