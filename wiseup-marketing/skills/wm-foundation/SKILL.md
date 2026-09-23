---
name: wm-foundation
description: Build the five foundation documents properly - product offering, brand context, voice, style, growth - through a grilling interview with a quality gate on each. Use for "foundation", "build the brand documents", "deepen the context".
---

# WM foundation

The stage that turns a scaffolded `_context/` folder into a real one. Five documents, one at a time, each worked through with the bundled `wiseup-marketing:grilling` skill and closed by a quality gate before the next one opens.

Run it after `wm-init`. Budget one to two hours per document for a project with real decisions behind it. It can be stopped and resumed at any point: progress lives in the files, not in the conversation.

**Why one at a time.** These documents depend on each other. Voice is derived from positioning; positioning is derived from what the product actually is; the growth plan is derived from all of it. Asking about tone before the offer is settled produces a tone for a product that does not exist yet.

## Order - never rearrange it

| # | Document | Depends on | Also produces |
|---|---|---|---|
| 1 | `product-offering.md` | nothing | `claims-policy.md` |
| 2 | `brand-context.md` | 1 | — |
| 3 | `brand-voice-guide.md` | 2 | — |
| 4 | `brand-style-guide.md` | 2 | `_brand/tokens.json` |
| 5 | `growth-marketing-context.md` | 1, 2 | the first-tasks list |

## How each document is worked

**1. Research first.** Facts are your job, never the owner's. Before the first question, read what already exists: the product repository, the live site, `package.json`, the README, i18n message files, any existing marketing copy, and - with the `researcher` agent - the competitors the owner will be compared against. Come with findings, not a blank form.

**2. Grill it.** Invoke `wiseup-marketing:grilling` and work that document's design tree. Ask the whole frontier per round through `AskUserQuestion`, each question with your recommended answer, then wait. A question whose answer depends on another open question belongs to a later round.

**3. Write as you go.** Every answer goes into the file the moment it is given, in English, in the template's structure. Never hold a round in conversation and write it up at the end.

**4. Gate it.** Run the document's quality gate below. Report each failed check as a specific gap with the question that would close it. Do not move on with a failed gate unless the owner explicitly defers it - and then write the deferral into the file as `TODO: <what> - blocks <what>`.

**5. Read it back and get approval.** Summarise the document's decisions in the owner's language - not the document text, the decisions - and ask for explicit approval. On approval set `status: approved` and `approved: YYYY-MM-DD` in the frontmatter. Then open the next document.

---

## 1. Product Offering

The document every other one rests on. If this is vague, everything downstream is decoration.

**Grill for:** what the product does in the customer's own words · every plan with its price, limits and what is included · billing, trial and cancellation terms · what happens when a trial ends · **which features work today versus which are roadmap** · support channels and the response time you are willing to print · what happens above the largest plan.

**Push hardest on live versus roadmap.** Owners overstate readiness, not out of dishonesty but because they know what is nearly done. Ask feature by feature: *can a customer use this today, without you helping them?* A "nearly" is a roadmap item.

**Quality gate**
- [ ] Every plan has a price, a currency and explicit limits.
- [ ] Trial terms say what happens on the last day.
- [ ] The live list contains nothing a customer cannot use unaided today.
- [ ] The roadmap list is separate and labelled as roadmap.
- [ ] Support promises a channel and a response time the owner will honour.
- [ ] A stranger could buy from this document without asking a question.

**Then produce `claims-policy.md`.** It is derived, not interviewed: everything on the live list becomes an allowed claim with its exact wording; everything on the roadmap becomes forbidden; add the comparisons that cannot be proven, whether any real testimonial exists, and any regulatory limit on advertising in this category. Read it back to the owner and get it approved separately - it is the document that binds every agent afterwards.

---

## 2. Brand Context

