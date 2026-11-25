import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Footer from "@/app/components/govuk/Footer";
import Example from "@/app/playground/_components/Example";
import FooterPlayground from "./FooterPlayground";

export const metadata: Metadata = { title: "Footer - GOV.UK Playground" };

export default function FooterPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Footer</h1>
      <p className="govuk-body-l">
        A footer with an optional multi-section navigation, support links and
        the standard licence and copyright information.
      </p>
      <Example
        title="Default"
        description="Just the crown, the Open Government Licence and Crown copyright."
      >
        <Footer />
      </Example>
      <Example
        title="With navigation"
        description="Navigation sections in columns, with an optional column count per section."
      >
        <Footer
          navigation={[
            {
              title: "Two column list",
              width: "two-thirds",
              columns: 2,
              items: [
                { href: "#1", text: "Navigation item 1" },
                { href: "#2", text: "Navigation item 2" },
                { href: "#3", text: "Navigation item 3" },
                { href: "#4", text: "Navigation item 4" },
                { href: "#5", text: "Navigation item 5" },
                { href: "#6", text: "Navigation item 6" },
              ],
            },
            {
              title: "Single column list",
              width: "one-third",
              items: [
                { href: "#1", text: "Navigation item 1" },
                { href: "#2", text: "Navigation item 2" },
                { href: "#3", text: "Navigation item 3" },
              ],
            },
          ]}
        />
      </Example>
      <Example
        title="With meta links and meta content"
        description="Support links with custom HTML content underneath."
      >
        <Footer
          meta={{
            items: [
              { href: "#1", text: "Bibendum Ornare" },
              { href: "#2", text: "Nullam" },
              { href: "#3", text: "Tortor Fringilla" },
              { href: "#4", text: "Tellus" },
              { href: "#5", text: "Egestas Nullam" },
              { href: "#6", text: "Euismod Etiam" },
              { href: "#7", text: "Fusce Sollicitudin" },
              { href: "#8", text: "Ligula Nullam Ultricies" },
            ],
            html: (
              <>
                Built by the{" "}
                <a href="#" className="govuk-footer__link">
                  Department of Magical Law Enforcement
                </a>
              </>
            ),
          }}
        />
      </Example>
      <Example
        title="With custom text content licence and copyright notice"
        description="The licence and copyright text can be replaced with your own."
      >
        <Footer
          contentLicence={{
            text: "Mae’r holl gynnwys ar gael dan Drwydded y Llywodraeth Agored v3.0, ac eithrio lle nodir yn wahanol",
          }}
          copyright={{ text: "© Hawlfraint y Goron" }}
        />
      </Example>
      <Example
        title="With no content licence"
        description="Passing null as the content licence hides the licence logo and text entirely."
      >
        <Footer contentLicence={null} />
      </Example>
      <FooterPlayground />
    </>
  );
}
