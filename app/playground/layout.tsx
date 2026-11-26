import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/app/components/govuk/Footer";
import Header from "@/app/components/govuk/Header";
import PhaseBanner from "@/app/components/govuk/PhaseBanner";
import ServiceNavigation from "@/app/components/govuk/ServiceNavigation";
import PlaygroundNav from "@/app/playground/_components/PlaygroundNav";
import "./_styles/playground.scss";

export const metadata: Metadata = {
  title: "GOV.UK Playground",
  description:
    "A component playground and prototype kit built with the GOV.UK Design System on Next.js",
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header homepageUrl="/" />
      <ServiceNavigation
        serviceName="GOV.UK Playground"
        serviceUrl="/playground"
        navigationId="playground-navigation"
      >
        <PlaygroundNav />
      </ServiceNavigation>
      <PhaseBanner
        tag={{ text: "prototype" }}
        text="This is a prototype kit built from the GOV.UK Design System - not a real service."
      />
      <div className="govuk-width-container">
        <main
          className="govuk-main-wrapper govuk-main-wrapper--l"
          id="main-content"
          role="main"
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">{children}</div>
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
