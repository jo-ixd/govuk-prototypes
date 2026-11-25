import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Pagination from "@/app/components/govuk/Pagination";
import Example from "@/app/playground/_components/Example";
import PaginationPlayground from "./PaginationPlayground";

export const metadata: Metadata = {
  title: "Pagination - GOV.UK Playground",
};

export default function PaginationPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Pagination</h1>
      <p className="govuk-body-l">
        Pagination helps users move between pages of related content, either as
        numbered pages or previous and next links.
      </p>

      <Example title="Default" description="Previous and next links with numbered pages.">
        <Pagination
          previous={{ href: "/previous" }}
          next={{ href: "/next" }}
          items={[
            { number: 1, href: "/page/1" },
            { number: 2, href: "/page/2", current: true },
            { number: 3, href: "/page/3" },
          ]}
        />
      </Example>

      <Example
        title="With many pages"
        description="Ellipsis items break up long runs of page numbers."
      >
        <Pagination
          previous={{ href: "/previous" }}
          next={{ href: "/next" }}
          items={[
            { number: 1, href: "/page/1" },
            { ellipsis: true },
            { number: 8, href: "/page/8" },
            { number: 9, href: "/page/9" },
            { number: 10, href: "/page/10", current: true },
            { number: 11, href: "/page/11" },
            { number: 12, href: "/page/12" },
            { ellipsis: true },
            { number: 40, href: "/page/40" },
          ]}
        />
      </Example>

      <Example
        title="First page"
        description="The previous link is omitted when there is no earlier page."
      >
        <Pagination
          next={{ href: "/next" }}
          items={[
            { number: 1, href: "/page/1", current: true },
            { number: 2, href: "/page/2" },
            { number: 3, href: "/page/3" },
          ]}
        />
      </Example>

      <Example
        title="Previous and next only"
        description="With no numbered items, the links go block level and gain a decorated title."
      >
        <Pagination previous={{ href: "/previous" }} next={{ href: "/next" }} />
      </Example>

      <Example
        title="Previous and next only, with labels"
        description="Labels underneath the links describe where each one goes."
      >
        <Pagination
          previous={{
            href: "/previous",
            text: "Previous page",
            labelText: "Paying VAT and duty",
          }}
          next={{
            href: "/next",
            text: "Next page",
            labelText: "Registering an imported vehicle",
          }}
        />
      </Example>

      <PaginationPlayground />
    </>
  );
}
