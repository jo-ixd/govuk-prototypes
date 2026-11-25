import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import SummaryList from "@/app/components/govuk/SummaryList";
import {
  buildHref,
  formatDob,
  readAnswers,
  type ServiceSearchParams,
} from "@/app/playground/example-service/_lib/params";

export const metadata: Metadata = {
  title: "Check your answers - Renew a parking permit",
};

type PageProps = {
  searchParams: Promise<ServiceSearchParams>;
};

export default async function CheckAnswersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { name, dob } = readAnswers(params);

  return (
    <>
      <BackLink
        text="Back"
        href={buildHref("/playground/example-service/date-of-birth", { name, dob })}
      />
      <h1 className="govuk-heading-xl">
        Check your answers before sending your application
      </h1>
      <SummaryList
        rows={[
          {
            key: { text: "Name" },
            value: { text: name === "" ? "-" : name },
            actions: {
              items: [
                {
                  text: "Change",
                  href: buildHref("/playground/example-service/name", { name, dob }),
                  visuallyHiddenText: "name",
                },
              ],
            },
          },
          {
            key: { text: "Date of birth" },
            value: { text: formatDob(dob) },
            actions: {
              items: [
                {
                  text: "Change",
                  href: buildHref("/playground/example-service/date-of-birth", {
                    name,
                    dob,
                  }),
                  visuallyHiddenText: "date of birth",
                },
              ],
            },
          },
        ]}
      />
      <Button
        href={buildHref("/playground/example-service/confirmation", { name, dob })}
        text="Accept and send application"
      />
    </>
  );
}
