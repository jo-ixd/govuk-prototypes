"use client";

import { useState } from "react";
import ServiceNavigation, {
  type ServiceNavigationItem,
} from "@/app/components/govuk/ServiceNavigation";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const BASE_ITEMS: ServiceNavigationItem[] = [
  { href: "#/1", text: "Navigation item 1" },
  { href: "#/2", text: "Navigation item 2" },
  { href: "#/3", text: "Navigation item 3" },
  { href: "#/4", text: "Navigation item 4" },
];

export default function ServiceNavigationPlayground() {
  const [serviceName, setServiceName] = useState(
    "Apply for a juggling licence",
  );
  const [serviceUrl, setServiceUrl] = useState("#/");
  const [menuButtonText, setMenuButtonText] = useState("Menu");
  const [navigationLabel, setNavigationLabel] = useState("");
  const [collapse, setCollapse] = useState("auto");
  const [activeSecond, setActiveSecond] = useState(false);

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Service name"
            value={serviceName}
            onChange={setServiceName}
          />
          <ControlText
            label="Service URL"
            value={serviceUrl}
            onChange={setServiceUrl}
          />
          <ControlText
            label="Menu button text"
            value={menuButtonText}
            onChange={setMenuButtonText}
          />
          <ControlText
            label="Navigation aria-label"
            value={navigationLabel}
            onChange={setNavigationLabel}
          />
          <ControlSelect
            label="Collapse navigation on mobile"
            value={collapse}
            onChange={setCollapse}
            options={[
              { value: "auto", label: "Auto (more than one item)" },
              { value: "true", label: "Always collapsed" },
              { value: "false", label: "Never collapsed" },
            ]}
          />
          <ControlCheckbox
            label="Second item active"
            checked={activeSecond}
            onChange={setActiveSecond}
          />
        </>
      }
      preview={
        <ServiceNavigation
          serviceName={serviceName}
          serviceUrl={serviceUrl}
          menuButtonText={menuButtonText}
          {...(navigationLabel ? { navigationLabel } : {})}
          {...(collapse === "auto"
            ? {}
            : { collapseNavigationOnMobile: collapse === "true" })}
          navigation={BASE_ITEMS.map((item, index) =>
            activeSecond && index === 1 ? { ...item, active: true } : item,
          )}
        />
      }
    />
  );
}
