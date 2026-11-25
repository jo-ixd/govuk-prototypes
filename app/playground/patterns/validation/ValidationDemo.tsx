"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Button from "@/app/components/govuk/Button";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import Input from "@/app/components/govuk/Input";
import NotificationBanner from "@/app/components/govuk/NotificationBanner";
import Radios from "@/app/components/govuk/Radios";

type FieldErrors = {
  fullName: string | null;
  email: string | null;
  wantEmail: string | null;
};

type SubmittedDetails = {
  fullName: string;
  email: string;
  wantEmail: string;
};

const NO_ERRORS: FieldErrors = {
  fullName: null,
  email: null,
  wantEmail: null,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export default function ValidationDemo() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(NO_ERRORS);
  const [submitted, setSubmitted] = useState<SubmittedDetails | null>(null);
  const [attempts, setAttempts] = useState(0);

  const errorRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const hasErrors =
    fieldErrors.fullName !== null ||
    fieldErrors.email !== null ||
    fieldErrors.wantEmail !== null;

  useEffect(() => {
    if (hasErrors && attempts > 0 && errorRef.current) {
      errorRef.current.focus();
    }
  }, [hasErrors, attempts]);

  useEffect(() => {
    if (submitted !== null && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  // Real services add 'Error: ' to the start of the page <title> when
  // re-showing it with errors, so screen readers announce it immediately.
  useEffect(() => {
    const previousTitle = document.title;
    if (hasErrors) {
      document.title = `Error: ${previousTitle}`;
    }
    return () => {
      document.title = previousTitle;
    };
  }, [hasErrors]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const fullName = readString(formData, "full-name");
    const email = readString(formData, "email");
    const wantEmail = readString(formData, "want-email");

    const nextErrors: FieldErrors = {
      fullName: null,
      email: null,
      wantEmail: null,
    };

    if (fullName === "") {
      nextErrors.fullName = "Enter your full name";
    }

    if (email === "") {
      nextErrors.email = "Enter an email address";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email =
        "Enter an email address in the correct format, like name@example.com";
    }

    if (wantEmail === "") {
      nextErrors.wantEmail = "Select yes if you want us to email you";
    }

    setAttempts((count) => count + 1);
    setFieldErrors(nextErrors);
    const isValid =
      nextErrors.fullName === null &&
      nextErrors.email === null &&
      nextErrors.wantEmail === null;
    setSubmitted(
      isValid ? { fullName: fullName, email: email, wantEmail: wantEmail } : null,
    );
  }

  const summaryItems: { text: string; href: string }[] = [];
  if (fieldErrors.fullName !== null) {
    summaryItems.push({ text: fieldErrors.fullName, href: "#full-name" });
  }
  if (fieldErrors.email !== null) {
    summaryItems.push({ text: fieldErrors.email, href: "#email" });
  }
  if (fieldErrors.wantEmail !== null) {
    summaryItems.push({ text: fieldErrors.wantEmail, href: "#want-email" });
  }

  return (
    <>
      {submitted !== null && (
        <div ref={successRef} tabIndex={-1}>
          <NotificationBanner
            type="success"
            titleText="Details saved"
            html={
              <p className="govuk-notification-banner__heading">
                Thanks {submitted.fullName}. We{" "}
                {submitted.wantEmail === "yes" ? "will" : "will not"} email you
                at {submitted.email}.
              </p>
            }
          />
        </div>
      )}
      {hasErrors && (
        <div ref={errorRef} tabIndex={-1}>
          <ErrorSummary
            titleText="There is a problem"
            errorList={summaryItems}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Input
          id="full-name"
          name="full-name"
          label={{ text: "Full name" }}
          autocomplete="name"
          {...(fieldErrors.fullName !== null
            ? { errorMessage: { text: fieldErrors.fullName } }
            : {})}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label={{ text: "Email address" }}
          autocomplete="email"
          {...(fieldErrors.email !== null
            ? { errorMessage: { text: fieldErrors.email } }
            : {})}
        />
        <Radios
          name="want-email"
          fieldset={{
            legend: {
              text: "Do you want us to email you?",
              classes: "govuk-fieldset__legend--m",
            },
          }}
          errorMessage={
            fieldErrors.wantEmail !== null
              ? { text: fieldErrors.wantEmail }
              : null
          }
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ]}
        />
        <Button text="Continue" />
      </form>
    </>
  );
}
