#!/usr/bin/env node
// Banner renderer: spec JSON -> PNG via headless Edge/Chrome.
// Usage: node _templates/banner/render.mjs <spec.json> <out.png>
//
// Every brand value comes from <marketing root>/_brand/tokens.json. There are NO built-in
// colours or fonts: if a value this render needs is missing, the script stops and says which.
// Edit tokens.json, never this file and never template.html.
//
// Spec: { "size": "1080x1350", "layout": "overlay|text", "theme": "dark|light",
//         "background": "path/to/text-free-image.jpg" (optional, relative to the spec file),
//         "badge": "...", "headline": "...", "sub": "...", "cta": "...",
//         "headlineSize": 104 (optional, px at 1080 width),
//         "badgeCase": "none|upper|georgian-mtavruli" (optional; defaults to tokens.caseTransform),
//         "keepHtml": true (optional) }
import { readFileSync, writeFileSync, existsSync, unlinkSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const [specPath, outPath] = process.argv.slice(2);
if (!specPath || !outPath) {
  console.error("Usage: node render.mjs <spec.json> <out.png>");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const marketingRoot = resolve(here, "..", "..");
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const [W, H] = (spec.size || "1080x1080").split("x").map(Number);
const theme = spec.theme === "light" ? "light" : "dark";

const tokensPath = resolve(marketingRoot, "_brand/tokens.json");
if (!existsSync(tokensPath)) {
  console.error(`No brand tokens at ${tokensPath}.\nWiseup Marketing ships without a house style. Run the wm-init brand round, or fill the file by hand.`);
  process.exit(2);
}
const T = JSON.parse(readFileSync(tokensPath, "utf8"));
const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), T);

// Only the values this particular render needs are required.
const needed = [
  ["fonts.stack", "font stack"],
  [`${theme}.bg`, `${theme} background colour`],
  [`${theme}.fg`, `${theme} text colour`],
];
if (spec.sub) needed.push([`${theme}.muted`, `${theme} muted text colour`]);
if (spec.cta) needed.push([`${theme}.cta`, `${theme} CTA colour`], [`${theme}.ctaFg`, `${theme} CTA text colour`]);
if (spec.badge) needed.push(["highlight.bg", "highlight colour"], ["highlight.fg", "highlight text colour"]);

const missing = needed.filter(([k]) => {
  const v = get(k);
  return v === undefined || v === null || String(v).trim() === "";
});
if (missing.length) {
  console.error(
    "Brand tokens are not configured. Missing:\n" +
    missing.map(([k, label]) => `  - ${k}  (${label})`).join("\n") +
    `\n\nFill ${tokensPath} - the wm-init brand round does this. ` +
    "Wiseup Marketing has no default palette on purpose."
  );
  process.exit(2);
}

// #RRGGBB / #RGB -> "r, g, b" for the gradient. Any other notation is passed through untouched.
const toRgb = (hex) => {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ");
};
const bgHex = get(`${theme}.bg`);
const bgRgb = toRgb(bgHex);
if (!bgRgb && spec.background) {
  console.error(`${theme}.bg must be a hex colour (#RRGGBB) so the image gradient can be built. Got: ${bgHex}`);
  process.exit(2);
}

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cls = (v) => (v ? "" : "empty");

// Georgian Mkhedruli -> Mtavruli by code point (U+10D0..10FA -> U+1C90..1CBA, U+10FD..10FF -> U+1CBD..1CBF).
const mtavruli = (s) => [...String(s ?? "")].map((ch) => {
  const c = ch.codePointAt(0);
  return (c >= 0x10d0 && c <= 0x10fa) || (c >= 0x10fd && c <= 0x10ff) ? String.fromCodePoint(c + 0xbc0) : ch;
}).join("");

const badgeCase = spec.badgeCase || T.caseTransform || "none";
const badgeWords = String(spec.badge ?? "").trim().split(/\s+/).filter(Boolean).length;
if (badgeCase !== "none" && badgeWords > 3)
  throw new Error("A case transform on the badge is allowed for badges of 3 words or fewer.");
const badge =
  badgeCase === "upper" ? String(spec.badge ?? "").toUpperCase()
  : badgeCase === "georgian-mtavruli" ? mtavruli(spec.badge)
  : spec.badge;

// Logo: an inlined SVG named in tokens, a plain wordmark as a fallback, or nothing at all.
const logoRel = theme === "light" ? T.logo?.onLight : T.logo?.onDark;
let logo = "";
if (logoRel) {
  const logoFile = resolve(marketingRoot, logoRel);
  if (!existsSync(logoFile)) throw new Error(`Logo not found: ${logoFile} (check _brand/tokens.json)`);
  logo = readFileSync(logoFile, "utf8").replace(/<title>[\s\S]*?<\/title>/, "").replace(/ width="\d+" height="\d+"/, "");
} else if (T.logo?.text) {
  logo = `<div class="wordmark">${esc(T.logo.text)}</div>`;
}

