import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Table from "@/app/components/govuk/Table";
import Tabs from "@/app/components/govuk/Tabs";
import Example from "@/app/playground/_components/Example";
import TabsPlayground from "@/app/playground/components/tabs/TabsPlayground";

export const metadata: Metadata = { title: "Tabs - GOV.UK Playground" };

function casesTable(cases: [string, string, string][]) {
  return (
    <Table
      head={[
        { text: "Case manager" },
        { text: "Cases opened" },
        { text: "Cases closed" },
      ]}
      rows={cases.map(([manager, opened, closed]) => [
        { text: manager },
        { text: opened },
        { text: closed },
      ])}
    />
  );
}

const defaultItems = [
  {
    id: "past-day",
    label: "Past day",
    panel: {
      html: (
        <>
          <h2 className="govuk-heading-l">Past day</h2>
          {casesTable([
            ["David Francis", "3", "0"],
            ["Paul Farmer", "1", "0"],
            ["Rita Patel", "2", "0"],
          ])}
        </>
      ),
    },
  },
  {
    id: "past-week",
    label: "Past week",
    panel: {
      html: (
        <>
          <h2 className="govuk-heading-l">Past week</h2>
          {casesTable([
            ["David Francis", "24", "18"],
            ["Paul Farmer", "16", "20"],
            ["Rita Patel", "24", "27"],
          ])}
        </>
      ),
    },
  },
  {
    id: "past-month",
    label: "Past month",
    panel: {
      html: (
        <>
          <h2 className="govuk-heading-l">Past month</h2>
          {casesTable([
            ["David Francis", "98", "95"],
            ["Paul Farmer", "122", "126"],
            ["Rita Patel", "126", "118"],
          ])}
        </>
      ),
    },
  },
];

export default function TabsPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Tabs</h1>
      <p className="govuk-body-l">
        Lets users navigate between related sections of content, hiding all but
        the selected panel.
      </p>

      <Example
        title="Tabs"
        description="The title defaults to Contents. Panels after the first are hidden until selected."
      >
        <Tabs items={defaultItems} />
      </Example>

      <Example
        title="Tabs with a custom title"
        description="Set the table of contents heading with the title prop."
      >
        <Tabs title="Tabs" items={defaultItems} />
      </Example>

      <Example
        title="Tabs with an anchor in a panel"
        description="Anchors within panels can be moved to, even when the tab is hidden."
      >
        <Tabs
          idPrefix="anchor-tabs"
          items={[
            {
              id: "tab-1",
              label: "Tab 1",
              panel: {
                html: (
                  <>
                    <h2 className="govuk-heading-l">Tab 1</h2>
                    <p className="govuk-body">
                      Testing that when you click the anchor it moves to the
                      anchor point successfully
                    </p>
                    <p className="govuk-body">
                      <a className="govuk-link" href="#anchor">
                        Anchor
                      </a>
                    </p>
                    <p className="govuk-body">
                      <a id="anchor" tabIndex={0}>
                        Anchor Point
                      </a>
                    </p>
                  </>
                ),
              },
            },
            {
              id: "tab-2",
              label: "Tab 2",
              panel: {
                html: <h2 className="govuk-heading-l">Tab 2</h2>,
              },
            },
          ]}
        />
      </Example>

      <TabsPlayground />
    </>
  );
}
