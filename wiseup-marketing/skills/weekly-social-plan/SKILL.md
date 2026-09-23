---
name: weekly-social-plan
description: Next period's social media plan and draft posts for every active channel.
---

# Weekly social plan

Run by the CMO, executed by `social-media`, with copy checks by `copywriter` when a post carries a new claim or a new hook.

## Before anything else
Open `_context/00-config.md`. If the channel table is empty, or the cadence and content mix are `TODO`, **stop and say so**: a plan cannot be invented. Offer the owner a short set of options instead, and write their choice into the config before continuing.

## Steps
1. **Period**: the next Monday to Sunday in the project's time zone. Output folder `social/YYYY-MM/` (the month of that Monday). Plan file `YYYY-Www_plan.md`, ISO week number.
2. **Inputs**: `growth-marketing-context.md`, `brand-voice-guide.md`, `brand-style-guide.md`, `claims-policy.md`; the last two plans, so hooks are not repeated; the latest file in `reports/`, for what performed; any campaign in `ads/` running in the same week.
3. **Plan table**:

   | Day | Channel | Segment | Pillar | Format | Topic / hook | Post file | Visual needed |
   |---|---|---|---|---|---|---|---|

   Channels, cadence and mix come from the config. Rotate segments by the priority recorded there.
4. **Posts**: one file per post from `_templates/social-post.md`, `status: draft`.
5. **Visuals**: for an image that carries text, write a `banner-compose` spec and render it - it will refuse if the brand tokens are still empty, which is the signal to do the brand round first. For photographic images, generate a text-free background with `nano-banana-visual`, then overlay the text.
6. **Check**: claims policy; UTM on every link; no hook repeated from the last two periods; every post tied to one segment and one pillar; publish times inside the working hours in the config.
7. CMO reviews, sets `review`, and sends the owner the plan table, the file paths, and the list of things only the owner can do.
