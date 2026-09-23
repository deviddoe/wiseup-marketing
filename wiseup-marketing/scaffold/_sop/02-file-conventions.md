# SOP 02 - Files, names, UTM

## Where things live
| Folder | What |
|---|---|
| `_context/` | facts, audience, messages, voice, rules - always in English |
| `_sop/` | process |
| `_templates/` | templates (markdown) and the banner and image scripts |
| `_brand/` | approved brand assets; `tokens.json` drives the banner renderer |
| `research/` | studies |
| `research/outreach/` | target lists and messages |
| `social/YYYY-MM/` | weekly plans and posts |
| `ads/<campaign>/` | campaign structure, copy, visuals |
| `seo/` | keywords, articles, audits |
| `pages/` | landing page specs for the dev team |
| `reports/` | weekly and monthly reports; raw exports in `reports/data/` |
| `presentation/` | decks |
| `_archive/` | superseded versions |

## Names
- `YYYY-MM-DD_short-description.md` - lower case, latin letters, hyphens.
- Weekly plan: `YYYY-Www_plan.md` (ISO week).
- Visuals: `<file-name>_v1.png`, `_v2.png`. Never delete or overwrite an approved version.

## Frontmatter - required on every deliverable
```yaml
---
title: short title
type: social-post | ad | landing-spec | research | report | outreach | visual | deck | seo
segment: S1 | S2 | S3 | S4 | all
channel: facebook | instagram | tiktok | linkedin | google-ads | meta-ads | seo | web | outreach
status: draft
owner: <agent name>
created: YYYY-MM-DD
publish_date:          # planned, if any
published_at:          # filled at published
url:                   # filled at published
---
```

## UTM - on every link to our own site
`<primary URL>?utm_source=<source>&utm_medium=<medium>&utm_campaign=YYYY-MM_<short>&utm_content=<segment-variant>`

The source and medium values are listed in `_context/00-config.md`.
