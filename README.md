# GOV.UK Prototypes

A modern, React-based prototype kit for the [GOV.UK Design System](https://design-system.service.gov.uk/), built with [Next.js](https://nextjs.org/) and [React 19](https://react.dev/).

Every component from [govuk-frontend](https://github.com/alphagov/govuk-frontend) 6.4 is ported from its nunjucks macros to React server components, with a playground route for each one, the design system patterns composed from them, and a worked example service.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

- `/` - the kit landing page
- `/playground` - the component playground (every component, official examples, live prop controls)
- `/playground/patterns` - the design system patterns, built from the components
- `/playground/example-service` - "Renew a parking permit", a complete multi-page journey with validation

## Using the components

Components live in `app/components/govuk/` and mirror the govuk-frontend macro APIs - the options documented in each macro's `macro-options.json` become React props (camelCase, `for` becomes `htmlFor`, and `html` accepts React nodes instead of raw HTML strings):

```tsx
import Button from "@/app/components/govuk/Button";
import Input from "@/app/components/govuk/Input";

<Input
  name="national-insurance-number"
  label={{ text: "What is your National Insurance number?", isPageHeading: true }}
  hint={{ text: "It’s on your National Insurance card, benefit letter, payslip or P60." }}
/>
```

A barrel export is available for convenience:

```tsx
import { Button, Input, Radios } from "@/app/components/govuk";
```

### How the port works

- The GOV.UK styles and progressive-enhancement JavaScript still come from the govuk-frontend package: Sass is compiled through `app/govuk.scss`, assets are copied to `public/assets` at build time, and `initAll()` runs on every page (`app/components/govuk/GovukInit.tsx`). Components that need JavaScript behaviour (accordion, tabs, character count, radios, checkboxes, error summary and so on) render the same `data-module` markup the nunjucks macros would, so the Design System JavaScript works unchanged.
- Components are React server components: no client JavaScript of their own, `useId` generates ids when none is passed, and ids/aria wiring (`aria-describedby`, error and hint ids) is derived exactly as the nunjucks templates derive it.
- Interactive pieces (playground controls, form validation demos) are small `"use client"` wrappers around the same server-safe components.

## Building prototype pages

The pattern pages under `app/playground/patterns` are the templates to copy: a question page is a `BackLink`, a legend or label as the page heading, the field component with `hint` and `errorMessage` props, and a `Button`. The example service under `app/playground/example-service` shows a full journey where answers travel between pages as URL search parameters - no server state required - including returning from check answers with the fields prefilled.

## Commands

```bash
npm run dev            # start the dev server
npm run build          # copy govuk assets and build for production
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm test               # unit tests
npm run test:watch     # unit tests in watch mode
npm run test:coverage  # unit tests with coverage thresholds
npm run test:e2e       # end to end tests against a production build
```

## Testing

The suite has two layers, both runnable locally:

- **Unit tests** (`tests/unit/...`) mirror the `app/` tree and lock down the component contracts: aria and id wiring between labels, hints, errors and fields, GOV.UK class names, the `data-module` hooks that let the design system JavaScript work unchanged, error variants, the journey param helpers, the client forms and the init script. A barrel completeness test fails if a component is exported without a minimal render case, so new components cannot skip coverage.
- **End to end tests** (`tests/e2e/...`) run in Chromium against a production build that Playwright starts automatically: the full example-service journey with its GOV.UK error patterns, a route inventory that discovers every playground, pattern and service page and asserts it renders, live govuk-frontend enhancements (character count, accordion, tabs), the served fonts and images, and the GOV.UK styled 404.

Generated output (coverage and test results) is written to `.artifacts/`, which is gitignored. CI runs lint, typecheck, coverage-checked unit tests and the end to end suite on every push and pull request.

## Project structure

```
app/
  components/govuk/    # the 36 ported components + shared atoms, barrel export
  playground/
    _components/       # showcase helpers (Example sections, live controls)
    components/<slug> # one route per component: official fixtures + live playground
    patterns/<slug>    # design system patterns composed from the components
    example-service/   # a complete multi-page user journey
  govuk.scss           # govuk-frontend styles entry point
scripts/copy-govuk-assets.mjs  # copies fonts/images/manifest into public/assets
tests/
  unit/                # vitest unit tests, mirroring the app/ tree
  e2e/                 # playwright end to end specs
  setup.ts             # vitest setup: jest-dom matchers, rtl cleanup
.artifacts/            # generated coverage and test results (ignored)
```
