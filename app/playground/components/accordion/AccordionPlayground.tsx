"use client";

import { useState } from "react";
import Accordion from "@/app/components/govuk/Accordion";
import GovukPreview from "@/app/playground/_components/GovukPreview";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function AccordionPlayground() {
  const [firstHeading, setFirstHeading] = useState("Writing well for web users");
  const [firstSummary, setFirstSummary] = useState(
    "How to write well for the web",
  );
  const [firstContent, setFirstContent] = useState(
    "Writing well for web users means writing in plain English, keeping sentences short and putting the most important information first.",
  );
  const [firstExpanded, setFirstExpanded] = useState(true);
  const [headingLevel, setHeadingLevel] = useState("2");
  const [rememberExpanded, setRememberExpanded] = useState(true);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="First item heading"
            value={firstHeading}
            onChange={setFirstHeading}
          />
          <ControlText
            label="First item summary"
            value={firstSummary}
            onChange={setFirstSummary}
          />
          <ControlText
            label="First item content"
            value={firstContent}
            onChange={setFirstContent}
          />
          <ControlCheckbox
            label="Expand first item"
            checked={firstExpanded}
            onChange={setFirstExpanded}
          />
          <ControlSelect
            label="Heading level"
            value={headingLevel}
            options={[
              { value: "1", label: "h1" },
              { value: "2", label: "h2" },
              { value: "3", label: "h3" },
              { value: "4", label: "h4" },
              { value: "5", label: "h5" },
              { value: "6", label: "h6" },
            ]}
            onChange={setHeadingLevel}
          />
          <ControlCheckbox
            label="Remember expanded state"
            checked={rememberExpanded}
            onChange={setRememberExpanded}
          />
        </>
      }
      preview={
        <GovukPreview
          deps={[
            firstHeading,
            firstSummary,
            firstContent,
            firstExpanded,
            headingLevel,
            rememberExpanded,
          ]}
        >
          <Accordion
            headingLevel={Number(headingLevel) as 1 | 2 | 3 | 4 | 5 | 6}
            rememberExpanded={rememberExpanded}
            items={[
              {
                heading: { text: firstHeading },
                summary: { text: firstSummary },
                content: { text: firstContent },
                expanded: firstExpanded,
              },
              {
                heading: { text: "Knowing who your users are" },
                summary: { text: "Understand your users and their needs" },
                content: { text: "You need to know who your users are and what they need from your service." },
              },
            ]}
          />
        </GovukPreview>
      }
    />
  );
}
