import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Details from "@/app/components/govuk/Details";
import PasswordInput, {
  type FieldHint,
} from "@/app/components/govuk/PasswordInput";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Passwords - GOV.UK Patterns",
};

const passwordRulesHint: FieldHint = {
  html: (
    <ul className="govuk-list">
      <li>Must be at least 8 characters</li>
      <li>Must contain at least one number and one symbol</li>
    </ul>
  ),
};

export default function PasswordsPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Passwords</h1>
      <p className="govuk-body-l">
        Help users to create and enter secure and memorable passwords. Set a
        minimum length of at least 8 characters, do not set a maximum length,
        and explain any restrictions to users.
      </p>

      <Example
        title="Create a password"
        description="Explain the password rules in a hint so users can create a strong password first time. Users can paste their password and toggle whether it is shown."
      >
        <PasswordInput
          id="create-password"
          name="createPassword"
          label={{ text: "Create a password" }}
          hint={passwordRulesHint}
          autoComplete="new-password"
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="With progressive disclosure"
        description="Use a details component to let users find out why you ask for a strong password, without cluttering the page for those who do not need it."
      >
        <PasswordInput
          id="create-password-disclosure"
          name="createPasswordDisclosure"
          label={{ text: "Create a password" }}
          hint={passwordRulesHint}
          autoComplete="new-password"
        />
        <Details
          summaryText="Why we ask for this"
          text="A strong, unique password helps keep your account secure. If you forget your password, we'll send you a link to reset it – we'll never ask you for your password by email, text or phone."
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="With an error message"
        description="Tell users the specific rule their password breaks so they can try again. Restrictions must be identical wherever the user creates or enters a password."
      >
        <PasswordInput
          id="create-password-error"
          name="createPasswordError"
          label={{ text: "Create a password" }}
          hint={passwordRulesHint}
          defaultValue="abc"
          errorMessage={{ text: "Your password must be at least 8 characters" }}
          autoComplete="new-password"
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
