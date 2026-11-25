import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Header from "@/app/components/govuk/Header";
import Example from "@/app/playground/_components/Example";
import HeaderPlayground from "./HeaderPlayground";

export const metadata: Metadata = { title: "Header - GOV.UK Playground" };

export default function HeaderPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Header</h1>
      <p className="govuk-body-l">
        The GOV.UK header with the crown logo and an optional product name,
        linking back to the site homepage.
      </p>
      <Example
        title="Default"
        description="The standard header as used on information pages on GOV.UK."
      >
        <Header />
      </Example>
      <Example
        title="With product name"
        description="A product name shown directly after the GOV.UK logotype."
      >
        <Header productName="Product Name" />
      </Example>
      <Example
        title="Full width"
        description="The header container can span the full width of the page."
      >
        <Header containerClasses="govuk-header__container--full-width" />
      </Example>
      <HeaderPlayground />
    </>
  );
}
