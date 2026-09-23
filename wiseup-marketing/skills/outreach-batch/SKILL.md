---
name: outreach-batch
description: Build a batch of outreach targets with personalised messages the owner sends manually.
---

# Outreach batch

Executed by `outreach`. **Nothing is ever sent by an agent.**

## Steps
1. **Brief**: segments, geography, batch size (default 25), and the channel the owner will actually use.
2. **Deduplicate**: read every previous `research/outreach/*batch*.md` and never include a business that was already contacted.
3. **Find targets** only from the allowed sources in the `outreach` agent definition. For each: business name, segment, city, size signal if public, public contact channel, source URL, and one real personalisation hook taken from their own page.
4. **Prioritise**: A = several locations or products, active, and no equivalent solution of their own; B = active, small; C = the rest. Enterprise-sized targets get a meeting proposal instead of a sign-up link.
5. **Messages** from `_templates/outreach-message.md`: 80 words or fewer, hook first, one offer, a soft CTA, and a link carrying the outreach UTM with the batch number in `utm_content`. Follow-up 40 words or fewer.
6. **Community-group post** (optional): one helpful, non-promotional post per group, respecting that group's rules. Link the rules you checked.
7. Save `research/outreach/YYYY-MM-DD_batch-NN.md`, `status: draft`. CMO reviews, sets `review`, and the owner sends the messages and fills in the tracking table.
