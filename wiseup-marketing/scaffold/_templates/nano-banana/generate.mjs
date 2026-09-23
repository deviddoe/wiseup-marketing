#!/usr/bin/env node
// Image generator: spec JSON -> image via Google Gemini "Nano Banana" (Interactions API).
// Usage: node _templates/nano-banana/generate.mjs <spec.json> [--dry-run]
// Spec (paths relative to the spec file):
// {
//   "prompt": "…English scene description…",
//   "out": "2026-10-06_launch-s1_bg.png",
//   "aspect_ratio": "4:5",            // 1:1 4:5 5:4 3:4 4:3 2:3 3:2 9:16 16:9 21:9
//   "image_size": "2K",               // 1K | 2K | 4K
//   "model": "gemini-3.1-flash-image",// Nano Banana 2 (default) | gemini-3-pro-image (Pro) | gemini-3.1-flash-lite-image (Lite)
//   "references": ["ref/style.png"]   // optional reference images (style / object / previous version)
// }
// Key: GEMINI_API_KEY from the environment or the marketing root's .env. Never printed.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const specPath = args.find((a) => !a.startsWith("--"));
if (!specPath) {
  console.error("Usage: node generate.mjs <spec.json> [--dry-run]");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..", "..");
const envFile = resolve(projectRoot, ".env");
if (!process.env.GEMINI_API_KEY && existsSync(envFile)) process.loadEnvFile(envFile);
const key = process.env.GEMINI_API_KEY;

const specDir = dirname(resolve(specPath));
const spec = JSON.parse(readFileSync(specPath, "utf8"));
if (!spec.prompt || !spec.out) throw new Error("Spec needs 'prompt' and 'out'.");

// Brand guard: AI images must never contain text (it is overlaid later by banner-compose).
const guard =
  " Absolutely no text, letters, numbers, captions, signs, logos or watermarks anywhere in the image." +
  " Leave calm, uncluttered space in the lower third for a text overlay added later.";
const prompt = spec.prompt.trim() + guard;

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };
const input = [{ type: "text", text: prompt }];
for (const ref of spec.references || []) {
  const p = resolve(specDir, ref);
  if (!existsSync(p)) throw new Error(`Reference not found: ${p}`);
  const mime = MIME[extname(p).toLowerCase()];
  if (!mime) throw new Error(`Unsupported reference type: ${p}`);
  input.push({ type: "image", mime_type: mime, data: readFileSync(p).toString("base64") });
}

// The Interactions API returns JPEG only, so the output is always saved as .jpg.
const out = resolve(specDir, spec.out).replace(/\.(png|webp|jpeg|jpg)$/i, "") + ".jpg";
const body = {
  model: spec.model || "gemini-3.1-flash-image",
  input,
  response_format: {
    type: "image",
    mime_type: "image/jpeg",
    aspect_ratio: spec.aspect_ratio || "1:1",
    image_size: spec.image_size || "2K",
  },
};

if (dryRun) {
  const shown = { ...body, input: body.input.map((i) => (i.data ? { ...i, data: `<${i.data.length} b64 chars>` } : i)) };
  console.log(JSON.stringify(shown, null, 2));
  console.log(key ? "GEMINI_API_KEY: found" : "GEMINI_API_KEY: MISSING");
  process.exit(0);
}
if (!key) {
  console.error("GEMINI_API_KEY is missing. Add it to .env (see .env.example). Use manual mode meanwhile.");
  process.exit(2);
}

const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
  method: "POST",
  headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const text = await res.text();
if (!res.ok) {
  console.error(`API error ${res.status}: ${text.slice(0, 1500)}`);
  process.exitCode = 3;
} else {
  save(JSON.parse(text));
}

function save(json) {

// Find the first base64 image anywhere in the response (covers output_image, steps[].content[], legacy inlineData).
function findImage(node) {
  if (!node || typeof node !== "object") return null;
  if (typeof node.data === "string" && node.data.length > 1000 && (node.type === "image" || /^image\//.test(node.mime_type || node.mimeType || "")))
    return node.data;
  if (node.inlineData?.data) return node.inlineData.data;
  if (node.inline_data?.data) return node.inline_data.data;
  for (const v of Array.isArray(node) ? node : Object.values(node)) {
    const hit = findImage(v);
    if (hit) return hit;
  }
  return null;
}
  const b64 = findImage(json);
  if (!b64) {
    const debug = out.replace(/\.[a-z]+$/i, "") + ".response.json";
    writeFileSync(debug, JSON.stringify(json, null, 2));
    console.error(`No image in response (maybe blocked by safety filters). Raw response saved: ${debug}`);
    process.exitCode = 4;
    return;
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(b64, "base64"));
  console.log(`Generated (${body.model}, ${body.response_format.aspect_ratio}, ${body.response_format.image_size}) -> ${out}`);
}
