import Link from "next/link";

type IndexEntry = {
  name: string;
  slug: string;
  description: string;
};

const COMPONENTS: IndexEntry[] = [
  { name: "Accordion", slug: "accordion", description: "Sections of content that expand and collapse" },
  { name: "Back link", slug: "back-link", description: "Link back to the previous page" },
  { name: "Breadcrumbs", slug: "breadcrumbs", description: "Show where a page sits in the service" },
  { name: "Button", slug: "button", description: "Let users carry out an action" },
  { name: "Character count", slug: "character-count", description: "Count characters or words entered" },
  { name: "Checkboxes", slug: "checkboxes", description: "Let users select one or more options" },
  { name: "Cookie banner", slug: "cookie-banner", description: "Tell users how the service uses cookies" },
  { name: "Date input", slug: "date-input", description: "Let users enter a date" },
  { name: "Details", slug: "details", description: "Progressive disclosure of extra information" },
  { name: "Error message", slug: "error-message", description: "Describe an error in a form field" },
  { name: "Error summary", slug: "error-summary", description: "Summarise validation errors at the top of a page" },
  { name: "Exit this page", slug: "exit-this-page", description: "Let users quickly leave a sensitive page" },
  { name: "Fieldset", slug: "fieldset", description: "Group related form controls with a legend" },
  { name: "File upload", slug: "file-upload", description: "Let users select a file to upload" },
  { name: "Footer", slug: "footer", description: "Service-wide navigation and copyright" },
  { name: "Header", slug: "header", description: "The GOV.UK crown header" },
  { name: "Hint", slug: "hint", description: "Extra help text for a form field" },
  { name: "Input (text)", slug: "input", description: "Let users enter a single line of text" },
  { name: "Inset text", slug: "inset-text", description: "Set apart a block of content" },
  { name: "Label", slug: "label", description: "The question a form field answers" },
  { name: "Notification banner", slug: "notification-banner", description: "Important time-sensitive information" },
  { name: "Pagination", slug: "pagination", description: "Navigate between pages of results" },
  { name: "Panel", slug: "panel", description: "Confirmation and interruption panels" },
  { name: "Password input", slug: "password-input", description: "Let users enter a password safely" },
  { name: "Phase banner", slug: "phase-banner", description: "Show the phase of a service" },
  { name: "Radios", slug: "radios", description: "Let users pick a single option" },
  { name: "Select", slug: "select", description: "Let users choose from a dropdown" },
  { name: "Service navigation", slug: "service-navigation", description: "Service name and primary navigation" },
  { name: "Skip link", slug: "skip-link", description: "Skip to the main content" },
  { name: "Summary list", slug: "summary-list", description: "Show key-value pairs, like answers" },
  { name: "Table", slug: "table", description: "Tabular data" },
  { name: "Tabs", slug: "tabs", description: "Content split into switchable panels" },
  { name: "Tag", slug: "tag", description: "Status labels and metadata" },
  { name: "Task list", slug: "task-list", description: "Show a multi-step process and progress" },
  { name: "Textarea", slug: "textarea", description: "Let users enter multiple lines of text" },
  { name: "Warning text", slug: "warning-text", description: "Warn users about consequences" },
];

const PATTERN_GROUPS: { title: string; patterns: IndexEntry[] }[] = [
  {
    title: "Ask users for...",
    patterns: [
      { name: "Addresses", slug: "addresses", description: "UK and international addresses" },
      { name: "Bank details", slug: "bank-details", description: "Bank account details" },
      { name: "Dates", slug: "dates", description: "Dates, including date of birth" },
      { name: "Email addresses", slug: "email-addresses", description: "Email addresses" },
      { name: "Names", slug: "names", description: "Names" },
      { name: "National Insurance numbers", slug: "national-insurance-numbers", description: "NI numbers with correct format" },
      { name: "Passwords", slug: "passwords", description: "Create a password" },
      { name: "Phone numbers", slug: "phone-numbers", description: "Phone numbers" },
    ],
  },
  {
    title: "Help users to...",
    patterns: [
      { name: "Check answers", slug: "check-answers", description: "Review answers before submitting" },
      { name: "Complete multiple tasks", slug: "complete-multiple-tasks", description: "Work through a task list" },
      { name: "Recover from validation errors", slug: "validation", description: "Question pages with errors" },
      { name: "Start using a service", slug: "start-using-a-service", description: "The service start page" },
    ],
  },
  {
    title: "Pages",
    patterns: [
      { name: "Confirmation pages", slug: "confirmation-pages", description: "Success panels and next steps" },
      { name: "Cookies page", slug: "cookies-page", description: "Cookie preferences page" },
      { name: "Interruption pages", slug: "interruption-pages", description: "Interrupt a journey with a message" },
      { name: "Page not found pages", slug: "page-not-found-pages", description: "A 404 page in service style" },
      { name: "Question pages", slug: "question-pages", description: "One question per page" },
    ],
  },
];

function Card({ name, slug, description, base }: { base: string } & IndexEntry) {
  return (
    <Link className="playground-index-card" href={`${base}/${slug}`}>
      <h3 className="govuk-heading-s">{name}</h3>
      <span className="playground-index-card__meta">{description}</span>
    </Link>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <h1 className="govuk-heading-xl">GOV.UK Playground</h1>
      <p className="govuk-body">
        Every GOV.UK Design System component, ported from govuk-frontend to
        React, with official examples and live controls - plus the design
        system patterns built from them.
      </p>

      <h2 className="govuk-heading-l">Components</h2>
      <div className="playground-index-grid">
        {COMPONENTS.map((component) => (
          <Card
            key={component.slug}
            {...component}
            base="/playground/components"
          />
        ))}
      </div>

      <h2 className="govuk-heading-l">Patterns</h2>
      {PATTERN_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="govuk-heading-m">{group.title}</h3>
          <div className="playground-index-grid">
            {group.patterns.map((pattern) => (
              <Card
                key={pattern.slug}
                {...pattern}
                base="/playground/patterns"
              />
            ))}
          </div>
        </div>
      ))}

      <h2 className="govuk-heading-l">Example service</h2>
      <Link className="playground-index-card" href="/playground/example-service">
        <h3 className="govuk-heading-s">Renew a parking permit</h3>
        <span className="playground-index-card__meta">
          A complete multi-page journey: start page, questions with
          validation, check answers and confirmation
        </span>
      </Link>
    </>
  );
}
