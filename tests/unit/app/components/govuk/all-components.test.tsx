import { describe, expect, it } from "vitest";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import {
  Accordion,
  BackLink,
  Breadcrumbs,
  Button,
  CharacterCount,
  Checkboxes,
  CookieBanner,
  DateInput,
  Details,
  ErrorMessage,
  ErrorSummary,
  ExitThisPage,
  Fieldset,
  FileUpload,
  Footer,
  Header,
  Hint,
  Input,
  InsetText,
  Label,
  NotificationBanner,
  Page,
  Pagination,
  Panel,
  PasswordInput,
  PhaseBanner,
  Radios,
  Select,
  ServiceNavigation,
  SkipLink,
  SummaryList,
  Table,
  Tabs,
  Tag,
  TaskList,
  Textarea,
  WarningText,
} from "@/app/components/govuk";

type ComponentCase = {
  name: string;
  render: () => ReactElement;
};

// One minimal, valid usage of every component in the barrel. The
// completeness test below fails if a new component is exported without a
// case here, so render coverage can never silently drift.
const cases: ComponentCase[] = [
  {
    name: "Accordion",
    render: () => (
      <Accordion
        items={[{ heading: { text: "One" }, content: { text: "Body text" } }]}
      />
    ),
  },
  { name: "BackLink", render: () => <BackLink text="Back" href="/" /> },
  {
    name: "Breadcrumbs",
    render: () => (
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "Where you are" }]} />
    ),
  },
  { name: "Button", render: () => <Button text="Continue" /> },
  {
    name: "CharacterCount",
    render: () => (
      <CharacterCount name="summary" label={{ text: "Summary" }} maxlength={100} />
    ),
  },
  {
    name: "Checkboxes",
    render: () => (
      <Checkboxes name="waste" items={[{ text: "Paper", value: "paper" }]} />
    ),
  },
  {
    name: "CookieBanner",
    render: () => (
      <CookieBanner messages={[{ headingText: "Cookies", text: "We use cookies." }]} />
    ),
  },
  { name: "DateInput", render: () => <DateInput /> },
  {
    name: "Details",
    render: () => <Details summaryText="Help improve this service" text="More detail" />,
  },
  { name: "ErrorMessage", render: () => <ErrorMessage text="Enter your name" /> },
  { name: "ErrorSummary", render: () => <ErrorSummary /> },
  { name: "ExitThisPage", render: () => <ExitThisPage /> },
  { name: "Fieldset", render: () => <Fieldset legend={{ text: "Group" }} /> },
  {
    name: "FileUpload",
    render: () => <FileUpload name="photo" label={{ text: "Upload a photo" }} />,
  },
  { name: "Footer", render: () => <Footer /> },
  { name: "Header", render: () => <Header /> },
  { name: "Hint", render: () => <Hint text="Helpful text" /> },
  { name: "Input", render: () => <Input name="nino" label={{ text: "NI number" }} /> },
  { name: "InsetText", render: () => <InsetText text="Inset text" /> },
  { name: "Label", render: () => <Label text="Full name" /> },
  {
    name: "NotificationBanner",
    render: () => <NotificationBanner text="Application saved" />,
  },
  {
    name: "Page",
    render: () => (
      <Page>
        <p>Page content</p>
      </Page>
    ),
  },
  {
    name: "Pagination",
    render: () => (
      <Pagination
        previous={{ text: "Previous", href: "#" }}
        next={{ text: "Next", href: "#" }}
      />
    ),
  },
  { name: "Panel", render: () => <Panel titleText="Application complete" /> },
  {
    name: "PasswordInput",
    render: () => <PasswordInput name="password" label={{ text: "Password" }} />,
  },
  {
    name: "PhaseBanner",
    render: () => (
      <PhaseBanner tag={{ text: "Beta" }} text="This is a new service." />
    ),
  },
  {
    name: "Radios",
    render: () => (
      <Radios
        name="choice"
        items={[
          { text: "Yes", value: "yes" },
          { text: "No", value: "no" },
        ]}
      />
    ),
  },
  {
    name: "Select",
    render: () => (
      <Select
        name="sort"
        items={[{ text: "Newest first", value: "new" }]}
        label={{ text: "Sort by" }}
      />
    ),
  },
  {
    name: "ServiceNavigation",
    render: () => (
      <ServiceNavigation
        serviceName="Renew a parking permit"
        navigation={[{ text: "Home", href: "/" }]}
      />
    ),
  },
  { name: "SkipLink", render: () => <SkipLink text="Skip to main content" /> },
  {
    name: "SummaryList",
    render: () => (
      <SummaryList rows={[{ key: { text: "Name" }, value: { text: "Jo" } }]} />
    ),
  },
  {
    name: "Table",
    render: () => <Table rows={[[{ text: "A" }, { text: "B" }]]} caption="Data" />,
  },
  {
    name: "Tabs",
    render: () => <Tabs items={[{ label: "One", panel: { text: "Content" } }]} />,
  },
  { name: "Tag", render: () => <Tag text="Beta" /> },
  {
    name: "TaskList",
    render: () => (
      <TaskList
        items={[{ title: { text: "Task" }, status: { tag: { text: "Done" } } }]}
      />
    ),
  },
  { name: "Textarea", render: () => <Textarea name="notes" label={{ text: "Notes" }} /> },
  { name: "WarningText", render: () => <WarningText text="You can be fined" /> },
];

describe("govuk barrel export", () => {
  for (const component of cases) {
    it(`renders ${component.name} with minimal props`, () => {
      const { container } = render(component.render());
      expect(container.innerHTML).not.toBe("");
    });
  }

  it("covers every component exported from the barrel", async () => {
    const covered = new Set(cases.map((component) => component.name));
    const exports = (await import(
      "@/app/components/govuk"
    )) as Record<string, unknown>;
    const exportedNames = Object.keys(exports).filter(
      (name) =>
        name !== "govukClasses" && typeof exports[name] === "function",
    );
    for (const name of exportedNames) {
      expect(covered.has(name), `${name} is exported but has no render case`).toBe(
        true,
      );
    }
  });
});
