import Link from "next/link";
import Accordion from "@/app/components/govuk/Accordion";

export default function Home() {
  return (
    <div className="govuk-width-container">
      <main
        className="govuk-main-wrapper govuk-main-wrapper--l"
        id="main-content"
        role="main"
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">
              GOV.UK Prototype Kit in React
            </h1>
            <p className="govuk-body-l">
              Every component from govuk-frontend, ported to React and
              Next.js - with a playground for each one, the design system
              patterns built from them, and a worked example service.
            </p>

            <div className="govuk-button-group">
              <Link className="govuk-button" href="/views">
                View designs
              </Link>

              <p className="govuk-body">
                <Link href="/playground">
                  Open the playground
                </Link>
              </p>
            </div>

            <Accordion
              items={[
                {
                  heading: { text: "What is in the playground?" },
                  content: {
                    html: (
                      <ul className="govuk-list govuk-list--bullet">
                        <li>All 36 components, each on its own route</li>
                        <li>Official example fixtures for every component</li>
                        <li>Interactive controls to play with props live</li>
                        <li>The 17 design system patterns as real pages</li>
                        <li>A complete worked example service</li>
                      </ul>
                    ),
                  },
                },
                {
                  heading: { text: "How do I use the components?" },
                  content: {
                    html: (
                      <p className="govuk-body">
                        Import them from{" "}
                        <code>app/components/govuk</code> - for example{" "}
                        <code>{"import Button from \"@/app/components/govuk/Button\""}</code>{" "}
                        - and compose pages the way the pattern pages do.
                      </p>
                    ),
                  },
                },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
