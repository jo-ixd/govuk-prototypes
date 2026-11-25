"use client";

import { useState } from "react";
import SkipLink from "@/app/components/govuk/SkipLink";
import {
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function SkipLinkPlayground() {
  const [text, setText] = useState("Skip to main content");
  const [href, setHref] = useState("#content");
  const [ariaLabel, setAriaLabel] = useState("");

  return (
    <ControlPanel
      title="Playground (press Tab in the preview to see the skip link)"
      fields={
        <>
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlText label="Href" value={href} onChange={setHref} />
          <ControlText
            label="aria-label (via attributes)"
            value={ariaLabel}
            onChange={setAriaLabel}
          />
        </>
      }
      preview={
        <SkipLink
          text={text}
          href={href}
          attributes={ariaLabel ? { "aria-label": ariaLabel } : {}}
        />
      }
    />
  );
}
