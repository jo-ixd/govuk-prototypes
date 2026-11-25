"use client";

import { useState, type FormEvent } from "react";
import Button from "@/app/components/govuk/Button";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Radios from "@/app/components/govuk/Radios";

export default function CookiesPreferencesForm() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      {saved && (
        <NotificationBanner
          type="success"
          text="Your cookie settings were saved"
          classes="govuk-!-margin-bottom-6"
        />
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
