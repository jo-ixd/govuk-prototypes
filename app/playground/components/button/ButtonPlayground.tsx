"use client";

import { useState } from "react";
import Button, { type ButtonElement } from "@/app/components/govuk/Button";
import {
  ControlCheckbox,
  ControlPanel,
  ControlSelect,
  ControlText,
} from "@/app/playground/_components/Controls";

const variantClasses: Record<string, string> = {
  default: "",
  secondary: "govuk-button--secondary",
  warning: "govuk-button--warning",
  inverse: "govuk-button--inverse",
};

export default function ButtonPlayground() {
  const [text, setText] = useState("Save and continue");
  const [element, setElement] = useState<ButtonElement>("button");
  const [variant, setVariant] = useState("default");
  const [disabled, setDisabled] = useState(false);
  const [isStartButton, setIsStartButton] = useState(false);

  return (
    <ControlPanel
      title="Button playground"
      previewClasses={variant === "inverse" ? "playground-preview--dark" : ""}
      fields={
        <>
          <ControlText
            label="Text"
            value={text}
            onChange={(value) => setText(value)}
          />
          <ControlSelect
            label="Element"
            value={element}
            options={[
              { value: "button", label: "button" },
              { value: "a", label: "a (link)" },
              { value: "input", label: "input" },
            ]}
            onChange={(value) => setElement(value as ButtonElement)}
          />
          <ControlSelect
            label="Variant"
            value={variant}
            options={[
              { value: "default", label: "Default" },
              { value: "secondary", label: "Secondary" },
              { value: "warning", label: "Warning" },
              { value: "inverse", label: "Inverse" },
            ]}
            onChange={(value) => setVariant(value)}
          />
          <ControlCheckbox
            label="Disabled"
            checked={disabled}
            onChange={(checked) => setDisabled(checked)}
          />
          <ControlCheckbox
            label="Start button"
            checked={isStartButton}
            onChange={(checked) => setIsStartButton(checked)}
          />
        </>
      }
      preview={
        <Button
          text={text}
          element={element}
          {...(element === "a" || isStartButton ? { href: "#content" } : {})}
          classes={variantClasses[variant]}
          disabled={disabled}
          isStartButton={isStartButton}
        />
      }
    />
  );
}
