import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import InsetText from "@/app/components/govuk/InsetText";
import Panel from "@/app/components/govuk/Panel";
import SkipLink from "@/app/components/govuk/SkipLink";

export default function NotFound() {
  return (
    <>
      <SkipLink text="Skip to main content" />
      <div className="govuk-width-container">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--l"
          id="main-content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <Panel
                titleText="Page not found"
                text="If you typed the web address, check it is correct."
              />

              <InsetText
                text="If you pasted the web address, check you copied the whole address."
              />

              <p className="govuk-body">
                The page you are looking for does not exist in this prototype.
              </p>

              <p className="govuk-body">
                <Button text="Back to the playground" href="/playground" />
              </p>

              <p className="govuk-body">
                <BackLink text="Back to the home page" href="/" />
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
