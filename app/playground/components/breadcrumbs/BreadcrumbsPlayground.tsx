"use client";

import { useState } from "react";
import Breadcrumbs from "@/app/components/govuk/Breadcrumbs";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function BreadcrumbsPlayground() {
  const [labelText, setLabelText] = useState("Breadcrumb");
  const [collapseOnMobile, setCollapseOnMobile] = useState(true);
  const [firstText, setFirstText] = useState("Home");
  const [currentText, setCurrentText] = useState("Travel abroad");

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Label text"
            value={labelText}
            onChange={setLabelText}
          />
          <ControlCheckbox
            label="Collapse on mobile"
            checked={collapseOnMobile}
            onChange={setCollapseOnMobile}
          />
          <ControlText
            label="First crumb"
            value={firstText}
            onChange={setFirstText}
          />
          <ControlText
            label="Current page crumb"
            value={currentText}
            onChange={setCurrentText}
          />
        </>
      }
      preview={
        <Breadcrumbs
          labelText={labelText}
          collapseOnMobile={collapseOnMobile}
          items={[
            { text: firstText, href: "/" },
            {
              text: "Passports, travel and living abroad",
              href: "/browse/abroad",
            },
            { text: currentText },
          ]}
        />
      }
    />
  );
}
