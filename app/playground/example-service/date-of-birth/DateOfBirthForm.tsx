"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/govuk/Button";
import DateInput from "@/app/components/govuk/DateInput";
import ErrorSummary from "@/app/components/govuk/ErrorSummary";

function asText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export default function DateOfBirthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialParts = (searchParams.get("dob") ?? "").split("-");
  const initialDay = initialParts.length === 3 ? initialParts[0] : "";
  const initialMonth = initialParts.length === 3 ? initialParts[1] : "";
  const initialYear = initialParts.length === 3 ? initialParts[2] : "";

  const [error, setError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (error === null) return;
    errorSummaryRef.current?.focus();
  }, [error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const day = asText(formData.get("day"));
    const month = asText(formData.get("month"));
    const year = asText(formData.get("year"));

    if (day === "" || month === "" || year === "") {
      setError("Enter your date of birth");
      return;
    }

    const name = searchParams.get("name") ?? "";
    const dob = `${day}-${month}-${year}`;

    router.push(
      `/playground/example-service/check-answers?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`,
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
                href: "#date-of-birth",
                visuallyHiddenText: "Error",
              },
            ]}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <DateInput
          id="date-of-birth"
          fieldset={{
            legend: {
              text: "What is your date of birth?",
              isPageHeading: true,
              classes: "govuk-fieldset__legend--l",
            },
          }}
          hint={{ text: "For example, 27 3 2007" }}
          errorMessage={error !== null ? { text: error } : null}
          day={{ name: "day", value: initialDay, autocomplete: "bday-day" }}
          month={{ name: "month", value: initialMonth, autocomplete: "bday-month" }}
          year={{ name: "year", value: initialYear, autocomplete: "bday-year" }}
        />
        <Button text="Continue" />
      </form>
    </>
  );
}
