"use client";

import { useState } from "react";
import PhaseBanner from "@/app/components/govuk/PhaseBanner";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function PhaseBannerPlayground() {
  const [tagText, setTagText] = useState("Alpha");
  const [tagClasses, setTagClasses] = useState("");
  const [text, setText] = useState(
    "This is a new service – your feedback will help us to improve it",
  );

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Tag text" value={tagText} onChange={setTagText} />
          <ControlSelect
            label="Tag classes"
            value={tagClasses}
            onChange={setTagClasses}
            options={[
              { value: "", label: "Default" },
              { value: "govuk-tag--grey", label: "Grey" },
              { value: "govuk-tag--green", label: "Green" },
              { value: "govuk-tag--blue", label: "Blue" },
              { value: "govuk-tag--red", label: "Red" },
              { value: "govuk-tag--purple", label: "Purple" },
            ]}
          />
          <ControlText label="Text" value={text} onChange={setText} />
        </>
      }
      preview={<PhaseBanner tag={{ text: tagText, classes: tagClasses }} text={text} />}
    />
  );
}
