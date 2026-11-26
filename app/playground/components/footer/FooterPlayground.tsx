"use client";

import { useState } from "react";
import Footer from "@/app/components/govuk/Footer";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const NAV_ITEMS = [
  { href: "#1", text: "Navigation item 1" },
  { href: "#2", text: "Navigation item 2" },
  { href: "#3", text: "Navigation item 3" },
  { href: "#4", text: "Navigation item 4" },
  { href: "#5", text: "Navigation item 5" },
  { href: "#6", text: "Navigation item 6" },
];

const META_ITEMS = [
  { href: "#1", text: "Help" },
  { href: "#2", text: "Cookies" },
  { href: "#3", text: "Contact" },
];

export default function FooterPlayground() {
  const [sectionTitle, setSectionTitle] = useState("Two column list");
  const [width, setWidth] = useState("two-thirds");
  const [columns, setColumns] = useState("2");
  const [copyright, setCopyright] = useState("© Crown copyright");
  const [hideLicence, setHideLicence] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Section title"
            value={sectionTitle}
            onChange={setSectionTitle}
          />
          <ControlSelect
            label="Section width"
            value={width}
            onChange={setWidth}
            options={[
              { value: "full", label: "Full" },
              { value: "two-thirds", label: "Two thirds" },
              { value: "one-half", label: "One half" },
              { value: "one-third", label: "One third" },
              { value: "one-quarter", label: "One quarter" },
            ]}
          />
          <ControlSelect
            label="Columns"
            value={columns}
            onChange={setColumns}
            options={[
              { value: "0", label: "No columns" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
          />
          <ControlText
            label="Copyright"
            value={copyright}
            onChange={setCopyright}
          />
          <ControlCheckbox
            label="Hide content licence"
            checked={hideLicence}
            onChange={setHideLicence}
          />
        </>
      }
      preview={
        <Footer
          navigation={[
            {
              title: sectionTitle,
              width,
              columns: Number(columns),
              items: NAV_ITEMS,
            },
          ]}
          meta={{ items: META_ITEMS }}
          contentLicence={hideLicence ? null : {}}
          copyright={copyright ? { text: copyright } : {}}
        />
      }
    />
  );
}
