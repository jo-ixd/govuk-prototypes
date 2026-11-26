import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/govuk/Footer";
import Header from "@/app/components/govuk/Header";

export const metadata: Metadata = {
  title: "Page not found - GOV.UK Playground",
};

export default function NotFound() {
  return (
    <>
      <Header homepageUrl="/" />
      <div className="govuk-width-container">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--l"
          id="main-content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">Page not found</h1>

              <p className="govuk-body">
                If you typed the web address, check it is correct.
              </p>

              <p className="govuk-body">
                If you pasted the web address, check you copied the entire
                address.
              </p>

              <p className="govuk-body">
                If the web address is correct or you selected a link or button,
                go back to the{" "}
                <Link className="govuk-link" href="/">
                  homepage
                </Link>{" "}
                or open the{" "}
                <Link className="govuk-link" href="/playground">
                  playground
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer
        meta={{
          items: [
            { text: "GOV.UK Design System", href: "https://design-system.service.gov.uk/" },
            { text: "govuk-frontend on GitHub", href: "https://github.com/alphagov/govuk-frontend" },
          ],
        }}
      />
    </>
  );
}
