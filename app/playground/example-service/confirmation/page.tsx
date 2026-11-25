import type { Metadata } from "next";
import InsetText from "@/app/components/govuk/InsetText";
import Panel from "@/app/components/govuk/Panel";
import {
  formatDob,
  readAnswers,
  referenceNumber,
  type ServiceSearchParams,
} from "@/app/playground/example-service/_lib/params";

export const metadata: Metadata = {
  title: "Application complete - Renew a parking permit",
};

type PageProps = {
  searchParams: Promise<ServiceSearchParams>;
};

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { name, dob } = readAnswers(params);
  const displayName = name === "" ? "-" : name;
  const reference = referenceNumber(name, dob);

  return (
    <>
      <Panel
        titleText="Application complete"
        html={
          <p className="govuk-body">
            Your parking permit renewal for {displayName} (date of birth{" "}
            {formatDob(dob)}) has been submitted. Your reference number is{" "}
            <strong>{reference}</strong>.
          </p>
        }
      />
      <h2 className="govuk-heading-m">What happens next</h2>
      <ol className="govuk-list govuk-list--number">
        <li>
          We will check your details and confirm your renewal within 10 working
          days.
        </li>
        <li>We will post your new parking permit to the address on your account.</li>
        <li>You can keep using your current permit until your new one arrives.</li>
      </ol>
      <InsetText text="We've sent a confirmation email to the email address linked to your permit. It contains your reference number in case you need to contact us." />
    </>
  );
}