**Grill for:** positioning in one sentence, including what the product is **not** · the promise a customer would repeat to a colleague · three message pillars · who it is for, segment by segment · **who it is not for** · the competitor customers will bring up, and the honest answer · the name and any collision with other products.

**Push hardest on the pillars.** Three is the limit, and each one must survive the question *can we prove this today?* A pillar that needs a roadmap feature is not a pillar yet.

**Quality gate**
- [ ] Positioning names a category and a boundary.
- [ ] Exactly three pillars, each provable from the live list in document 1.
- [ ] Each segment has a core message that would not fit another segment.
- [ ] The anti-customer is written down.
- [ ] The competitor answer is honest and does not attack.

---

## 3. Brand Voice Guide

**Grill for:** tone in three adjectives, each with what it rules out · form of address, and any channel that differs · sentence rules · the glossary of words used and words never used · one good example and one bad one, with the reason each is what it is · per-channel notes.

**Push hardest on the glossary.** "Professional but friendly" tells an agent nothing. A table of *we say X, never Y, because Z* changes every sentence it writes.

**Quality gate**
- [ ] Three tone adjectives, each with an exclusion.
- [ ] Form of address set, with exceptions listed.
- [ ] Glossary has at least five we-say / never-say pairs, each with a reason.
- [ ] One good and one bad example, and the bad one explains its failure.
- [ ] Nothing here contradicts the claims policy.

---

## 4. Brand Style Guide

**Grill for:** logo files and the rules for using them · the colour palette with the role of each colour · typography, including the script the product must support · layout, spacing, radius · **imagery: what the pictures show and what they never show** · the asset sizes this project actually needs.

**Push hardest on imagery.** This is what the image generator reads. "Modern and clean" produces stock photography. Name the real places, the light, what people are doing, and the clichés you refuse.

**If there is no brand yet, stop and say so.** Do not invent a palette. Record it, and put a brand brief from the `copywriter` agent at the top of the first-tasks list; come back to this document when it is approved.

**Quality gate**
- [ ] `_brand/tokens.json` is filled and `node _templates/banner/render.mjs _templates/banner/example.json <tmp>.png` runs without the not-configured error.
- [ ] Every colour has a role, not just a hex value.
- [ ] Typography covers the script the customer-facing language needs.
- [ ] The imagery section names concrete scenes and at least three refused clichés.
- [ ] A test banner was rendered and **looked at** - text fits, nothing overlaps, readable at phone size.

---

## 5. Growth Marketing Context

**Grill for:** goals with numbers and dates · what success looks like · the funnel stages and the event recorded at each · KPIs and their targets · the monthly budget ceiling and the **stop rule** · channels in priority order, with cadence and who can post · channels explicitly out of scope · ad platforms and whether the accounts exist · analytics and conversion tracking status · geography in priority order · sales motion.

**Push hardest on the stop rule.** "We will see how it goes" is how budget disappears. Ask for the number at which a channel gets paused, and the period it is measured over.

**Quality gate**
- [ ] Every goal has a number and a date.
- [ ] The funnel names an event per stage, and the analytics row says whether that event exists today.
- [ ] Budget ceiling and stop rule are both numeric.
- [ ] Every active channel has a cadence and a named human who can act on it.
- [ ] Out-of-scope channels are listed, so no agent proposes them.
- [ ] Paid platforms are marked blocked where tracking is not live.

---

## Closing the stage

When all five are `approved`:

1. Re-read `00-config.md` and fill anything the sessions settled - segments, channels, currency, active agents.
2. Write `<marketing root>/_context/team-blueprint.md`: the decision log - what was decided, when, and what was deliberately left open. It is the file a future session reads to understand why things are the way they are.
3. Report, in the owner's language: which documents are approved, what `TODO` lines remain and what each blocks, and a first-tasks list of three to five deliverables with the agent that would own each.

**Resuming.** Read the frontmatter of all five. Continue from the first one that is not `approved`, and inside it from the first unanswered section. Never re-ask a question whose answer is already in the file.
