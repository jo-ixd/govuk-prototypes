import { cp } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const srcRoot = path.join(
  path.dirname(require.resolve("govuk-frontend/package.json")),
  "dist/govuk/assets",
);
const destRoot = path.join(`public/assets`);

await cp(path.join(srcRoot, "images"), path.join(destRoot, "images"), {
  recursive: true,
});

await cp(path.join(srcRoot, "fonts"), path.join(destRoot, "fonts"), {
  recursive: true,
});

await cp(
  path.join(srcRoot, "manifest.json"),
  path.join(destRoot, "manifest.json"),
  { recursive: true },
);
