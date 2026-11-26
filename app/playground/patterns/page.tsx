import Link from "next/link";

type IndexEntry = {
  name: string;
  slug: string;
  description: string;
};

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

export const metadata = {
  title: "Patterns - GOV.UK Playground",
};

export default function PatternsIndexPage() {
  return (
    <>
      <h1 className="govuk-heading-xl">Patterns</h1>
      <p className="govuk-body">
        Design solutions for common user tasks, composed from the components -
        as described in the GOV.UK Design System.
      </p>

      {PATTERN_GROUPS.map((group) => (
        <div key={group.title}>
          <h2 className="govuk-heading-l">{group.title}</h2>
          <div className="playground-index-grid">
            {group.patterns.map((pattern) => (
              <Link
                key={pattern.slug}
                className="playground-index-card"
                href={`/playground/patterns/${pattern.slug}`}
              >
                <h3 className="govuk-heading-s">{pattern.name}</h3>
                <span className="playground-index-card__meta">
                  {pattern.description}
                </span>
              </Link>
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
