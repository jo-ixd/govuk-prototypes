import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/govuk/Footer";

describe("Footer", () => {
  it("renders the crown logo and copyright by default", () => {
    render(<Footer />);
    expect(document.querySelector(".govuk-footer__crown")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "© Crown copyright" }),
    ).toHaveClass("govuk-footer__copyright-logo");
  });

  it("shows the default open government licence description", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "Open Government Licence v3.0" }),
    ).toHaveAttribute(
      "href",
      "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    );
  });

  it("renders navigation sections with their links", () => {
    render(
      <Footer
        navigation={[
          {
            title: "Related content",
            width: "two-thirds",
            items: [
              { text: "Help", href: "/help" },
              { text: "Contact", href: "/contact" },
            ],
          },
        ]}
      />,
    );
    const section = document.querySelector(".govuk-footer__section");
    expect(section).toHaveClass("govuk-grid-column-two-thirds");
    expect(screen.getByRole("heading", { name: "Related content" })).toHaveClass(
      "govuk-footer__heading",
    );
    expect(screen.getByRole("link", { name: "Help" })).toHaveAttribute(
      "href",
      "/help",
    );
    expect(document.querySelector(".govuk-footer__section-break")).not.toBeNull();
  });

  it("splits navigation lists into columns when asked", () => {
    render(
      <Footer
        navigation={[
          {
            title: "Services",
            columns: 2,
            items: [{ text: "Passports", href: "/passports" }],
          },
        ]}
      />,
    );
    expect(document.querySelector(".govuk-footer__list")).toHaveClass(
      "govuk-footer__list--columns-2",
    );
  });

  it("skips navigation items without both a link and text", () => {
    render(
      <Footer
        navigation={[
          {
            title: "Related",
            items: [
              { text: "Help", href: "/help" },
              { text: "No link" },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Help" })).not.toBeNull();
    expect(screen.queryByText("No link")).toBeNull();
  });

  it("renders meta links and a custom licence", () => {
    render(
      <Footer
        meta={{
          items: [
            { text: "Privacy", href: "/privacy" },
            { text: "Accessibility", href: "/accessibility" },
          ],
        }}
        contentLicence={{ text: "Made available under a test licence." }}
      />,
    );
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(
      screen.getByText("Made available under a test licence."),
    ).toHaveClass("govuk-footer__licence-description");
  });
});
