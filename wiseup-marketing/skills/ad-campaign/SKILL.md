---
name: ad-campaign
description: Build a paid campaign end to end: structure, targeting, copy variants, visuals, budget scenarios, tracking.
---

# Ad campaign

Executed by `ads-specialist`; copy polished by `copywriter`; visuals via `banner-compose`.

## Before anything else
Read the paid-platform table and the budget rows in `_context/00-config.md` and `growth-marketing-context.md`. If no platform is chosen, or the ceiling and stop rule are `TODO`, **stop**: present the options and the trade-offs for this project's segments and geography, and let the owner decide.

## Steps
1. **Brief**: segment, platform, goal (awareness versus conversions), period, budget ceiling.
2. **Pre-flight gate**: is analytics live, is conversion tracking firing, does the landing page exist? If not, still build the campaign, put `blocked_by:` in the frontmatter, and lead the summary with it.
3. **Folder** `ads/YYYY-MM_<short-name>/` with `campaign.md` (from `_templates/ad-campaign.md`), `copy.md`, `visuals.md`, and the rendered images.
4. **Structure**: follow the chosen platform's own hierarchy and its current limits - look them up rather than recalling them. Keep the account small enough to learn from: few enough ad sets that each one can gather data inside the test period.
5. **Copy**: at least 3 variants per ad, each on a different message pillar. Verify every character limit with code. Run the claims check.
6. **Budget**: low / base / high in the project currency, with the formula shown and every benchmark labelled as an assumption. Tie the outcome back to the target in `growth-marketing-context.md`, and state what result would trigger the stop rule.
7. CMO reviews, sets `review`, and reports: what, for whom, how much, what is blocking, and what the owner must set up in the ad account.
