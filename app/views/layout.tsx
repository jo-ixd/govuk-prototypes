import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/app/components/govuk/Footer";
import Header from "@/app/components/govuk/Header";
import PhaseBanner from "@/app/components/govuk/PhaseBanner";
import ServiceNavigation from "@/app/components/govuk/ServiceNavigation";
import "@/app/_styles/kit.scss";

export const metadata: Metadata = {
  title: "Design views",
  description:
    "Design prototypes built with the GOV.UK Design System - one folder per prototype, listed automatically.",
};

export default function ViewsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header homepageUrl="/" />
      <ServiceNavigation
        serviceName="Design views"
        serviceUrl="/views"
        navigationId="views-navigation"
        navigation={[{ text: "Component playground", href: "/playground" }]}
      />
      <PhaseBanner
        tag={{ text: "prototype" }}
        text="These are design prototypes built from the GOV.UK Design System - not a real service."
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
