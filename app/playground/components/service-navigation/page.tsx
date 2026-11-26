import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import ServiceNavigation from "@/app/components/govuk/ServiceNavigation";
import Example from "@/app/playground/_components/Example";
import ServiceNavigationPlayground from "@/app/playground/components/service-navigation/ServiceNavigationPlayground";

export const metadata: Metadata = {
  title: "ServiceNavigation - GOV.UK Playground",
};

export default function ServiceNavigationPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Service navigation</h1>
      <p className="govuk-body-l">
        Navigation for your service, which can sit below the GOV.UK header and
        collapse into a menu button on mobile.
      </p>
      <Example
        title="Default"
        description="A list of navigation items, collapsing into a menu button on mobile."
      >
        <ServiceNavigation
          navigation={[
            { href: "#/1", text: "Navigation item 1" },
            { href: "#/2", text: "Navigation item 2" },
            { href: "#/3", text: "Navigation item 3" },
            { href: "#/4", text: "Navigation item 4" },
          ]}
        />
      </Example>
      <Example
        title="With service name"
        description="A service name with no navigation, shown as plain text."
      >
        <ServiceNavigation serviceName="Apply for a juggling licence" />
      </Example>
      <Example
        title="With service name and navigation"
        description="A service name linking to the homepage, alongside navigation items."
      >
        <ServiceNavigation
          serviceName="Apply for a juggling licence"
          serviceUrl="#/"
          navigation={[
            { href: "#/1", text: "Navigation item 1" },
            { href: "#/2", text: "Navigation item 2", active: true },
            { href: "#/3", text: "Navigation item 3" },
            { href: "#/4", text: "Navigation item 4" },
          ]}
        />
      </Example>
      <Example
        title="With navigation with a current item"
        description="The current page gets aria-current=&quot;page&quot; and a strong fallback for users who override styles."
      >
        <ServiceNavigation
          navigation={[
            { href: "#/1", text: "Navigation item 1" },
            { href: "#/2", text: "Navigation item 2", current: true },
            { href: "#/3", text: "Navigation item 3" },
            { href: "#/4", text: "Navigation item 4" },
          ]}
        />
      </Example>
      <Example
        title="With non-link navigation items"
        description="Items without an href render as plain text."
      >
        <ServiceNavigation
          navigation={[
            { text: "Navigation item 1" },
            { html: <em>Navigation item 2</em> },
            { text: "Navigation item 3" },
          ]}
        />
      </Example>
      <Example
        title="Inverse"
        description="An inverted colour scheme for use on dark backgrounds."
      >
        <ServiceNavigation
          classes="govuk-service-navigation--inverse"
          serviceName="Apply for a juggling licence"
          serviceUrl="#/"
          navigation={[
            { href: "#/1", text: "Navigation item 1" },
            { href: "#/2", text: "Navigation item 2", active: true },
            { href: "#/3", text: "Navigation item 3" },
            { href: "#/4", text: "Navigation item 4" },
          ]}
        />
      </Example>
      <ServiceNavigationPlayground />
    </>
  );
}
