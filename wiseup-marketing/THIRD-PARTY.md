# Third-party content bundled with Wiseup Marketing

Wiseup Marketing is MIT licensed and ships other people's MIT-licensed work alongside its own. This file records what, from where, and under which terms. Every bundled file also carries its own attribution footer.

All bundled components are **MIT**, which permits redistribution - including inside this plugin and in a public repository - as long as the copyright notice and licence text travel with the copy. They do: see `licences/`.

---

## AI Marketing Suite - the `market-*` toolbox

15 skills: `market`, `market-ads`, `market-audit`, `market-brand`, `market-competitors`, `market-copy`, `market-emails`, `market-funnel`, `market-landing`, `market-launch`, `market-proposal`, `market-report`, `market-report-pdf`, `market-seo`, `market-social`.

| | |
|---|---|
| **Source** | https://github.com/zubair-trabzada/ai-marketing-claude |
| **Author** | Zubair Trabzada |
| **Licence** | MIT, Copyright (c) 2026 Zubair Trabzada |
| **Licence text** | `licences/zubair-trabzada-ai-marketing-claude-LICENSE` |
| **Verified** | 2026-09-23. The bundled copies were compared against the upstream repository and match it. |

**Modifications:**
1. YAML frontmatter (`name`, `description`) was added to each `SKILL.md`. The upstream files have none, and a skill needs a description to be invoked reliably.
2. A short Wiseup Marketing integration note was prepended, telling the agent to use the skill's thinking but to ignore its own output filenames and follow `_sop/02-file-conventions.md` instead.
3. An attribution footer was appended.

The body of every skill is otherwise unchanged.

---

## grilling, grill-me - the interview skills

| | |
|---|---|
| **Source** | https://github.com/mattpocock/skills (`skills/productivity/grilling`, `skills/productivity/grill-me`) |
| **Author** | Matt Pocock |
| **Licence** | MIT, Copyright (c) 2026 Matt Pocock |
| **Licence text** | `licences/mattpocock-skills-LICENSE` |

**Modifications:** in `grill-me`, the cross-reference now points at `wiseup-marketing:grilling`, so the bundled copy calls the bundled copy. An attribution footer was appended. Nothing else changed.

---

## Deliberately not bundled

**`seo`** - a large standalone SEO audit skill that exists on the original author's machine. It is not included: it is 1.5 MB, and that copy carries a `.env` file, which must never travel inside a plugin. The `seo-specialist` agent uses it when it happens to be installed, and works without it.

---

## If you fork this

Keep `licences/`, this file, and the attribution footers intact. That is the whole of what MIT asks of you, and it is what lets the next person reuse the work in turn.
