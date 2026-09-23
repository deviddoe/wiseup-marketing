---
name: wm-init
description: Set up the marketing department in this project: create Marketing/, interview the owner, wire up activation. Use for "set up marketing", "wm init".
---

# WM init

Run once per project. It turns a repository into one that has a working marketing department, without touching the project's own architecture.

**Conduct this entire skill in English** until the owner's reply language is recorded in step 3, round 1. From that point on, speak to the owner in their language; the `_context/` files stay in English regardless.

WM ships with **no defaults**: no brand, no colours, no fonts, no tone, no prices, no channels, no language. Everything below is captured from the owner or left as an explicit `TODO`. Never fill a gap with a plausible guess, and never carry an answer over from another project.

## Step 1 - Confirm the location

Default marketing root: `Marketing/` at the repository root. Confirm it, or use the folder the owner names. Everything the marketing team ever writes lives inside it.

If that folder already exists with a `CLAUDE.md` in it, **stop** and ask whether to update the existing setup instead of overwriting it.

## Step 2 - Copy the scaffold

Copy `${CLAUDE_PLUGIN_ROOT}/scaffold/` into the marketing root, preserving structure. **Include the dot-files** - `.claude/settings.json`, `.env.example`, `.gitignore` - a plain glob copy will miss them. Then create the empty output folders: `research/`, `research/outreach/`, `social/`, `ads/`, `seo/`, `pages/`, `reports/`, `reports/data/`, `presentation/`, `_archive/`.

Never overwrite an existing file; list every one you skipped. The agents and the process skills stay in the plugin - only content, configuration and templates are scaffolded.

## Step 3 - The interview

Read `${CLAUDE_PLUGIN_ROOT}/reference/required-context.md`. It is the canonical list of what must be known, in four tiers. The interview covers **Tier 1 and Tier 2 in full**; Tier 3 is covered for the work the owner says they want first; Tier 4 is the grilling.

**Run it with the bundled `wiseup-marketing:grilling` skill.** It ships with this plugin, so it is always there - invoke it and work the design tree it describes: ask a whole frontier per round, with your recommended answer next to each question, then wait for the answers before recomputing the frontier.

**Ask every round through the `AskUserQuestion` tool, not as a numbered list in prose.** One call per round, one question object per item, each with a short header and two to four concrete options plus your recommendation first. Free text is always available to the owner, so offer options even where the answer is open - a bad option is still faster to correct than a blank page.

Order of rounds (later rounds depend on earlier answers, so never merge them):

| Round | Covers | Writes to |
|---|---|---|
| 1 | Reply language, customer language(s), project and product name, time zone, who approves and publishes | `00-config.md`, `CLAUDE.md` |
| 2 | What the product does, who it is for, the primary conversion action and its URL | `product-offering.md`, `brand-context.md`, `00-config.md` |
| 3 | Plans, prices, currency, billing and trial terms; live features versus roadmap | `product-offering.md` |
| 4 | Forbidden claims, legal or regulatory limits, whether any real testimonial exists | `claims-policy.md` |
| 5 | Form of address, tone, glossary of words we use and never use | `brand-voice-guide.md`, `00-config.md` |
| 6 | Brand colours, typography, logo files - or an explicit "none yet" | `_brand/tokens.json`, `brand-style-guide.md` |
| 7 | Segments, goals with dates, channels, ad platforms, budget ceiling, analytics status | `growth-marketing-context.md`, `00-config.md` |
| 8 | Site stack, routing, languages, who deploys | `technical-context.md` |
| 9+ | **Grilling** - Tier 4. Keep going until the frontier is empty | across `_context/` |

**Write every answer into the file the moment you get it.** Do not hold a round in conversation and batch the writing; a dropped session must never lose an answer.

If the owner says "later" or "I don't know", write an explicit line:
`TODO: <what is missing> - ask <who can answer> - blocks <which agent or deliverable>`

Round 6 has a hard consequence worth stating out loud: **until brand colours and a font stack exist in `_brand/tokens.json`, the banner renderer refuses to run.** There is no house style to fall back on. If the owner has no brand yet, record that and put a brand brief from the `copywriter` agent at the top of the first-tasks list.

Facts are your job, not the owner's. If a question can be answered by reading the repository - the stack, the routes, the i18n files, the existing pages - go and read it, then confirm what you found instead of asking a blank question.

## Step 4 - Write the project CLAUDE.md

Fill `<marketing root>/CLAUDE.md` from the scaffold template: project name, owner name, reply language, marketing root path, and the product repository path if the marketing folder sits beside the code rather than inside it. Replace every placeholder; leave none behind.

## Step 5 - Wire up activation

1. Enable the plugin for this project in `<marketing root>/.claude/settings.json`, and in the repository's own `.claude/settings.json` if the owner wants to run `/wm` from the repository root:
   ```json
   { "enabledPlugins": { "wiseup-marketing@wiseup": true } }
   ```
2. Check the permission rules in `<marketing root>/.claude/settings.json` still fit; adjust the script paths if the marketing root is not `Marketing/`.
3. Offer a path-scoped rule at the repository root so the marketing rules load automatically whenever the folder is touched: `.claude/rules/marketing.md` with `paths: ["Marketing/**"]`.
4. Ask whether to schedule the recurring work - a weekly content plan and a monthly report - and at which local time in the time zone from round 1. Only create schedules the owner asks for.

## Step 6 - Report

In the owner's reply language:
- where the marketing root is and what was created,
- a tier-by-tier status of the required context: complete, or the exact `TODO` lines that remain,
- the three ways to start a marketing session (`/wm`, a session whose working directory is the marketing root, or touching a file in it),
- the first three tasks you recommend, each with the agent that would do it and the context it still needs.
