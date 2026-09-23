# Required context - what WM must know

This is the canonical list of everything the marketing team needs before it can work. `wm-init` walks it as an interview; the CMO re-checks it whenever a task needs something that is still `TODO`.

Nothing in this plugin carries a default. If an item is not answered, it stays `TODO` and every agent that depends on it refuses to guess.

**The interview itself is conducted in English.** The reply language is the first thing it asks; from the moment that answer is recorded, the CMO switches to it.

**Only Tier 1 blocks the start.** `wm-init` covers it in two rounds and then begins work. Everything below Tier 1 is asked **just in time** - by the agent that needs the fact, at the moment it needs it, as a single question. Tier 4 is a dedicated grilling session, offered once after the first deliverable ships.

---

## Tier 1 - Blocking. Nothing can be produced without these.

| # | Question | Fills | Without it |
|---|---|---|---|
| 1.1 | Project name, product name, and the exact public spelling used in copy | `00-config.md` | no deliverable can name the product |
| 1.2 | Reply language - the language the CMO speaks to the owner in | `00-config.md` | the team stays in English |
| 1.3 | Customer-facing language(s) | `00-config.md` | no copy can be written |
| 1.4 | What the product does, in one sentence a customer would say | `product-offering.md` | no positioning, no messaging |
| 1.5 | Who it is for - the customer in one sentence | `brand-context.md` | no segment, no targeting |
| 1.6 | The primary conversion action and its exact URL | `00-config.md` | no CTA, no UTM, no funnel |
| 1.7 | Who approves and who publishes - name and role | `00-config.md`, `CLAUDE.md` | the approval workflow has no owner |
| 1.8 | Time zone | `00-config.md` | no publish times, no schedules, no report periods |

## Tier 2 - Required before anything may be published.

| # | Question | Fills |
|---|---|---|
| 2.1 | Plans, prices, what is included, billing terms, trial terms | `product-offering.md` |
| 2.2 | Currency, symbol, and how a price is written in copy | `00-config.md` |
| 2.3 | Features that are **live today**, listed strictly | `product-offering.md` |
| 2.4 | Features on the roadmap that must never be claimed as available | `product-offering.md`, `claims-policy.md` |
| 2.5 | **Forbidden claims** - every capability we lack, every comparison we cannot prove, whether any real testimonial exists | `claims-policy.md` |
| 2.6 | Form of address (formal or informal), and any channel that differs | `00-config.md`, `brand-voice-guide.md` |
| 2.7 | Tone in three adjectives; words we use and words we never use | `brand-voice-guide.md` |
| 2.8 | Brand colours - or an explicit "we have none yet" | `_brand/tokens.json`, `brand-style-guide.md` |
| 2.9 | Typography, including the script the product must support | `_brand/tokens.json`, `brand-style-guide.md` |
| 2.10 | Logo files, or "not yet" | `_brand/tokens.json` |
| 2.11 | Legal or regulatory limits on advertising in this category | `claims-policy.md` |

Until 2.8-2.10 are answered, the banner renderer refuses to run. That is deliberate: there is no house style to fall back on.

## Tier 3 - Required per kind of work. Ask when that work is first requested.

| Work | Questions | Fills |
|---|---|---|
| **Any campaign or report** | Goals with dates and numbers; what success looks like; product stage (pre-launch, launched, scaling) | `growth-marketing-context.md` |
| **Social** | Which channels are active, who is on each, cadence, content mix, who can post | `growth-marketing-context.md` |
| **Paid ads** | Which ad platforms, monthly ceiling, stop rule, ad accounts ready or not | `growth-marketing-context.md` |
| **Any measurement** | Analytics tool and status, conversion pixel and status, which events exist | `growth-marketing-context.md` |
| **SEO or landing pages** | Site stack, routing, how languages work, who deploys, where the i18n files live | `technical-context.md` |
| **Outreach** | Sales motion (self-serve or sales-led), target geography, allowed sources, who sends | `growth-marketing-context.md` |
| **Segments** | Each segment: who they are, their core message, their priority | `00-config.md`, `growth-marketing-context.md` |
| **Decks** | Audiences, and which of them get a different language | `00-config.md` |

## Tier 4 - Deepens quality. This is what the grilling rounds are for.

These are not blocking, but each one measurably improves what the agents produce.

| Theme | What to dig for |
|---|---|
| Real customer language | Exact phrases customers use for their problem - from calls, reviews, support tickets, group posts |
| Objections | The three reasons people say no, and the honest answer to each |
| The competitor comparison | Who they are compared against, and the honest difference |
| Past attempts | What marketing has already been tried, what worked, what failed and why |
| Proof | Anything provable today - numbers, demos, a screen recording - versus what is still a promise |
| Seasonality | When demand rises and falls, and what drives it |
| Geography | Cities or regions in priority order, and which are explicitly paused |
| The buyer versus the user | Who pays and who uses it daily - they often need different messages |
| Anti-goals | Customers we do not want, and channels we refuse to use |
| Team and capacity | Who can shoot photos, record a screen, answer a DM, and how fast |
| Assets on hand | Existing photos, videos, decks, a press kit, customer permission to be named |
| Risk tolerance | How bold the copy may be; anything the owner will not sign off on |
| Active agents | Which of the nine specialists this project actually needs |
| Cadence | How often the weekly plan and the monthly report should run, and at what local time |

## How the answers are recorded

Every answer is written into `_context/` **as it is given** - never held in the conversation. Anything the owner defers is left as an explicit `TODO` line naming what is missing and who can answer it.
