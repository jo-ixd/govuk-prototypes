import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import PasswordInput from "@/app/components/govuk/PasswordInput";
import Example from "@/app/playground/_components/Example";
import PasswordInputPlayground from "@/app/playground/components/password-input/PasswordInputPlayground";

export const metadata: Metadata = {
  title: "Password input - GOV.UK Playground",
};

export default function PasswordInputPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Password input</h1>
      <p className="govuk-body-l">
        Password inputs let users enter a password with a show/hide toggle
        button.
      </p>

      <Example
        title="Default"
        description="A password input with the JavaScript show/hide toggle."
      >
        <PasswordInput label={{ text: "Password" }} name="password" />
      </Example>

      <Example
        title="With hint text"
        description="A hint below the label, linked with aria-describedby."
      >
        <PasswordInput
          id="password-input-with-hint-text"
          name="test-name-2"
          label={{ text: "Password" }}
          hint={{
            text: "It probably has some letters, numbers and maybe even some symbols in it.",
          }}
        />
      </Example>

      <Example
        title="With error message"
        description="An error message displayed above the input, which gets the error style."
      >
        <PasswordInput
          id="password-input-with-error-message"
          name="test-name-3"
          label={{ text: "Password" }}
          hint={{
            text: "It probably has some letters, numbers and maybe even some symbols in it.",
          }}
          errorMessage={{ text: "Error message goes here" }}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <PasswordInput
          id="password-input-with-page-heading"
          name="test-name"
          label={{
            text: "Password",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
        />
      </Example>

      <Example
        title="With input width class"
        description="A narrower input for shorter passwords."
      >
        <PasswordInput
          id="password-input-width"
          name="password-width"
          classes="govuk-input--width-10"
          label={{ text: "Password" }}
        />
      </Example>

      <PasswordInputPlayground />
    </>
  );
}
