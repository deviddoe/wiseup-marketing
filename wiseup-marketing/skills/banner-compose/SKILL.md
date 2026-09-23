---
name: banner-compose
description: Render an on-brand banner PNG with correct text over a brand background or a text-free AI image.
---

# Banner compose

AI image generators garble text, especially in non-Latin scripts. Text is therefore **never** generated inside an image: this skill overlays it with an HTML template and renders the result to PNG with headless Edge or Chrome.

## The brand must exist first
Everything visual comes from `<marketing root>/_brand/tokens.json`: colours per theme, the highlight colour, the font stack, and the wordmark SVG paths. **Wiseup Marketing ships that file empty and the renderer refuses to run while a value it needs is blank.** If you hit that error, the project has no house style yet - say so and route the owner to the brand round of `wm-init`, or to a brand brief from the `copywriter` agent.

## Files (in the marketing root)
- `_brand/tokens.json` - the only place to change the brand.
- `_templates/banner/template.html` - the layout. Never edit it to change a colour.
- `_templates/banner/render.mjs` - the renderer.
- `_templates/banner/example.json` - a placeholder spec.

## Steps
1. Write a spec JSON next to the deliverable:
   ```json
   {
     "size": "1080x1350",
     "layout": "overlay",
     "theme": "dark",
     "background": "<file>_bg.jpg",
     "badge": "...",
     "headline": "...",
     "sub": "...",
     "cta": "..."
   }
   ```
   - `size`: use the ratios the target platform actually serves - 1:1, 4:5, 9:16 and 1.91:1 cover most feeds, stories and link units. The sizes this project needs are recorded in `00-config.md`.
   - `layout`: `overlay` (text at the bottom over an image with a gradient) or `text` (solid brand background - omit `background`).
   - `theme`: `dark` or `light`, as defined in `tokens.json`.
   - The badge carries the offer or the price only, and there is one badge per visual.
   - Optional: `headlineSize` (default 104 px at 1080 width) - lower it for a long headline; `badgeCase` (`none`, `upper`, `georgian-mtavruli`); `keepHtml: true` to inspect the intermediate HTML.
   - Any field can be omitted; the element disappears.
2. Render: `node _templates/banner/render.mjs <spec.json> <out.png>`, run from the marketing root. `background` resolves relative to the spec file.
3. **Look at the PNG** - Read it - before handing it over: the text fits, nothing overlaps, the headline is 3 lines or fewer, it is readable at phone size.
4. Name outputs `<name>_v1.png`, `_v2.png`. Never overwrite an approved version.

## Copy limits
Headline 7 words or fewer, sub 15 or fewer, badge 3 or fewer, CTA 4 or fewer. All text passes `_context/claims-policy.md`.
