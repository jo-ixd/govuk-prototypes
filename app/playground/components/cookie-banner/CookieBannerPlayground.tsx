"use client";

import { useState } from "react";
import CookieBanner from "@/app/components/govuk/CookieBanner";
import type { CookieBannerMessage } from "@/app/components/govuk/CookieBanner";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function CookieBannerPlayground() {
  const [message, setMessage] = useState("prompt");
  const [ariaLabel, setAriaLabel] = useState("Cookie banner");
  const [hidden, setHidden] = useState(false);
  const [headingText, setHeadingText] = useState(
    "Cookies on this government service",
  );
  const [text, setText] = useState(
    "We use analytics cookies to help understand how users use our service.",
  );

  const messages: CookieBannerMessage[] =
    message === "prompt"
      ? [
          {
            headingText,
            text,
            actions: [
              {
                text: "Accept analytics cookies",
                type: "submit",
                name: "cookies",
                value: "accept",
              },
              {
                text: "Reject analytics cookies",
                type: "submit",
                name: "cookies",
                value: "reject",
              },
              {
                text: "View cookie preferences",
                href: "/cookie-preferences",
              },
            ],
          },
        ]
      : [
          {
            text:
              message === "accepted"
                ? "Your cookie preferences have been saved. You have accepted cookies."
                : "Your cookie preferences have been saved. You have rejected cookies.",
            role: "alert",
            actions: [{ text: "Hide cookie message", type: "button" }],
          },
        ];

  return (
    <ControlPanel
      fields={
        <>
          <ControlSelect
            label="Message"
            value={message}
            onChange={setMessage}
            options={[
              { value: "prompt", label: "Cookie prompt" },
              { value: "accepted", label: "Accepted confirmation" },
              { value: "rejected", label: "Rejected confirmation" },
            ]}
          />
          <ControlText
            label="Banner aria-label"
            value={ariaLabel}
            onChange={setAriaLabel}
          />
          <ControlText
            label="Heading"
            value={headingText}
            onChange={setHeadingText}
          />
          <ControlText
            label="Text"
            value={text}
            onChange={setText}
          />
          <ControlCheckbox
            label="Hidden"
            checked={hidden}
            onChange={setHidden}
          />
        </>
      }
      preview={
        <CookieBanner ariaLabel={ariaLabel} hidden={hidden} messages={messages} />
      }
    />
  );
}
