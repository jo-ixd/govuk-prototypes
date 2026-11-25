"use client";

import { useState } from "react";
import Tabs from "@/app/components/govuk/Tabs";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const tabLabels = ["Past day", "Past week", "Past month", "Past year"];

export default function TabsPlayground() {
  const [title, setTitle] = useState("Contents");
  const [tabCount, setTabCount] = useState("3");
  const [idPrefix, setIdPrefix] = useState("example-tabs");

  const items = tabLabels.slice(0, Number(tabCount)).map((label, index) => ({
    label,
    panel: {
      text: `Panel ${index + 1}: statistics for the ${label.toLowerCase()}.`,
    },
  }));

  return (
    <ControlPanel
      fields={
        <>
          <ControlText label="Title" value={title} onChange={setTitle} />
          <ControlSelect
            label="Number of tabs"
            value={tabCount}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            onChange={setTabCount}
          />
          <ControlText label="ID prefix" value={idPrefix} onChange={setIdPrefix} />
        </>
      }
      preview={<Tabs title={title} idPrefix={idPrefix} items={items} />}
    />
  );
}
