"use client";

import { useState } from "react";
import BackLink from "@/app/components/govuk/BackLink";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function BackLinkPlayground() {
  const [text, setText] = useState("Back");
  const [href, setHref] = useState("#");
  const [inverse, setInverse] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Text" value={text} onChange={setText} />
          <ControlText label="Href" value={href} onChange={setHref} />
          <ControlCheckbox
            label="Inverse (on dark background)"
            checked={inverse}
            onChange={setInverse}
          />
        </>
      }
      {...(inverse ? { previewClasses: "playground-preview--dark" } : {})}
      preview={
        <BackLink
          text={text}
          href={href}
          {...(inverse ? { classes: "govuk-back-link--inverse" } : {})}
        />
      }
    />
  );
}
