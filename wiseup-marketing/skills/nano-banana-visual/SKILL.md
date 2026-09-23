---
name: nano-banana-visual
description: Generate text-free, on-brand images with Google Gemini "Nano Banana" via the API, falling back to ready-to-paste prompts when no API key is set. Always pair with banner-compose for any text.
---

# Nano Banana visual

Engine: Google Gemini image models. Script: `_templates/nano-banana/generate.mjs` in the marketing root.

Check `00-config.md` first: if the project's image engine is set to manual or none, skip the API entirely and work in manual mode.

| Model | ID | Use for |
|---|---|---|
| Nano Banana 2 (default) | `gemini-3.1-flash-image` | everyday backgrounds, social and ad visuals |
| Nano Banana Pro | `gemini-3-pro-image` | hero images, logo concepts, hard compositions - slower and pricier |
| Nano Banana 2 Lite | `gemini-3.1-flash-lite-image` | quick drafts and many variations |

## 0. Mode check - always first
Run `node _templates/nano-banana/generate.mjs <spec.json> --dry-run`. It prints the request and whether the key was found. **Never print, read or copy the key value itself.**
- **Found** - API mode, continue with steps 1-5.
- **Missing** - manual mode: write the same spec and prompt, ask the CMO to pass the prompt to the owner to generate and save under the exact `out` filename, then continue from step 4.

## 1. Write the spec
- `prompt` - English, a concrete scene: subject, place, light, lens or angle, mood. Follow the imagery section of `_context/brand-style-guide.md`. If that section is still `TODO`, **stop**: there is no visual direction to follow yet, and a generated image would set one by accident. Describe brand colours **in words**, never as hex codes - a hex code can appear as text in the image.
- `out` - `<deliverable>_bg.jpg`. Never overwrite an approved file; use `_v2`, `_v3`.
- `aspect_ratio` - match the final banner.
- `image_size` - `2K` by default; `4K` only for print or a hero image.
- `references` (optional) - a few images for style or object consistency. Never real customers' photos or data.

The script appends the no-text guard and a request to keep the lower third calm for the overlay.

## 2. Generate
`node _templates/nano-banana/generate.mjs <spec.json>` from the marketing root. Exit codes: 2 = no key, 3 = API error, 4 = no image returned (a safety block - the raw response is saved next to `out`). A quota error naming the free tier means image models are not available on that plan: do not retry, switch to manual mode and tell the owner billing must be enabled.

## 3. Budget guard
At most **4 generations per deliverable** and **12 per request** without the owner's explicit approval. Use Lite to explore, the default model for finals, Pro only when the composition demands it.

## 4. Check the image - Read it
Reject and regenerate, adjusting the prompt, if you see: any text, letters or pseudo-letters, logos or watermark-like marks; distorted hands, faces or vehicles; a scene that reads as foreign to the audience or as stock photography; no calm space for the text overlay. AI people are scene illustrations only and must never be captioned as real customers.

## 5. Compose and log
- Overlay the text with `banner-compose`, passing this file as `background`.
- Record in the deliverable frontmatter: `generated_with: nano-banana/<model>` and `image_spec: <spec.json>`.
- Logo concepts are exploration only; a final logo must be redrawn as vector before use.
