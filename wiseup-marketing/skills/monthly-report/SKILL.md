---
name: monthly-report
description: Monthly marketing report: KPIs against target, channels, CAC, recommendations.
---

# Monthly report

Executed by `analyst`; reviewed by the CMO.

## Steps
1. **Period**: the previous calendar month. File `reports/YYYY-MM_monthly.md` from `_templates/report-monthly.md`.
2. **Gather data** - never invent any of it:
   - numbers the owner shared in chat or dropped into `reports/data/`,
   - connected analytics or ad tools, if the session has them,
   - every deliverable with `status: published` and a `published_at` inside the period (search the frontmatter across `social/`, `ads/`, `seo/`, `pages/`, `research/outreach/`),
   - the outreach tracking tables.
3. **Missing data**: fill the template anyway, mark each gap in line, and list exactly which export the owner should pull - tool, report name, date range.
4. **Analyse**: against target, per channel CAC, and the trend versus the previous month. Keep facts, assumptions and estimates visibly separate.
5. **Recommend** three actions for next month, each with the agent that would own it.
6. CMO reviews, sets `review`, and reports to the owner: three headline numbers, three recommendations, and the missing-data list.
