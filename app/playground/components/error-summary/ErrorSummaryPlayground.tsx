"use client";

import { useState } from "react";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

export default function ErrorSummaryPlayground() {
  const [titleText, setTitleText] = useState("There is a problem");
  const [description, setDescription] = useState("Please fix the errors below.");
  const [firstError, setFirstError] = useState(
    "The date your passport was issued must be in the past",
  );
  const [showSecondError, setShowSecondError] = useState(true);
  const [disableAutoFocus, setDisableAutoFocus] = useState(false);

  return (
    <ControlPanel
      title="Error summary playground"
      fields={
        <>
          <ControlText
            label="Title"
            value={titleText}
            onChange={(value) => setTitleText(value)}
          />
          <ControlText
            label="Description"
            value={description}
            onChange={(value) => setDescription(value)}
          />
          <ControlText
            label="First error"
            value={firstError}
            onChange={(value) => setFirstError(value)}
          />
          <ControlCheckbox
            label="Second error"
            checked={showSecondError}
            onChange={(checked) => setShowSecondError(checked)}
          />
          <ControlCheckbox
            label="Disable autofocus"
            checked={disableAutoFocus}
            onChange={(checked) => setDisableAutoFocus(checked)}
          />
        </>
      }
      preview={
        <ErrorSummary
          titleText={titleText}
          {...(description ? { description: { text: description } } : {})}
          {...(firstError
            ? {
                errorList: [
                  { text: firstError, href: "#content" },
                  ...(showSecondError
                    ? [
                        {
                          text: "Enter a postcode, like AA1 1AA",
                          href: "#content",
                        },
                      ]
                    : []),
                ],
              }
            : {})}
          disableAutoFocus={disableAutoFocus}
        />
      }
    />
  );
}
