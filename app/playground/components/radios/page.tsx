import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Radios from "@/app/components/govuk/Radios";
import Example from "@/app/playground/_components/Example";
import RadiosPlayground from "./RadiosPlayground";

export const metadata: Metadata = { title: "Radios - GOV.UK Playground" };

export default function RadiosPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Radios</h1>
      <p className="govuk-body-l">
        Lets users select a single option from a list.
      </p>

      <Example
        title="Default radios"
        description="Radios nested in a fieldset with a legend."
      >
        <Radios
          name="example-default"
          fieldset={{ legend: { text: "Have you changed your name?" } }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ]}
        />
      </Example>

      <Example
        title="Radios with a hint"
        description="A hint below the legend is linked to the fieldset with aria-describedby."
      >
        <Radios
          name="example-with-hint"
          fieldset={{ legend: { text: "Have you changed your name?" } }}
          hint={{
            text: "This includes changing your last name or spelling your name differently.",
          }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ]}
        />
      </Example>

      <Example
        title="Inline radios"
        description="Use the govuk-radios--inline class to place radios side by side."
      >
        <Radios
          idPrefix="example-inline"
          name="example"
          classes="govuk-radios--inline"
          fieldset={{ legend: { text: "Have you changed your name?" } }}
          hint={{
            text: "This includes changing your last name or spelling your name differently.",
          }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No", checked: true },
          ]}
        />
      </Example>

      <Example
        title="Radios with a legend as page heading"
        description="Item labels can use html, and the legend can be the page heading."
      >
        <Radios
          idPrefix="housing-act"
          name="housing-act"
          fieldset={{
            legend: {
              text: "Which part of the Housing Act was your licence issued under?",
              classes: "govuk-fieldset__legend--l",
              isPageHeading: true,
            },
          }}
          hint={{ text: "Select one of the options below." }}
          items={[
            {
              value: "part-2",
              html: (
                <>
                  <span className="govuk-heading-s govuk-!-margin-bottom-1">
                    Part 2 of the Housing Act 2004
                  </span>{" "}
                  For properties that are 3 or more stories high and occupied by
                  5 or more people
                </>
              ),
            },
            {
              value: "part-3",
              html: (
                <>
                  <span className="govuk-heading-s govuk-!-margin-bottom-1">
                    Part 3 of the Housing Act 2004
                  </span>{" "}
                  For properties that are within a geographical area defined by
                  a local council
                </>
              ),
            },
          ]}
        />
      </Example>

      <Example
        title="Radios with a divider"
        description="A divider option adds text, such as 'or', between radio items."
      >
        <Radios
          idPrefix="example-divider"
          name="sign-in-method"
          fieldset={{ legend: { text: "How do you want to sign in?" } }}
          items={[
            { value: "government-gateway", text: "Use Government Gateway" },
            { value: "govuk-verify", text: "Use GOV.UK Verify" },
            { divider: "or" },
            { value: "create-account", text: "Create an account" },
          ]}
        />
      </Example>

      <Example
        title="Radios with hints on items"
        description="Each radio can have its own hint, associated with the input via aria-describedby."
      >
        <Radios
          idPrefix="gov"
          name="gov"
          fieldset={{
            legend: {
              text: "How do you want to sign in?",
              classes: "govuk-fieldset__legend--l",
              isPageHeading: true,
            },
          }}
          items={[
            {
              value: "gateway",
              text: "Sign in with Government Gateway",
              id: "gateway",
              hint: {
                text: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
              },
            },
            {
              value: "verify",
              text: "Sign in with GOV.UK Verify",
              id: "verify",
              hint: {
                text: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
              },
            },
          ]}
        />
      </Example>

      <Example
        title="Radios with an error message"
        description="The error message is linked to the fieldset and the form group gets an error state."
      >
        <Radios
          idPrefix="example-error"
          name="example-error"
          errorMessage={{ text: "Please select an option" }}
          fieldset={{ legend: { text: "Have you changed your name?" } }}
          items={[
            { value: "yes", text: "Yes" },
            { value: "no", text: "No", checked: true },
          ]}
        />
      </Example>

      <Example
        title="Radios with conditional items"
        description="A checked conditional radio reveals extra content, wired up with data-aria-controls."
      >
        <Radios
          idPrefix="how-contacted-checked"
          name="how-contacted-checked"
          fieldset={{ legend: { text: "How do you want to be contacted?" } }}
          items={[
            {
              value: "email",
              text: "Email",
              checked: true,
              conditional: {
                html: (
                  <>
                    <label className="govuk-label" htmlFor="context-email">
                      Email address
                    </label>
                    <input
                      className="govuk-input govuk-!-width-one-third"
                      name="context-email"
                      type="text"
                      id="context-email"
                    />
                  </>
                ),
              },
            },
            {
              value: "phone",
              text: "Phone",
              conditional: {
                html: (
                  <>
                    <label className="govuk-label" htmlFor="contact-phone">
                      Phone number
                    </label>
                    <input
                      className="govuk-input govuk-!-width-one-third"
                      name="contact-phone"
                      type="text"
                      id="contact-phone"
                    />
                  </>
                ),
              },
            },
            {
              value: "text",
              text: "Text message",
              conditional: {
                html: (
                  <>
                    <label
                      className="govuk-label"
                      htmlFor="contact-text-message"
                    >
                      Mobile phone number
                    </label>
                    <input
                      className="govuk-input govuk-!-width-one-third"
                      name="contact-text-message"
                      type="text"
                      id="contact-text-message"
                    />
                  </>
                ),
              },
            },
          ]}
        />
      </Example>

      <RadiosPlayground />
    </>
  );
}
