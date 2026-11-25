import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Fieldset from "@/app/components/govuk/Fieldset";
import Example from "@/app/playground/_components/Example";
import FieldsetPlayground from "./FieldsetPlayground";

export const metadata: Metadata = { title: "Fieldset - GOV.UK Playground" };

export default function FieldsetPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Fieldset</h1>
      <p className="govuk-body-l">
        Groups related form controls together under a single legend.
      </p>

      <Example
        title="Default fieldset"
        description="A fieldset with a simple legend around its content."
      >
        <Fieldset legend={{ text: "What is your address?" }}>
          <p className="govuk-body">
            Form controls for the address would go inside the fieldset.
          </p>
        </Fieldset>
      </Example>

      <Example
        title="Legend styled as extra large text"
        description="The legend can be sized like a GOV.UK heading using modifier classes."
      >
        <Fieldset
          legend={{
            text: "What is your address?",
            classes: "govuk-fieldset__legend--xl",
          }}
        >
          <p className="govuk-body">
            Form controls for the address would go inside the fieldset.
          </p>
        </Fieldset>
      </Example>

      <Example
        title="Legend as page heading"
        description="Set isPageHeading so the legend is wrapped in an h1 and acts as the page heading."
      >
        <Fieldset
          legend={{
            text: "What is your address?",
            classes: "govuk-fieldset__legend--xl",
            isPageHeading: true,
          }}
        >
          <p className="govuk-body">
            Form controls for the address would go inside the fieldset.
          </p>
        </Fieldset>
      </Example>

      <Example
        title="With describedBy"
        description="The aria-describedby attribute links the fieldset to other elements, such as a hint."
      >
        <Fieldset
          describedBy="test-target-element"
          legend={{ text: "Which option?" }}
        >
          <p className="govuk-hint" id="test-target-element">
            This hint is associated with the fieldset.
          </p>
        </Fieldset>
      </Example>

      <Example
        title="With role and custom attributes"
        description="An ARIA role and arbitrary attributes can be added to the fieldset container."
      >
        <Fieldset
          role="group"
          attributes={{ "data-attribute": "value" }}
          legend={{ text: "Which option?" }}
        >
          <p className="govuk-body">Grouped content.</p>
        </Fieldset>
      </Example>

      <FieldsetPlayground />
    </>
  );
}
