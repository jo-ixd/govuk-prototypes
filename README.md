# GOV.UK Prototypes

A Next.js port of the GOV.UK Prototype Kit. **Pre-alpha** — the end goal is
`npm create govuk-prototype`: one command to scaffold a working GOV.UK
prototype app with Next.js.

## Package layout

| Path                               | What it is                                                          |
| ---------------------------------- | ------------------------------------------------------------------- |
| `prototype-starter/`               | The Next.js app the prototype kit produces                          |
| `packages/govuk-prototype/`        | Core runtime package: GOV.UK components, shared types and helpers   |
| `packages/create-govuk-prototype/` | `npm create govuk-prototype` scaffolder (stub, not implemented yet) |

## Getting started

```sh
npm install
npm run dev
```

This runs the Next.js app in `prototype-starter/` at `http://localhost:3000`.

## Checks

All checks run from the repo root:

```sh
npm run lint          # eslint across the app and packages
npm run typecheck     # tsc for prototype-starter (and through imports, packages)
npm run test          # vitest unit tests
npm run format:check  # prettier check
npm run build         # production build of prototype-starter
```

These are the checks enforced by CI on every pull request.
