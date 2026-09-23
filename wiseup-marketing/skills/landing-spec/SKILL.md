---
name: landing-spec
description: Write a landing page spec - sections, final copy, pricing, FAQ, SEO, analytics events and acceptance criteria - that the development session implements. Use for any new or revised page on the marketing site.
---

# Landing spec

Executed by `landing-cro`, with `copywriter` for the copy and `seo-specialist` for the SEO block. Run those two in parallel when both are needed.

## Steps
1. **Scope**: route, segment, primary action, and the traffic sources that will land on it.
2. **Current state, read-only**: open the existing route and the i18n message files in the product repository so the spec fits the header, footer and translation keys that already exist. **Never modify the repository.** `technical-context.md` records where those files live.
3. **Write** `pages/<route-name>_spec.md` from `_templates/landing-spec.md`:
   - Hero: headline built on one pillar and the segment message, sub, primary CTA with the exact wording from `00-config.md`, secondary scroll link.
   - Problem, then how it works in three steps, then features - **only the ones that are live** per `product-offering.md` - then pricing, then FAQ (what happens when the trial ends, how to pay, the honest answer about the competitor customers will ask about, data safety), then the final CTA.
   - No testimonials section until real customers exist.
   - Final copy in the output language; note which i18n keys are needed if the site is multilingual.
4. **SEO and tracking** blocks filled in. UTM parameters must survive all the way into the sign-up.
5. **Acceptance criteria** plus open questions for the owner.
6. CMO reviews and sets `review`. The summary tells the owner exactly which file to hand to the development session.
