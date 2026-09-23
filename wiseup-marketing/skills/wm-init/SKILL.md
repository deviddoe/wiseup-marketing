---
name: wm-init
description: Set up the marketing department in this project: detect the environment, place Marketing/ safely, capture the minimum context and start working. Use for "set up marketing", "wm init", "add a marketing team".
---

# WM init

Run once per project. It turns a repository into one that has a working marketing department, without touching the project's own architecture and without an interrogation.

**Work in English** until the owner's reply language is recorded in round 1. From that point on, speak their language; the `_context/` files stay in English regardless.

WM ships with **no defaults**: no brand, no colours, no fonts, no tone, no prices, no channels, no language. Everything is captured from the owner or left as an explicit `TODO`. Never fill a gap with a plausible guess, and never carry an answer over from another project.

## The shape of this skill

```
detect (0 questions) -> confirm placement (1) -> round 1 (4) -> round 2 (3) -> work starts
                                                                              |
                                              everything else is asked later, by the agent that needs it
```

Front-loading twenty questions is what makes a tool like this tiring. Ask what blocks the first deliverable; ask the rest when it blocks something.

## Step 1 - Detect, do not ask

Follow `${CLAUDE_PLUGIN_ROOT}/reference/setup-profiles.md` step 1. Read the git state, the repository visibility, the author count, the project type, and any product facts already in `package.json` or the README.

If a marketing root already exists with a `CLAUDE.md`, **stop** and run `wm-doctor` instead: report the current setup and ask whether to repair or extend it.

## Step 2 - Confirm the placement, once

Pick the profile from that reference and put it to the owner in a single `AskUserQuestion` call: what was detected, which profile, the exact file actions, and the alternatives. Then apply it exactly as confirmed and write `<marketing root>/.wm/setup.json`.

Copy `${CLAUDE_PLUGIN_ROOT}/scaffold/` into the marketing root, **including the dot-files** (`.claude/settings.json`, `.env.example`, `.gitignore`) - a plain glob copy misses them. Create the output folders: `research/`, `research/outreach/`, `social/`, `ads/`, `seo/`, `pages/`, `reports/`, `reports/data/`, `presentation/`, `_archive/`. Never overwrite an existing file; list any you skipped. The agents and process skills stay in the plugin - only content, configuration and templates are scaffolded.

## Step 3 - Round 1: who and what

One `AskUserQuestion` call, four questions. Pre-fill every option from what you detected; the owner should be confirming, not typing.

1. **Reply language** - the language the CMO speaks to them in. (Offer the language they have been writing to you in.)
2. **Customer-facing language(s)** - what the copy is written in.
3. **Product name as it appears in copy**, plus the public domain. (Offer what `package.json` or the README says.)
4. **Who approves and publishes** - name and role. (Offer the git user name.)

Write all four into `_context/00-config.md` immediately, then switch to the reply language.

## Step 4 - Round 2: what we sell and where it leads

One call, three questions.

5. **What the product does**, in one sentence a customer would say. (Offer the README description as a starting point.)
6. **The primary conversion action and its exact URL** - what a person does when the marketing works.
7. **What you want first** - the first deliverable. Offer concrete options: competitor research, a landing page spec, a content plan, an outreach batch, a campaign.

Write them into `product-offering.md`, `00-config.md` and `brand-context.md`.

## Step 5 - Fill the time zone and start

Set the time zone from the system if you can read it; otherwise ask it as part of round 2.

Then **stop asking and start working** on the deliverable from question 7. The agent that takes it will ask for what it needs, when it needs it.

## Step 6 - Report

In the owner's reply language:
- what was created and where, and the exact file actions taken (naming any tracked file, if the profile touched one),
- that nothing needs committing, if that is true,
- the three ways to start a session (`/wm`, a session whose working directory is the marketing root, or touching a file in it),
- what is being worked on now, and the one or two things the owner will be asked next.

## Just-in-time context, from here on

`${CLAUDE_PLUGIN_ROOT}/reference/required-context.md` is the full list of what WM eventually needs, in four tiers. **Only Tier 1 blocks the start** - rounds 1 and 2 cover it.

After init, the rule is: **the agent that needs a fact asks for that fact, at the moment it needs it, as one question.** The ads specialist asks for the budget ceiling when a campaign is being built, not on day one. The copywriter asks about tone when it writes the first headline. Nobody is sent back to a twenty-question interview.

The deep questions in Tier 4 - real customer language, objections, past attempts, proof, seasonality - are worth a dedicated session with the bundled `wiseup-marketing:grilling` skill. **Offer that once, after the first deliverable ships**, when the owner has seen what WM produces and can judge what is worth deepening.
