import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Example from "@/app/playground/_components/Example";
import ButtonPlayground from "@/app/playground/components/button/ButtonPlayground";

export const metadata: Metadata = {
  title: "Button - GOV.UK Playground",
};

export default function ButtonPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Button</h1>
      <p className="govuk-body-l">
        Use buttons to help users carry out an action, such as submitting a form
        or starting a service.
      </p>

      <Example title="Default" description="A standard primary action button.">
        <Button text="Save and continue" />
      </Example>

      <Example title="Secondary" description="A button for secondary actions.">
        <Button
          name="secondary"
          text="Secondary button"
          classes="govuk-button--secondary"
        />
      </Example>

      <Example
        title="Warning"
        description="A button for actions that need a warning."
      >
        <Button
          name="Warning"
          text="Warning button"
          classes="govuk-button--warning"
        />
      </Example>

      <Example
        title="Inverse"
        description="A button that appears on dark backgrounds."
        demoClasses="playground-example__demo--dark"
      >
        <Button
          name="Inverse"
          text="Inverse button"
          classes="govuk-button--inverse"
        />
      </Example>

      <Example
        title="Disabled"
        description="A button that cannot be interacted with."
      >
        <Button text="Disabled button" disabled />
      </Example>

      <Example
        title="Link"
        description="A link styled as a button, for navigation between pages."
      >
        <Button text="Link button" href="/playground/components/button" />
      </Example>

      <Example
        title="Start"
        description="The main call to action on a service's start page. Start buttons are always links, since they take users to the first page of a service."
      >
        <Button
          text="Start now"
          href="/playground/components/button"
          isStartButton
        />
      </Example>

      <ButtonPlayground />
    </>
  );
}
