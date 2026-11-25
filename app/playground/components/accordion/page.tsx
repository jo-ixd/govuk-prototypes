import type { Metadata } from "next";
import Accordion from "@/app/components/govuk/Accordion";
import BackLink from "@/app/components/govuk/BackLink";
import Example from "@/app/playground/_components/Example";
import AccordionPlayground from "@/app/playground/components/accordion/AccordionPlayground";

export const metadata: Metadata = { title: "Accordion - GOV.UK Playground" };

export default function AccordionPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Accordion</h1>
      <p className="govuk-body-l">
        Lets users show and hide sections of related content on a page.
      </p>

      <Example
        title="Default accordion"
        description="The first section is expanded, and sections can link to each other."
      >
        <Accordion
          items={[
            {
              heading: { text: "Writing well for web users" },
              content: { text: "Write in plain English, keep sentences short and put the most important information first." },
              expanded: true,
            },
            {
              heading: { text: "Knowing who your users are" },
              content: { text: "You need to know who your users are and what they need from your service." },
            },
            {
              heading: { text: "Understanding how users read" },
              content: { text: "Users read differently on the web: they scan pages and only read what they need." },
            },
          ]}
        />
      </Example>

      <Example
        title="Accordion with summaries"
        description="Sections can have a summary line under the heading."
      >
        <Accordion
          items={[
            {
              heading: { text: "Writing well for web users" },
              summary: { text: "How to write well for the web" },
              content: { text: "Write in plain English, keep sentences short and put the most important information first." },
            },
            {
              heading: { text: "Knowing who your users are" },
              summary: { text: "Understand your users and their needs" },
              content: { text: "You need to know who your users are and what they need from your service." },
            },
          ]}
        />
      </Example>

      <Example
        title="Accordion without remembering expanded state"
        description="Set rememberExpanded to false so sections close again when the user returns."
      >
        <Accordion
          rememberExpanded={false}
          items={[
            {
              heading: { text: "Writing well for web users" },
              content: { text: "Write in plain English, keep sentences short and put the most important information first." },
              expanded: true,
            },
            {
              heading: { text: "Knowing who your users are" },
              content: { text: "You need to know who your users are and what they need from your service." },
            },
          ]}
        />
      </Example>

      <AccordionPlayground />
    </>
  );
}
