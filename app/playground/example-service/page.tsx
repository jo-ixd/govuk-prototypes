import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Details from "@/app/components/govuk/Details";

export const metadata: Metadata = {
  title: "Renew a parking permit - GOV.UK Example Service",
};

export default function ExampleServicePage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Renew a parking permit</h1>
      <p className="govuk-body-l">
        Renew a residents’ parking permit that expires in the next 4 weeks. Your
        new permit will be posted to the address on your account.
      </p>
      <Details
        summaryText="Before you start"
        html={
          <ul className="govuk-list govuk-list--bullet">
            <li>the number printed on your current parking permit</li>
            <li>the email address you used when you bought the permit</li>
          </ul>
        }
      />
      <Button href="/playground/example-service/name" isStartButton text="Start now" />
    </>
  );
}
