import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import SummaryList, {
  type SummaryListRow,
} from "@/app/components/govuk/SummaryList";
import Example from "@/app/playground/_components/Example";
import SummaryListPlayground from "@/app/playground/components/summary-list/SummaryListPlayground";

export const metadata: Metadata = { title: "Summary list - GOV.UK Playground" };

const contactValue = {
  html: (
    <>
      <p className="govuk-body">email@email.com</p>
      <p className="govuk-body">
        Address line 1<br />
        Address line 2<br />
        Address line 3<br />
        Address line 4<br />
        Address line 5
      </p>
    </>
  ),
};

const basicRows: SummaryListRow[] = [
  { key: { text: "Name" }, value: { text: "Firstname Lastname" } },
  { key: { text: "Date of birth" }, value: { text: "13/08/1980" } },
  { key: { text: "Contact information" }, value: contactValue },
];

const rowsWithActions: SummaryListRow[] = [
  {
    key: { text: "Name" },
    value: { text: "Firstname Lastname" },
    actions: {
      items: [
        { href: "#", text: "Edit", visuallyHiddenText: "name" },
        { href: "#", text: "Delete", visuallyHiddenText: "name" },
      ],
    },
  },
  {
    key: { text: "Date of birth" },
    value: { text: "13/08/1980" },
    actions: {
      items: [{ href: "#", text: "Change", visuallyHiddenText: "date of birth" }],
    },
  },
  {
    key: { text: "Contact information" },
    value: contactValue,
    actions: {
      items: [
        {
          href: "#",
          text: "Edit",
          visuallyHiddenText: "contact information",
        },
        {
          href: "#",
          text: "Change",
          visuallyHiddenText: "contact information",
        },
      ],
    },
  },
];

export default function SummaryListPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">Summary list</h1>
      <p className="govuk-body-l">
        Displays key information from a form or application, with optional
        action links and a summary card wrapper.
      </p>

      <Example title="Summary list" description="A basic summary list.">
        <SummaryList rows={basicRows} />
      </Example>

      <Example
        title="Summary list with actions"
        description="Rows without actions get a consistent layout with the no-actions modifier."
      >
        <SummaryList rows={rowsWithActions} />
      </Example>

      <Example
        title="Summary list with no border"
        description="Removes the bottom border from the list."
      >
        <SummaryList
          rows={basicRows}
          classes="govuk-summary-list--no-border"
        />
      </Example>

      <Example
        title="Summary list as a summary card"
        description="Wrap the list in a summary card with a heading."
      >
        <SummaryList
          rows={basicRows}
          card={{ title: { text: "Undergraduate teaching assistant" } }}
        />
      </Example>

      <Example
        title="Summary card with actions"
        description="The card header can also hold actions, which name the card for screen readers."
      >
        <SummaryList
          rows={basicRows}
          card={{
            title: { text: "Undergraduate teaching assistant" },
            actions: {
              items: [
                { href: "#", text: "Delete job history" },
                { href: "#", text: "Withdraw job history" },
              ],
            },
          }}
        />
      </Example>

      <SummaryListPlayground />
    </>
  );
}
