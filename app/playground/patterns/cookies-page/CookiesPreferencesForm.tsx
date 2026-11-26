"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "@/app/components/govuk/Button";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Radios from "@/app/components/govuk/Radios";

export default function CookiesPreferencesForm() {
  const [saveCount, setSaveCount] = useState(0);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // The banner stays mounted after the first save, so saving again would not
  // re-render it. Move focus back to it on every save to re-announce the
  // confirmation for screen reader users.
  useEffect(() => {
    if (saveCount > 0 && bannerRef.current) {
      bannerRef.current.focus();
    }
  }, [saveCount]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveCount((count) => count + 1);
  }

  return (
    <>
      {saveCount > 0 && (
        <div ref={bannerRef} tabIndex={-1}>
          <NotificationBanner
            type="success"
            text="Your cookie settings were saved"
            classes="govuk-!-margin-bottom-6"
          />
        </div>
      )}

      <h2 className="govuk-heading-l">Change your cookie settings</h2>

      <form onSubmit={handleSubmit} noValidate>
        <Radios
          name="cookies-functional"
          fieldset={{
            legend: {
              text: "Do you want to accept functional cookies?",
              classes: "govuk-fieldset__legend--s",
            },
          }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No", checked: true },
          ]}
        />

        <Radios
          name="cookies-analytics"
          fieldset={{
            legend: {
              text: "Do you want to accept analytics cookies?",
              classes: "govuk-fieldset__legend--s",
            },
          }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No", checked: true },
          ]}
        />

        <Button text="Save cookie settings" />
      </form>
    </>
  );
}
