import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Breadcrumbs from "@/app/components/govuk/Breadcrumbs";
import Example from "@/app/playground/_components/Example";
import BreadcrumbsPlayground from "@/app/playground/components/breadcrumbs/BreadcrumbsPlayground";

export const metadata: Metadata = {
  title: "Breadcrumbs - GOV.UK Playground",
};

export default function BreadcrumbsPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Breadcrumbs</h1>
      <p className="govuk-body-l">
        Breadcrumbs show where the current page sits in the site hierarchy, so
        users can navigate back up the trail.
      </p>

      <Example title="Default">
        <Breadcrumbs
          items={[
            { text: "Home", href: "/" },
            { text: "Section", href: "/section" },
            { text: "Sub-section", href: "/section/sub-section" },
            {
              text: "Sub Sub-section",
              href: "/section/sub-section/sub-sub-section",
            },
          ]}
        />
      </Example>

      <Example
        title="With last breadcrumb as current page"
        description="The final item has no href and is marked as the current page."
      >
        <Breadcrumbs
          items={[
            { text: "Home", href: "/" },
            {
              text: "Passports, travel and living abroad",
              href: "/browse/abroad",
            },
            { text: "Travel abroad" },
          ]}
        />
      </Example>

      <Example
        title="With collapse on mobile"
        description="Collapses to the first and last item on tablet breakpoint and below."
      >
        <Breadcrumbs
          collapseOnMobile
          items={[
            { text: "Home", href: "/" },
            { text: "Education, training and skills", href: "/education" },
            {
              text: "Special educational needs and disability (SEND) and high needs",
              href: "/education/special-educational-needs-and-disability-send-and-high-needs",
            },
          ]}
        />
      </Example>

      <Example
        title="Inverse"
        description="Breadcrumbs that appear on dark backgrounds."
        demoClasses="playground-example__demo--dark"
      >
        <Breadcrumbs
          classes="govuk-breadcrumbs--inverse"
          items={[
            { text: "Home", href: "/" },
            {
              text: "Passports, travel and living abroad",
              href: "/browse/abroad",
            },
            { text: "Travel abroad" },
          ]}
        />
      </Example>

      <BreadcrumbsPlayground />
    </>
  );
}
