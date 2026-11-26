import Link from "next/link";
import { existsSync, readdirSync } from "node:fs";
import Details from "@/app/components/govuk/Details";
import InsetText from "@/app/components/govuk/InsetText";

type ViewEntry = {
  slug: string;
  title: string;
};

function titleFromSlug(slug: string): string {
  const words = slug.split("-").join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Every folder in app/views with a page.tsx file is a prototype route:
// app/views/my-prototype/page.tsx is served at /views/my-prototype. The
// index below is built by scanning the folder, so a new prototype appears
// here as soon as its folder exists - there is no list to maintain.
// Underscore-prefixed folders are skipped, matching the Next.js private
// folder convention.
function discoverViews(): ViewEntry[] {
  return readdirSync("app/views", { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("_") &&
        existsSync(`app/views/${entry.name}/page.tsx`),
    )
    .map((entry) => ({ slug: entry.name, title: titleFromSlug(entry.name) }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default function ViewsPage() {
  const views = discoverViews();

  return (
    <>
      <h1 className="govuk-heading-xl">Design views</h1>
      <p className="govuk-body">
        Design prototypes live in <code>app/views</code>, like the views
        folder in the GOV.UK Prototype Kit. Each folder below is a standalone
        prototype.
      </p>

      <Details
        summaryText="How do I add a prototype?"
        html={
          <ul className="govuk-list govuk-list--bullet">
            <li>
              Create a folder in <code>app/views</code> named after your
              prototype, for example <code>app/views/my-prototype</code>
            </li>
            <li>
              Add a <code>page.tsx</code> file - it is served at{" "}
              <code>/views/my-prototype</code>
            </li>
            <li>
              It appears on this page automatically, linked from the kit
              landing page
            </li>
          </ul>
        }
      />

      {views.length === 0 ? (
        <InsetText text="No prototypes yet. Create a folder in app/views with a page.tsx file and it will appear here automatically." />
      ) : (
        <div className="playground-index-grid">
          {views.map((view) => (
            <Link
              key={view.slug}
              className="playground-index-card"
              href={`/views/${view.slug}`}
            >
              <h3 className="govuk-heading-s">{view.title}</h3>
              <span className="playground-index-card__meta">
                {`/views/${view.slug}`}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
