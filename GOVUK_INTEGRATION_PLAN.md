# Integrate GOV.UK Frontend into the Next.js app

## Context

This repo (`my-app`) is a fresh **Next.js 16.2.10 App Router** project (React 19.2.4, React Compiler on, Turbopack default, plain CSS — no Sass yet). We want to adopt **GOV.UK Frontend** as the design system: its styles/assets first, then a full set of React components that reproduce the official Design System components exactly.

The goal is a production-ready foundation where:
- GOV.UK styles, fonts and images load correctly through Next's static/Sass pipeline.
- GOV.UK JavaScript-driven components initialise properly in the App Router.
- Every Design System component exists as a typed React component whose props mirror the govuk-frontend Nunjucks macro options (supporting all documented states: hint, error, disabled, etc.).

**Chosen approach (confirmed):**
- **npm + Sass** — install `govuk-frontend`, compile its SCSS via Next's built-in Sass support (`@use`, `loadPaths`, `quietDeps`), so we can import only components we use and access design tokens.
- **Typed props mirroring Nunjucks** — each component's API mirrors `macro-options` (`text`/`html`, `classes`, `attributes`, plus state objects like `hint`, `errorMessage`).
- Assets (fonts, images, manifest) copied into `public/assets/` by an automated grabber script; served at `/assets/...` (the govuk default).

**Reference sources** (read before coding each component):
- Nunjucks templates & param specs (after install): `node_modules/govuk-frontend/dist/govuk/components/<name>/template.njk` and `macro-options.mjs`.
- Official HTML/states per component: `https://design-system.service.gov.uk/components/<name>/`.
- SCSS partials: `node_modules/govuk-frontend/dist/govuk/components/<name>/_index.scss`.
- Next 16 breaking-change notes: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` (Turbopack default, no `~` in Sass imports, async request APIs).

> Do **not** run `next build` to verify. Rely on `npm run lint` (eslint) and `npx tsc --noEmit` (typecheck) only.

---

## Phase 0 — Install & wiring (foundation)

**Dependencies**
- `npm i govuk-frontend`
- `npm i -D sass`

**Asset grabber** — `scripts/copy-govuk-assets.mjs` (new)
- Copies `node_modules/govuk-frontend/dist/govuk/assets/{images,fonts}` and `manifest.json` → `public/assets/{images,fonts}` + `public/assets/manifest.json` using `fs.cp(src, dest, { recursive: true })`. Idempotent.
- Wire into `package.json`: `"postinstall": "node scripts/copy-govuk-assets.mjs"` + a standalone `"copy-govuk-assets"` script. (Browsers can't load fonts/images from `node_modules` at runtime, so copying into `public/` is required — the govuk "Option 2: copy" guidance.)

**Sass config** — `next.config.ts`
- Add `sassOptions: { loadPaths: ['node_modules'], quietDeps: true, silenceDeprecations: ['mixed-decls', 'global-builtin', 'import'] }`.
  - `loadPaths: ['node_modules']` resolves `@use "govuk-frontend/dist/govuk"` without `~` (Turbopack has no tilde support).
  - `quietDeps`/`silenceDeprecations` suppress govuk-frontend's Sass deprecation noise.
- Keep existing `reactCompiler: true`.

**Global stylesheet** — `app/govuk.scss` (new)
```scss
@use "govuk-frontend/dist/govuk" as * with (
  $govuk-assets-path: "/assets/"
);
```
- Import in `app/layout.tsx` (`import "./govuk.scss"`). Stop importing the CRA-template `globals.css`/`page.module.css` so govuk styles aren't fought by demo styles.

**Root layout** — `app/layout.tsx`
- `<html lang="en" className="govuk-template">`, `<body className="govuk-template__body">`.
- First child of `<body>`: JS-support inline script via `<script dangerouslySetInnerHTML={{__html: "document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');"}} />`.
- Add `<link rel="manifest" href="/assets/manifest.json" />` and govuk favicon/mask-icon links (assets now in `public/assets/images/`) via the Next `metadata`/`icons` export.
- Render `<GovukInit />` once in the body.

**JS initialiser** — `app/components/govuk/GovukInit.tsx` (new, `"use client"`)
- `useEffect(() => { import('govuk-frontend').then(({ initAll }) => initAll()); }, [])`. Dynamic import keeps govuk JS out of the server bundle and runs it after hydration (the modules touch `document`).

**Verification:** `npx tsc --noEmit` + `npm run lint` clean; `public/assets/{fonts,images,manifest.json}` present. Optional user-run `npm run dev` on `/` — GDS Transport font + styles apply, no `/assets` 404s.

---

## Phase 1 — Page template & shared helpers

- `app/page.tsx`: replace the Next demo with a minimal GOV.UK page shell — `govuk-skip-link`, `govuk-width-container`, `govuk-main-wrapper`, `govuk-grid-row` / `govuk-grid-column-two-thirds`, heading, plus one interactive component (Details/Accordion) to prove `initAll()` works.
- Directory convention: `app/components/govuk/<Name>/<Name>.tsx` + `index.ts` barrel, with a top-level `app/components/govuk/index.ts` re-export.
- Shared helpers — `app/components/govuk/types.ts`:
  - `TextOrHtml` = `{ text: string } | { html: React.ReactNode }` + `renderTextOrHtml()` (mirrors the njk `text`/`html`/`caller` pattern).
  - Common prop bits: `classes?`, `attributes?: Record<string,string>`, `id?`.
  - `attrs()` helper to spread `attributes` + merge `classes`.

**Verification:** `tsc`/`lint` clean; optional dev server shows a styled page with a working interactive component.

---

## Phase 2 — Recreate the 35 Design System components

For **each** component the executing agent must:
1. Read `node_modules/govuk-frontend/dist/govuk/components/<name>/template.njk` + `macro-options.mjs` for exact markup and the full prop list/defaults.
2. Cross-check states/examples at `https://design-system.service.gov.uk/components/<name>/`.
3. Implement `app/components/govuk/<Name>/<Name>.tsx` — typed React (server) component, props mirror macro-options, support every documented state (hint, label, errorMessage, disabled, prefixes/suffixes, item arrays…).
4. Reuse `TextOrHtml`/`renderTextOrHtml`/`attrs`; compose form components from shared `Label`/`Hint`/`ErrorMessage`/`Fieldset`/`FormGroup` (built first in 2b), exactly as the njk macros do.
5. Class names byte-for-byte identical to njk output — never hand-roll BEM.
6. JS-driven components (Accordion, Character count, Tabs, Notification banner, Cookie banner, Exit this page, Password input, Error summary focus, Header/Service nav mobile menu) just emit the correct `data-module="govuk-*"` attribute — the global `initAll()` from Phase 0 wires them up; no per-component JS.

