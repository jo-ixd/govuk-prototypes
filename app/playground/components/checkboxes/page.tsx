import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Checkboxes from "@/app/components/govuk/Checkboxes";
import Example from "@/app/playground/_components/Example";
import CheckboxesPlayground from "./CheckboxesPlayground";

export const metadata: Metadata = { title: "Checkboxes - GOV.UK Playground" };

export default function CheckboxesPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Checkboxes</h1>
      <p className="govuk-body-l">
        Lets users select one or more options from a list.
      </p>

      <Example
        title="Default checkboxes"
        description="Checkboxes nested in a fieldset with a legend."
      >
        <Checkboxes
          name="nationality"
          fieldset={{ legend: { text: "What is your nationality?" } }}
          items={[
            { value: "british", text: "British" },
            { value: "irish", text: "Irish" },
            { value: "other", text: "Citizen of another country" },
          ]}
        />
      </Example>

      <Example
        title="Checkboxes with a hint"
        description="A hint below the legend is linked to the fieldset with aria-describedby."
      >
        <Checkboxes
          name="nationality-hint"
          fieldset={{ legend: { text: "What is your nationality?" } }}
          hint={{ text: "Select all that apply" }}
          items={[
            { value: "british", text: "British" },
            { value: "irish", text: "Irish" },
            { value: "other", text: "Citizen of another country" },
          ]}
        />
      </Example>

      <Example
        title="Checkboxes with pre-checked values and conditional items"
        description="The values array pre-checks items, and checked conditional checkboxes reveal their content."
      >
        <Checkboxes
          idPrefix="how-contacted-checked"
          name="how-contacted-checked"
          values={["email", "text"]}
          fieldset={{ legend: { text: "How do you want to be contacted?" } }}
          items={[
            {
              value: "email",
              text: "Email",
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

      <Example
        title="Checkboxes with a divider and an exclusive option"
        description="A divider separates items, and the behaviour option marks 'None of these' as exclusive."
      >
        <Checkboxes
          name="with-divider-and-none"
          fieldset={{
            legend: {
              text: "Which types of waste do you transport regularly?",
            },
          }}
          items={[
            { value: "animal", text: "Waste from animal carcasses" },
            { value: "mines", text: "Waste from mines or quarries" },
            { value: "farm", text: "Farm or agricultural waste" },
            { divider: "or" },
            { value: "none", text: "None of these", behaviour: "exclusive" },
          ]}
        />
      </Example>

      <Example
        title="Checkboxes with hints on items"
        description="Each checkbox can have its own hint, associated with the input via aria-describedby."
      >
        <Checkboxes
          name="with-hints-on-items"
          fieldset={{ legend: { text: "How do you want to sign in?" } }}
          items={[
            {
              name: "gateway",
              id: "government-gateway",
              value: "gov-gateway",
              text: "Sign in with Government Gateway",
              hint: {
                text: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
              },
            },
            {
              name: "verify",
              id: "govuk-verify",
              value: "gov-verify",
              text: "Sign in with GOV.UK Verify",
              hint: {
                text: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
              },
            },
          ]}
        />
      </Example>

      <Example
        title="Checkboxes with a legend as page heading"
        description="Set isPageHeading so the legend is wrapped in an h1 and acts as the page heading."
      >
        <Checkboxes
          name="waste-legend"
          fieldset={{
            legend: {
              text: "Which types of waste do you transport regularly?",
              classes: "govuk-fieldset__legend--l",
              isPageHeading: true,
            },
          }}
          hint={{ text: "Select all that apply" }}
          items={[
            { value: "animal", text: "Waste from animal carcasses" },
            { value: "mines", text: "Waste from mines or quarries" },
            { value: "farm", text: "Farm or agricultural waste" },
          ]}
        />
      </Example>

      <Example
        title="Checkboxes with an error message"
        description="The error message is linked to the fieldset and each item hint keeps its own aria-describedby."
      >
        <Checkboxes
          name="waste-error"
          errorMessage={{ text: "Please select an option" }}
          fieldset={{
            legend: {
              text: "Which types of waste do you transport regularly?",
            },
          }}
          items={[
            {
              value: "animal",
              text: "Waste from animal carcasses",
              hint: {
                text: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
              },
            },
            {
              value: "mines",
              text: "Waste from mines or quarries",
              hint: {
                text: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
              },
            },
            {
              value: "farm",
              text: "Farm or agricultural waste",
              hint: {
                text: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
              },
            },
          ]}
        />
      </Example>

      <CheckboxesPlayground />
    </>
  );
}
