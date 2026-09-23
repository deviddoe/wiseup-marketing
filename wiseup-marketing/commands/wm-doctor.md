---
description: Check this project's Wiseup Marketing setup - what leaks into git, which scope is enabled, what context is missing - and offer to fix it.
---

Audit the Wiseup Marketing setup in this project and report in the owner's reply language. Read `${CLAUDE_PLUGIN_ROOT}/reference/setup-profiles.md` and `${CLAUDE_PLUGIN_ROOT}/reference/required-context.md` first. **Change nothing until the owner approves a specific fix.**

## 1. Placement

- Find the marketing root (the folder with `CLAUDE.md` and `_context/`). Read `<root>/.wm/setup.json` if it exists - it records the profile chosen at setup.
- If there is no marketing root, say so and offer `wm-init`. Stop there.

## 2. Git exposure - the part that matters most

- Is this a git repository, and is its remote public? (`gh repo view --json visibility`, skipped silently if unavailable.)
- Would the marketing root be committed? `git check-ignore -v <root>/probe` and `git status --short <root>`.
- Is any part of it **already tracked**? `git ls-files <root> | head`. A tracked file that the profile says should be hidden is the most serious finding: report it first, and say plainly that hiding it now does not remove it from the history that is already pushed.
- Is `.env` ignored, and is any key already tracked? `git ls-files` against `*.env*`.
- Did WM write into a **shared** `.claude/settings.json` in a repository with more than one author? Name it, and offer to move the entry to `.claude/settings.local.json`.

## 3. Enablement

- Which scope enables the plugin here: user, project or local? Read `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`.
- Flag a user-scope `true`: it loads the plugin in every project on this machine, including ones with no marketing.
- Flag a project-scope entry in a shared repository, per the check above.

## 4. Context

- Compare `_context/` against the four tiers.
- Report Tier 1 gaps as **blocking**, Tier 2 as **blocks publishing**, Tier 3 as **blocks that kind of work**, Tier 4 as **worth deepening**.
- Do not list every `TODO`. Name the tier, the count, and the two that unblock the most.

## 5. Brand and tooling

- Does `_brand/tokens.json` have what the banner renderer needs? If not, say which keys and that visuals are blocked until then.
- Is `node` available, and Edge or Chrome for rendering?
- Is `GEMINI_API_KEY` set for image generation, or is the project in manual mode? **Never print the value.**

## 6. Report

A short table: check, status, what to do. Then offer the fixes as a numbered list, each one a single concrete action. Apply only what the owner picks, and re-run the relevant check afterwards.

$ARGUMENTS