let bg = "";
if (spec.background) {
  const p = resolve(dirname(resolve(specPath)), spec.background);
  if (!existsSync(p)) throw new Error(`Background not found: ${p}`);
  bg = pathToFileURL(p).href;
}

const v = (k, fallback = "") => {
  const x = get(k);
  return x === undefined || x === null || String(x).trim() === "" ? fallback : x;
};

const html = readFileSync(resolve(here, "template.html"), "utf8")
  .replaceAll("{{W}}", W)
  .replaceAll("{{H}}", H)
  .replaceAll("{{FONT_CSS}}", v("fonts.googleCss"))
  .replaceAll("{{FONT_STACK}}", v("fonts.stack"))
  .replaceAll("{{HEADLINE_WEIGHT}}", v("fonts.headlineWeight", "700"))
  .replaceAll("{{HEADLINE_STRETCH}}", v("fonts.headlineStretch", "100%"))
  .replaceAll("{{HEADLINE_TRACKING}}", v("fonts.headlineTracking", "0"))
  .replaceAll("{{THEME_BG}}", v(`${theme}.bg`))
  .replaceAll("{{THEME_BG_RGB}}", bgRgb || "0, 0, 0")
  .replaceAll("{{THEME_FG}}", v(`${theme}.fg`))
  .replaceAll("{{THEME_MUTED}}", v(`${theme}.muted`, v(`${theme}.fg`)))
  .replaceAll("{{THEME_CTA}}", v(`${theme}.cta`))
  .replaceAll("{{THEME_CTA_FG}}", v(`${theme}.ctaFg`))
  .replaceAll("{{HL_BG}}", v("highlight.bg"))
  .replaceAll("{{HL_FG}}", v("highlight.fg"))
  .replaceAll("{{LOGO_WIDTH}}", Number(v("logo.widthPx", 236)))
  .replaceAll("{{LAYOUT}}", esc(spec.layout || (bg ? "overlay" : "text")))
  .replaceAll("{{THEME}}", theme)
  .replaceAll("{{LOGO}}", logo)
  .replaceAll("{{LOGO_CLASS}}", cls(logo))
  .replaceAll("{{BG}}", bg)
  .replaceAll("{{BG_CLASS}}", cls(bg))
  .replaceAll("{{BADGE}}", esc(badge))
  .replaceAll("{{BADGE_CLASS}}", cls(spec.badge) + (badgeCase !== "none" ? " transformed" : ""))
  .replaceAll("{{HEADLINE}}", esc(spec.headline))
  .replaceAll("{{HEADLINE_SIZE}}", Number(spec.headlineSize) || 104)
  .replaceAll("{{SUB}}", esc(spec.sub))
  .replaceAll("{{SUB_CLASS}}", cls(spec.sub))
  .replaceAll("{{CTA}}", esc(spec.cta))
  .replaceAll("{{CTA_CLASS}}", cls(spec.cta));

const out = resolve(outPath);
const tmp = out.replace(/\.png$/i, "") + ".render.html";
writeFileSync(tmp, html);

const browsers = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(existsSync);
if (!browsers.length) throw new Error("No Edge/Chrome found for rendering.");

// A headless browser can exit 0 and write nothing at all - a broken Edge install does exactly
// that. Never trust the exit code: delete the target first, then check the file really appeared,
// and move on to the next browser if it did not.
if (existsSync(out)) unlinkSync(out);

const args = [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--virtual-time-budget=6000",
  `--window-size=${W},${H}`,
  `--screenshot=${out}`,
  pathToFileURL(tmp).href,
];

let used = null;
const failures = [];
try {
  for (const browser of browsers) {
    let err = "";
    try {
      execFileSync(browser, args, { stdio: "pipe" });
    } catch (e) {
      err = String(e.stderr || e.message || "").trim().split("\n")[0];
    }
    if (existsSync(out) && statSync(out).size > 0) {
      used = browser;
      break;
    }
    failures.push(`  ${browser}${err ? " - " + err : " - exited without writing a file"}`);
  }
} finally {
  if (!spec.keepHtml && existsSync(tmp)) unlinkSync(tmp);
}

if (!used) {
  console.error(
    "No browser produced a screenshot. Tried:\n" + failures.join("\n") +
    "\n\nInstall or repair Google Chrome or Microsoft Edge, then run this again."
  );
  process.exit(3);
}
console.log(`Rendered ${W}x${H} -> ${out}  (${used.split(/[\\/]/).pop()})`);
