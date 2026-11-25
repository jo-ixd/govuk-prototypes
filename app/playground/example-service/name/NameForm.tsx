"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/govuk/Button";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";
import Input from "@/app/components/govuk/Input";

export default function NameForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialName = searchParams.get("name") ?? "";
  const [error, setError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (error === null) return;
    errorSummaryRef.current?.focus();
  }, [error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawName = formData.get("name");
    const name = typeof rawName === "string" ? rawName.trim() : "";

    if (name === "") {
      setError("Enter your name");
      return;
    }

    // Preserve any date of birth already answered when the user came back
    // from check your answers.
    const currentDob = searchParams.get("dob") ?? "";
    const dobQuery =
      currentDob === "" ? "" : `&dob=${encodeURIComponent(currentDob)}`;

    router.push(
      `/playground/example-service/date-of-birth?name=${encodeURIComponent(name)}${dobQuery}`,
    );
  }

  return (
    <>
      {error !== null && (
        <div ref={errorSummaryRef} tabIndex={-1}>
          <ErrorSummary
            titleText="There is a problem"
            errorList={[
              {
                text: error,
                href: "#name",
                visuallyHiddenText: "Error",
              },
            ]}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          label={{
            text: "What is your name?",
            isPageHeading: true,
            classes: "govuk-label--l",
          }}
          hint={{ text: "For example, Sarah Jacobs" }}
          defaultValue={initialName}
          autocomplete="name"
          {...(error !== null ? { errorMessage: { text: error } } : {})}
        />
        <Button text="Continue" />
      </form>
    </>
  );
}
