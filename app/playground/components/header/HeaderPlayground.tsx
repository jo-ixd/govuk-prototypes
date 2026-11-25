"use client";

import { useState } from "react";
import Header from "@/app/components/govuk/Header";
import {
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function HeaderPlayground() {
  const [homepageUrl, setHomepageUrl] = useState("//gov.uk");
  const [productName, setProductName] = useState("Product Name");
  const [containerClasses, setContainerClasses] = useState(
    "govuk-width-container",
  );

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Homepage URL"
            value={homepageUrl}
            onChange={setHomepageUrl}
          />
          <ControlText
            label="Product name"
            value={productName}
            onChange={setProductName}
          />
          <ControlSelect
            label="Container classes"
            value={containerClasses}
            onChange={setContainerClasses}
            options={[
              { value: "govuk-width-container", label: "Default width" },
              {
                value: "govuk-header__container--full-width",
                label: "Full width",
              },
            ]}
          />
        </>
      }
      preview={
        <Header
          homepageUrl={homepageUrl}
          productName={productName}
          containerClasses={containerClasses}
        />
      }
    />
  );
}
