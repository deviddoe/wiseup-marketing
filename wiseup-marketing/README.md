# Wiseup Marketing (WM)

A complete marketing department you can drop into any project: one **CMO orchestrator** that plans and reviews, and **nine specialist agents** that do the work. Everything the team produces lives in a single self-contained `Marketing/` folder, and nothing is ever published by an agent.

**WM ships empty on purpose.** No brand, no colours, no fonts, no tone, no prices, no channels — not even a language. Every one of those is project information, and WM captures it in a first-run interview instead of assuming it. Until the interview records a reply language, the plugin works in English.

## What you get

| Part | What it is |
|---|---|
| 9 agents | researcher, copywriter, social-media, ads-specialist, seo-specialist, landing-cro, analyst, presentation, outreach |
| 9 WM skills | `wm-init`, `market-research`, `weekly-social-plan`, `ad-campaign`, `landing-spec`, `outreach-batch`, `monthly-report`, `banner-compose`, `nano-banana-visual` |
| 17 bundled skills | the `grilling` interview pair, and the 15-skill `market-*` marketing toolbox — nothing to install separately |
| 1 command | `/wm` — activate the CMO in a project that is already set up |
| A checklist | `reference/required-context.md` — everything WM must know, in four tiers |
| A scaffold | `CLAUDE.md`, seven `_context/` documents, SOPs, markdown templates, an empty brand-token file, a banner renderer and an image generator |

## Design

The plugin is the **engine** and knows nothing about any product. Every fact lives in `Marketing/_context/` inside the project. The same engine runs a Georgian booking SaaS and an English fintech app without a single change to the plugin.

```
plugin (engine)                      project (facts)
wiseup-marketing/                    <any project>/
├── agents/     9 specialists    +   └── Marketing/
├── skills/     the processes            ├── CLAUDE.md      the CMO for this project
├── commands/   /wm                      ├── _context/      config, brand, product, claims
├── reference/  what must be known       ├── _sop/ _templates/ _brand/
└── scaffold/   the folder tree          └── research/ social/ ads/ seo/ pages/ reports/ …
```

### It does not disturb the host project

- Project subagents are discovered by walking **up** from the working directory, so `Marketing/.claude/agents/` is invisible to a session started at the repository root.
- `Marketing/CLAUDE.md` loads only when Claude touches a file in that folder.
- The only trace in the host project is the `Marketing/` folder plus one line in `.claude/settings.json`.

## Install

```bash
claude plugin marketplace add "D:/Claude Code/_plugins"
```

```bash
claude plugin install wiseup-marketing@wiseup
```

Then, in the project that needs a marketing department:

```
/wiseup-marketing:wm-init
```

It confirms where the folder goes, copies the scaffold, and runs the interview — nine or more rounds, driven by the bundled `grilling` skill and asked through the question widget, one round at a time. Tiers 1 and 2 of the checklist are covered in full; Tier 3 covers the work you want first; Tier 4 keeps digging until the frontier is empty.

Afterwards, start a marketing session in any of three ways:

| Way | How |
|---|---|
| Command | `/wm` from the repository root |
| Working directory | start the session inside `Marketing/` — everything loads on its own |
| Automatic | a path-scoped rule at the repository root with `paths: ["Marketing/**"]` |

## The rules that never change

1. **No agent publishes, sends, schedules or spends anything.** Every deliverable stops at `status: review`; the owner approves in chat and publishes by hand.
2. **The claims policy is binding.** One violation sends the deliverable back to `draft`.
3. **The product repository is read-only.** Landing pages ship as specs; a developer implements them.
4. **Outreach uses public business information only**, and the owner sends every message personally.
5. **AI images carry no text.** Text is overlaid afterwards by the banner renderer, so non-Latin scripts render correctly.
6. **No invented numbers, and no borrowed defaults.** A missing fact is marked missing, with the exact question or export needed to fill it.

## Brand tokens

`Marketing/_brand/tokens.json` drives the banner renderer: colours per theme, the highlight colour, the font stack and the wordmark SVG paths. It ships blank, and the renderer **refuses to run** while a value it needs is empty, naming exactly which. There is no fallback palette — a house style is a decision, not a default.

`caseTransform` supports `none`, `upper`, and `georgian-mtavruli`, for writing systems with a separate capital form.

## Requirements

- Node (no npm install, no dependencies)
- Microsoft Edge or Google Chrome, for rendering banners
- Optional: `GEMINI_API_KEY` in `Marketing/.env` for AI image generation. Without it the image skill writes prompts for a human to run manually.

## What is bundled, and from where

WM carries two other MIT-licensed projects alongside its own work, with attribution and licence texts preserved:

| Bundled | From | Licence |
|---|---|---|
| the 15 `market-*` toolbox skills | [AI Marketing Suite](https://github.com/zubair-trabzada/ai-marketing-claude) by Zubair Trabzada | MIT |
| `grilling`, `grill-me` | [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock | MIT |

`THIRD-PARTY.md` records the source, the licence and every modification; the licence texts are in `licences/`; each bundled file carries its own attribution footer. If you fork this plugin, keep all three intact — that is the whole of what MIT asks.

The bundled skills are general-purpose tools. The agents are told to take their thinking and ignore their file conventions: in WM, every deliverable lands where `_sop/02-file-conventions.md` says, with WM frontmatter, at `status: draft`.

## Licence

MIT — see `LICENSE`.

## Version

1.0.1 — always-on descriptions trimmed by 45% (~2,193 → ~1,630 tokens per session).
1.0.0 — first public release. Licensing resolved and attributed; MIT throughout.
0.3.0 — the interview and marketing toolbox skills now ship inside the plugin.
0.2.0 — renamed to Wiseup Marketing; every project assumption removed; interview rebuilt around a four-tier context checklist.
