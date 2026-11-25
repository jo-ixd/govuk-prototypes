import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Details from "@/app/components/govuk/Details";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Start using a service - GOV.UK Patterns",
};

export default function StartUsingAServicePage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Start using a service</h1>
      <p className="govuk-body-l">
        GOV.UK services must start on a GOV.UK content page. This links your
        service to the rest of GOV.UK, and means that users can find it using
        search or through GOV.UK&rsquo;s navigation.
      </p>

      <Example
        title="Simple start page"
        description="A simple start page gives users just enough information to understand what the service does and whether it will meet their need: who it is for, what they will need, how much it costs and other ways to access the service. The start button text is consistent with the action the user is taking."
      >
        <h1 className="govuk-heading-xl">Apply for a Home Upgrade Grant</h1>
        <p className="govuk-body-l">
          The Home Upgrade Grant helps households on low incomes pay for energy
          saving improvements to their home, like insulation and low carbon
          heating.
        </p>
        <p className="govuk-body">
          It costs £0 to apply. It usually takes 20 minutes to apply online.
        </p>
        <Details
          summaryText="Before you start, check you can use this service"
          html={
            <ul className="govuk-list govuk-list--bullet">
              <li>
                you own the home you are applying for, or live there with the
                owner
              </li>
              <li>your household income is £31,000 a year or less</li>
              <li>
                you have your National Insurance number and your most recent
                energy bill to hand
              </li>
            </ul>
          }
        />
        <Button href="#" isStartButton text="Start now" />
        <p className="govuk-body">
          You can also apply by phone on{" "}
          <a className="govuk-link" href="tel:03001234567">
            0300 123 4567
          </a>
          , or by post using a paper form.
        </p>
      </Example>

      <Example
        title="Start point within a multipart guide"
        description="If the start point is linked to a wider process that needs more explanation, embed it within a multipart guide instead of a separate start page - so users do not miss important context."
      >
        <h1 className="govuk-heading-xl">
          Apply for Carer&rsquo;s Allowance
        </h1>
        <p className="govuk-body-l">
          Carer&rsquo;s Allowance is a taxable benefit paid to people who spend
          at least 35 hours a week caring for someone.
        </p>
        <p className="govuk-body">
          Before you apply, read the guide to find out:
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>which documents you&rsquo;ll need to apply</li>
          <li>how your earnings affect the amount you get</li>
          <li>what happens after you apply</li>
        </ul>
        <p className="govuk-body">
          If you&rsquo;ve read the guide and are ready to apply, start the
          application.
        </p>
        <Button href="#" isStartButton text="Apply now" />
      </Example>

      <Example
        title="Secondary call to action"
        description="If a start point needs a secondary call to action, such as signing in to resume an application, use a standard link rather than a second button."
      >
        <h1 className="govuk-heading-xl">Renew your implant registration</h1>
        <p className="govuk-body-l">
          Renew your registration if it expires in the next 3 months. It takes
          about 10 minutes.
        </p>
        <Button href="#" isStartButton text="Sign in" />
        <p className="govuk-body">
          <a className="govuk-link" href="#">
            Or register for an account
          </a>{" "}
          if you&rsquo;ve not used this service before.
        </p>
      </Example>
    </>
  );
}
