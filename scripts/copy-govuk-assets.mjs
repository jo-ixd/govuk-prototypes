import { cp } from "node:fs/promises";
import path from "node:path";

const srcRoot = path.join(`node_modules/govuk-frontend/dist/govuk/assets`);
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
  { recursive: true }
);
