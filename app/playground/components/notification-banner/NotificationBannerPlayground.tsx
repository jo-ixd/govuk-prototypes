"use client";

import { useState } from "react";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function NotificationBannerPlayground() {
  const [type, setType] = useState("");
  const [titleText, setTitleText] = useState("");
  const [text, setText] = useState(
    "This publication was withdrawn on 7 March 2014.",
  );
  const [titleHeadingLevel, setTitleHeadingLevel] = useState("2");
  const [disableAutoFocus, setDisableAutoFocus] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlSelect
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: "", label: "None (important)" },
              { value: "success", label: "Success" },
            ]}
          />
          <ControlText
            label="Title text"
            value={titleText}
            onChange={setTitleText}
          />
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlSelect
            label="Title heading level"
            value={titleHeadingLevel}
            onChange={setTitleHeadingLevel}
            options={[
              { value: "1", label: "h1" },
              { value: "2", label: "h2" },
              { value: "3", label: "h3" },
              { value: "4", label: "h4" },
            ]}
          />
          <ControlCheckbox
            label="Disable autofocus"
            checked={disableAutoFocus}
            onChange={setDisableAutoFocus}
          />
        </>
      }
      preview={
        <NotificationBanner
          {...(type ? { type: "success" as const } : {})}
          titleText={titleText}
          text={text}
          titleHeadingLevel={
            Number(titleHeadingLevel) as 1 | 2 | 3 | 4
          }
          disableAutoFocus={disableAutoFocus}
        />
      }
    />
  );
}
