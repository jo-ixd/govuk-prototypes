import Accordion from "./components/govuk/Accordion";
import Details from "./components/govuk/Details";
import SkipLink from "./components/govuk/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink text="Skip to main content" />

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">GOV.UK Frontend in Next.js</h1>
              <p className="govuk-body">
                This page proves the GOV.UK styles, fonts and JavaScript-driven
                components are wired up correctly.
              </p>

              <Accordion
                id="proof-accordion"
                items={[
                  {
                    heading: { text: "Section A" },
                    text: "This section only shows/hides on click if govuk-frontend's initAll() has run.",
                  },
                  {
                    heading: { text: "Section B" },
                    text: "If GovukInit were broken, both sections here would render permanently open with no toggle button.",
                  },
                ]}
              />

              <Details
                summaryText="Help with nationality"
                text="We need to know your nationality so we can work out which elections you're entitled to vote in."
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
