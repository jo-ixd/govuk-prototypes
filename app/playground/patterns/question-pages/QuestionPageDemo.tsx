"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Radios from "@/app/components/govuk/Radios";

const COUNTRY_LABELS: Record<string, string> = {
  england: "England",
  scotland: "Scotland",
  wales: "Wales",
  "northern-ireland": "Northern Ireland",
};

export default function QuestionPageDemo() {
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const errorRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const hasError = error !== null;

  useEffect(() => {
    if (hasError && attempts > 0 && errorRef.current) {
      errorRef.current.focus();
    }
  }, [hasError, attempts]);

  useEffect(() => {
    if (answer !== null && successRef.current) {
      successRef.current.focus();
    }
  }, [answer]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selected = formData.get("where-do-you-live");
    const country = typeof selected === "string" ? selected : "";
    setAttempts((count) => count + 1);
    if (country === "") {
      setAnswer(null);
      setError("Select where you live");
      return;
    }
    setError(null);
    setAnswer(country);
  }

  return (
    <>
      <BackLink text="Back" href="#" />
      {answer !== null && (
        <div ref={successRef} tabIndex={-1}>
          <NotificationBanner
            type="success"
            titleText="Answer saved"
            html={
              <p className="govuk-notification-banner__heading">
                You told us you live in{" "}
                <strong>{COUNTRY_LABELS[answer] ?? answer}</strong>. In a real
                service you would now move on to the next question.
              </p>
            }
          />
        </div>
      )}
      {hasError && (
        <div ref={errorRef} tabIndex={-1}>
          <ErrorSummary
            titleText="There is a problem"
            errorList={[{ text: error ?? "", href: "#where-do-you-live" }]}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Radios
          name="where-do-you-live"
          fieldset={{
            legend: {
              text: "Where do you live?",
              isPageHeading: true,
              classes: "govuk-fieldset__legend--l",
            },
          }}
          hint={{
            text: "If you live in more than one country, select the one you live in most of the time",
          }}
          errorMessage={hasError ? { text: error } : null}
          items={[
            { value: "england", text: "England" },
            { value: "scotland", text: "Scotland" },
            { value: "wales", text: "Wales" },
            { value: "northern-ireland", text: "Northern Ireland" },
          ]}
        />
        <Button text="Continue" />
      </form>
    </>
  );
}
