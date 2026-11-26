import type { Metadata } from "next";
import { Suspense } from "react";
import BackLink from "@/app/components/govuk/BackLink";
import DateOfBirthForm from "@/app/playground/example-service/date-of-birth/DateOfBirthForm";
import {
  buildHref,
  readAnswers,
  type ServiceSearchParams,
} from "@/app/playground/example-service/_lib/params";

export const metadata: Metadata = {
  title: "What is your date of birth? - Renew a parking permit",
};

type PageProps = {
  searchParams: Promise<ServiceSearchParams>;
};

export default async function DateOfBirthPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { name } = readAnswers(params);

  return (
    <>
      <BackLink
        text="Back"
        href={buildHref("/playground/example-service/name", { name, dob: "" })}
      />
      <Suspense fallback={null}>
        <DateOfBirthForm />
      </Suspense>
    </>
  );
}
