// Bundles src/vivarium-card.js into the single dashboard file dist/vivarium-card.js (the card has no picture to inline: its tank
// scene is drawn in SVG by the card itself).
// Usage: node scripts/build.mjs  (dist/ is not committed: CI and the release workflow build it)
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { splitDist } from "./i18n-split.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkg = JSON.parse(readFileSync(`${root}package.json`, "utf8"));

const out = readFileSync(`${root}src/vivarium-card.js`, "utf8").replace("__VERSION__", pkg.version);
mkdirSync(`${root}dist`, { recursive: true });
writeFileSync(`${root}dist/vivarium-card.js`, out);
console.log(`Built dist/vivarium-card.js (${(out.length / 1024).toFixed(1)} KB)`);

// Translations: English stays in the bundle, each other language goes to dist/vivarium-card.i18n.<lang>.js,
// fetched when a card needs it (scripts/i18n-split.mjs).
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) splitDist(`${root}dist`, "vivarium-card.js", { version: pkg.version });