**Sub-phases (each = one reviewable chunk):**
- **2a — Foundations & simple:** Button, Tag, Warning text, Inset text, Details, Skip link, Panel, Phase banner.
- **2b — Form building blocks & inputs:** Label, Hint, Error message, Fieldset, FormGroup wrapper first; then Text input, Textarea, Select, Checkboxes, Radios, Date input, File upload, Character count, Password input, Error summary. (Centralise the shared `govuk-form-group` / `--error` / `describedBy` hint+error id wiring so every input composes it identically.)
- **2c — Navigation:** Header, Footer, Service navigation, Breadcrumbs, Back link, Pagination, Tabs.
- **2d — Feedback & status:** Notification banner, Cookie banner, Task list, Summary list.
- **2e — Content & layout:** Accordion, Table, Exit this page.

**Per-sub-phase verification:** `npx tsc --noEmit` + `npm run lint` clean; register each new component in `app/components/govuk/index.ts`; optionally render it in each state on a scratch `app/kitchen-sink/page.tsx` for visual review.

---

## Critical files

| Path | Change |
| --- | --- |
| `package.json` | add `govuk-frontend` dep, `sass` devDep, `postinstall` + `copy-govuk-assets` scripts |
| `scripts/copy-govuk-assets.mjs` | new — asset grabber (`fs.cp` node_modules → `public/assets`) |
| `next.config.ts` | add `sassOptions`, keep `reactCompiler` |
| `app/govuk.scss` | new — `@use "govuk-frontend/dist/govuk" with ($govuk-assets-path: "/assets/")` |
| `app/layout.tsx` | govuk-template classes, js-enabled inline script, manifest/favicon links, `<GovukInit/>`, import `govuk.scss` |
| `app/components/govuk/GovukInit.tsx` | new — client `initAll()` on mount |
| `app/components/govuk/types.ts` | new — `TextOrHtml`, `renderTextOrHtml`, `attrs` helpers |
| `app/components/govuk/<Name>/*` | new — one dir per component (Phase 2) |
| `app/page.tsx` | replace demo with GOV.UK page shell |

## Overall verification

- No `next build`. After each phase: `npx tsc --noEmit` and `npm run lint` must be clean.
- After Phase 0: assets present under `public/assets`; styles/fonts load with no `/assets` 404s (optional user-run dev).
- After Phase 2: kitchen-sink route renders each component in its documented states; JS components behave in-browser (user-run manual check).
