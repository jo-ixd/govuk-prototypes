/* A starter design view. Any folder in app/views with a page.tsx file is
   served at /views/<folder-name> and listed on the /views index
   automatically - copy this folder to start a new prototype. The question
   below submits back to this page, so the answer travels as a URL search
   parameter in the same way the example service moves answers between
   pages. */
import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import InsetText from "@/app/components/govuk/InsetText";
import Input from "@/app/components/govuk/Input";

export const metadata: Metadata = {
  title: "Example view - Design views",
};

export default async function ExampleViewPage(
  props: PageProps<"/views/example-view">,
) {
  const { name } = await props.searchParams;
  const enteredName = Array.isArray(name) ? name[0] : name;

  return (
    <>
      <BackLink text="Back to views" href="/views" />
      <form noValidate>
        <Input
          name="name"
          label={{
            text: "What is your name?",
            isPageHeading: true,
            classes: "govuk-label--l",
          }}
          autoComplete="name"
          defaultValue={enteredName ?? ""}
        />
        <Button text="Continue" />
      </form>
      {enteredName ? (
        <InsetText text={`You entered: ${enteredName}`} />
      ) : null}
    </>
  );
}
