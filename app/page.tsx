import Link from "next/link";
import Accordion from "@/app/components/govuk/Accordion";
import InsetText from "@/app/components/govuk/InsetText";
import SkipLink from "@/app/components/govuk/SkipLink";
import Tag from "@/app/components/govuk/Tag";

export default function Home() {
  return (
    <>
      <SkipLink text="Skip to main content" />

      <div className="govuk-width-container">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--l"
          id="content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <p className="govuk-body">
                <Tag text="prototype kit" />{" "}
                <Tag text="react" classes="govuk-tag--turquoise" />
              </p>
              <h1 className="govuk-heading-xl">
                GOV.UK prototyping, modernised
              </h1>
              <p className="govuk-body-l">
                Every component from govuk-frontend, ported to React and
                Next.js - with a playground for each one, the design system
                patterns built from them, and a worked example service.
              </p>

              <p className="govuk-body">
                <Link className="govuk-button" href="/playground" role="button" draggable={false}>
                  Open the playground
                </Link>
              </p>

              <InsetText
                html={
                  <>
                    Built with the GOV.UK Design System, Next.js 16 and React
                    19. The styles and progressive-enhancement JavaScript come
                    straight from govuk-frontend - the components are
                    re-implemented as React server components.
                  </>
                }
              />

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
                        <>
                          <p className="govuk-body">
                            Import them from{" "}
                            <code>app/components/govuk</code> - for example{" "}
                            <code>{"import Button from \"@/app/components/govuk/Button\""}</code>{" "}
                            - and compose pages the way the pattern pages do.
                          </p>
                        </>
                      ),
                    },
                  },
                  {
                    heading: { text: "Why React server components?" },
                    content: {
                      text: "The GOV.UK JavaScript (accordions, tabs, character counts and friends) still runs exactly as the Design System ships it. React just renders the same markup the nunjucks macros would.",
                    },
                  },
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
